<script lang="ts">
	import { DEFAULT_QUERY } from '$lib/constants';
	import Fa from 'svelte-fa';
	import { faFilter } from '@fortawesome/free-solid-svg-icons';
	import {
		Modal,
		modalStore,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import FilterModal from './FilterModal.svelte';

	export let fetchData: (query: string) => void;
	export let loading: boolean = false;
	let query: string = DEFAULT_QUERY;

	const modalComponent: ModalComponent = {
		ref: FilterModal,
		slot: '<p>Could not load modal component.</p>'
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};
</script>

<form>
	<Modal />
	<div class="relative">
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				class="w-4 h-4 text-surface-300"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
		</div>
		<input
			bind:value={query}
			type="search"
			id="default-search"
			class="block transition-all ease-in-out duration-150 w-full p-4 pl-10 text-sm text-surface-900 outline-none border-2 rounded-lg dark:bg-surface-500 dark:border-surface-600 dark:placeholder-surface-300 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
			placeholder="search job titles, locations..."
		/>
		<div class="absolute right-2.5 bottom-2.5 inline-flex rounded-lg overflow-hidden" role="group">
			<button
				disabled={loading}
				on:click={() => {
					fetchData(query);
				}}
				type="submit"
				class="text-white border-r-2 border-primary-800 bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-primary-300 font-medium text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>search</button
			>
			<button
				type="button"
				on:click={() => {
					modalStore.trigger(modal);
				}}
				class="text-white border-primary-800 bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-0 font-medium text-sm px-3 py-2 dark:bg-primary-600 dark:hover:bg-primary-700"
			>
				<Fa icon={faFilter} />
			</button>
		</div>
	</div>
</form>
