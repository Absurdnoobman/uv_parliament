<script module>
    export { default as layout } from "@/layouts/Layout.svelte";
</script>

<script lang="ts">
    import DefaultNewsCard from "@/components/News/DefaultNewsCard.svelte";
    import SmallNewsCard from "@/components/News/SmallNewsCard.svelte";

    // 3 Latest news articles (can later be received via Inertia page props)
    const latestNews = [
        {
            id: 1,
            title: "Transport Committee Chair welcomes free bus travel for disabled people",
            description:
                "The Chair of the Transport Committee has welcomed Government plans to enable disabled people across England to travel by bus for free at any time of day.",
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Interior of a city bus",
            date: new Date("2026-08-18"),
            href: "#",
        },
        {
            id: 2,
            title: "Parliament debate scheduled on sustainable urban energy policy",
            description:
                "MPs will gather this Thursday to review recent proposals accelerating clean energy infrastructure across local communities.",
            image: "/assets/westminster.jpg",
            imageAlt: "Palace of Westminster",
            date: new Date("2026-08-15"),
            href: "#",
        },
        {
            id: 3,
            title: "Public consultation opens on regional infrastructure investment",
            description:
                "Citizens and local businesses are invited to submit feedback on upcoming transportation and digital connectivity projects.",
            image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Government building architecture",
            date: new Date("2026-08-10"),
            href: "#",
        },
    ];
</script>

<div class="bg-linear-to-r from-yellow-400 to-yellow-200 bg-local bg-auto">
    <div class="py-10 sm:py-14 px-6 sm:px-10 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
        Welcome to UV Parliament official website.
    </div>
</div>

<section class="px-4 sm:px-8 lg:px-10 mx-auto py-8 sm:py-10 max-w-7xl">
    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <h2 class="text-xl sm:text-2xl font-bold text-slate-900">Latest News</h2>
            <a href="/news" class="text-sm font-semibold text-blue-900 hover:underline">
                View all news &rarr;
            </a>
        </div>

        <!-- Desktop & Tablet -->
        <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each latestNews as item (item.id)}
                <DefaultNewsCard
                    image={item.image}
                    imageAlt={item.imageAlt}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    href={item.href}
                />
            {/each}
        </div>

        <!-- Mobile -->
        <div class="flex flex-col gap-4 md:hidden">
            {#if latestNews.length > 0}
                <!-- Primary Lead Story -->
                <DefaultNewsCard
                    image={latestNews[0].image}
                    imageAlt={latestNews[0].imageAlt}
                    title={latestNews[0].title}
                    description={latestNews[0].description}
                    date={latestNews[0].date}
                    href={latestNews[0].href}
                />

                <!-- Secondary Stories as SmallNewsCards -->
                <div class="flex flex-col gap-3">
                    {#each latestNews.slice(1) as item (item.id)}
                        <SmallNewsCard
                            image={item.image}
                            imageAlt={item.imageAlt}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            href={item.href}
                        />
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
