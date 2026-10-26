import { AUDIENCE_PAGES } from "./audiences";
import { COMPANY_PAGES } from "./company";
import { SERVICE_PAGES } from "./services";
import type { SitePage } from "./types";

export const SITE_PAGES: SitePage[] = [...SERVICE_PAGES, ...AUDIENCE_PAGES, ...COMPANY_PAGES];

export const BUILT_ROUTES = new Set<string>(["/", ...SITE_PAGES.map((p) => p.route)]);

export function getSitePage(route: string): SitePage | undefined {
  return SITE_PAGES.find((p) => p.route === route);
}

export const routeFromSlug = (slug: string[]) => `/${slug.join("/")}/`;
