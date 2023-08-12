<script lang="ts">
	export let href: string;
</script>

<a
	target="_blank"
	class="h2 mt-auto h-min opacity-60 transition duration-300 ease-in-out hover:opacity-100"
	{href}
>
	<slot />
</a>
