<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
    import { cn } from "@/lib/utils";

    export interface SmallNewsCardProps extends HTMLAttributes<HTMLElement> {
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
        /** Whether to display the chevron arrow next to the title (default: false for compact card) */
        showArrow?: boolean;
        /** Image sizing/aspect ratio class (default: 'w-24 sm:w-28 aspect-[4/3]') */
        imageSize?: string;
        /** Additional CSS class for the root article */
        class?: string;

        /** Custom snippet for the media/thumbnail area */
        media?: Snippet;
        /** Custom snippet for the title area */
        titleSnippet?: Snippet;
        /** Custom snippet for the description or custom body content */
        children?: Snippet;
        /** Custom snippet for the footer/date area */
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
        showArrow = false,
        imageSize = "w-24 sm:w-28 aspect-[4/3]",
        class: className = "",
        media,
        titleSnippet,
        children,
        footer,
        ...restProps
    }: SmallNewsCardProps = $props();

    // Helper to format Date objects
    let formattedDate = $derived.by(() => {
        if (!date) {
            return null;
        }       
        
        if (date instanceof Date) {
            return date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        }

        return date;
    });

    let computedDateTime = $derived.by(() => {
        if (dateTime) {
            return dateTime;
        }

        if (date instanceof Date) {
            return date.toISOString().split("T")[0];
        }
        
        return undefined;
    });
</script>

<article
    class={cn(
        "group relative flex items-start gap-3 sm:gap-4 bg-white border border-slate-200 shadow-xs p-3 transition-all duration-200 hover:shadow-md",
        href && "hover:border-slate-300 cursor-pointer",
        className
    )}
    {...restProps}
>
    <!-- Media / Thumbnail Area -->
    {#if media}
        <div class="shrink-0">
            {@render media()}
        </div>
    {:else if image}
        <div class={cn("shrink-0 overflow-hidden bg-slate-100", imageSize)}>
            <img
                src={image}
                alt={imageAlt ?? title ?? "News thumbnail"}
                class="h-full w-full object-cover transition-transform duration-300"
                loading="lazy"
            />
        </div>
    {/if}

    <!-- Content Area -->
    <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div>
            <!-- Category / Tag -->
            {#if category}
                <div class="mb-1">
                    <span class="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {category}
                    </span>
                </div>
            {/if}

            <!-- Title -->
            {#if titleSnippet}
                {@render titleSnippet()}
            {:else if title}
                <div class="flex items-start justify-between gap-2">
                    <h4 class="text-sm sm:text-base font-bold leading-snug text-[#242e56] line-clamp-2 group-hover:text-blue-900 transition-colors">
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
                    </h4>

                    {#if showArrow}
                        <span
                            class="shrink-0 text-slate-400 pt-0.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slate-600"
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
                                class="h-4 w-4"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </span>
                    {/if}
                </div>
            {/if}

            <!-- Description -->
            {#if children}
                <div class="mt-1">
                    {@render children()}
                </div>
            {:else if description}
                <p class="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {description}
                </p>
            {/if}
        </div>

        <!-- Footer / Date -->
        {#if footer}
            <div class="mt-2 pt-1">
                {@render footer()}
            </div>
        {:else if formattedDate}
            <div class="mt-2 pt-1">
                <time datetime={computedDateTime} class="text-[12px] text-slate-400 font-normal">
                    {formattedDate}
                </time>
            </div>
        {/if}
    </div>
</article>

