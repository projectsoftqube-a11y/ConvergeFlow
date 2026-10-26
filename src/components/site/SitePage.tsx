import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MotionScope } from "@/components/motion/MotionScope";
import { JsonLd } from "@/components/content/JsonLd";
import { plain } from "@/components/content/Rich";
import type { Faq, SitePage as Page } from "@/content/site/types";
import { ROBOTS, SITE_URL, canonicalFor } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { ServicesHub } from "@/components/services/ServicesHub";
import { StagePage } from "@/components/services/StagePage";
import { InnerPage } from "@/components/services/InnerPage";
import { ResourcesPage } from "@/components/services/ResourcesPage";
import { AboutPage } from "@/components/company/AboutPage";
import { ContactPage } from "@/components/company/ContactPage";
import { DemoPage } from "@/components/company/DemoPage";
import { PricingPage } from "@/components/company/PricingPage";
import { WhyPage } from "@/components/company/WhyPage";
import { navGroupFor } from "@/content/navigation";
import { getSitePage } from "@/content/site";
import { SiteFaq } from "./SiteFaq";

export function metadataFor(seo: { title: string; description: string }, route: string): Metadata {
  const canonical = canonicalFor(route);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    robots: ROBOTS,
    alternates: canonical ? { canonical } : undefined,
    openGraph: { title: seo.title, description: seo.description, type: "website", ...(canonical ? { url: canonical } : {}) },
  };
}

/** The Company pages, each with its own design. */
const COMPANY_PAGES: Record<string, (props: { page: Page }) => React.JSX.Element> = {
  "/about/": AboutPage,
  "/why-convergeflow/": WhyPage,
  "/pricing/": PricingPage,
  "/contact/": ContactPage,
  "/demo/": DemoPage,
  "/resources/": ResourcesPage,
};

export const faqSchema = (items: Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
});

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Short Organization node; the full Organization (logo, contact) lives on the homepage under the same @id. */
const orgRef = () => ({ "@type": "Organization", "@id": ORG_ID, name: "ConvergeFlow", url: `${SITE_URL}/` });

/** Home > … > this page, with an item only for ancestors that are built routes. */
function breadcrumbFor(page: Page) {
  const items: { name: string; url: string }[] = [{ name: "Home", url: `${SITE_URL}/` }];
  const segs = page.route.split("/").filter(Boolean);
  let acc = "";
  segs.forEach((seg, i) => {
    acc += `/${seg}`;
    const route = `${acc}/`;
    if (i === segs.length - 1) items.push({ name: page.label, url: `${SITE_URL}${page.route}` });
    else {
      const parent = getSitePage(route);
      if (parent) items.push({ name: parent.label, url: `${SITE_URL}${route}` });
    }
  });
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${page.route}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

/**
 * Structured data built from the visible page content; null until the site origin
 * is confirmed. Each page carries a short Organization (same @id as the homepage's
 * full one), a WebPage tied to the site WebSite, a BreadcrumbList, a Service node on
 * the eight stage pages, and the FAQ when the page shows one (verbatim, so they can't drift).
 */
function schemaFor(page: Page) {
  if (!SITE_URL) return null;
  const url = `${SITE_URL}${page.route}`;
  const isService = page.group === "services" && page.route !== "/services/";
  const webpage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.seo.title,
    description: page.seo.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
    breadcrumb: { "@id": `${SITE_URL}${page.route}#breadcrumb` },
  };
  if (isService) webpage.mainEntity = { "@id": `${url}#service` };
  const graph: object[] = [orgRef(), webpage, breadcrumbFor(page)];
  if (isService)
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.label,
      serviceType: "Revenue cycle management",
      description: page.seo.description,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "United States" },
      url,
    });
  if (page.faq.length) graph.push({ "@id": `${url}#faq`, ...faqSchema(page.faq) });
  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * One page in its own layout (the Services hub, the eight stage pages, the Who
 * We Help and How It Works pages, or a Company page), then the FAQ and the
 * footer carrying the page's call to action.
 */
export function SitePage({ page }: { page: Page }) {
  const Company = COMPANY_PAGES[page.route];
  // every built route has a layout above; a page without one isn't published
  if (page.route !== "/services/" && !page.stage && !navGroupFor(page.route) && !Company) notFound();
  return (
    <>
      <JsonLd schema={schemaFor(page)} />
      <MotionScope>
        <main id="main" tabIndex={-1}>
          {page.route === "/services/" ? (
            <ServicesHub page={page} />
          ) : page.stage ? (
            <StagePage page={page} />
          ) : navGroupFor(page.route) ? (
            <InnerPage page={page} />
          ) : (
            Company && <Company page={page} />
          )}
          <SiteFaq items={page.faq} />
        </main>
        <Footer cta={page.cta} />
      </MotionScope>
    </>
  );
}
