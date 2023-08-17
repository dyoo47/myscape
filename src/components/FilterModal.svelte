<script>
	import Filter from './Filter.svelte';
</script>

<div class="bg-surface-500 py-5 rounded-lg">
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>seniority:</span>
		<Filter selected>internship</Filter>
		<Filter selected>entry level</Filter>
		<Filter selected>mid level</Filter>
		<Filter selected>senior level</Filter>
	</div>
	<hr class="my-3 h-0.5 border-0 bg-surface-900" />
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>sites:</span>
		<Filter selected>LinkedIn</Filter>
		<Filter>Indeed</Filter>
		<Filter>Zip Recruiter</Filter>
		<Filter>Monster</Filter>
	</div>
</div>
