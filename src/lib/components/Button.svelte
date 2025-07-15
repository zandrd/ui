<script lang="ts">
	let { text, variant = 'default' }: { text: string; variant: 'default' | 'outline' } = $props();
</script>

<button
	class={`rounded px-4 py-2 ${variant === 'outline' ? 'border border-neutral-900' : 'bg-neutral-900 text-white'}`}
>
	{text}
</button>
