/**
 * How it works, technology, security and company pages.
 * Sources: RCM brochure pp. 2, 6; Dental billing brochure pp. 2, 6; V2 outlines 14–23.
 * Security statements are the brochure's stated practices; no certifications
 * or compliance badges are claimed. The OpenDental page is held (V2 plan) and
 * OpenDental is covered within Technology and How It Works.
 */
import type { SitePage } from "./types";

const DEMO = { label: "Request a Demo", href: "/demo/" };

export const CONTACT = {
  name: "Hari Patel",
  email: "hari@softqubes.com",
  phone: "+1 (512) 733-3085",
  tel: "+15127333085",
};

export const COMPANY_PAGES: SitePage[] = [
  /* -------------------------------------------------------- how it works */
  {
    route: "/how-it-works/",
    label: "Service delivery",
    group: "company",
    seo: {
      title: "How Managed RCM Works | ConvergeFlow",
      description:
        "How the work starts: agree scope and owners, set up approved access, map your payers, confirm launch criteria, then run daily queues and weekly trend reports.",
    },
    hero: {
      eyebrow: "How it works",
      title: "An operating model",
      accent: "you can see.",
      lead: "Before we start, we agree on scope, owners and how we'll report, so you always know where every claim stands. Onboarding comes first; then the day-to-day work runs on an agreed rhythm.",
      actions: [DEMO, { label: "See the services", href: "/services/" }],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/how-it-works.jpg", alt: "Practice manager shaking hands with her account team across a meeting table", caption: "Your named team" },
        note: "Owners agreed before day one",
      },
    },
    sections: [
      {
        kind: "steps",
        eyebrow: "Getting started",
        title: "Onboarding",
        accent: "in five steps.",
        intro: "No fixed timeline is promised; the pace depends on your scope, systems and payers.",
        items: [
          { title: "Agree the scope and owners", body: "The stages we own, the work your practice keeps and who escalates to whom." },
          { title: "Prepare practice inputs", body: "Complete clinical records, provider details, payer contracts and a route for timely clarification." },
          { title: "Set up approved access", body: "Approved system access, starting with OpenDental, and payer credentials shared through the secure process agreed with you." },
          { title: "Map your payers once", body: "Each carrier routed to the right workflow, so verifications and follow-up run consistently." },
          { title: "Confirm launch criteria", body: "Work queues, escalation contacts, reporting cadence and acceptance criteria confirmed together." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "Day to day",
        title: "Once we're live,",
        accent: "the work runs on schedule.",
        cols: 4,
        items: [
          { icon: "shield", title: "Verifications", body: "Run on schedule, ahead of every visit, with evidence recorded." },
          { icon: "send", title: "Claims", body: "Prepared, scrubbed and submitted with proof of transmission." },
          { icon: "coins", title: "Payments", body: "Remittances posted and matched to deposits." },
          { icon: "chart", title: "Follow-up", body: "Denials and aging balances worked by priority." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "Handling exceptions",
        title: "When something doesn't fit,",
        accent: "a person handles it.",
        cols: 3,
        items: [
          { icon: "refresh", title: "Portal changes & MFA", body: "Specialists resolve portal changes, multi-factor prompts and access exceptions." },
          { icon: "chat", title: "Unclear records", body: "When a record is unclear, we ask the dentist or provider rather than guess." },
          { icon: "flag", title: "Holds", body: "Every hold is assigned an owner and cleared; nothing waits unowned." },
        ],
      },
      {
        kind: "cadence",
        eyebrow: "Reviewing agreed reports",
        title: "Quality controls",
        accent: "and client reporting.",
        items: [
          { icon: "clock", title: "Daily", body: "Incomplete records, claims on hold, rejections and unposted receipts." },
          { icon: "calendar", title: "Weekly", body: "Denial causes, aging balances, underpayments and attachment delays." },
          { icon: "chart", title: "Defined measures", body: "Charge lag, claim acceptance, denial rate and collections, defined with you." },
        ],
        note: "Targets are set from your baseline and agreed scope. No reimbursement outcome is guaranteed.",
      },
    ],
    faq: [
      { q: "How long does onboarding take?", a: "It depends on the stages in scope, your systems and the number of payers to map. We'll discuss a realistic plan in the demo rather than promise a fixed duration." },
      { q: "What do we need to provide?", a: "Complete clinical records, provider details, payer contracts, approved system and portal access, and someone who can answer clarification questions." },
      { q: "Who do we contact day to day?", a: "Escalation contacts are confirmed at the launch review, so your team knows who owns each kind of question." },
    ],
    cta: {
      title: "See the operating model",
      accent: "for your practice.",
      body: "We'll walk through scope, owners and reporting using your workflow.",
      actions: [DEMO, { label: "Technology", href: "/technology/" }],
    },
  },

  /* ---------------------------------------------------------- technology */
  {
    route: "/technology/",
    label: "Technology",
    group: "company",
    seo: {
      title: "Technology Behind Our Managed RCM | ConvergeFlow",
      description:
        "How workflow technology supports ConvergeFlow's specialists: payer portal checks, evidence captured with each result and exceptions routed to a person.",
    },
    hero: {
      eyebrow: "Technology",
      title: "Technology that",
      accent: "supports the specialists.",
      lead: "Workflow technology moves information between your practice system and payer portals. Our specialists own the decisions and the exceptions. Results land where your staff already look, starting with OpenDental.",
      actions: [DEMO, { label: "Security & data handling", href: "/technology/security/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "insurance",
          title: "Verification result",
          ref: "Returned to your team",
          rows: [
            ["Source", "Payer portal"],
            ["Run", "Ahead of the visit"],
            ["Reviewed by", "Specialist"],
            ["Evidence", "Capture + reference"],
            ["Exceptions", "Routed to a person"],
            ["Delivered to", "Practice system"],
          ],
          stamp: "Returned",
          note: "Where staff already look",
        },
      },
    },
    sections: [
      {
        kind: "steps",
        eyebrow: "How information moves",
        title: "From your schedule",
        accent: "back to your system.",
        items: [
          { title: "Practice system", body: "Secure access to appointments and insurance data, starting with OpenDental." },
          { title: "Payer portals", body: "Checks and follow-up run across payer portals and approved channels." },
          { title: "Specialist review", body: "People review results and handle anything automation can't." },
          { title: "Evidence recorded", body: "Portal captures, reference numbers and timestamps stored securely." },
          { title: "Results returned", body: "Returned to your team with the evidence behind each result." },
        ],
      },
      {
        kind: "split",
        eyebrow: "Workflow technology and specialist actions",
        title: "What runs automatically,",
        accent: "what a person owns.",
        practice: { title: "Workflow technology", items: ["Scheduled verification runs", "Moving information between systems", "Recording evidence and timestamps", "Queues, holds and status"] },
        team: { title: "Specialists", items: ["Portal changes, MFA and exceptions", "Coding review and provider queries", "Denial classification and appeals", "Payer contacts and account closure"] },
        note: "Automation supports staff review. Final payment always depends on payer adjudication.",
      },
      {
        kind: "evidence",
        eyebrow: "Evidence returned to the practice",
        title: "Evidence for",
        accent: "every check.",
        items: [
          { icon: "eye", title: "Portal captures", body: "What the payer showed at the time." },
          { icon: "stamp", title: "Reference numbers", body: "Payer references kept with the record." },
          { icon: "clock", title: "Timestamps", body: "When each check or submission happened." },
          { icon: "send", title: "Submission proof", body: "Batch, claim ID and attachment linkage." },
        ],
      },
      {
        kind: "feature",
        eyebrow: "OpenDental relationship",
        title: "Built into your PMS,",
        accent: "starting with OpenDental.",
        body: [
          "We start with OpenDental practices. Access to appointments and insurance data is approved by your practice, and how results are returned to your team is confirmed with you during setup.",
          "The supported versions, the information read and written, and how failures are handled are confirmed with you during setup. Other practice systems are confirmed during scoping.",
        ],
        points: ["Secure access to appointments and insurance data", "Results returned with evidence", "Setup details confirmed with your practice"],
        link: { label: "Security & data handling", href: "/technology/security/" },
      },
    ],
    faq: [
      { q: "Is the service fully automated?", a: "No. Automation supports staff review: workflow technology runs the repeatable steps, and specialists own decisions and exceptions." },
      { q: "Which practice systems do you support?", a: "We start with OpenDental. If your practice uses another system, we'll confirm what is supported during scoping." },
      { q: "What happens when a payer portal changes?", a: "Specialists resolve portal changes and MFA prompts so checks keep moving, and anything unresolved is visible in the daily queue." },
    ],
    cta: {
      title: "Results where your staff",
      accent: "already look.",
      body: "We'll show you how information moves for your practice, step by step.",
      actions: [DEMO, { label: "Security & data handling", href: "/technology/security/" }],
    },
  },

  /* ------------------------------------------------------------ security */
  {
    route: "/technology/security/",
    label: "Security & data handling",
    group: "company",
    seo: {
      title: "Security & Data Handling for RCM | ConvergeFlow",
      description:
        "How ConvergeFlow handles practice information: approved access, payer credential handling, evidence records and the agreements confirmed before work starts.",
    },
    hero: {
      eyebrow: "Security & data handling",
      title: "How we handle",
      accent: "your practice's information.",
      lead: "The service involves appointment, insurance and claim information, and payer portal credentials. Here is how access, credentials and evidence are handled, and how to request documentation for your review.",
      actions: [{ label: "Request documentation", href: "/contact/" }, DEMO],
      visual: { kind: "none" },
      facts: ["Payer credential handling", "Evidence for every check", "Approved access", "Information we work with"],
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Information involved in the service",
        title: "What we work with,",
        accent: "and why.",
        cols: 4,
        items: [
          { icon: "calendar", title: "Appointments", body: "To verify coverage and prepare work ahead of each visit." },
          { icon: "shield", title: "Insurance details", body: "To check eligibility, benefits and authorization requirements." },
          { icon: "file", title: "Claims & remittances", body: "To prepare, submit, post and follow up on claims." },
          { icon: "key", title: "Payer credentials", body: "To access payer portals on your practice's behalf." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "Access, credentials and evidence",
        title: "How access and evidence",
        accent: "are handled.",
        cols: 2,
        items: [
          { icon: "lock", title: "Payer credential handling", body: "How payer credentials are shared, and who can use them, is agreed with you during access setup, before the service starts." },
          { icon: "eye", title: "Approved access", body: "We use only the system and payer access your practice approves, agreed before work starts." },
          { icon: "layers", title: "Evidence for every check", body: "Portal captures, payer reference numbers and timestamps are kept, so you can see what was done." },
          { icon: "shield", title: "Information we work with", body: "Appointments, insurance details, claims and remittances, as set in the agreed scope." },
        ],
      },
      {
        kind: "feature",
        eyebrow: "Retention, agreements and documentation",
        title: "Documentation",
        accent: "for your reviewers.",
        body: [
          "Retention, data return and the agreements your organization requires are confirmed before the service starts.",
          "If your security or compliance team needs documentation, request it through the contact page and we'll route it to the right person.",
        ],
        link: { label: "Request documentation", href: "/contact/" },
      },
      {
        kind: "statement",
        text: "Bring your reviewers' questions to the scoping conversation.",
        accent: "No certifications or badges are claimed here.",
        sub: "Ask for the documentation your reviewers need, and we'll provide what applies to your agreement.",
      },
    ],
    faq: [
      { q: "How are payer credentials handled?", a: "How credentials are shared and who can use them is agreed with you during access setup, before the service starts." },
      { q: "Can we see what was done on our accounts?", a: "Yes. Evidence such as portal captures, payer reference numbers and timestamps is retained for your review." },
      { q: "Do you sign the agreements our organization requires?", a: "Agreements are confirmed before the service starts. Ask through the contact page and we'll route your request." },
    ],
    cta: {
      title: "Bring your security questions",
      accent: "to the conversation.",
      body: "We'll answer them directly and point you to the documentation that applies.",
      actions: [{ label: "Contact the team", href: "/contact/" }, DEMO],
    },
  },

  /* ----------------------------------------------------------------- why */
  {
    route: "/why-convergeflow/",
    label: "Why ConvergeFlow",
    group: "company",
    seo: {
      title: "Why ConvergeFlow | Specialists Who Own the Work",
      description:
        "Specialists who own the work, dental-specific coding detail, evidence for every step and a named owner on every handoff. See how the team works.",
    },
    hero: {
      eyebrow: "Why ConvergeFlow",
      title: "We don't just report the problem.",
      accent: "We fix it.",
      lead: "ConvergeFlow is a fully managed service: our specialists own the agreed work, not just a dashboard. Workflow technology supports them; results land where your staff already look.",
      actions: [DEMO, { label: "How it works", href: "/how-it-works/" }],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/why-avatar.jpg", alt: "Revenue cycle specialist with a headset at her desk", caption: "The team owns the work" },
        note: "Not just a dashboard",
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "What's different",
        title: "Six reasons",
        accent: "to hand the work over.",
        cols: 3,
        items: [
          { icon: "users", title: "Fully managed service", body: "Our specialists own the work, not just a dashboard." },
          { icon: "link", title: "Built into your PMS", body: "Starting with OpenDental, results land where staff already look." },
          { icon: "tooth", title: "Dental-specific expertise", body: "CDT codes, tooth and surface detail, narratives and attachments." },
          { icon: "user", title: "Clear accountability", body: "Every handoff has a named owner and a documented status." },
          { icon: "fileCheck", title: "Evidence for every step", body: "Payer references, dates and submission proof retained." },
          { icon: "chart", title: "Reporting you can act on", body: "Daily queues and weekly trends, on measures we agree together." },
        ],
      },
      {
        kind: "anatomy",
        eyebrow: "A concrete example",
        title: "One check,",
        accent: "done properly.",
        body: "A restoration on tooth 30 with mesial and occlusal surfaces must match what the clinical record shows. That check happens before the claim leaves.",
      },
      {
        kind: "cadence",
        eyebrow: "Visible accountability",
        title: "You always know",
        accent: "where every claim stands.",
        items: [
          { icon: "clock", title: "Daily", body: "Incomplete records, claims on hold, rejections and unposted receipts." },
          { icon: "calendar", title: "Weekly", body: "Denial causes, aging balances, underpayments and attachment delays." },
          { icon: "chart", title: "Defined measures", body: "Measures agreed with you, set from your baseline." },
        ],
      },
    ],
    faq: [
      { q: "How is this different from billing software?", a: "Software gives you a dashboard; ConvergeFlow's team does the agreed work, with technology supporting them and evidence recorded for every step." },
      { q: "Do we lose visibility when we hand the work over?", a: "No. Every handoff has an owner and a documented status, and you receive daily queues and weekly reviews." },
      { q: "Can you promise better results?", a: "We set targets from your baseline and agreed scope. No reimbursement outcome is guaranteed, because payment depends on payer adjudication." },
    ],
    cta: {
      title: "Let the team own the work.",
      accent: "Keep the visibility.",
      body: "We'll show you what handing over the revenue cycle looks like for your practice.",
      actions: [DEMO, { label: "About ConvergeFlow", href: "/about/" }],
    },
  },

  /* --------------------------------------------------------------- about */
  {
    route: "/about/",
    label: "About",
    group: "company",
    seo: {
      title: "About ConvergeFlow | Managed Revenue Cycle Services",
      description:
        "Who runs ConvergeFlow's managed revenue cycle service, how the specialist team owns the work, and how to reach us.",
    },
    hero: {
      eyebrow: "About ConvergeFlow",
      title: "The team that",
      accent: "owns the work.",
      lead: "ConvergeFlow provides managed revenue cycle services for dental and medical practices, combining workflow technology with specialists who handle verification, claims, payments and follow-up.",
      actions: [{ label: "Contact the team", href: "/contact/" }, DEMO],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/about-hero.jpg", alt: "A revenue cycle team at work in a bright open office", caption: "Specialists, side by side" },
        note: "From appointments to verified coverage",
      },
    },
    sections: [
      {
        kind: "feature",
        eyebrow: "Company and service role",
        title: "A managed service,",
        accent: "not just a dashboard.",
        body: [
          "Practices hand over agreed parts of the revenue cycle, from verified coverage before the visit to a reconciled account after it.",
          "We agree scope, owners and reporting before we start, and keep the practice informed through daily queues and weekly reviews.",
        ],
        photo: { src: "/assets/photos/v2/about-band.jpg", alt: "Dental practice front desk preparing the day before opening", caption: "Before the visit" },
      },
      {
        kind: "cards",
        eyebrow: "Who performs the work",
        title: "Specialists behind",
        accent: "every stage.",
        cols: 3,
        items: [
          { icon: "shield", title: "Verification specialists", body: "Benefits checks, portal changes, MFA and exceptions resolved." },
          { icon: "tooth", title: "Coding and claim specialists", body: "Documentation reviewed, codes matched to the record, claims scrubbed and sent." },
          { icon: "coins", title: "Payment and A/R specialists", body: "Posting, denials and balances followed to resolution." },
        ],
      },
      {
        kind: "steps",
        eyebrow: "How accountability is organized",
        title: "Every handoff",
        accent: "has an owner.",
        items: [
          { title: "Scope agreed", body: "The stages we own and the work your practice keeps." },
          { title: "Owners named", body: "A named owner and documented status for each handoff." },
          { title: "Escalations clear", body: "Escalation contacts confirmed at launch." },
          { title: "Reports reviewed", body: "Daily queues and weekly trends on agreed measures." },
        ],
      },
      { kind: "related", eyebrow: "Practices we support", title: "Who we", accent: "help.", routes: ["/industries/dental/", "/industries/dso/", "/industries/medical/"] },
    ],
    faq: [
      { q: "Which practices do you work with?", a: "Dental practices, DSOs and group practices, and medical practices, with scope confirmed for each." },
      { q: "Who will we speak to?", a: "Start with Hari Patel through the contact page; your named team and escalation contacts are confirmed during onboarding." },
    ],
    cta: {
      title: "Meet the team",
      accent: "behind the work.",
      body: "Tell us about your practice and we'll show you how the team would work with you.",
      actions: [{ label: "Contact the team", href: "/contact/" }, DEMO],
    },
  },

  /* ------------------------------------------------------------- pricing */
  {
    route: "/pricing/",
    label: "Pricing",
    group: "company",
    seo: {
      title: "Managed RCM Pricing & Proposals | ConvergeFlow",
      description:
        "ConvergeFlow doesn't publish set prices. See what shapes a proposal for your practice, what to bring, and how to request one.",
    },
    hero: {
      eyebrow: "Pricing",
      title: "Pricing built around",
      accent: "your scope.",
      lead: "We don't publish fixed prices. A proposal depends on the work your practice wants our team to own; here is what we'll ask about, and what a proposal should cover.",
      actions: [],
      visual: { kind: "none" },
    },
    sections: [
      {
        kind: "steps",
        eyebrow: "How to request a proposal",
        title: "From conversation",
        accent: "to proposal.",
        items: [
          { title: "Share your workflow", body: "Tell us your practice type, systems and where the work stalls today." },
          { title: "Scope discussion", body: "Agree which stages our team would own and what stays with you." },
          { title: "Proposal", body: "A written proposal based on that scope." },
          { title: "Terms confirmed", body: "Term, support and responsibilities confirmed before work begins." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "What shapes scope",
        title: "What we'll",
        accent: "ask about.",
        cols: 3,
        items: [
          { icon: "layers", title: "Stages in scope", body: "Which of the eight stages our team would own." },
          { icon: "building", title: "Practices and locations", body: "How many practices and locations are included." },
          { icon: "shield", title: "Payer mix and portals", body: "The payers and portals your practice works with." },
          { icon: "link", title: "Practice systems", body: "Your practice management system, starting with OpenDental." },
          { icon: "chart", title: "Reporting needs", body: "The measures and cadence your team wants to review." },
          { icon: "alert", title: "Current backlog", body: "Open claims, denials and aging balances to work through." },
        ],
      },
      {
        kind: "table",
        eyebrow: "Before you sign",
        title: "Questions to settle",
        accent: "in every proposal.",
        head: ["Topic", "What to confirm"],
        rows: [
          ["Included work", "Which stages and tasks the fee covers"],
          ["Separate work", "Anything priced or handled separately"],
          ["Onboarding", "Setup, access and payer mapping responsibilities"],
          ["Term and changes", "Term, renewal and how scope changes are handled"],
          ["Reporting", "Measures, cadence and who receives them"],
        ],
      },
    ],
    faq: [
      { q: "Is there a free trial or assessment?", a: "None is promised here. If you'd like to discuss a starting arrangement, raise it in the scope conversation and confirm any terms in writing." },
      { q: "Do you charge per claim or per provider?", a: "We don't publish a pricing model. Your proposal explains how fees are calculated for the scope you choose." },
      { q: "Can we start with one stage and add more later?", a: "Yes. Scope is agreed per practice and can be extended once the first stages are running." },
    ],
    cta: {
      title: "Get a proposal",
      accent: "for your scope.",
      body: "Tell us which stages you want help with and we'll prepare a proposal around them.",
      actions: [{ label: "Request a demo and proposal", href: "/demo/" }, { label: "Contact the team", href: "/contact/" }],
    },
  },

  /* ------------------------------------------------------------- contact */
  {
    route: "/contact/",
    label: "Contact",
    group: "company",
    seo: {
      title: "Contact ConvergeFlow | Talk to the RCM Team",
      description: "Talk to the ConvergeFlow team about managed revenue cycle work for your practice. Email or call Hari Patel, or request a demo of how we'd work.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Talk to",
      accent: "the team.",
      lead: "For questions about managed revenue cycle services for your practice, contact Hari Patel directly or request a demo.",
      actions: [],
      visual: { kind: "contact" },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Who this channel is for",
        title: "The right door",
        accent: "for your question.",
        cols: 3,
        items: [
          { icon: "building", title: "Practices and groups", body: "Questions about managed RCM, scope and proposals: contact Hari." },
          { icon: "users", title: "Existing clients", body: "Use your client login and the escalation contacts agreed at launch." },
          { icon: "user", title: "Patients", body: "For bills or appointments, please contact your dental or medical practice directly." },
        ],
      },
    ],
    faq: [],
    cta: {
      title: "Prefer a walkthrough?",
      accent: "Request a demo.",
      body: "We'll walk through how the team would handle your practice's revenue cycle.",
      actions: [DEMO, { label: "See the services", href: "/services/" }],
    },
  },

  /* ---------------------------------------------------------------- demo */
  {
    route: "/demo/",
    label: "Request a Demo",
    group: "company",
    seo: {
      title: "Request a Managed RCM Demo | ConvergeFlow",
      description: "Request a conversation about your practice workflow: the stages our specialists would own, how you'd see each handoff, and what a proposal covers.",
    },
    hero: {
      eyebrow: "Request a demo",
      title: "See how the team would work",
      accent: "for your practice.",
      lead: "We'll walk through how verification, coding, claims, posting and follow-up would work for your practice, and which parts our team would own.",
      actions: [],
      visual: { kind: "form" },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "What the conversation covers",
        title: "A conversation about",
        accent: "your workflow.",
        cols: 3,
        items: [
          { icon: "route", title: "Your current workflow", body: "Where claims, denials and balances stall today." },
          { icon: "layers", title: "The stages we'd own", body: "Which of the eight stages fit your practice." },
          { icon: "chart", title: "Owners and reporting", body: "How handoffs, escalation and reporting would work." },
        ],
      },
      {
        kind: "steps",
        eyebrow: "What happens after a request",
        title: "A request,",
        accent: "then a conversation.",
        items: [
          { title: "Request received", body: "We review the details you share." },
          { title: "We reply", body: "We contact you to arrange a time; a request is not a booked appointment." },
          { title: "Walkthrough", body: "We walk through your workflow and the stages in question." },
          { title: "Scope summary", body: "You receive a summary of the scope we discussed." },
        ],
      },
    ],
    faq: [
      { q: "Is the demo a booked appointment?", a: "No. Submitting a request lets us contact you to arrange a time that suits your team." },
      { q: "What should we prepare?", a: "Your practice type, systems, main payers and the stages you want help with. Please don't send patient information." },
    ],
    cta: {
      title: "Prefer to talk first?",
      accent: "Contact Hari directly.",
      body: `Email ${CONTACT.email} or call ${CONTACT.phone.replace(/ /g, "\u00a0")}.`,
      actions: [{ label: "Contact the team", href: "/contact/" }, { label: "See the services", href: "/services/" }],
    },
  },

  /* ----------------------------------------------------------- resources */
  {
    route: "/resources/",
    label: "Resources",
    group: "company",
    seo: {
      title: "RCM Brochures & Resources | ConvergeFlow",
      description: "Download the ConvergeFlow revenue cycle and dental billing brochures, and find plain-language explanations of each stage of the managed service.",
    },
    hero: {
      eyebrow: "Resources",
      title: "Resources for",
      accent: "your practice team.",
      lead: "Download the ConvergeFlow brochures, or explore the pages behind each stage of the revenue cycle.",
      actions: [{ label: "Download brochures", href: "#downloads" }, DEMO],
      visual: { kind: "none" },
    },
    sections: [
      {
        kind: "downloads",
        id: "downloads",
        eyebrow: "Brochures",
        title: "Take ConvergeFlow",
        accent: "to your team.",
        items: [
          {
            title: "Revenue Cycle Management brochure",
            body: "The managed revenue cycle for dental and medical practices: before care, after care and submission, payment and resolution, and getting started.",
            href: "/resources/convergeflow-rcm-brochure.pdf",
            meta: "PDF · 6 pages",
          },
          {
            title: "Dental Coding & Billing brochure",
            body: "Dental billing from the chair to a closed account: benefits, CDT coding, attachments, claim balances, specialty workflows and working together.",
            href: "/resources/convergeflow-dental-billing-brochure.pdf",
            meta: "PDF · 6 pages",
          },
        ],
      },
      {
        kind: "related",
        id: "guides",
        eyebrow: "Guides",
        title: "Explore",
        accent: "the workflow.",
        routes: ["/how-it-works/", "/services/", "/industries/dental/", "/technology/", "/technology/security/", "/pricing/"],
      },
    ],
    faq: [],
    cta: {
      title: "Have a question",
      accent: "for your practice?",
      body: "Talk to the team about your workflow and the stages you need help with.",
      actions: [{ label: "Contact the team", href: "/contact/" }, DEMO],
    },
  },
];
