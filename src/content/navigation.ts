/**
 * Site navigation (V2): Services, Who We Help, How It Works, Resources,
 * with Request a Demo and Client Login as separate actions. Only built routes
 * are linked; the conditional OpenDental page is held until approved.
 */
import { BUILT_ROUTES } from "./site";
import { JOURNEY } from "./site/services";

export type NavLink = { label: string; href: string; note?: string };
type NavColumn = { label: string; links: NavLink[] };
export type NavGroup = {
  label: string;
  href?: string;
  intro?: { title: string; body: string; overview?: string };
  columns: NavColumn[];
};

/** Existing product login — never rebuilt or redirected by the marketing site. */
export const LOGIN_URL = "https://beta-convergflow.supermia.ai/login";
export const LOGIN_LABEL = "Client Login";

export const DEMO_LINK: NavLink = { label: "Request a Demo", href: "/demo/" };

const normalize = (href: string) => {
  const [path] = href.split("#");
  if (!path) return href;
  return path.endsWith("/") ? path : `${path}/`;
};

/** True for hashes, external URLs and internal routes this build serves. */
function isLive(href: string) {
  if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) return true;
  return BUILT_ROUTES.has(normalize(href));
}

/** The href to render, or null when the destination is not published yet. */
export function liveHref(href: string): string | null {
  return isLive(href) ? href : null;
}

const live = (links: NavLink[]) => links.filter((l) => isLive(l.href));

export const MAIN_NAV: NavGroup[] = [
  {
    label: "Services",
    href: "/services/",
    intro: {
      title: "Managed RCM, from coverage to account closure.",
      body: "Eight stages, one accountable team. Choose the stages in your agreed scope.",
      overview: "All services",
    },
    columns: JOURNEY.map((g) => ({ label: g.title, links: live(g.stages.map((s) => ({ label: s.label, href: s.href, note: s.body }))) })),
  },
  {
    label: "Who We Help",
    intro: { title: "Built for the practices that do the care.", body: "Dental practices, DSOs and groups, and medical practices, each with its own scope." },
    columns: [
      {
        label: "Practices",
        links: live([
          { label: "Dental practices", href: "/industries/dental/", note: "Dental billing, fully managed, from the chair to a closed account." },
          { label: "DSOs & groups", href: "/industries/dso/", note: "Location and central responsibilities agreed up front." },
          { label: "Medical practices", href: "/industries/medical/", note: "From verified coverage to a reconciled account." },
        ]),
      },
    ],
  },
  {
    label: "How It Works",
    href: "/how-it-works/",
    intro: { title: "An operating model you can see.", body: "Scope, owners and reporting agreed before we start.", overview: "How it works" },
    columns: [
      {
        label: "Delivery",
        links: live([
          { label: "Service delivery", href: "/how-it-works/", note: "Onboarding, day-to-day work, exceptions and reporting." },
          { label: "Technology", href: "/technology/", note: "Workflow technology supporting the specialists, starting with OpenDental." },
          { label: "OpenDental", href: "/technology/opendental/", note: "Supported connection, data and setup." },
          { label: "Security & data handling", href: "/technology/security/", note: "Access, credentials, evidence and documentation." },
        ]),
      },
    ],
  },
  { label: "Resources", href: "/resources/", columns: [] },
];

export const COMPANY_LINKS: NavLink[] = live([
  { label: "About", href: "/about/" },
  { label: "Why ConvergeFlow", href: "/why-convergeflow/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Contact", href: "/contact/" },
  { label: "Resources", href: "/resources/" },
]);

export const SERVICE_LINKS: NavLink[] = live([{ label: "All services", href: "/services/" }, ...JOURNEY.flatMap((g) => g.stages.map((s) => ({ label: s.label, href: s.href })))]);

export const AUDIENCE_LINKS: NavLink[] = MAIN_NAV[1].columns[0].links;

export const DELIVERY_LINKS: NavLink[] = MAIN_NAV[2].columns[0].links;

/** The menu group (other than Services) whose menu lists this route: Who We Help or How It Works. */
export function navGroupFor(route: string): NavGroup | null {
  return MAIN_NAV.find((g) => g.label !== "Services" && g.columns.some((c) => c.links.some((l) => l.href === route))) ?? null;
}
