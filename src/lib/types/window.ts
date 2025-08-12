import type {
    ResponsiveValue,
    BaseProps,
    AccessibilityProps
} from './common.js';
import type { FrameProps } from './frame.ts';
import type { IconName } from '../icons.ts';

/**
 * Window variants for different use cases
 */
export type WindowType = 'mac' | 'browser' | 'code' | 'terminal';

/**
 * Browser tab configuration
 */
export interface TabConfig {
    title: string;
    url?: string;
    favicon?: string;
    active?: boolean;
    closable?: boolean;
}

/**
 * Window header configuration
 */
export interface WindowHeaderConfig {
    /** Show traffic lights (close, minimize, maximize) */
    trafficLights?: boolean;
    /** Custom close action */
    onClose?: () => void;
    /** Custom minimize action */
    onMinimize?: () => void;
    /** Custom maximize action */
    onMaximize?: () => void;
}

/**
 * Browser-specific configuration
 */
export interface BrowserConfig {
    /** URL to display in address bar */
    url?: string;
    /** Browser tabs */
    tabs?: TabConfig[];
    /** Show navigation buttons */
    navigation?: boolean;
    /** Show bookmarks bar */
    bookmarks?: boolean;
}

/**
 * Code editor configuration
 */
export interface CodeConfig {
    /** Programming language for syntax highlighting */
    language?: string;
    /** Filename to display */
    filename?: string;
    /** Show line numbers */
    lineNumbers?: boolean;
    /** Code theme */
    theme?: 'dark' | 'light' | 'auto';
}

/**
 * Terminal configuration
 */
export interface TerminalConfig {
    /** Terminal prompt */
    prompt?: string;
    /** Terminal theme */
    theme?: 'dark' | 'light' | 'matrix' | 'retro';
    /** Current directory */
    cwd?: string;
}

/**
 * Window component props
 */
export interface WindowProps extends Omit<FrameProps, 'children'> {
    /** Window variant */
    type: WindowType;

    /** Window title */
    title?: string;

    /** Show/hide titlebar responsively */
    titlebar?: ResponsiveValue<boolean>;

    /** Window header configuration */
    header?: WindowHeaderConfig;

    /** Browser-specific props */
    browser?: BrowserConfig;

    /** Code editor props */
    code?: CodeConfig;

    /** Terminal props */
    terminal?: TerminalConfig;

    /** Custom window icon */
    icon?: IconName;
}