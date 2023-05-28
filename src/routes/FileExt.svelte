<script>
	import { qrcodeConfig } from "$lib/store/qrcodeStore";

	let fileExtension = 'image/png';

	const updateSettings = () => {
		qrcodeConfig.update(s => {
			return {
				...s,
				settings: {
                    ...s.settings,
                    type: fileExtension
                }
			}
		});
	}
</script>

<select
	class="select w-2/5 !border !border-surface-500 !text-surface-300 !bg-surface-400/10"
	bind:value={fileExtension}
	on:change={updateSettings}
>
	<option value="image/png">.png</option>
	<option value="image/jpeg">.jpeg</option>
	<option value="image/webp">.webp</option>
</select>
