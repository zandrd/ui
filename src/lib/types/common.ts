/**
 * @file Common types shared across all components
 * @description Core type definitions for responsive values, sizing, spacing, and layout utilities
 */

// ========================================
// RESPONSIVE SYSTEM
// ========================================

/**
 * Responsive value that can be a single value or an object with breakpoint-specific values
 * 
 * @example
 * ```typescript
 * // Single value - applies to all breakpoints
 * const padding: ResponsiveValue<string> = "lg";
 * 
 * // Responsive object - different values per breakpoint
 * const container: ResponsiveValue<string> = {
 *   base: "full",    // Mobile (default)
 *   md: "6xl",       // Tablet and up
 *   xl: "7xl"        // Desktop and up
 * };
 * ```
 */
export type ResponsiveValue<T> = T | {
    /** Base value (mobile-first, always required) */
    base: T;
    /** Extra small screens (480px+) */
    xs?: T;
    /** Small screens (640px+) */
    sm?: T;
    /** Medium screens (768px+) */
    md?: T;
    /** Large screens (1024px+) */
    lg?: T;
    /** Extra large screens (1280px+) */
    xl?: T;
    /** 2X large screens (1536px+) */
    '2xl'?: T;
    /** 3X large screens (1920px+) */
    '3xl'?: T;
};

// ========================================
// VARIANT SYSTEM
// ========================================

/**
 * Base visual variants used across components
 */
export type BaseVariant = 'default' | 'primary' | 'secondary' | 'muted';

/**
 * Extended variants with semantic meaning
 */
export type SemanticVariant = BaseVariant | 'success' | 'warning' | 'danger' | 'info';

// ========================================
// SIZE SYSTEM
// ========================================

/**
 * Standard size scale used across components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Extended size scale for larger elements
 */
export type ExtendedSize = Size | '3xl' | '4xl' | '5xl';

// ========================================
// CONTAINER SYSTEM
// ========================================

/**
 * Container max-width values for layout components
 * Maps to Tailwind's max-width utilities
 */
export type ContainerValue =
    | 'xs'      // max-w-xs (20rem / 320px)
    | 'sm'      // max-w-sm (24rem / 384px)
    | 'md'      // max-w-md (28rem / 448px)
    | 'lg'      // max-w-lg (32rem / 512px)
    | 'xl'      // max-w-xl (36rem / 576px)
    | '2xl'     // max-w-2xl (42rem / 672px)
    | '3xl'     // max-w-3xl (48rem / 768px)
    | '4xl'     // max-w-4xl (56rem / 896px)
    | '5xl'     // max-w-5xl (64rem / 1024px)
    | '6xl'     // max-w-6xl (72rem / 1152px)
    | '7xl'     // max-w-7xl (80rem / 1280px)
    | 'full'    // max-w-full (100%)
    | 'screen'  // max-w-screen (100vw)
    | 'none';   // max-w-none (no limit)

// ========================================
// SPACING SYSTEM
// ========================================

/**
 * Spacing values for padding, margin, and gaps
 * Maps to Tailwind's spacing scale
 */
export type SpacingValue =
    | 'none'    // 0
    | 'xs'      // 0.5rem (8px)
    | 'sm'      // 1rem (16px)
    | 'md'      // 1.5rem (24px)
    | 'lg'      // 2rem (32px)
    | 'xl'      // 3rem (48px)
    | '2xl'     // 4rem (64px)
    | '3xl';    // 6rem (96px)

// ========================================
// LAYOUT SYSTEM
// ========================================

/**
 * Text and content alignment values
 */
export type AlignValue = 'start' | 'center' | 'end';

/**
 * Height behavior values for layout components
 */
export type HeightValue =
    | 'auto'        // height: auto
    | 'fit'         // height: fit-content
    | 'screen'      // height: 100vh
    | 'min-screen'  // min-height: 100vh
    | 'almost-full' // min-height: 85vh
    | 'full';       // height: 100%

/**
 * Z-index values for layering
 */
export type ZIndexValue =
    | 'auto'
    | 'base'     // z-0
    | 'above'    // z-10
    | 'dropdown' // z-20
    | 'sticky'   // z-30
    | 'fixed'    // z-40
    | 'modal'    // z-50
    | 'popover'  // z-60
    | 'tooltip'  // z-70
    | 'top';     // z-80

// ========================================
// ANIMATION SYSTEM
// ========================================

/**
 * Animation duration values
 */
export type Duration = 'fast' | 'normal' | 'slow';

/**
 * Animation easing values
 */
export type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

// ========================================
// COMMON PROPS
// ========================================

/**
 * Base props that most components accept
 */
export interface BaseProps {
    /** Additional CSS classes */
    class?: string;

    /** Element ID */
    id?: string;

    /** Test ID for testing */
    'data-testid'?: string;
}

/**
 * Accessibility props
 */
export interface AccessibilityProps {
    /** ARIA role */
    role?: string;

    /** ARIA label */
    'aria-label'?: string;

    /** ARIA labelled by */
    'aria-labelledby'?: string;

    /** ARIA described by */
    'aria-describedby'?: string;

    /** ARIA hidden */
    'aria-hidden'?: boolean;
}

/**
 * Common style props
 */
export interface StyleProps {
    /** Background color */
    background?: string;

    /** Text color */
    color?: string;

    /** Border configuration */
    border?: boolean | 'top' | 'bottom' | 'left' | 'right';

    /** Shadow configuration */
    shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl';

    /** Rounded corners */
    rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// ========================================
// UTILITY TYPES
// ========================================

/**
 * Make all properties of T responsive
 */
export type MakeResponsive<T> = {
    [K in keyof T]: ResponsiveValue<T[K]>;
};

/**
 * Extract specific keys from a union type
 */
export type ExtractKeys<T, U> = T extends U ? T : never;

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;