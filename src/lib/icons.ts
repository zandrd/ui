// Sistema de iconos predefinido para mejor performance

import Save from '@lucide/svelte/icons/save';
import Upload from '@lucide/svelte/icons/upload';
import Download from '@lucide/svelte/icons/download';
import Settings from '@lucide/svelte/icons/settings';
import ChevronRight from '@lucide/svelte/icons/chevron-right';
import ChevronLeft from '@lucide/svelte/icons/chevron-left';
import ExternalLink from '@lucide/svelte/icons/external-link';
import Mail from '@lucide/svelte/icons/mail';
import Heart from '@lucide/svelte/icons/heart';
import Star from '@lucide/svelte/icons/star';
import Plus from '@lucide/svelte/icons/plus';
import Search from '@lucide/svelte/icons/search';
import Trash2 from '@lucide/svelte/icons/trash-2';
import Edit from '@lucide/svelte/icons/edit';
import Zap from '@lucide/svelte/icons/zap';
import Lock from '@lucide/svelte/icons/lock';
import Loader from '@lucide/svelte/icons/loader';
import Send from '@lucide/svelte/icons/send';
import Copy from '@lucide/svelte/icons/copy';
import Scissors from '@lucide/svelte/icons/scissors';
import Clipboard from '@lucide/svelte/icons/clipboard';
import Undo from '@lucide/svelte/icons/undo';
import Redo from '@lucide/svelte/icons/redo';
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import BookOpen from '@lucide/svelte/icons/book-open';
import FileText from '@lucide/svelte/icons/file-text';
import Trash from '@lucide/svelte/icons/trash';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Eye from '@lucide/svelte/icons/eye';
import EyeOff from '@lucide/svelte/icons/eye-off';
import User from '@lucide/svelte/icons/user';
import Phone from '@lucide/svelte/icons/phone';
import Globe from '@lucide/svelte/icons/globe';

// Mapa de iconos disponibles
export const iconMap = {
    'save': Save,
    'upload': Upload,
    'download': Download,
    'settings': Settings,
    'chevron-right': ChevronRight,
    'chevron-left': ChevronLeft,
    'external-link': ExternalLink,
    'mail': Mail,
    'heart': Heart,
    'star': Star,
    'plus': Plus,
    'search': Search,
    'trash-2': Trash2,
    'edit': Edit,
    'zap': Zap,
    'lock': Lock,
    'loader': Loader,
    'send': Send,
    'copy': Copy,
    'scissors': Scissors,
    'clipboard': Clipboard,
    'undo': Undo,
    'redo': Redo,
    'arrow-right': ArrowRight,
    'book-open': BookOpen,
    'file-text': FileText,
    'trash': Trash,
    'refresh-cw': RefreshCw,
    'eye': Eye,
    'eye-off': EyeOff,
    'user': User,
    'phone': Phone,
    'globe': Globe,
} as const;

// Tipo para los nombres de iconos disponibles
export type IconName = keyof typeof iconMap;

// Función helper para obtener un icono
export function getIcon(name: IconName) {
    return iconMap[name];
}

// Tipos actualizados para Button
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

export interface ButtonProps {
    text?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    onclick?: () => void;

    // 🔄 Cambiado: icon ahora es tipo-seguro
    icon?: IconName;              // Solo iconos predefinidos
    iconOnly?: boolean;
    iconPosition?: IconPosition;
}