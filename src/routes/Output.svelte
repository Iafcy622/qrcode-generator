<script>
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	let imgUrl = '';
	let lightColor = '#ffffff';
	let darkColor = '#000000';
	let warning = {
		haveWarning: false,
		message: ''
	};

	const validateColor = () => {
		let lightColorCodes = [
			lightColor[1] + lightColor[2],
			lightColor[3] + lightColor[4],
			lightColor[5] + lightColor[6]
		];
		let darkColorCodes = [
			darkColor[1] + darkColor[2],
			darkColor[3] + darkColor[4],
			darkColor[5] + darkColor[6]
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

	const generateQrcode = () => {
		validateColor();
		QRCode.toDataURL(
			'https://example.com',
			{
				width: 320,
				margin: 2,
				color: {
					dark: darkColor,
					light: lightColor
				}
			},
			function (err, url) {
				if (!err) {
					imgUrl = url;
				}
			}
		);
	};

	onMount(generateQrcode());
</script>

<div class="card p-4 h-3/4 w-2/5">
	<header class="card-header font-semibold text-3xl mb-4">Output</header>
	<section class="p-4">
		<div class="output-img mb-4">
			{#if imgUrl}
				<img src={imgUrl} alt="qrcode" />
			{/if}
		</div>
		<div class="color-pickers">
			<div class="flex">
				<div class="flex items-center">
					<label for="dark-color">Color:</label>
					<input
						class="input !rounded-full ml-3 color-input"
						type="color"
						bind:value={darkColor}
						id="dark-color"
						on:change={generateQrcode}
					/>
				</div>
				<div class="flex items-center mx-4">
					<label for="light-color">Background color:</label>
					<input
						class="input !rounded-full ml-3 color-input"
						type="color"
						bind:value={lightColor}
						id="light-color"
						on:change={generateQrcode}
					/>
				</div>
			</div>
			{#if warning.haveWarning}
				<p class="text-sm text-error-500">{warning.message}</p>
			{/if}
		</div>
	</section>
	<footer class="card-footer">
		<a href={imgUrl} class="btn variant-filled" download="qrcode">
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
					d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>
			<span>Download</span>
		</a>
	</footer>
</div>

<style>
	.color-input {
		border: 2px solid rgb(217, 215, 214);
	}
</style>
