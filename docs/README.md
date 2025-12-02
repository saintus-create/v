# shadcn-svelte docs

## Setup Instructions

This is a documentation site built with SvelteKit. Before running the site, you need to build the content.

### Development

1. Install dependencies:
```bash
pnpm install
```

2. Build the content (required before first run):
```bash
pnpm build:content
```

3. Start the development server:
```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

This will:
1. Build content with Velite
2. Generate LLM placeholders
3. Build the SvelteKit app
4. Generate LLM files

### Common Issues

**Error: Cannot find module '$content/index.js'**
- Solution: Run `pnpm build:content` to generate the content index

**Missing components in navigation**
- Solution: Make sure content is built and check `docs/content/` folder

### Project Structure

- `content/` - Markdown documentation files
- `src/routes/` - SvelteKit pages
- `src/lib/` - Shared components and utilities
- `src/lib/registry/` - UI component registry
