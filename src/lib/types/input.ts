import type {
    ResponsiveValue,
    BaseProps,
    AccessibilityProps,
    SemanticVariant
} from './common.js';
import type { IconName } from '../icons.js';

/**
 * Input types supported
 */
export type InputType =
    | 'text'
    | 'email'
    | 'password'
    | 'search'
    | 'number'
    | 'tel'
    | 'url'
    | 'date'
    | 'time';

/**
 * Input visual variants
 */
export type InputVariant = 'default' | 'floating' | 'minimal' | 'filled';

/**
 * Input sizes
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input validation states
 */
export type InputState = 'default' | 'error' | 'success' | 'warning';

/**
 * Input addon configuration
 */
export interface InputAddon {
    /** Icon name from iconMap */
    icon?: IconName;
    /** Text content */
    text?: string;
    /** Click handler */
    onClick?: () => void;
    /** Loading state */
    loading?: boolean;
}

/**
 * Input component props
 */
export interface InputProps extends BaseProps, AccessibilityProps {
    /** Input type */
    type?: InputType;

    /** Visual variant */
    variant?: InputVariant;

    /** Input size */
    size?: ResponsiveValue<InputSize>;

    /** Validation state */
    state?: InputState;

    /** Input value */
    value?: string | number;

    /** Placeholder text */
    placeholder?: string;

    /** Input label */
    label?: string;

    /** Helper text below input */
    helperText?: string;

    /** Error message (overrides helperText when state is error) */
    errorMessage?: string;

    /** Disabled state */
    disabled?: boolean;

    /** Readonly state */
    readonly?: boolean;

    /** Required field */
    required?: boolean;

    /** Loading state */
    loading?: boolean;

    /** Show clear button */
    clearable?: boolean;

    /** Show password toggle (only for password type) */
    showPasswordToggle?: boolean;

    /** Prefix addon */
    prefix?: InputAddon;

    /** Suffix addon */
    suffix?: InputAddon;

    /** Auto focus */
    autofocus?: boolean;

    /** Autocomplete attribute */
    autocomplete?: string;

    /** Max length */
    maxlength?: number;

    /** Min length */
    minlength?: number;

    /** Pattern for validation */
    pattern?: string;

    /** Step for number inputs */
    step?: number;

    /** Min value for number inputs */
    min?: number;

    /** Max value for number inputs */
    max?: number;

    // Event handlers
    /** Input event handler */
    onInput?: (event: Event) => void;

    /** Change event handler */
    onChange?: (event: Event) => void;

    /** Focus event handler */
    onFocus?: (event: FocusEvent) => void;

    /** Blur event handler */
    onBlur?: (event: FocusEvent) => void;

    /** Keydown event handler */
    onKeydown?: (event: KeyboardEvent) => void;

    /** Clear button click handler */
    onClear?: () => void;
}