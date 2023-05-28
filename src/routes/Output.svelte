<script>
	import QRCode from 'qrcode';
	import { qrcodeConfig } from "$lib/store/qrcodeStore";
	import Settings from './Settings.svelte';
	import FileExt from './FileExt.svelte';

	let imgUrl = '';
	$: if($qrcodeConfig) {generateQrcode()}

	const generateQrcode = () => {
		QRCode.toDataURL($qrcodeConfig.data, $qrcodeConfig.settings, function (err, url) {
			if (!err) {
				imgUrl = url;
			}
		});
	};
</script>

<div class="card p-4 h-5/6 w-2/5 !bg-surface-700 relative">
	<section class="p-4">
		<div class="output-img mb-6">
			{#if imgUrl}
				<img src={imgUrl} alt="qrcode" class="mx-auto w-52" />
			{/if}
		</div>
		<Settings />
	</section>
	<footer class="card-footer absolute bottom-0 left-0 right-0 mb-4 w-full px-8 flex items-center">
		<a href={imgUrl} class="btn bg-primary-700 w-full !rounded-r-none" download="qrcode">
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
		<FileExt />
	</footer>
</div>