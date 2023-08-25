<script lang="ts">
	import type { Filter, FilterType } from '$lib/constants';
	import { onDestroy, onMount } from 'svelte';
	import { filters } from '../stores';

	export let type: FilterType;
	export let value: string;
	export let selected: boolean = false;
	let filtersList: Filter[];
	const unsubscribe = filters.subscribe((value) => {
		filtersList = value;
	});
	export const handleAddFilter = () => {
		if (selected) {
			filters.set([...filtersList, { type, value }]);
		} else {
			filters.set(filtersList.filter((entry) => entry.type !== type || entry.value !== value));
		}
	};
	onDestroy(unsubscribe);
</script>

<button
	on:click={() => {
		selected = !selected;
		handleAddFilter();
	}}
	type="button"
	class={selected
		? 'btn-sm rounded-lg transition-all ease-in-out duration-150 variant-filled-primary'
		: 'btn-sm rounded-lg transition-all ease-in-out duration-150 variant-outline-primary'}
>
	<slot />
</button>
