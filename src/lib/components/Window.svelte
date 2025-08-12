<script lang="ts">
	import type { WindowProps, WindowType } from '$lib/types/window.js';
	import { iconMap } from '$lib/icons.js';
	import { type Snippet } from 'svelte';

	interface Props extends WindowProps {
		children: Snippet;
	}

	let {
		type = 'mac',
		title = 'Window',
		titlebar = true,
		header = {},
		browser = {},
		code = {},
		terminal = {},
		icon,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	// Traffic lights enabled by default for mac and browser
	const showTrafficLights = $derived(
		header.trafficLights ?? (type === 'mac' || type === 'browser')
	);

	// Header classes based on window type
	const headerClasses = $derived(() => {
		const base =
			'flex items-center justify-between px-3 py-2 border-b border-neutral-700/50 backdrop-blur-sm';
		const variants = {
			mac: 'bg-neutral-800/80',
			browser: 'bg-neutral-800/90',
			code: 'bg-neutral-900/95',
			terminal: 'bg-black/95'
		};
		return `${base} ${variants[type]}`;
	});
</script>

<!-- Window como contenedor principal (NO Frame) -->
<div
	class="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 shadow-2xl backdrop-blur-xl {className}"
	{...restProps}
>
	<!-- Window Header -->
	{#if titlebar}
		<div class={headerClasses()}>
			<!-- Traffic Lights -->
			{#if showTrafficLights}
				<div class="flex items-center gap-2">
					<button
						class="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500"
						onclick={header.onClose}
						aria-label="Close"
					></button>
					<button
						class="h-3 w-3 rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-500"
						onclick={header.onMinimize}
						aria-label="Minimize"
					></button>
					<button
						class="h-3 w-3 rounded-full bg-green-500/80 transition-colors hover:bg-green-500"
						onclick={header.onMaximize}
						aria-label="Maximize"
					></button>
				</div>
			{:else}
				<div class="w-[52px]"></div>
			{/if}

			<!-- Window Title -->
			<div class="flex-1 text-center">
				<div class="flex items-center justify-center gap-2">
					{#if icon}
						{@const IconComponent = iconMap[icon]}
						<IconComponent class="h-4 w-4 text-neutral-400" />
					{/if}
					<h4 class="text-xs font-medium text-neutral-300">{title}</h4>
				</div>
			</div>

			<!-- Right spacer -->
			<div class="w-[52px]"></div>
		</div>
	{/if}

	<!-- Window Content (sin contenedores adicionales) -->
	{@render children()}
</div>
