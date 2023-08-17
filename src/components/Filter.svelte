<script lang="ts">
	export let selected: boolean = false;
</script>

<button
	on:click={() => {
		selected = !selected;
	}}
	type="button"
	class={selected
		? 'btn-sm rounded-lg transition-all ease-in-out duration-150 variant-filled-primary'
		: 'btn-sm rounded-lg transition-all ease-in-out duration-150 variant-outline-primary'}
>
	<slot />
</button>
