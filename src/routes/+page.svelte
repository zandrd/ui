<script lang="ts">
	import Window from '$lib/components/Window.svelte';
	import { Button, Frame, Badge } from '$lib/index.ts';

	import { Input } from '$lib/index.ts';

	let textValue = $state('');
	let emailValue = $state('');
	let passwordValue = $state('');
	let numberValue = $state('');
	let searchValue = $state('');
	let disabledValue = $state('Cannot edit this');
	let errorValue = $state('');
	let successValue = $state('Valid input');

	let heroRef: HTMLElement;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let mobileMenuOpen = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!heroRef) return;
		const rect = heroRef.getBoundingClientRect();
		mouseX = (e.clientX - rect.left - rect.width / 2) / 20;
		mouseY = (e.clientY - rect.top - rect.height / 2) / 20;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav
	class="fixed top-0 z-50 w-full border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl"
>
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex h-10 items-center justify-between">
			<!-- Brand -->
			<div class="flex items-center">
				<div class="text-base font-semibold">
					<span class="text-neutral-100">@zandrd</span>
					<span class="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
						>/ui</span
					>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-6 md:flex">
				<a
					href="#components"
					class="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
					>Components</a
				>
				<a
					href="#examples"
					class="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
					>Examples</a
				>
				<a
					href="/docs"
					class="text-sm text-neutral-400 transition-colors duration-200 hover:text-white">Docs</a
				>
			</div>

			<!-- Desktop Actions -->
			<div class="hidden items-center space-x-2 md:flex">
				<Button
					variant="ghost"
					size="sm"
					text="GitHub"
					class="px-3 py-1.5 text-xs text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
				/>
				<Button
					size="sm"
					text="Get Started"
					class="bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1.5 text-xs text-white hover:from-orange-600 hover:to-red-700"
				/>
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMobileMenu}
				class="p-1.5 text-neutral-400 transition-colors hover:text-white md:hidden"
				aria-label="Toggle menu"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-neutral-800/50 bg-neutral-950/98 backdrop-blur-md md:hidden">
			<div class="px-6 py-3">
				<!-- Mobile Navigation Links -->
				<div class="space-y-1">
					<a
						href="#components"
						class="block py-2 text-sm text-neutral-400 transition-colors hover:text-white"
						onclick={() => (mobileMenuOpen = false)}
					>
						Components
					</a>
					<a
						href="#examples"
						class="block py-2 text-sm text-neutral-400 transition-colors hover:text-white"
						onclick={() => (mobileMenuOpen = false)}
					>
						Examples
					</a>
					<a
						href="/docs"
						class="block py-2 text-sm text-neutral-400 transition-colors hover:text-white"
						onclick={() => (mobileMenuOpen = false)}
					>
						Docs
					</a>
				</div>

				<!-- Mobile Actions -->
				<div class="mt-3 space-y-2 border-t border-neutral-800/50 pt-3">
					<Button
						variant="ghost"
						size="sm"
						text="View on GitHub"
						class="w-full justify-start text-sm text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
					/>
					<Button
						size="sm"
						text="Get Started"
						class="w-full justify-start bg-gradient-to-r from-orange-500 to-red-600 text-sm text-white hover:from-orange-600 hover:to-red-700"
					/>
				</div>
			</div>
		</div>
	{/if}
</nav>

<!-- Hero section with animated Svelte logo -->
<section
	bind:this={heroRef}
	onmousemove={handleMouseMove}
	role="banner"
	class="relative min-h-screen overflow-hidden bg-neutral-950 pt-10 text-white"
	style={`--mouse-x: ${mouseX}px; --mouse-y: ${mouseY}px;`}
>
	<!-- Balanced floating elements that follow mouse -->
	<div class="pointer-events-none absolute inset-0">
		<!-- Large Svelte-colored gradient (orange) - left side -->
		<div
			class="bg-gradient-radial absolute h-[600px] w-[600px] rounded-full from-orange-500/30 via-orange-500/18 to-transparent blur-3xl transition-transform duration-2000 ease-out"
			style={`transform: translate(calc(var(--mouse-x) * 0.2), calc(var(--mouse-y) * 0.2)) translate(-50%, -50%); top: 20%; left: 8%;`}
		></div>
		<!-- Medium Library-colored gradient (red) - right side -->
		<div
			class="bg-gradient-radial absolute h-[500px] w-[500px] rounded-full from-red-600/30 via-red-600/18 to-transparent blur-3xl transition-transform duration-2500 ease-out"
			style={`transform: translate(calc(var(--mouse-x) * -0.15), calc(var(--mouse-y) * -0.15)) translate(-50%, -50%); top: 60%; right: 8%;`}
		></div>
	</div>

	<Frame
		container={{ base: 'full', sm: '6xl' }}
		padding={{ base: 'md', sm: 'lg', lg: 'xl' }}
		height="screen"
		class="relative z-10 flex w-full items-center"
	>
		<div
			class="grid min-h-[80vh] grid-cols-1 items-center justify-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20"
		>
			<!-- Left side: Animated Svelte logo -->
			<div class="order-1 flex items-center justify-center">
				<div class="relative h-48 w-48 sm:h-64 sm:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
					<!-- Anillos más sutiles -->
					<div
						class="animate-spin-slow absolute inset-0 rounded-full border border-orange-500/20"
					></div>
					<div
						class="animate-spin-reverse-slower absolute inset-4 rounded-full border border-orange-500/15"
					></div>

					<!-- Svelte logo container -->
					<div
						class="absolute inset-8 flex items-center justify-center transition-transform duration-1000 ease-out"
						style={`transform: translate(calc(var(--mouse-x) * 0.05), calc(var(--mouse-y) * 0.05));`}
					>
						<!-- Svelte logo SVG -->
						<svg
							width="120"
							height="120"
							viewBox="0 0 98.1 118"
							class="animate-float drop-shadow-2xl sm:h-32 sm:w-32 lg:h-48 lg:w-48 xl:h-56 xl:w-56"
						>
							<defs>
								<linearGradient id="svelte-vibrant-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" style="stop-color:#ff3e00" />
									<stop offset="30%" style="stop-color:#ff6500" />
									<stop offset="70%" style="stop-color:#e53e3e" />
									<stop offset="100%" style="stop-color:#dc2626" />
								</linearGradient>
							</defs>
							<path
								fill="url(#svelte-vibrant-gradient)"
								d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.6-8.9-.5-18.1-5.7-25.4z"
							/>
							<path
								fill="white"
								d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.16 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.1-1.2.3-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.5-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.1-1.2.3-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.1 1.2-.3 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5z"
							/>
						</svg>
					</div>

					<!-- Glow sutil -->
					<div
						class="animate-pulse-glow absolute inset-12 rounded-full bg-orange-500/8 blur-xl"
					></div>
				</div>
			</div>

			<!-- Right side: Content -->
			<div
				class="order-2 flex flex-col justify-center space-y-6 text-center lg:space-y-8 lg:text-left"
			>
				<!-- Slogan integrado -->
				<div class="space-y-4">
					<h2 class="text-3xl leading-tight font-light md:text-4xl lg:text-5xl">
						<span class="text-neutral-100">Construye interfaces</span>
						<span
							class="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
						>
							como nunca antes
						</span>
					</h2>

					<p class="text-base leading-relaxed text-neutral-300 sm:text-lg lg:max-w-2xl lg:text-xl">
						Sistema de componentes construido sobre
						<strong
							class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent"
							>Frame</strong
						>, el layout engine más avanzado para Svelte.
					</p>
				</div>

				<!-- Botones de acción -->
				<div class="space-y-3 lg:flex lg:space-y-0 lg:space-x-4">
					<Button
						text="Explorar Frame"
						icon="arrow-right"
						iconPosition="right"
						size="md"
						class="min-h-[44px] w-full border border-neutral-600 bg-neutral-800 px-6 py-3 text-base text-neutral-200 hover:border-neutral-500 hover:bg-neutral-700 lg:w-auto"
					/>
					<Button
						text="GitHub"
						icon="external-link"
						iconPosition="right"
						variant="outline"
						size="md"
						class="min-h-[44px] w-full border-neutral-600 px-6 py-3 text-base text-neutral-200 hover:bg-neutral-800/50 lg:w-auto"
					/>
				</div>

				<!-- Badges -->
				<div class="flex flex-wrap justify-center gap-2 lg:justify-start lg:gap-3">
					<Badge text="TypeScript" variant="info" size="sm" />
					<Badge text="Svelte 5" variant="default" size="sm" dot={true} />
					<Badge text="Zero config" variant="default" size="sm" />
				</div>
			</div>
		</div>
	</Frame>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform animate-bounce text-neutral-400 lg:flex"
	>
		<div class="flex flex-col items-center gap-2">
			<span class="text-sm">Descubre más</span>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M7 13l3 3 3-3" />
				<path d="M7 6l3 3 3-3" />
			</svg>
		</div>
	</div>
</section>

<!-- Window component -->
<!-- Window component - Versión responsive -->
<section
	class="h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 pt-16 sm:px-6"
>
	<Window
		type="mac"
		title="Zandrd - Project Management"
		icon="zap"
		class="mx-auto w-full max-w-7xl"
	>
		<!-- Layout responsive: Stack en móvil, Flex en desktop -->
		<div class="flex h-[500px] flex-col sm:h-[600px] lg:flex-row">
			<!-- Sidebar - Hidden en móvil, visible en desktop -->
			<div class="hidden border-r border-neutral-700/30 bg-neutral-900/60 p-4 lg:block lg:w-64">
				<div class="space-y-6">
					<!-- Team Section -->
					<div>
						<h3 class="mb-3 text-xs tracking-wide text-neutral-500 uppercase">Workspace</h3>
						<div class="space-y-1">
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-neutral-800/50"
							>
								<div class="flex h-5 w-5 items-center justify-center rounded bg-blue-500">
									<span class="text-xs font-medium text-white">L</span>
								</div>
								<span class="text-sm text-neutral-300">Project</span>
							</div>
						</div>
					</div>

					<!-- Navigation -->
					<div>
						<div class="space-y-1">
							<div class="flex items-center gap-3 rounded bg-neutral-800/30 p-2 text-white">
								<span class="text-neutral-400">-</span>
								<span class="text-sm">Inbox</span>
								<span class="ml-auto rounded bg-orange-500 px-1.5 py-0.5 text-xs text-white">3</span
								>
							</div>
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 text-neutral-400 hover:bg-neutral-800/50"
							>
								<span>-</span>
								<span class="text-sm">My Issues</span>
							</div>
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 text-neutral-400 hover:bg-neutral-800/50"
							>
								<span>-</span>
								<span class="text-sm">Initiatives</span>
							</div>
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 text-neutral-400 hover:bg-neutral-800/50"
							>
								<span>-</span>
								<span class="text-sm">Projects</span>
							</div>
						</div>
					</div>

					<!-- Teams -->
					<div>
						<h3 class="mb-3 text-xs tracking-wide text-neutral-500 uppercase">Teams</h3>
						<div class="space-y-1">
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 text-neutral-400 hover:bg-neutral-800/50"
							>
								<span>-</span>
								<span class="text-sm">Engineering</span>
							</div>
							<div
								class="flex cursor-pointer items-center gap-3 rounded p-2 text-neutral-400 hover:bg-neutral-800/50"
							>
								<span>-</span>
								<span class="text-sm">Design</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Content - Full width en móvil -->
			<div class="flex-1 overflow-hidden bg-neutral-900/30">
				<!-- Header con navegación móvil -->
				<div class="border-b border-neutral-700/30 p-3 sm:p-4">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<!-- Menu button para móvil -->
							<button
								class="rounded p-1 hover:bg-neutral-800/50 lg:hidden"
								aria-label="Open navigation menu"
							>
								<svg
									class="h-5 w-5 text-neutral-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
							<div>
								<h1 class="text-lg font-semibold text-white">Inbox</h1>
								<p class="text-sm text-neutral-400">3 unread notifications</p>
							</div>
						</div>
						<Button
							text="Mark all read"
							size="sm"
							variant="outline"
							class="border-neutral-600 text-xs text-neutral-400 hover:bg-neutral-800/50 sm:text-sm"
						/>
					</div>
				</div>

				<!-- Issues List - Responsive -->
				<div class="space-y-2 overflow-y-auto p-3 sm:space-y-3 sm:p-4">
					<!-- Issue 1 -->
					<div
						class="flex cursor-pointer flex-col gap-2 rounded-lg border border-neutral-700/30 bg-neutral-800/20 p-3 hover:bg-neutral-800/40 sm:flex-row sm:items-center sm:gap-4"
					>
						<div class="flex flex-1 items-center gap-3">
							<div class="h-2 w-2 shrink-0 rounded-full bg-orange-500"></div>
							<span class="truncate text-sm text-neutral-300">ENG-195 Refactor sonic crawler</span>
						</div>
						<div class="flex items-center justify-between sm:gap-3">
							<Badge text="High Priority" variant="warning" size="sm" />
							<span class="shrink-0 text-xs text-neutral-500">2h</span>
						</div>
					</div>

					<!-- Issue 2 -->
					<div
						class="flex cursor-pointer flex-col gap-2 rounded-lg border border-neutral-700/30 bg-neutral-800/20 p-3 hover:bg-neutral-800/40 sm:flex-row sm:items-center sm:gap-4"
					>
						<div class="flex flex-1 items-center gap-3">
							<div class="h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
							<span class="truncate text-sm text-neutral-300"
								>ENG-194 Update dashboard API endpoints</span
							>
						</div>
						<div class="flex items-center justify-between sm:gap-3">
							<Badge text="Ready" variant="success" size="sm" />
							<span class="shrink-0 text-xs text-neutral-500">4h</span>
						</div>
					</div>

					<!-- Issue 3 -->
					<div
						class="flex cursor-pointer flex-col gap-2 rounded-lg border border-neutral-700/30 bg-neutral-800/20 p-3 hover:bg-neutral-800/40 sm:flex-row sm:items-center sm:gap-4"
					>
						<div class="flex flex-1 items-center gap-3">
							<div class="h-2 w-2 shrink-0 rounded-full bg-blue-500"></div>
							<span class="truncate text-sm text-neutral-300"
								>DES-102 Design system component audit</span
							>
						</div>
						<div class="flex items-center justify-between sm:gap-3">
							<Badge text="In Progress" variant="info" size="sm" />
							<span class="shrink-0 text-xs text-neutral-500">1d</span>
						</div>
					</div>

					<!-- Issue 4 - Más contenido para scroll -->
					<div
						class="flex cursor-pointer flex-col gap-2 rounded-lg border border-neutral-700/30 bg-neutral-800/20 p-3 hover:bg-neutral-800/40 sm:flex-row sm:items-center sm:gap-4"
					>
						<div class="flex flex-1 items-center gap-3">
							<div class="h-2 w-2 shrink-0 rounded-full bg-purple-500"></div>
							<span class="truncate text-sm text-neutral-300"
								>PRD-088 User authentication improvements</span
							>
						</div>
						<div class="flex items-center justify-between sm:gap-3">
							<Badge text="Review" variant="info" size="sm" />
							<span class="shrink-0 text-xs text-neutral-500">1w</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Window>
</section>

<!-- Input Components Section -->
<!-- Input Components Section -->
<div class="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-16 sm:px-6">
	<div class="mx-auto max-w-7xl space-y-16">
		<!-- Header -->
		<div class="text-center">
			<div class="mb-4 flex items-center justify-center gap-3">
				<h1 class="text-4xl font-bold text-white lg:text-5xl">
					<span class="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
						Input Components
					</span>
				</h1>
				<Badge text="In Development" variant="warning" size="sm" />
			</div>
			<p class="text-lg text-neutral-300 lg:text-xl">
				Complete input system with validation, states, and accessibility
			</p>
		</div>

		<!-- Main Layout: Inputs + Live Preview -->
		<div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
			<!-- Left Side: Input Examples (2/3 width) -->
			<div class="space-y-16 xl:col-span-2">
				<!-- Basic Inputs -->
				<section class="space-y-8">
					<div class="text-center xl:text-left">
						<h2 class="mb-2 text-2xl font-semibold text-white">Basic Types</h2>
						<p class="text-neutral-400">Essential inputs for any application</p>
					</div>

					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
						>
							<Input
								id="text-input"
								type="text"
								label="Text Input"
								placeholder="Enter some text..."
								bind:value={textValue}
								helperText="This is a basic text input"
							/>
						</div>

						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
						>
							<Input
								id="email-input"
								type="email"
								label="Email Input"
								placeholder="Enter your email..."
								bind:value={emailValue}
								leftIcon="mail"
								helperText="We'll never share your email"
							/>
						</div>

						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
						>
							<Input
								id="password-input"
								type="password"
								label="Password Input"
								placeholder="Enter your password..."
								bind:value={passwordValue}
								showPasswordToggle={true}
								helperText="Password should be at least 8 characters"
							/>
						</div>

						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
						>
							<Input
								id="number-input"
								type="number"
								label="Number Input"
								placeholder="Enter a number..."
								bind:value={numberValue}
								min={0}
								max={100}
								step={1}
							/>
						</div>
					</div>
				</section>

				<!-- Input States -->
				<section class="space-y-8">
					<div class="text-center xl:text-left">
						<h2 class="mb-2 text-2xl font-semibold text-white">Validation States</h2>
						<p class="text-neutral-400">Different states for visual user feedback</p>
					</div>

					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm"
						>
							<Input
								id="default-state"
								type="text"
								label="Default State"
								placeholder="Default input..."
								state="default"
								helperText="This is the default state"
							/>
						</div>

						<div class="rounded-xl border border-red-900/30 bg-red-950/20 p-6 backdrop-blur-sm">
							<Input
								id="error-state"
								type="text"
								label="Error State"
								placeholder="Invalid input..."
								bind:value={errorValue}
								state="error"
								errorMessage="This field is required"
							/>
						</div>

						<div class="rounded-xl border border-green-900/30 bg-green-950/20 p-6 backdrop-blur-sm">
							<Input
								id="success-state"
								type="text"
								label="Success State"
								placeholder="Valid input..."
								bind:value={successValue}
								state="success"
								successMessage="Input is valid!"
							/>
						</div>

						<div
							class="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6 opacity-60 backdrop-blur-sm"
						>
							<Input
								id="disabled-state"
								type="text"
								label="Disabled State"
								bind:value={disabledValue}
								disabled={true}
								helperText="This input is disabled"
							/>
						</div>
					</div>
				</section>

				<!-- Input Sizes -->
				<section class="space-y-8">
					<div class="text-center xl:text-left">
						<h2 class="mb-2 text-2xl font-semibold text-white">Available Sizes</h2>
						<p class="text-neutral-400">Different sizes to fit your design</p>
					</div>

					<div class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
						<div class="space-y-6">
							<Input
								id="size-xs"
								type="text"
								label="Extra Small (xs)"
								placeholder="Extra small input..."
								size="xs"
							/>

							<Input
								id="size-sm"
								type="text"
								label="Small (sm)"
								placeholder="Small input..."
								size="sm"
							/>

							<Input
								id="size-base"
								type="text"
								label="Base (default)"
								placeholder="Base size input..."
								size="base"
							/>

							<Input
								id="size-lg"
								type="text"
								label="Large (lg)"
								placeholder="Large input..."
								size="lg"
							/>

							<Input
								id="size-xl"
								type="text"
								label="Extra Large (xl)"
								placeholder="Extra large input..."
								size="xl"
							/>
						</div>
					</div>
				</section>

				<!-- Form Example -->
				<section class="space-y-8">
					<div class="text-center xl:text-left">
						<h2 class="mb-2 text-2xl font-semibold text-white">Complete Form</h2>
						<p class="text-neutral-400">Real-world form example with validation and states</p>
					</div>

					<div class="mx-auto max-w-2xl xl:mx-0">
						<div
							class="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 backdrop-blur-lg"
						>
							<div class="mb-6 text-center">
								<h3 class="text-xl font-semibold text-white">Create Account</h3>
								<p class="text-sm text-neutral-400">Join our platform</p>
							</div>

							<form class="space-y-6">
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<Input
										id="first-name"
										name="firstName"
										type="text"
										label="First Name"
										placeholder="John"
										required={true}
										leftIcon="user"
										autocomplete="given-name"
									/>

									<Input
										id="last-name"
										name="lastName"
										type="text"
										label="Last Name"
										placeholder="Doe"
										required={true}
										leftIcon="user"
										autocomplete="family-name"
									/>
								</div>

								<Input
									id="email-form"
									name="email"
									type="email"
									label="Email Address"
									placeholder="john.doe@example.com"
									required={true}
									leftIcon="mail"
									autocomplete="email"
								/>

								<Input
									id="password-form"
									name="password"
									type="password"
									label="Password"
									placeholder="Create a secure password"
									required={true}
									showPasswordToggle={true}
									minlength={8}
									autocomplete="new-password"
									helperText="Minimum 8 characters"
								/>

								<div class="pt-4">
									<Button
										text="Create Account"
										size="lg"
										class="w-full bg-gradient-to-r from-orange-500 to-red-600 py-3 text-white hover:from-orange-600 hover:to-red-700"
									/>
								</div>
							</form>
						</div>
					</div>
				</section>
			</div>

			<!-- Right Side: Live Preview (1/3 width) -->
			<div class="xl:col-span-1">
				<div class="sticky top-24">
					<div class="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
						<div class="mb-4">
							<h3 class="text-lg font-medium text-white">Live Preview</h3>
							<p class="text-sm text-neutral-400">Real-time captured values</p>
						</div>

						<div class="space-y-4">
							<!-- Interactive inputs preview -->
							<div class="rounded-lg bg-neutral-950/50 p-4">
								<h4 class="mb-3 text-sm font-medium text-neutral-300">Interactive Values</h4>
								<div class="space-y-2 text-xs">
									<div class="flex justify-between">
										<span class="text-neutral-400">Text:</span>
										<span class="max-w-32 truncate text-neutral-200">{textValue || 'empty'}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Email:</span>
										<span class="max-w-32 truncate text-neutral-200">{emailValue || 'empty'}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Password:</span>
										<span class="text-neutral-200"
											>{'*'.repeat(passwordValue.length) || 'empty'}</span
										>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Number:</span>
										<span class="text-neutral-200">{numberValue || 'empty'}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Error:</span>
										<span class="max-w-32 truncate text-neutral-200">{errorValue || 'empty'}</span>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Success:</span>
										<span class="max-w-32 truncate text-neutral-200">{successValue || 'empty'}</span
										>
									</div>
								</div>
							</div>

							<!-- JSON Output -->
							<div class="rounded-lg bg-neutral-950/50 p-4">
								<h4 class="mb-3 text-sm font-medium text-neutral-300">JSON Output</h4>
								<pre class="max-h-64 overflow-auto text-xs text-neutral-300">{JSON.stringify(
										{
											textValue,
											emailValue,
											passwordValue: passwordValue ? '*'.repeat(passwordValue.length) : '',
											numberValue,
											errorValue,
											successValue
										},
										null,
										2
									)}</pre>
							</div>

							<!-- Statistics -->
							<div class="rounded-lg bg-neutral-950/50 p-4">
								<h4 class="mb-3 text-sm font-medium text-neutral-300">Statistics</h4>
								<div class="space-y-2 text-xs">
									<div class="flex justify-between">
										<span class="text-neutral-400">Total Fields:</span>
										<span class="text-neutral-200">6</span>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Filled:</span>
										<span class="text-neutral-200"
											>{[
												textValue,
												emailValue,
												passwordValue,
												numberValue,
												errorValue,
												successValue
											].filter((v) => v).length}</span
										>
									</div>
									<div class="flex justify-between">
										<span class="text-neutral-400">Characters:</span>
										<span class="text-neutral-200"
											>{[
												textValue,
												emailValue,
												passwordValue,
												numberValue,
												errorValue,
												successValue
											].join('').length}</span
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Footer -->
<!-- Footer -->
<footer class="border-t border-neutral-800/30 bg-neutral-950">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
			<!-- Brand Section -->
			<div class="lg:col-span-1">
				<div class="mb-6">
					<div class="mb-4 text-2xl font-bold">
						<span class="text-neutral-100">@zandrd</span>
						<span class="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
							>/ui</span
						>
					</div>
					<p class="max-w-sm leading-relaxed text-neutral-400">
						Advanced component library built for Svelte 5 with TypeScript and modern design
						principles.
					</p>
				</div>

				<!-- Social Links -->
				<div class="flex space-x-4">
					<a
						href="https://github.com/zandrd"
						class="text-neutral-400 transition-colors hover:text-orange-400"
						aria-label="Visit our GitHub repository"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</a>
					<a
						href="https://twitter.com/zandrd"
						class="text-neutral-400 transition-colors hover:text-orange-400"
						aria-label="Follow us on Twitter"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
							/>
						</svg>
					</a>
					<a
						href="https://discord.gg/zandrd"
						class="text-neutral-400 transition-colors hover:text-orange-400"
						aria-label="Join our Discord community"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Components -->
			<div>
				<h3 class="mb-6 text-sm font-semibold tracking-wider text-white uppercase">Components</h3>
				<ul class="space-y-3">
					<li class="flex items-center gap-2">
						<span class="text-sm text-neutral-400">Frame</span>
						<Badge text="New" variant="new" size="sm" />
					</li>
					<li class="flex items-center gap-2">
						<span class="text-sm text-neutral-400">Window</span>
						<Badge text="New" variant="new" size="sm" />
					</li>
					<li class="flex items-center gap-2">
						<span class="text-sm text-neutral-400">Input</span>
						<Badge text="New" variant="new" size="sm" />
					</li>
					<li><span class="text-sm text-neutral-400">Button</span></li>
					<li><span class="text-sm text-neutral-400">Badge</span></li>
					<li class="flex items-center gap-2">
						<span class="text-sm text-neutral-500">Select</span>
						<Badge text="Soon" variant="soon" size="sm" />
					</li>
					<li class="flex items-center gap-2">
						<span class="text-sm text-neutral-500">Modal</span>
						<Badge text="Soon" variant="soon" size="sm" />
					</li>
				</ul>
			</div>

			<!-- Support & Project Stats -->
			<div>
				<h3 class="mb-6 text-sm font-semibold tracking-wider text-white uppercase">Support</h3>
				<ul class="space-y-3">
					<li>
						<a
							href="https://discord.gg/zandrd"
							class="text-sm text-neutral-400 transition-colors hover:text-white"
							>Discord Community</a
						>
					</li>
					<li>
						<a
							href="https://github.com/zandrd/ui/issues"
							class="text-sm text-neutral-400 transition-colors hover:text-white">GitHub Issues</a
						>
					</li>
				</ul>

				<!-- Project Stats -->
				<div class="mt-8 rounded-lg bg-neutral-800/30 p-4">
					<h4 class="mb-3 text-xs font-medium tracking-wider text-neutral-300 uppercase">
						Project Stats
					</h4>
					<div class="space-y-2">
						<div class="flex justify-between text-xs">
							<span class="text-neutral-400">Version</span>
							<span class="font-mono text-neutral-200">0.2.0</span>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-neutral-400">Components</span>
							<span class="font-mono text-neutral-200">5</span>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-neutral-400">Bundle Size</span>
							<span class="font-mono text-neutral-200">~25kb</span>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-neutral-400">Gzipped</span>
							<span class="font-mono text-neutral-200">~8kb</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="my-12 border-t border-neutral-800/50"></div>

		<!-- Bottom Section -->
		<div class="flex flex-col items-center justify-center space-y-2 text-center">
			<div class="flex items-center space-x-1 text-sm text-neutral-400">
				<span>© 2025</span>
				<span class="font-medium text-neutral-100">@zandrd</span>
				<span>All rights reserved.</span>
			</div>
			<div class="text-xs text-neutral-500">Built with ❤️ for the Svelte community</div>
		</div>
	</div>
</footer>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spin-reverse-slower {
		from {
			transform: rotate(360deg);
		}
		to {
			transform: rotate(0deg);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.4;
		}
	}

	.animate-spin-slow {
		animation: spin-slow 20s linear infinite;
	}

	.animate-spin-reverse-slower {
		animation: spin-reverse-slower 30s linear infinite;
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	.animate-pulse-glow {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	/* Custom radial gradient utility */
	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}

	/* 📱 Mobile optimizations */
	@media (max-width: 768px) {
		.animate-float {
			animation: float 4s ease-in-out infinite;
		}

		/* Reduce spinning animations on mobile */
		.animate-spin-slow {
			animation: spin-slow 30s linear infinite;
		}

		.animate-spin-reverse-slower {
			animation: spin-reverse-slower 40s linear infinite;
		}

		/* Reduce mouse movement effects on mobile */
		.pointer-events-none .absolute {
			transition-duration: 3s !important;
		}
	}

	/* Animaciones para el gráfico */
	@keyframes draw-line {
		from {
			stroke-dasharray: 1000;
			stroke-dashoffset: 1000;
		}
		to {
			stroke-dasharray: 1000;
			stroke-dashoffset: 0;
		}
	}

	@keyframes draw-line-delay {
		0%,
		25% {
			stroke-dasharray: 1000;
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dasharray: 1000;
			stroke-dashoffset: 0;
		}
	}

	:global(.animate-draw-line) {
		animation: draw-line 2s ease-in-out;
	}

	:global(.animate-draw-line-delay) {
		animation: draw-line-delay 2.5s ease-in-out;
	}

	/* Efectos hover suaves */
	:global(.group:hover) {
		transform: translateY(-1px);
	}

	/* Optimizaciones para móvil */
	@media (max-width: 768px) {
		:global(.animate-draw-line),
		:global(.animate-draw-line-delay) {
			animation: none;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		:global(.animate-draw-line),
		:global(.animate-draw-line-delay) {
			animation: none;
		}

		:global(.group),
		:global(.transition-colors),
		:global(.transition-all) {
			transition: none !important;
		}
	}
</style>
