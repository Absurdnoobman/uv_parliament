import { createInertiaApp } from '@inertiajs/svelte';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        delay: 1500,
        color: '#4B5563',
    },
});
