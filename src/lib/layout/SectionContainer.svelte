<script lang="ts">
	import type { AlignValue, ContainerValue, HeightValue, PaddingValue, ResponsiveValue, SectionContainerProps, SectionVariant } from '$lib/types.ts';
	import { type Snippet } from 'svelte';

	interface Props extends SectionContainerProps {
		/** Children content */
		children: Snippet;
	}

	let {
		class: extra = '',
		variant = 'default',
		align = 'start',
		height = 'auto',
		container = '7xl',
		padding = 'lg',
		background,
		border = false,
		id,
		role,
		'aria-label': ariaLabel,
		children
	}: Props = $props();

	// Utility function to generate responsive classes
	function generateResponsiveClasses<T extends string>(
		prop: ResponsiveValue<T>,
		classMap: Record<T, string>,
		breakpointPrefix: string = ''
	): string {
		if (typeof prop === 'string') {
			return classMap[prop];
		}

		const classes: string[] = [];
		if (prop.base) classes.push(classMap[prop.base]);
		if (prop.sm) classes.push(`sm:${classMap[prop.sm].replace(breakpointPrefix, '')}`);
		if (prop.md) classes.push(`md:${classMap[prop.md].replace(breakpointPrefix, '')}`);
		if (prop.lg) classes.push(`lg:${classMap[prop.lg].replace(breakpointPrefix, '')}`);
		if (prop.xl) classes.push(`xl:${classMap[prop.xl].replace(breakpointPrefix, '')}`);

		return classes.join(' ');
	}

	// Computed classes using reactive statements
	const variantClasses = $derived(() => {
		const variants: Record<SectionVariant, string> = {
			default: '',
			muted: 'bg-neutral-100 dark:bg-neutral-800',
			primary: 'bg-blue-50 dark:bg-blue-950',
			secondary: 'bg-neutral-50 dark:bg-neutral-900'
		};
		return variants[variant];
	});

	const heightClasses = $derived(() => {
		const heights: Record<HeightValue, string> = {
			auto: '',
			screen: 'h-screen flex items-center',
			'almost-full': 'min-h-[85vh] flex items-center',
			'min-screen': 'min-h-screen flex items-center'
		};
		return generateResponsiveClasses(height, heights);
	});

	const containerClasses = $derived(() => {
		const containers: Record<ContainerValue, string> = {
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			'2xl': 'max-w-2xl',
			'3xl': 'max-w-3xl',
			'4xl': 'max-w-4xl',
			'5xl': 'max-w-5xl',
			'6xl': 'max-w-6xl',
			'7xl': 'max-w-7xl',
			full: 'max-w-full'
		};
		return generateResponsiveClasses(container, containers);
	});

	const paddingClasses = $derived(() => {
		const paddings: Record<PaddingValue, string> = {
			none: 'py-0',
			sm: 'py-4 sm:py-6 md:py-8',
			md: 'py-6 sm:py-8 md:py-10 lg:py-12',
			lg: 'py-8 sm:py-12 md:py-16',
			xl: 'py-12 sm:py-16 md:py-20',
			'2xl': 'py-16 sm:py-20 md:py-24'
		};
		return generateResponsiveClasses(padding, paddings);
	});

	const alignClasses = $derived(() => {
		const alignments: Record<AlignValue, string> = {
			start: 'text-left',
			center: 'text-center',
			end: 'text-right'
		};
		return generateResponsiveClasses(align, alignments);
	});

	const borderClasses = $derived(() =>
		border ? 'border-t border-b border-neutral-200 dark:border-neutral-700' : ''
	);

	const sectionClasses = $derived(() => {
		const classes = [
			'w-full',
			'transition-all duration-300 ease-in-out',
			heightClasses(),
			variantClasses(),
			paddingClasses(),
			borderClasses(),
			extra
		].filter(Boolean);

		return classes.join(' ');
	});

	const containerStyle = $derived(() => {
		return background ? `background-color: ${background}` : '';
	});

	// Responsive container padding
	const responsiveContainerPadding = $derived(() => {
		return 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12';
	});
</script>

<section {id} {role} aria-label={ariaLabel} class={sectionClasses()} style={containerStyle()}>
	<div class="mx-auto w-full {containerClasses()} {alignClasses()} {responsiveContainerPadding()}">
		{@render children()}
	</div>
</section>

<style>
	/* Custom styles for better responsive behavior */
	section {
		position: relative;
		contain: layout;
	}

	/* Smooth transitions for responsive changes */
	section > div {
		transition: all 0.3s ease;
	}

	/* Dark mode optimizations */
	@media (prefers-color-scheme: dark) {
		section {
			color-scheme: dark;
		}
	}

	/* Reduce motion for accessibility */
	@media (prefers-reduced-motion: reduce) {
		section,
		section > div {
			transition: none;
		}
	}
</style>
