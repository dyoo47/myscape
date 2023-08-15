<script lang="ts">
	import type { LinkedInDataEntry } from '$lib/constants';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';
	import Button from '../components/Button.svelte';
	import JobCard from '../components/JobCard.svelte';
	import Placeholder from '../components/Placeholder.svelte';
	import Search from '../components/Search.svelte';

	let loading = false;
	let data: LinkedInDataEntry[];
	const fetchData = async (query: string) => {
		loading = true;
		const response = await fetch('/scrape?query=' + query);
		data = await response.json();
		loading = false;
	};
</script>

<div style="max-width: 960px" class="px-4 mt-20 mx-auto flex justify-center">
	<div class="space-y-5 w-full">
		<div class="grid grid-flow-col">
			<h1 class="h1">myscape - job board webscraper</h1>
			<div class="flex justify-end">
				<Button href="https://github.com/dyoo47/myscape"><Fa icon={faGithub} /></Button>
			</div>
		</div>
		<Search {fetchData} />
		<div class="row">
			{#if data && !loading}
				{#each data as entry}
					<JobCard badges={[entry.seniority]} {entry} />
				{/each}
			{:else if loading}
				<Placeholder />
			{:else}
				<div />
			{/if}
		</div>
	</div>
</div>
