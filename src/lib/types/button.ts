import type { Size, BaseProps } from './common.js';
import type { IconName } from '../icons.js';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = Extract<Size, 'sm' | 'md' | 'lg'>;
export type IconPosition = 'left' | 'right';

export interface ButtonProps extends BaseProps {
    text?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    onclick?: () => void;
    icon?: IconName;
    iconOnly?: boolean;
    iconPosition?: IconPosition;
}