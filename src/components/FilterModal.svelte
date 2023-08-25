<script>
	import Filter from './Filter.svelte';
</script>

<div class="bg-surface-500 py-5 rounded-lg">
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>seniority:</span>
		<Filter type="seniority" value="internship" selected>internship</Filter>
		<Filter type="seniority" value="entry level" selected>entry level</Filter>
		<Filter type="seniority" value="mid level" selected>mid level</Filter>
		<Filter type="seniority" value="senior level" selected>senior level</Filter>
	</div>
	<hr class="my-3 h-0.5 border-0 bg-surface-900" />
	<div class="flex space-x-2 px-5 align-middle items-center">
		<span>sites:</span>
		<Filter type="website" value="LinkedIn" selected>LinkedIn</Filter>
		<Filter type="website" value="Indeed">Indeed</Filter>
		<Filter type="website" value="Zip Recruiter">Zip Recruiter</Filter>
		<Filter type="website" value="Monster">Monster</Filter>
	</div>
</div>
