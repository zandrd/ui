<script lang="ts">
	import type { ButtonSize, ButtonVariant, IconPosition } from '$lib/types.js';
	import { iconMap, type IconName } from '$lib/icons.js';
	import type { ButtonProps } from '$lib/types/button.js';

	let {
		text,
		variant = 'default',
		size = 'md',
		disabled = false,
		loading = false,
		loadingText,
		onclick,
		icon,
		iconOnly = false,
		iconPosition = 'left',
		class: className = '',
		...props
	}: ButtonProps = $props();

	const variants: Record<ButtonVariant, string> = {
		default: 'bg-neutral-900 text-white hover:bg-neutral-800',
		outline: 'border border-neutral-900 hover:bg-neutral-100',
		ghost: 'hover:bg-neutral-100',
		destructive: 'bg-red-600 text-white hover:bg-red-700'
	};

	// Tamaños para botones normales e icon-only
	const sizes: Record<ButtonSize, string> = {
		sm: iconOnly ? 'p-1.5' : 'px-3 py-1.5 text-sm',
		md: iconOnly ? 'p-2' : 'px-4 py-2',
		lg: iconOnly ? 'p-3' : 'px-6 py-3 text-lg'
	};

	// Tamaños de iconos según el size del botón
	const iconSizes: Record<ButtonSize, string> = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};

	// Spinner SVG responsivo
	const spinnerSizes: Record<ButtonSize, { size: string; strokeWidth: string }> = {
		sm: { size: '16', strokeWidth: '2' },
		md: { size: '20', strokeWidth: '2' },
		lg: { size: '24', strokeWidth: '2.5' }
	};

	const displayText = $derived(loading && loadingText ? loadingText : text);
	const hasText = $derived(!iconOnly && (text || loadingText));
	const hasIcon = $derived(icon && !loading);

	// ✅ Obtener componente de icono sin imports dinámicos
	const IconComponent = $derived(icon ? iconMap[icon] : null);

	let buttonElement: HTMLButtonElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		if (!buttonElement) return;
		const rect = buttonElement.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
	}
</script>

<button
	bind:this={buttonElement}
	onmousemove={handleMouseMove}
	class={`
		group relative flex items-center justify-center gap-2 overflow-hidden rounded
		font-medium transition-all duration-300 ease-out
		focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none
		${variants[variant]} ${sizes[size]} 
		${disabled || loading ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'}
		${iconOnly ? 'aspect-square' : ''}
		${className}
	`}
	disabled={disabled || loading}
	onclick={!loading ? onclick : undefined}
	{...props}
	style={`--mouse-x: ${mouseX}px; --mouse-y: ${mouseY}px;`}
>
	<!-- 🌟 Efecto hover con gradiente radial -->
	<div
		class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style={`
			background: radial-gradient(
				120px circle at var(--mouse-x) var(--mouse-y),
				rgba(255, 255, 255, 0.1) 0%,
				rgba(255, 255, 255, 0.05) 40%,
				transparent 70%
			);
		`}
	></div>
	<!-- Loading Spinner SVG -->
	{#if loading}
		<svg
			class="animate-spin-smooth"
			width={spinnerSizes[size].size}
			height={spinnerSizes[size].size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width={spinnerSizes[size].strokeWidth}
				stroke-linecap="round"
				class="opacity-25"
			/>
			<!-- Arco animado -->
			<path
				d="M12 2a10 10 0 0 1 10 10"
				stroke="currentColor"
				stroke-width={spinnerSizes[size].strokeWidth}
				stroke-linecap="round"
				class="opacity-75"
			/>
		</svg>

		<!-- Texto durante loading (solo si no es icon-only) -->
		{#if hasText}
			<span class="ml-2">{displayText}</span>
		{/if}
	{:else}
		<!-- Contenido normal: Icon + Text -->
		{#if iconPosition === 'left'}
			<!-- Icono a la izquierda -->
			{#if hasIcon && IconComponent}
				<IconComponent class={`${iconSizes[size]} ${hasText ? 'mr-1' : ''}`} />
			{/if}
			<!-- Texto -->
			{#if hasText}
				<span>{displayText}</span>
			{/if}
		{:else}
			<!-- Texto primero, icono a la derecha -->
			{#if hasText}
				<span>{displayText}</span>
			{/if}
			{#if hasIcon && IconComponent}
				<IconComponent class={`${iconSizes[size]} ${hasText ? 'ml-1' : ''}`} />
			{/if}
		{/if}
	{/if}

	<!-- Efecto hover sutil -->
	<div
		class="pointer-events-none absolute inset-0 rounded bg-gradient-to-r from-transparent via-white/8
				to-transparent opacity-0 transition-opacity duration-300
				group-hover:opacity-100"
	></div>
</button>

<style>
	/* 🌟 Spinner animation suave */
	@keyframes spin-smooth {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin-smooth {
		animation: spin-smooth 1s linear infinite;
	}

	/* 🎨 Hover effect sutil */
	button:not(:disabled):hover {
		filter: brightness(1.03);
	}

	/* 🎭 Click feedback mínimo */
	button:not(:disabled):active {
		transform: scale(0.98);
		transition-duration: 100ms;
	}

	/* ✨ Transiciones suaves */
	button {
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease,
			color 0.3s ease,
			filter 0.3s ease,
			transform 0.1s ease;
	}

	/* 🌙 Dark mode optimization */
	@media (prefers-color-scheme: dark) {
		button:not(:disabled):hover {
			filter: brightness(1.1);
		}
	}

	/* ♿ Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.animate-spin-smooth {
			animation: none;
		}

		button,
		button * {
			transition: none !important;
		}
	}
</style>
