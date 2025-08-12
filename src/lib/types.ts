// Button component types
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
	text?: string;                    // 🔄 Opcional para botones icon-only
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
	onclick?: () => void;

	// 🆕 Props para iconos
	icon?: string;                    // Nombre del icono de Lucide
	iconOnly?: boolean;              // Solo icono, sin texto
	iconPosition?: IconPosition;     // Posición del icono cuando hay texto
}

// SectionContainer component types
export type SectionVariant = 'default' | 'muted' | 'primary' | 'secondary';
export type AlignValue = 'start' | 'center' | 'end';
export type HeightValue = 'auto' | 'screen' | 'almost-full' | 'min-screen';
export type ContainerValue = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
export type PaddingValue = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveValue<T> = T | {
	base: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
};

export interface SectionContainerProps {
	class?: string;
	variant?: SectionVariant;
	align?: ResponsiveValue<AlignValue>;
	height?: ResponsiveValue<HeightValue>;
	container?: ResponsiveValue<ContainerValue>;
	padding?: ResponsiveValue<PaddingValue>;
	background?: string;
	border?: boolean;
	id?: string;
	role?: string;
	'aria-label'?: string;
}
