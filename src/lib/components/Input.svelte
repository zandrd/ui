<script lang="ts">
	import { iconMap, type IconName, getIcon } from '../icons.js';

	// Tipos
	type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
	type InputState = 'default' | 'error' | 'success' | 'disabled';
	type InputSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

	interface ResponsiveSize {
		base: InputSize;
		xs?: InputSize;
		sm?: InputSize;
		md?: InputSize;
		lg?: InputSize;
		xl?: InputSize;
		'2xl'?: InputSize;
		'3xl'?: InputSize;
	}

	// Props
	export let type: InputType = 'text';
	export let value: string = '';
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;
	export let required: boolean = false;
	export let size: InputSize | ResponsiveSize = 'base';
	export let state: InputState = 'default';
	export let label: string = '';
	export let helperText: string = '';
	export let errorMessage: string = '';
	export let successMessage: string = '';
	export let leftIcon: IconName | undefined = undefined;
	export let rightIcon: IconName | undefined = undefined;
	export let showPasswordToggle: boolean = false;
	export let autocomplete: AutoFill | undefined = undefined;
	export let name: string = '';
	export let id: string = '';
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let step: string | number | undefined = undefined;
	export let min: string | number | undefined = undefined;
	export let max: string | number | undefined = undefined;
	export let validateOnBlur: boolean = true; // Nueva prop para validación

	// Tipos para autocomplete
	type AutoFill =
		| 'on'
		| 'off'
		| 'name'
		| 'given-name'
		| 'family-name'
		| 'additional-name'
		| 'email'
		| 'username'
		| 'current-password'
		| 'new-password'
		| 'tel'
		| 'tel-country-code'
		| 'tel-national'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'country'
		| 'country-name'
		| 'postal-code'
		| 'cc-name'
		| 'cc-number'
		| 'cc-exp'
		| 'cc-csc';

	// Estado interno
	let inputElement: HTMLInputElement;
	let showPassword = false;
	let isFocused = false;
	let internalState: InputState = state;
	let internalErrorMessage = '';

	// Generar ID único si no se proporciona
	const uniqueId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

	// Función de validación de email
	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Función de validación general
	function validateInput(value: string): { isValid: boolean; message: string } {
		// Si está vacío y es requerido
		if (required && !value.trim()) {
			return { isValid: false, message: 'Este campo es obligatorio' };
		}

		// Si está vacío y no es requerido, es válido
		if (!value.trim()) {
			return { isValid: true, message: '' };
		}

		// Validación específica por tipo
		switch (type) {
			case 'email':
				if (!validateEmail(value)) {
					return { isValid: false, message: 'Please enter a valid email to continue.' };
				}
				break;
			case 'url':
				try {
					new URL(value);
				} catch {
					return { isValid: false, message: 'Please enter a valid URL to continue.' };
				}
				break;
			case 'tel':
				const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
				if (!phoneRegex.test(value)) {
					return { isValid: false, message: 'Please enter a valid phone number to continue.' };
				}
				break;
		}

		// Validación de longitud
		if (minlength && value.length < minlength) {
			return { isValid: false, message: `Mínimo ${minlength} caracteres` };
		}

		if (maxlength && value.length > maxlength) {
			return { isValid: false, message: `Máximo ${maxlength} caracteres` };
		}

		// Validación de patrón
		if (pattern) {
			const regex = new RegExp(pattern);
			if (!regex.test(value)) {
				return { isValid: false, message: 'El formato no es válido' };
			}
		}

		return { isValid: true, message: '' };
	}

	// Actualizar estado interno cuando cambie el state prop
	$: internalState = state;

	// Validar cuando cambie el valor (solo si validateOnBlur es false)
	$: if (!validateOnBlur && value) {
		const validation = validateInput(value);
		if (state === 'default') {
			// Solo cambiar si no hay un estado forzado
			internalState = validation.isValid ? 'success' : 'error';
			internalErrorMessage = validation.message;
		}
	}

	// Clases de tamaño
	const sizeClasses: Record<InputSize, string> = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-3 py-1.5 text-sm',
		base: 'px-3 py-2 text-base',
		lg: 'px-4 py-2.5 text-lg',
		xl: 'px-4 py-3 text-xl'
	};

	// Función para obtener las clases de tamaño
	function getSizeClasses(size: InputSize | ResponsiveSize): string {
		if (typeof size === 'string') {
			return sizeClasses[size];
		}
		return sizeClasses[size.base];
	}

	// Clases de estado
	$: stateClasses = {
		default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
		error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
		success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
		disabled: 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
	};

	// Clases base del input
	$: baseClasses = [
		'w-full',
		'border',
		'rounded-lg',
		'transition-all',
		'duration-200',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-opacity-50',
		getSizeClasses(size),
		stateClasses[internalState],
		leftIcon ? 'pl-10' : '',
		rightIcon || showPasswordToggle ? 'pr-10' : '',
		disabled ? 'cursor-not-allowed opacity-50' : ''
	]
		.filter(Boolean)
		.join(' ');

	// Manejar toggle de contraseña
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	// Determinar el tipo actual del input
	$: currentType = type === 'password' && showPassword ? 'text' : type;

	// Función para obtener el componente de ícono
	function getIconComponent(iconName: IconName) {
		return getIcon(iconName);
	}

	// Eventos
	function handleFocus(event: FocusEvent) {
		isFocused = true;
	}

	function handleBlur(event: FocusEvent) {
		isFocused = false;

		// Validar al salir del campo si validateOnBlur es true
		if (validateOnBlur && state === 'default') {
			const validation = validateInput(value);
			internalState = validation.isValid ? (value ? 'success' : 'default') : 'error';
			internalErrorMessage = validation.message;
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;

		// Limpiar error si el usuario está escribiendo
		if (internalState === 'error' && value) {
			internalState = 'default';
			internalErrorMessage = '';
		}
	}

	// Determinar qué mensaje mostrar
	$: displayMessage = (() => {
		if (internalState === 'error' && (internalErrorMessage || errorMessage)) {
			return internalErrorMessage || errorMessage;
		}
		if (internalState === 'success' && successMessage) {
			return successMessage;
		}
		return helperText;
	})();

	// Determinar el color del mensaje
	$: messageClass = (() => {
		if (internalState === 'error') return 'text-red-600';
		if (internalState === 'success') return 'text-green-600';
		return 'text-gray-500';
	})();
</script>

<!-- Label -->
{#if label}
	<label for={uniqueId} class="mb-1 block text-sm font-medium text-gray-700">
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>
{/if}

<!-- Input Container -->
<div class="relative">
	<!-- Left Icon -->
	{#if leftIcon}
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<svelte:component this={getIconComponent(leftIcon)} class="h-5 w-5 text-gray-400" />
		</div>
	{/if}

	<!-- Input Element -->
	<input
		bind:this={inputElement}
		bind:value
		type={currentType}
		{name}
		id={uniqueId}
		{placeholder}
		{disabled}
		{readonly}
		{required}
		{maxlength}
		{minlength}
		{pattern}
		{step}
		{min}
		{max}
		{autocomplete}
		class={baseClasses}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:input={handleInput}
		on:change
		on:keydown
		on:keyup
		on:keypress
	/>

	<!-- Right Icon / Password Toggle -->
	{#if rightIcon || showPasswordToggle}
		<div class="absolute inset-y-0 right-0 flex items-center pr-3">
			{#if showPasswordToggle && type === 'password'}
				<button
					type="button"
					class="text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
					on:click={togglePasswordVisibility}
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{#if showPassword}
						<svelte:component this={getIcon('eye-off')} class="h-5 w-5" />
					{:else}
						<svelte:component this={getIcon('eye')} class="h-5 w-5" />
					{/if}
				</button>
			{:else if rightIcon}
				<div class="pointer-events-none">
					<svelte:component this={getIconComponent(rightIcon)} class="h-5 w-5 text-gray-400" />
				</div>
			{/if}
		</div>
	{/if}

	<!-- Validation Icon -->
	{#if internalState === 'success' && value}
		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</div>
	{:else if internalState === 'error' && value}
		<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<svg class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
	{/if}
</div>

<!-- Helper Text / Error Message -->
{#if displayMessage}
	<p class="mt-1 text-sm {messageClass}">{displayMessage}</p>
{/if}
