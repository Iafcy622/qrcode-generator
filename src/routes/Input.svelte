<script>
    import { qrcodeConfig } from "$lib/store/qrcodeStore";

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
			qrcodeConfig.update(settings => {
                return {
                    ...settings,
                    data: urlInput
                }
            });
		}
	};
</script>

<div class="card p-4 h-5/6 w-3/5 mr-6 !bg-surface-700">
    <header class="card-header font-semibold text-3xl mb-4">QR Code Generator</header>
    <section class="p-4">
        <form class="input-group input-group-divider grid-cols-[auto_1fr_auto]" on:submit|preventDefault={submitInput}>
            <div class="input-group-shim">Enter the URL:</div>
            <input
                class="input"
                type="url"
                multiple="true"
                placeholder="https://example.com"
                bind:value={urlInput}
            />
            <button class="bg-primary-700" disabled={!isValidUrl(urlInput)} type="submit">Generate</button>
        </form>
        {#if !isValidUrl(urlInput) && urlInput !== ''}
            <span class="text-error-500 text-md">Please enter a valid URL.</span>
        {/if}
    </section>
</div>