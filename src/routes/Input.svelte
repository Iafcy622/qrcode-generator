<script>
    import QRCode from 'qrcode';

	let urlInput = '';

	const isValidUrl = (str) => {
		try {
			new URL(str);
			return true;
		} catch (err) {
			return false;
		}
	};

	const submitInput = () => {
		if(isValidUrl(urlInput)) {
			console.log('Generate QRCODE');
		}
	};
</script>

<div class="card p-4 h-5/6 w-3/5 mr-6 !bg-surface-700">
    <header class="card-header font-semibold text-3xl mb-4">QR Code Generator</header>
    <section class="p-4">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">Enter the URL:</div>
            <input
                class="input"
                type="url"
                multiple="true"
                placeholder="https://example.com"
                bind:value={urlInput}
            />
            <button class="bg-primary-700" on:click={submitInput}>Generate</button>
        </div>
        {#if !isValidUrl(urlInput) && urlInput !== ''}
            <span class="text-error-500 text-md">Please enter a valid URL.</span>
        {/if}
    </section>
</div>