// ========================================
// COMPONENTS
// ========================================
export { default as Button } from "./components/Button.svelte";
export { default as Badge } from "./components/Badge.svelte";
export { default as Input } from "./components/Input.svelte";
export { default as Frame } from "./layout/Frame.svelte";

// Legacy export for backward compatibility
export { default as SectionContainer } from "./layout/Frame.svelte";
export { default as Window } from "./components/Window.svelte";

// ========================================
// TYPES - Import from organized types
// ========================================
export type {
    // Common types
    ResponsiveValue,
    BaseVariant,
    ContainerValue,
    SpacingValue,
    AlignValue,
    HeightValue,

    // Button types
    ButtonVariant,
    ButtonSize,
    ButtonProps,
    IconPosition,

    // Frame types
    FrameVariant,
    FrameProps,
    LayoutTemplate,
    GridValue,
    GapValue,
    FlexDirection,
    JustifyContent,
    AlignItems,

    // Legacy types (deprecated)
    SectionVariant,
    PaddingValue,
    BadgeVariant,
    BadgeSize,
    BadgeProps,

    // Window types
    WindowType,
    WindowProps,
    TabConfig,
    WindowHeaderConfig,
    BrowserConfig,
    CodeConfig,
    TerminalConfig,
    InputType,
    InputVariant,
    InputSize,
    InputState,
    InputAddon,
    InputProps,
} from "./types/index.js";

// ========================================
// ICONS
// ========================================
export { iconMap, type IconName } from "./icons.js";