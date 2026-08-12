/**
 * Resolves a /public asset against Vite's configured base so the site also works
 * when served from a subpath, e.g. a GitHub Pages project site.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
