<script lang="ts">
	import { DEFAULT_QUERY, type Filter, type LinkedInDataEntry } from '$lib/constants';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import Button from '../components/Button.svelte';
	import JobCard from '../components/JobCard.svelte';
	import Placeholder from '../components/Placeholder.svelte';
	import Search from '../components/Search.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { filters } from '../stores';

	let loading = false;
	let data: LinkedInDataEntry[] = [];
	let startIndex = 0;

	let seniorityList: string[];
	const unsubscribe = filters.subscribe((value) => {
		console.log('filters: ', value);
		seniorityList = value.map((val) => {
			if (val.type === 'seniority') return val.value;
			else return;
		}) as string[];
		console.log(seniorityList);
	});

	const fetchData = async (query: string, start: number = 0) => {
		loading = true;
		if (start === 0) data = [];
		const response = await fetch(`/scrape?query=${query}&start=${start}`);
		data = data.concat(await response.json());
		loading = false;
	};

	onMount(() => {
		let options = {
			rootMargin: '0px',
			threshold: 1.0
		};
		let callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			if (entries[0].isIntersecting && !loading) {
				startIndex += 15;
				fetchData(DEFAULT_QUERY, startIndex);
			}
		};
		let observer = new IntersectionObserver(callback, options);
		observer.observe(document.querySelector('#endoflist') as Element);
	});
	onDestroy(unsubscribe);
</script>

<div style="max-width: 960px" class="px-4 mt-20 mx-auto flex justify-center">
	<div class="space-y-5 w-full">
		<div class="grid grid-flow-col">
			<h1 class="h1">myscape - job board webscraper</h1>
			<div class="flex justify-end">
				<Button href="https://github.com/dyoo47/myscape"><Fa icon={faGithub} /></Button>
			</div>
		</div>
		<Search {loading} {fetchData} />
		<div class="row">
			{#each data as entry}
				{#if seniorityList.length === 0 || seniorityList.includes(entry.seniority.toLowerCase())}
					<JobCard badges={[entry.seniority]} {entry} />
				{/if}
			{/each}
			{#if loading}
				<Placeholder />
			{:else if data.length === 0}
				<div class="col text-sm outline outline-1 outline-error-500 rounded-lg p-4">
					no results found.
				</div>
			{:else}
				<div />
			{/if}
			<div id="endoflist" />
		</div>
	</div>
</div>
