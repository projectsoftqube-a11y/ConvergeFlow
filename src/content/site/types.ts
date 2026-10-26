/**
 * Content model for the V2 site (managed RCM offer).
 *
 * Copy is written from the V2 page outlines and the two ConvergeFlow
 * brochures (RCM brochure, Dental billing brochure). Body strings support
 * **bold** and [label](/route/) links; headings take a plain `title` and an
 * optional `accent` that renders in the italic serif.
 */

export type IconName =
  | "user"
  | "users"
  | "id"
  | "shield"
  | "calendar"
  | "copy"
  | "building"
  | "file"
  | "fileCheck"
  | "tooth"
  | "clip"
  | "send"
  | "inbox"
  | "refresh"
  | "alert"
  | "scale"
  | "coins"
  | "chart"
  | "clock"
  | "lock"
  | "key"
  | "eye"
  | "link"
  | "layers"
  | "chat"
  | "phone"
  | "mail"
  | "download"
  | "book"
  | "check"
  | "flag"
  | "steth"
  | "clipboard"
  | "search"
  | "route"
  | "stamp";

type Action = { label: string; href: string };

type Item = { title: string; body: string; icon?: IconName };

type Heading = {
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
};

/** A stylised paper document used in heroes and stories (always illustrative). */
export type DocSpec = {
  kind: "registration" | "insurance" | "auth" | "claim" | "transmission" | "remittance" | "denial" | "aging";
  title: string;
  ref: string;
  rows: [string, string][];
  stamp: string;
  note?: string;
};

export type Photo = { src: string; alt: string; caption?: string };

type HeroVisual =
  | { kind: "document"; doc: DocSpec }
  | { kind: "photo"; photo: Photo; note?: string; chips?: string[] }
  | { kind: "form" }
  | { kind: "contact" }
  | { kind: "none" };

export type Hero = {
  eyebrow: string;
  title: string;
  accent?: string;
  lead: string;
  actions: Action[];
  visual: HeroVisual;
  /** Short facts shown under the actions. */
  facts?: string[];
};

export type JourneyGroup = { title: string; summary: string; stages: { label: string; href: string; body: string }[] };

export type Section =
  | ({ kind: "cards"; items: Item[]; cols?: 2 | 3 | 4; tone?: "light" | "dark" } & Heading)
  | ({ kind: "steps"; items: Item[]; tone?: "light" | "dark" } & Heading)
  | ({ kind: "split"; practice: { title: string; items: string[] }; team: { title: string; items: string[] }; note?: string } & Heading)
  | ({ kind: "chips"; chips: string[]; body?: string; note?: string } & Heading)
  | ({ kind: "feature"; body: string[]; points?: string[]; photo?: Photo; note?: string; reverse?: boolean; link?: Action } & Heading)
  | { kind: "statement"; id?: string; text: string; accent?: string; sub?: string }
  | ({ kind: "table"; head: string[]; rows: string[][]; note?: string } & Heading)
  | ({ kind: "cadence"; items: Item[]; note?: string } & Heading)
  | ({ kind: "balance"; note?: string } & Heading)
  | ({ kind: "anatomy"; body?: string } & Heading)
  | ({ kind: "evidence"; items: Item[]; body?: string } & Heading)
  | ({ kind: "journey"; groups: JourneyGroup[] } & Heading)
  | ({ kind: "stages"; items: (Item & { href?: string })[]; note?: string; layout?: "cycle" | "flow" } & Heading)
  | ({ kind: "contact" } & Heading)
  | ({ kind: "downloads"; items: { title: string; body: string; href: string; meta: string }[] } & Heading)
  | ({ kind: "related"; routes: string[] } & Heading);

export type Faq = { q: string; a: string };

export type Cta = { title: string; accent?: string; body: string; actions: Action[] };

export type SitePage = {
  route: string;
  label: string;
  group: "services" | "audiences" | "company";
  /** Lifecycle group for service pages. */
  stage?: { group: string; index: number };
  seo: { title: string; description: string };
  hero: Hero;
  sections: Section[];
  faq: Faq[];
  cta: Cta;
};
