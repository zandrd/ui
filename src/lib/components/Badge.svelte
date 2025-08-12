<!-- src/lib/components/Badge.svelte -->
<script lang="ts">
	import type { BadgeProps, BadgeVariant, BadgeSize } from '$lib/types/badge.js';

	let {
		text,
		variant = 'default',
		size = 'md',
		dot = false,
		dotColor,
		onclick,
		class: className = '',
		...props
	}: BadgeProps = $props();

	const variants: Record<BadgeVariant, string> = {
		default: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
		success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
		warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
		danger: 'bg-red-500/10 border-red-500/20 text-red-400',
		info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
		subtle: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
		new: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', // Verde para "New"
		soon: 'bg-neutral-500/10 border-neutral-500/20 text-neutral-400' // Gris para "Soon"
	};

	// Tamaños regulares
	const sizes: Record<BadgeSize, string> = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-sm'
	};

	// Tamaños para variants compactos
	const compactSizes: Record<BadgeSize, string> = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-xs',
		lg: 'px-3 py-1.5 text-sm'
	};

	const dotSizes: Record<BadgeSize, string> = {
		sm: 'w-1.5 h-1.5',
		md: 'w-2 h-2',
		lg: 'w-2 h-2'
	};

	const isClickable = $derived(!!onclick);
	const isCompact = $derived(['subtle', 'new', 'soon'].includes(variant));
	const currentSizes = $derived(isCompact ? compactSizes : sizes);
</script>

{#if isClickable}
	<button
		class={`
			inline-flex items-center gap-2 font-medium
			backdrop-blur-sm transition-all duration-200 ease-out
			hover:scale-[1.02] hover:brightness-110 focus:ring-2 focus:ring-offset-2 focus:outline-none
			${isCompact ? 'rounded border' : 'rounded-full border'}
			${variants[variant]} ${currentSizes[size]} ${className}
		`}
		{onclick}
		{...props}
	>
		{#if dot}
			<div
				class={`animate-pulse rounded-full ${dotSizes[size]}`}
				style={dotColor ? `background-color: ${dotColor}` : ''}
				class:bg-orange-500={!dotColor && (variant === 'default' || variant === 'subtle')}
				class:bg-emerald-500={!dotColor && (variant === 'success' || variant === 'new')}
				class:bg-yellow-500={!dotColor && variant === 'warning'}
				class:bg-red-500={!dotColor && variant === 'danger'}
				class:bg-blue-500={!dotColor && variant === 'info'}
				class:bg-neutral-500={!dotColor && variant === 'soon'}
			></div>
		{/if}
		<span class="font-medium">{text}</span>
	</button>
{:else}
	<div
		class={`
			inline-flex items-center gap-2 font-medium backdrop-blur-sm
			${isCompact ? 'rounded border' : 'rounded-full border'}
			${variants[variant]} ${currentSizes[size]} ${className}
		`}
		{...props}
	>
		{#if dot}
			<div
				class={`animate-pulse rounded-full ${dotSizes[size]}`}
				style={dotColor ? `background-color: ${dotColor}` : ''}
				class:bg-orange-500={!dotColor && (variant === 'default' || variant === 'subtle')}
				class:bg-emerald-500={!dotColor && (variant === 'success' || variant === 'new')}
				class:bg-yellow-500={!dotColor && variant === 'warning'}
				class:bg-red-500={!dotColor && variant === 'danger'}
				class:bg-blue-500={!dotColor && variant === 'info'}
				class:bg-neutral-500={!dotColor && variant === 'soon'}
			></div>
		{/if}
		<span class="font-medium">{text}</span>
	</div>
{/if}
