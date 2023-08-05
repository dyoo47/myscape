<script>
	import Search from '../components/Search.svelte';

	let isLoading;
	const fetchData = async () => {
		isLoading = true;
		const response = await fetch('/scrape');
		const data = await response.json();
		console.log(data);
		isLoading = false;
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">myscape - job board webscraper</h1>
		<Search onClick={fetchData} />
		<ul>
			<li>
				<code class="code">/src/routes/+layout.svelte</code> - barebones layout, the CSS import order
				is critical!
			</li>
			<li>
				<code class="code">/src/app.postcss</code> - minimal css to make the page full screen, may not
				be relevant for your project
			</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>
	</div>
</div>
