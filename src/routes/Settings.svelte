<script>
	import { Accordion, AccordionItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { qrcodeConfig } from "$lib/store/qrcodeStore";

	let warning = {
		haveWarning: false,
		message: ''
	};
	let settings = {
		margin: 2,
		width: 240,
		color: {
			dark: '#000000',
			light: '#ffffff'
		}
	};

	const validateColor = () => {
		let lightColorCodes = [
			settings.color.light[1] + settings.color.light[2],
			settings.color.light[3] + settings.color.light[4],
			settings.color.light[5] + settings.color.light[6]
		];
		let darkColorCodes = [
			settings.color.dark[1] + settings.color.dark[2],
			settings.color.dark[3] + settings.color.dark[4],
			settings.color.dark[5] + settings.color.dark[6]
		];

		let dr =
			(255 - Math.abs(parseInt(lightColorCodes[0], 16) - parseInt(darkColorCodes[0], 16))) / 255;
		let dg =
			(255 - Math.abs(parseInt(lightColorCodes[0], 16) - parseInt(darkColorCodes[0], 16))) / 255;
		let db =
			(255 - Math.abs(parseInt(lightColorCodes[0], 16) - parseInt(darkColorCodes[0], 16))) / 255;
		let delta = (dr + dg + db) / 3;

		if (
			lightColorCodes[0] < darkColorCodes[0] &&
			lightColorCodes[1] < darkColorCodes[1] &&
			lightColorCodes[2] < darkColorCodes[2]
		) {
			warning.haveWarning = true;
			warning.message =
				'It is recommended for the background color to be darker than the main color.';
		} else if (delta >= 0.8) {
			warning.haveWarning = true;
			warning.message = 'It is recommended to choose colors with higher contrast.';
		} else {
			warning.haveWarning = false;
			warning.message = '';
		}
	};

	const updateSettings = () => {
		validateColor();
		qrcodeConfig.update(s => {
			return {
				...s,
				settings: {
                    ...s.settings,
                    ...settings
                }
			}
		});
	}
</script>

<Accordion
	autocollapse={true}
	regionPanel="border border-surface-500"
	regionControl="border border-surface-500"
	spacing="space-y-4"
>
	<AccordionItem open>
		<svelte:fragment slot="lead">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
				/>
			</svg>
		</svelte:fragment>
		<svelte:fragment slot="summary">Colors:</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="color-pickers">
				<div class="flex">
					<div class="flex items-center">
						<label for="dark-color">Color:</label>
						<input
							class="input !rounded-full ml-3 color-input"
							type="color"
							bind:value={settings.color.dark}
							id="dark-color"
							on:change={updateSettings}
						/>
					</div>
					<div class="flex items-center mx-4">
						<label for="light-color">Background color:</label>
						<input
							class="input !rounded-full ml-3 color-input"
							type="color"
							id="light-color"
							on:change={updateSettings}
                            bind:value={settings.color.light}
						/>
					</div>
				</div>
				{#if warning.haveWarning}
					<p class="text-sm text-error-500">{warning.message}</p>
				{/if}
			</div>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
				/>
			</svg>
		</svelte:fragment>
		<svelte:fragment slot="summary">Resolution</svelte:fragment>
		<svelte:fragment slot="content">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim">Width</div>
				<input
					class="input"
					title="width"
					type="number"
					id="width-input"
					bind:value={settings.width}
				/>
				<div class="input-group-shim">px</div>
			</div>
		</svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
				/>
			</svg>
		</svelte:fragment>
		<svelte:fragment slot="summary">Margin</svelte:fragment>
		<svelte:fragment slot="content">
			<RangeSlider
				name="range-slider"
				bind:value={settings.margin}
				min={1}
				max={3}
				step={1}
				ticked
				label="margin"
				on:change={updateSettings}
			>
				<div class="flex justify-end items-center">
					<div class="text-xs">{['Small', 'Medium', 'Large'][settings.margin - 1]}</div>
				</div>
			</RangeSlider>
		</svelte:fragment>
	</AccordionItem>
</Accordion>

<style>
	.color-input {
		border: 2px solid rgb(217, 215, 214);
	}
</style>