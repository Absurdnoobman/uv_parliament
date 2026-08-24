<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
    import { cn } from "@/lib/utils";

    export interface NewsCardProps extends HTMLAttributes<HTMLElement> {
        /** Card headline / title */
        title?: string;
        /** Short summary or excerpt */
        description?: string;
        /** Publication date as a string or Date object */
        date?: string | Date;
        /** Optional ISO datetime string for the <time datetime="..."> attribute */
        dateTime?: string;
        /** Image source URL */
        image?: string;
        /** Image alt text */
        imageAlt?: string;
        /** Optional category / badge label above the title */
        category?: string;
        /** Target URL for the card link */
        href?: string;
        /** Target attribute for link (e.g., '_blank') */
        target?: HTMLAnchorAttributes["target"];
        /** Rel attribute for link */
        rel?: HTMLAnchorAttributes["rel"];
        /** Whether to display the chevron arrow next to the title (default: true) */
        showArrow?: boolean;
        /** Custom aspect ratio class for the image container (default: 'aspect-[16/10]') */
        imageAspect?: string;
        /** Additional CSS class for the root article */
        class?: string;

        /** Custom snippet to replace or augment the image/media area */
        media?: Snippet;
        /** Custom snippet to replace the title area */
        titleSnippet?: Snippet;
        /** Custom snippet to replace the description area or render custom body content */
        children?: Snippet;
        /** Custom snippet to replace the footer/date area */
        footer?: Snippet;
    }

    let {
        title,
        description,
        date,
        dateTime,
        image,
        imageAlt,
        category,
        href,
        target,
        rel,
        showArrow = true,
        imageAspect = "aspect-[16/10]",
        class: className = "",
        media,
        titleSnippet,
        children,
        footer,
        ...restProps
    }: NewsCardProps = $props();

    // Helper to format Date objects if provided
    let formattedDate = $derived.by(() => {
        if (!date) {
            return null ;
        }

        if (date instanceof Date) {
            return date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }

        return date;
    });

    let computedDateTime = $derived.by(() => {
        if (dateTime) {
            return dateTime
        }

        if (date instanceof Date) {
            return date.toISOString().split("T")[0];
        }
        
        return undefined;
    });
</script>

<article
    class={cn(
        "group relative flex flex-col justify-between bg-white border border-slate-200 shadow-sm p-4 sm:p-5 transition-all duration-200 hover:shadow-md",
        href && "hover:border-slate-300",
        className
    )}
    {...restProps}
>
    <div class="flex-1">
        <!-- Media / Image Area -->
        {#if media}
            <div class="mb-4">
                {@render media()}
            </div>
        {:else if image}
            <div class={cn("w-full overflow-hidden bg-slate-100 mb-4", imageAspect)}>
                <img
                    src={image}
                    alt={imageAlt ?? title ?? "News thumbnail"}
                    class="h-full w-full object-cover transition-transform duration-300"
                    loading="lazy"
                />
            </div>
        {/if}

        <!-- Category / Tag -->
        {#if category}
            <div class="mb-2">
                <span class="inline-block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {category}
                </span>
            </div>
        {/if}

        <!-- Title & Chevron -->
        {#if titleSnippet}
            {@render titleSnippet()}
        {:else if title}
            <div class="flex items-start justify-between gap-3">
                <h3 class="text-xl font-bold leading-snug text-[#242e56] group-hover:text-blue-900 transition-colors">
                    {#if href}
                        <a
                            {href}
                            {target}
                            rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
                            class="focus:outline-none"
                        >
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            {title}
                        </a>
                    {:else}
                        {title}
                    {/if}
                </h3>

                {#if showArrow}
                    <span
                        class="shrink-0 text-slate-400 pt-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-600"
                        aria-hidden="true"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </span>
                {/if}
            </div>
        {/if}

        <!-- Main Body / Description -->
        {#if children}
            <div class="mt-3">
                {@render children()}
            </div>
        {:else if description}
            <p class="mt-3 text-[15px] leading-relaxed text-slate-700 font-normal line-clamp-4">
                {description}
            </p>
        {/if}
    </div>

    <!-- Footer / Date Section -->
    {#if footer}
        <div class="mt-5 border-t border-slate-200/80 pt-3">
            {@render footer()}
        </div>
    {:else if formattedDate}
        <div class="mt-5 border-t border-slate-200/80 pt-3">
            <time datetime={computedDateTime} class="text-sm text-slate-500 font-normal">
                {formattedDate}
            </time>
        </div>
    {/if}
</article>

