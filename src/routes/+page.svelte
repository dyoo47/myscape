<script lang="ts">
	import JobCard from '../components/JobCard.svelte';
	import Placeholder from '../components/Placeholder.svelte';
	import Search from '../components/Search.svelte';

	interface LinkedInDataEntry {
		title: string;
		link: string;
		seniority: string;
		company: string;
		location: string;
		description: string;
	}

	let loading = false;
	let data: LinkedInDataEntry[];
	const fetchData = async () => {
		loading = true;
		const response = await fetch('/scrape');
		data = await response.json();
		console.log(data);
		loading = false;
	};
</script>

<div class="container mt-20 mx-auto flex justify-center">
	<div class="space-y-5">
		<h1 class="h1">myscape - job board webscraper</h1>
		<Search>
			<button
				on:click={fetchData}
				class="text-white absolute right-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>search</button
			>
		</Search>

		<div class="row">
			{#if data && !loading}
				{#each data as { title, link, company, location, description, seniority }}
					<JobCard href={link} {title} {location} {company} {description} skills={[seniority]} />
				{/each}
			{:else if loading}
				<Placeholder />
			{:else}
				<div />
			{/if}
		</div>
	</div>
</div>
