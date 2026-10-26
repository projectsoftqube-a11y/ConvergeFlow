import { MotionScope } from "@/components/motion/MotionScope";
import { JsonLd } from "@/components/content/JsonLd";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { Intro } from "@/components/home/Intro";
import { Facts } from "@/components/home/Facts";
import { HelixSection } from "@/components/home/HelixSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatusSplit } from "@/components/home/StatusSplit";
import { StageTabs } from "@/components/home/StageTabs";
import { Why } from "@/components/home/Why";
import { Timeline } from "@/components/home/Timeline";
import { Dashboard } from "@/components/home/Dashboard";
import { SiteFaq } from "@/components/site/SiteFaq";
import { Footer } from "@/components/layout/Footer";
import { faqSchema, metadataFor } from "@/components/site/SitePage";
import { HOME_CTA, HOME_FAQ, HOME_META } from "@/content/site/home";
import { SITE_URL } from "@/lib/site";

export const metadata = metadataFor(HOME_META, "/");

const schema = SITE_URL
  ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "ConvergeFlow",
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/assets/logos/convergeflow-dark.png`,
          description:
            "Managed revenue cycle management service for dental and medical practices: verification, coding, claims, payments and follow-up handled by specialists.",
          areaServed: { "@type": "Country", name: "United States" },
          // CF-015: add legalName and address once the legal entity and address are confirmed.
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            name: "Hari Patel",
            email: "hari@softqubes.com",
            telephone: "+1-512-733-3085",
            areaServed: "US",
            availableLanguage: "en",
          },
        },
        { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "ConvergeFlow", publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en-US" },
        {
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: HOME_META.title,
          description: HOME_META.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-US",
        },
        { "@id": `${SITE_URL}/#faq`, ...faqSchema(HOME_FAQ) },
      ],
    }
  : null;

export default function HomePage() {
  return (
    <>
      <JsonLd schema={schema} />
      <MotionScope>
        <main id="main" tabIndex={-1}>
          <Hero />
          <Ticker />
          <Intro />
          <Facts />
          <HelixSection />
          <HowItWorks />
          <StatusSplit />
          <StageTabs />
          <Why />
          <Timeline />
          <Dashboard />
          <SiteFaq items={HOME_FAQ} />
        </main>
        <Footer cta={HOME_CTA} />
      </MotionScope>
    </>
  );
}
