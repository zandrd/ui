import type {
    ResponsiveValue,
    BaseVariant,
    ContainerValue,
    SpacingValue,
    AlignValue,
    HeightValue,
    BaseProps,
    AccessibilityProps
} from './common.js';

/**
* Frame visual variants
*/
export type FrameVariant = BaseVariant;

/**
* Grid layout values
*/
export type GridValue =
    | 'none'     // No grid
    | 'auto'     // auto-fit with min-width
    | 'auto-fill' // auto-fill with min-width
    | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'; // Fixed columns

/**
* Gap values for grid/flex layouts
*/
export type GapValue = SpacingValue;

/**
* Flex direction values
*/
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';

/**
* Justify content values
*/
export type JustifyContent =
    | 'start' | 'end' | 'center'
    | 'between' | 'around' | 'evenly'
    | 'stretch';

/**
* Align items values
*/
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/**
* Predefined layout templates
*/
export type LayoutTemplate =
    | 'default'        // No special layout
    | 'dashboard-grid' // Responsive grid for dashboard cards
    | 'stats-row'      // Horizontal stats layout
    | 'sidebar-content' // Sidebar + main content
    | 'header-content'  // Header + main content
    | 'three-column'    // Side + main + side
    | 'card-grid'       // Responsive card grid
    | 'masonry'         // Masonry-style layout
    | 'flex-row'        // Horizontal flex layout
    | 'flex-col';       // Vertical flex layout

/**
* Frame component props
*/
export interface FrameProps extends BaseProps, AccessibilityProps {
    // Core layout
    /** Visual variant for styling */
    variant?: FrameVariant;

    /** Container max width */
    container?: ResponsiveValue<ContainerValue>;

    /** Internal padding */
    padding?: ResponsiveValue<SpacingValue>;

    /** Text alignment */
    align?: ResponsiveValue<AlignValue>;

    /** Height behavior */
    height?: ResponsiveValue<HeightValue>;

    // Grid system
    /** Grid layout configuration */
    grid?: ResponsiveValue<GridValue>;

    /** Gap between grid/flex items */
    gap?: ResponsiveValue<GapValue>;

    /** Minimum width for auto grid layouts */
    gridMinWidth?: string;

    // Flex system
    /** Flex direction */
    direction?: ResponsiveValue<FlexDirection>;

    /** Justify content alignment */
    justify?: ResponsiveValue<JustifyContent>;

    /** Align items alignment */
    items?: ResponsiveValue<AlignItems>;

    // Layout templates
    /** Predefined layout template */
    layout?: LayoutTemplate;

    // Styling
    /** Custom background color */
    background?: string;

    /** Show border */
    border?: boolean;

    // Note: class, id, role, aria-label inherited from BaseProps & AccessibilityProps
}

// ========================================
// BACKWARD COMPATIBILITY
// ========================================

/**
* @deprecated Use FrameVariant instead
*/
export type SectionVariant = FrameVariant;

/**
* @deprecated Use SpacingValue instead  
*/
export type PaddingValue = SpacingValue;

/**
* @deprecated Use FrameProps instead
*/

export interface FrameProps extends BaseProps, AccessibilityProps {
    // Core layout
    variant?: FrameVariant;
    container?: ResponsiveValue<ContainerValue>;
    padding?: ResponsiveValue<SpacingValue>;
    align?: ResponsiveValue<AlignValue>;
    height?: ResponsiveValue<HeightValue>;

    // Grid system
    grid?: ResponsiveValue<GridValue>;
    gap?: ResponsiveValue<GapValue>;
    gridMinWidth?: string;

    // Flex system
    direction?: ResponsiveValue<FlexDirection>;
    justify?: ResponsiveValue<JustifyContent>;
    items?: ResponsiveValue<AlignItems>;

    // Layout templates
    layout?: LayoutTemplate;

    // Styling
    background?: string;
    border?: boolean;
    // class, id, role, aria-label vienen de BaseProps & AccessibilityProps
}