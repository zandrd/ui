import type { BaseProps } from './common.js';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'subtle' | 'new' | 'soon';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends BaseProps {
    /** Badge text content */
    text: string;

    /** Visual variant */
    variant?: BadgeVariant;

    /** Badge size */
    size?: BadgeSize;

    /** Show animated dot */
    dot?: boolean;

    /** Dot color override */
    dotColor?: string;

    /** Make badge clickable */
    onclick?: () => void;
}