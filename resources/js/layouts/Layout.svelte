<script lang="ts">
    import type { Snippet } from "svelte";
    import AppHead from "@/components/AppHead.svelte";

    let { children }: {children: Snippet | null | undefined } = $props()
</script>

<AppHead>
    <!-- <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> -->
</AppHead>

<div>
    <div class="flex flex-row gap-1 py-4 px-6 shadow-sm">
        <img src="/assets/coat_of_arm_no_bg.webp" alt="UV Coat of Arm" class=" aspect-square w-14 mr-4" />
        <div class="content-center"><div class="text-2xl font-bold">UV Parliament</div></div>
    </div>
    <div>
        {@render children?.()}
    </div>
    <footer class="bg-black text-white px-10">
        Footer
    </footer>
</div>