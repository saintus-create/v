import type { Component } from "svelte";

// Try to import content, but handle if it doesn't exist
let components: any[] = [];
let installation: any[] = [];
let migration: any[] = [];

try {
	const content = await import("$content/index.js");
	components = content.components || [];
	installation = content.installation || [];
	migration = content.migration || [];
} catch (e) {
	console.warn("Content not loaded yet. Run 'pnpm build:content' first.");
}

/** List new components here to highlight them in the sidebar */
export const NEW_COMPONENTS = new Set([]);

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	icon?: Component;
	indicator?: "new";
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

function generateGetStartedNav(): SidebarNavItem[] {
	return [
		{
			title: "Introduction",
			href: "/docs",
			items: [],
		},
		{
			title: "Installation",
			href: "/docs/installation",
			items: [],
		},
	];
}

function generateInstallationNav(): SidebarNavItem[] {
	const installationNavItems: SidebarNavItem[] = [];

	// Add generic installation docs if available
	for (const doc of installation) {
		installationNavItems.push({
			title: doc.title,
			href: `/docs/installation/${doc.slug}`,
			items: [],
		});
	}

	return installationNavItems;
}

function generateComponentsNav(): SidebarNavItem[] {
	const componentsNavItems: SidebarNavItem[] = [];

	for (const doc of components) {
		if (doc.title === "Components") continue;
		componentsNavItems.push({
			title: doc.title,
			indicator: NEW_COMPONENTS.has(doc.slug) ? "new" : undefined,
			href: `/docs/components/${doc.slug}`,
			items: [],
		});
	}

	return componentsNavItems;
}

const getStartedNav = generateGetStartedNav();
const componentsNav = generateComponentsNav();
const installationNav = generateInstallationNav();

export const sidebarNavItems: SidebarNavItem[] = [
	{
		title: "Get Started",
		items: getStartedNav,
	},
	{
		title: "Components",
		items: componentsNav,
	},
	{
		title: "Installation",
		items: installationNav,
	},
];

export const mainNavItems: NavItem[] = [
	{
		title: "Docs",
		href: "/docs",
	},
	{
		title: "Components",
		href: "/docs/components",
	},
];

export function getFullNavItems(): Array<SidebarNavItem & { index: number }> {
	return [
		...getStartedNav,
		...componentsNav,
		...installationNav,
	].map((item, index) => ({
		...item,
		index,
	}));
}

const fullNavItems = getFullNavItems();

export function findNeighbors(pathName: string): {
	previous: SidebarNavItem | null;
	next: SidebarNavItem | null;
} {
	const path = pathName.split("?")[0].split("#")[0];
	const index = fullNavItems.findIndex((item) => item.href === path);

	let previous: SidebarNavItem | null = null;
	for (let i = index - 1; i >= 0; i--) {
		previous = fullNavItems[i];
		break;
	}

	let next: SidebarNavItem | null = null;
	for (let i = index + 1; i < fullNavItems.length; i++) {
		next = fullNavItems[i];
		break;
	}

	return { previous, next };
}
