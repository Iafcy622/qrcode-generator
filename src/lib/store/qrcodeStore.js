import { writable } from "svelte/store";

export const qrcodeConfig = writable({
    data: 'https://example.com',
    settings: {
		type: 'image/png',
		margin: 2,
		width: 240,
		color: {
			dark: '#000000',
			light: '#ffffff'
		}
	}
});