<script lang="ts">
	import Placeholder from '../components/Placeholder.svelte';
	import Search from '../components/Search.svelte';

	interface ResponseData {
		title: string;
		link: string;
		company: string;
		location: string;
	}

	let loading = false;
	let data: ResponseData[];
	const fetchData = async () => {
		loading = true;
		const response = await fetch('/scrape');
		data = await response.json();
		console.log(data);
		loading = false;
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">myscape - job board webscraper</h1>
		<button class="btn variant-outline-primary" on:click={fetchData}>Click me!</button>
		<ul>
			{#if data && !loading}
				{#each data as element}
					<a target="_blank" href={element.link}>
						<li>
							<code class="code">{element.company}</code>
							{element.title} | {element.location}
						</li>
					</a>
				{/each}
			{:else if loading}
				<Placeholder />
			{:else}
				<div />
			{/if}
		</ul>
	</div>
</div>
