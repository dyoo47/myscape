<script lang="ts">
	import type { LinkedInDataEntry } from '$lib/constants';
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

<div class="container px-4 mt-20 mx-auto flex justify-center">
	<div class="space-y-5">
		<h1 class="h1">myscape - job board webscraper</h1>
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
