<svelte:options runes />

<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import ExamplesNav from "$lib/components/examples-nav.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageNav from "$lib/components/page-nav.svelte";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import CardsDemo from "$lib/components/cards/demo.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import { siteConfig } from "$lib/config.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";

	const title = siteConfig.name;
	const description = siteConfig.description;

	const mobile = new IsMobile();
</script>

<Metadata {title} {description} />

<div class="flex flex-1 flex-col">
	<PageHeader>
		<PageHeaderHeading>{title}</PageHeaderHeading>
		<PageHeaderDescription>{description}</PageHeaderDescription>
		<PageActions>
			<Button href="/docs/installation" size="sm">Get Started</Button>
			<Button href="/docs/components" size="sm" variant="ghost">Components</Button>
		</PageActions>
	</PageHeader>
	{#if !mobile.current}
		<PageNav class="hidden md:flex">
			<ExamplesNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
			<ThemeSelector class="me-4 hidden md:flex" />
		</PageNav>
	{/if}
	<div class="container-wrapper section-soft flex-1 pb-6">
		<div class="container overflow-hidden py-12">
			<section
				class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
			>
				<span class="text-muted-foreground text-center text-lg">
					This is a shell for your documentation site. Update the content in <code
						>docs/content</code
					>.
				</span>
			</section>
		</div>
	</div>
</div>
