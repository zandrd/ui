<script lang="ts">
	import type {
		FrameProps,
		GridValue,
		GapValue,
		FlexDirection,
		JustifyContent,
		AlignItems,
		LayoutTemplate
	} from '$lib/types/frame.js';
	import type {
		ResponsiveValue,
		ContainerValue,
		SpacingValue,
		AlignValue,
		HeightValue
	} from '$lib/types/common.js';
	import type { FrameVariant } from '$lib/types/frame.js';

	import { type Snippet } from 'svelte';

	interface Props extends FrameProps {
		/** Children content */
		children: Snippet;
	}

	let {
		class: className = '',
		variant = 'default',
		container = '7xl',
		padding = 'lg',
		align = 'start',
		height = 'auto',

		// 🆕 Grid system
		grid,
		gap,
		gridMinWidth = '250px',

		// 🆕 Flex system
		direction,
		justify,
		items,

		// 🆕 Layout templates
		layout = 'default',

		// Styling
		background,
		border = false,

		// Accessibility
		id,
		role,
		'aria-label': ariaLabel,

		children
	}: Props = $props();

	// Utility function to generate responsive classes
	function generateResponsiveClasses<T extends string>(
		prop: ResponsiveValue<T> | undefined,
		classMap: Record<T, string>
	): string {
		if (!prop) return '';

		if (typeof prop === 'string') {
			return classMap[prop as T] || '';
		}

		const classes: string[] = [];
		if (prop.base) classes.push(classMap[prop.base as T] || '');
		if (prop.xs)
			classes.push(
				`xs:${classMap[prop.xs as T]?.replace(/^[a-z-]+:/, '') || classMap[prop.xs as T] || ''}`
			);
		if (prop.sm)
			classes.push(
				`sm:${classMap[prop.sm as T]?.replace(/^[a-z-]+:/, '') || classMap[prop.sm as T] || ''}`
			);
		if (prop.md)
			classes.push(
				`md:${classMap[prop.md as T]?.replace(/^[a-z-]+:/, '') || classMap[prop.md as T] || ''}`
			);
		if (prop.lg)
			classes.push(
				`lg:${classMap[prop.lg as T]?.replace(/^[a-z-]+:/, '') || classMap[prop.lg as T] || ''}`
			);
		if (prop.xl)
			classes.push(
				`xl:${classMap[prop.xl as T]?.replace(/^[a-z-]+:/, '') || classMap[prop.xl as T] || ''}`
			);
		if (prop['2xl'])
			classes.push(
				`2xl:${classMap[prop['2xl'] as T]?.replace(/^[a-z-]+:/, '') || classMap[prop['2xl'] as T] || ''}`
			);
		if (prop['3xl'])
			classes.push(
				`3xl:${classMap[prop['3xl'] as T]?.replace(/^[a-z-]+:/, '') || classMap[prop['3xl'] as T] || ''}`
			);

		return classes.filter(Boolean).join(' ');
	}

	// ========================================
	// VARIANT CLASSES
	// ========================================
	const variantClasses = $derived(() => {
		const variants: Record<FrameVariant, string> = {
			default: '',
			primary: 'bg-blue-50 dark:bg-blue-950/50',
			secondary: 'bg-neutral-50 dark:bg-neutral-900/50',
			muted: 'bg-neutral-100 dark:bg-neutral-800/50'
		};
		return variants[variant];
	});

	// ========================================
	// LAYOUT CLASSES
	// ========================================
	const containerClasses = $derived(() => {
		const containers: Record<ContainerValue, string> = {
			xs: 'max-w-xs',
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
			full: 'max-w-full',
			screen: 'max-w-screen',
			none: 'max-w-none'
		};
		return generateResponsiveClasses(container, containers);
	});

	const paddingClasses = $derived(() => {
		const paddings: Record<SpacingValue, string> = {
			none: 'p-0',
			xs: 'p-2',
			sm: 'p-4',
			md: 'p-6',
			lg: 'p-8',
			xl: 'p-12',
			'2xl': 'p-16',
			'3xl': 'p-24'
		};
		return generateResponsiveClasses(padding, paddings);
	});

	const heightClasses = $derived(() => {
		const heights: Record<HeightValue, string> = {
			auto: '',
			fit: 'h-fit',
			screen: 'h-screen',
			'min-screen': 'min-h-screen',
			'almost-full': 'min-h-[85vh]',
			full: 'h-full'
		};
		return generateResponsiveClasses(height, heights);
	});

	const alignClasses = $derived(() => {
		const alignments: Record<AlignValue, string> = {
			start: 'text-left',
			center: 'text-center',
			end: 'text-right'
		};
		return generateResponsiveClasses(align, alignments);
	});

	// ========================================
	// GRID SYSTEM
	// ========================================
	const gridClasses = $derived(() => {
		if (!grid) return '';

		const grids: Record<GridValue, string> = {
			none: '',
			auto: `grid-cols-[repeat(auto-fit,minmax(${gridMinWidth},1fr))]`,
			'auto-fill': `grid-cols-[repeat(auto-fill,minmax(${gridMinWidth},1fr))]`,
			'1': 'grid-cols-1',
			'2': 'grid-cols-2',
			'3': 'grid-cols-3',
			'4': 'grid-cols-4',
			'5': 'grid-cols-5',
			'6': 'grid-cols-6',
			'7': 'grid-cols-7',
			'8': 'grid-cols-8',
			'9': 'grid-cols-9',
			'10': 'grid-cols-10',
			'11': 'grid-cols-11',
			'12': 'grid-cols-12'
		};

		const gridClass = generateResponsiveClasses(grid, grids);
		return gridClass ? `grid ${gridClass}` : '';
	});

	const gapClasses = $derived(() => {
		if (!gap) return '';

		const gaps: Record<GapValue, string> = {
			none: 'gap-0',
			xs: 'gap-2',
			sm: 'gap-4',
			md: 'gap-6',
			lg: 'gap-8',
			xl: 'gap-12',
			'2xl': 'gap-16',
			'3xl': 'gap-24'
		};
		return generateResponsiveClasses(gap, gaps);
	});

	// ========================================
	// FLEX SYSTEM
	// ========================================
	const flexClasses = $derived(() => {
		let classes: string[] = [];

		if (direction) {
			const directions: Record<FlexDirection, string> = {
				row: 'flex-row',
				'row-reverse': 'flex-row-reverse',
				col: 'flex-col',
				'col-reverse': 'flex-col-reverse'
			};
			classes.push('flex', generateResponsiveClasses(direction, directions));
		}

		if (justify) {
			const justifyMap: Record<JustifyContent, string> = {
				start: 'justify-start',
				end: 'justify-end',
				center: 'justify-center',
				between: 'justify-between',
				around: 'justify-around',
				evenly: 'justify-evenly',
				stretch: 'justify-stretch'
			};
			classes.push(generateResponsiveClasses(justify, justifyMap));
		}

		if (items) {
			const itemsMap: Record<AlignItems, string> = {
				start: 'items-start',
				end: 'items-end',
				center: 'items-center',
				baseline: 'items-baseline',
				stretch: 'items-stretch'
			};
			classes.push(generateResponsiveClasses(items, itemsMap));
		}

		return classes.join(' ');
	});

	// ========================================
	// LAYOUT TEMPLATES
	// ========================================
	const layoutClasses = $derived(() => {
		const layouts: Record<LayoutTemplate, string> = {
			default: '',
			'dashboard-grid': 'grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4',
			'stats-row': 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4',
			'sidebar-content': 'grid grid-cols-[250px_1fr] gap-6',
			'header-content': 'grid grid-rows-[auto_1fr] gap-4',
			'three-column': 'grid grid-cols-[250px_1fr_250px] gap-6',
			'card-grid': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
			masonry: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6',
			'flex-row': 'flex flex-row gap-4',
			'flex-col': 'flex flex-col gap-4'
		};
		return layouts[layout];
	});

	// ========================================
	// BORDER CLASSES
	// ========================================
	const borderClasses = $derived(() =>
		border ? 'border border-neutral-200 dark:border-neutral-700' : ''
	);

	// ========================================
	// FINAL COMPUTED CLASSES
	// ========================================
	const frameClasses = $derived(() => {
		const classes = [
			'w-full',
			'transition-all duration-300 ease-in-out',
			variantClasses(),
			heightClasses(),
			paddingClasses(),
			alignClasses(),
			borderClasses(),
			layoutClasses(),
			gridClasses(),
			gapClasses(),
			flexClasses(),
			className
		].filter(Boolean);

		return classes.join(' ');
	});

	const containerStyle = $derived(() => {
		return background ? `background-color: ${background}` : '';
	});

	// Responsive container wrapper
	const responsiveContainerPadding = $derived(() => {
		return 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12';
	});
</script>

<section {id} {role} aria-label={ariaLabel} class={frameClasses()} style={containerStyle()}>
	{#if layout === 'default' && !grid && !direction}
		<!-- Default: centered container -->
		<div class="mx-auto w-full {containerClasses()} {responsiveContainerPadding}">
			{@render children()}
		</div>
	{:else}
		<!-- Layout templates or grid/flex: direct children -->
		{@render children()}
	{/if}
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

	/* Grid auto-fit with custom min-width */
	.grid-auto-fit {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(var(--min-width, 250px), 1fr));
	}
</style>
