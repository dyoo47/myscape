<script lang="ts">
	import Fa from 'svelte-fa';
	import { faArrowRight, faLink } from '@fortawesome/free-solid-svg-icons';
	import type { LinkedInDataEntry } from '$lib/constants';

	interface link {
		label: string;
		href: string;
	}

	export let entry: LinkedInDataEntry;
	export let disableLink: boolean = false;
	export let links: link[] = [];
	export let badges: string[] = [];
	let target = disableLink ? '' : '_blank';
</script>

<a
	href={entry.link}
	{target}
	class="mb-2 group grid grid-cols-4 bg-opacity-0 bg-surface-500 hover:bg-opacity-40 p-4 rounded transition duration-150 ease-in-out"
>
	<div class="col col-span-4">
		<span class="text-xs font-semibold text-slate-400 tracking-widest"
			>{entry.location.toUpperCase()}</span
		>
		<br />
		<h6 class="h6 mb-2 break-normal">
			{entry.company} -
			{entry.title}
			{#if disableLink}
				<span class="badge variant-ghost-surface rounded-md ml-2 text-slate-400">Private Repo</span>
			{:else}
				<Fa
					icon={faArrowRight}
					rotate={-45}
					scale={0.8}
					class="inline ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-150"
				/>
			{/if}
		</h6>
		<p class="mb-2 text-sm text-slate-400">
			{entry.description}
		</p>

		{#if entry.quals.length > 0}
			<p class="underline text-sm text-slate-400">Minimum qualifications:</p>
		{/if}
		<ul class="text-sm list-disc text-slate-400 list-inside">
			{#each entry.quals as qual}
				<li>{qual}</li>
			{/each}
		</ul>
		<div class="mb-2">
			<ul>
				{#each links as link}
					<li class="mr-4 inline-block">
						<a
							href={link.href}
							target="_blank"
							class="text-sm font-medium text-primary-50 hover:text-primary-300"
						>
							<Fa class="inline" icon={faLink} />
							{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<ul>
			{#each badges as badge}
				<li class="inline">
					<span
						class="badge font-semibold mt-2 mr-1 text-primary-100 p-2 variant-outline-primary rounded-full"
						>{badge}</span
					>
				</li>
			{/each}
		</ul>
	</div>
</a>
