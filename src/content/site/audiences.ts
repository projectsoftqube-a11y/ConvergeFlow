/**
 * Who We Help: dental practices, DSOs and groups, medical practices.
 * Sources: Dental billing brochure pp. 1–6, RCM brochure pp. 1–6, V2 outlines 11–13.
 * DSO and Medical copy stays within what the brochures establish; group-level
 * reporting and specialty scope are agreed during scoping.
 */
import type { SitePage } from "./types";

const DEMO = { label: "Request a Demo", href: "/demo/" };

export const AUDIENCE_PAGES: SitePage[] = [
  /* --------------------------------------------------------------- dental */
  {
    route: "/industries/dental/",
    label: "Dental practices",
    group: "audiences",
    seo: {
      title: "Managed Dental Billing & Coding Services | ConvergeFlow",
      description:
        "Dental billing, fully managed: benefits verified before treatment, CDT codes matched to the chart and balances resolved with a named owner.",
    },
    hero: {
      eyebrow: "Dental coding & billing",
      title: "Dental billing, fully managed.",
      accent: "From the chair to a closed account.",
      lead: "ConvergeFlow handles verification, CDT coding, claims, payments and follow-up for US dental practices, so your team can focus on patients.",
      actions: [DEMO, { label: "See brochures", href: "/resources/" }],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/audience-dental.jpg", alt: "Dentist explaining a treatment with a tooth model to a patient in the chair", caption: "From the chair…" },
        note: "…to a closed account",
        chips: ["Benefits verified before treatment begins", "CDT-accurate claims matched to the record", "Balances resolved with a documented owner"],
      },
    },
    sections: [
      {
        kind: "statement",
        text: "Dental claims fail",
        accent: "for dental reasons.",
        sub: "A missing tooth number, an expired frequency limit, a radiograph that never got attached. Our team works the whole cycle so those gaps get caught before the payer finds them.",
      },
      {
        kind: "stages",
        layout: "cycle",
        eyebrow: "The dental revenue cycle",
        title: "Four stages,",
        accent: "one accountable team.",
        items: [
          { title: "Before treatment", body: "Registration, benefits verification, treatment planning and estimates.", href: "/services/eligibility-verification/" },
          { title: "Clinical & claim prep", body: "Documented care, validated CDT codes and claim attachments.", href: "/services/dental-coding/" },
          { title: "After submission", body: "Payer acceptance, payment posting, denials and secondary claims.", href: "/services/claims-submission/" },
          { title: "Account closure", body: "Verified patient balances, reconciled credits and reporting.", href: "/services/ar-management/" },
        ],
        note: "The cycle ends only when the account has a documented financial resolution.",
      },
      {
        kind: "chips",
        eyebrow: "Dental benefits verification",
        title: "Active coverage is",
        accent: "only the starting point.",
        body: "We check the details that actually decide payment, and record the payer reference, date and source.",
        chips: [
          "Effective dates",
          "Deductible",
          "Covered categories",
          "Patient share",
          "Annual maximum remaining",
          "Waiting periods",
          "Age limits",
          "Exclusions",
          "Frequency limits",
          "Replacement limits",
          "Prior service dates",
          "Missing-tooth provisions",
        ],
        note: "Benefits vary by plan. We recheck coverage when treatment or the service date changes.",
      },
      {
        kind: "anatomy",
        eyebrow: "Clinical & claim preparation",
        title: "Every claim",
        accent: "matches the chart.",
        body: "The CDT edition in effect for the date of service, ADA Universal tooth numbers, treated surfaces and quadrant or arch whenever the code requires them.",
      },
      {
        kind: "balance",
        eyebrow: "After submission",
        title: "Paid accurately.",
        accent: "Closed cleanly.",
        note: "Illustrative example. Real liability depends on the plan, contract and applicable rules. A contractual adjustment is never billed to the patient.",
      },
      {
        kind: "cards",
        eyebrow: "Specialty workflows",
        title: "Specialty detail,",
        accent: "handled with care.",
        cols: 3,
        items: [
          { icon: "tooth", title: "Orthodontics", body: "Lifetime limits, age rules, treatment dates and installment billing." },
          { icon: "layers", title: "Periodontics & prosthodontics", body: "Clinical evidence, history and replacement information." },
          { icon: "steth", title: "Medical crossover", body: "Cases that may qualify under medical benefits, handled with their own claim rules." },
        ],
      },
      {
        kind: "split",
        eyebrow: "Working together",
        title: "Practice inputs,",
        accent: "shared responsibilities.",
        practice: {
          title: "Your practice",
          items: ["Complete clinical records", "Provider details and payer contracts", "Approved system access", "Timely clarification when a record is unclear"],
        },
        team: {
          title: "ConvergeFlow team",
          items: ["Coding review and claim preparation", "Submission monitoring and payment posting", "Denials, A/R and patient balances", "Daily queues and weekly reviews"],
        },
      },
    ],
    faq: [
      {
        q: "Is this a software subscription or a service?",
        a: "A fully managed service. Our specialists own the agreed work across verification, coding, claims, payments and follow-up; workflow technology supports them.",
      },
      { q: "Do you work with OpenDental?", a: "Yes. We start with OpenDental practices. How results reach your team is confirmed with you during setup. Other systems are confirmed during scoping." },
      { q: "Do you handle orthodontic and periodontic billing?", a: "Yes, as specialty workflows within your agreed scope: lifetime limits, age rules and installment billing for orthodontics; clinical evidence and history for periodontics and prosthodontics." },
      { q: "Will you guarantee our collections?", a: "No. Targets are set from your baseline and agreed scope, and final payment always depends on payer adjudication." },
    ],
    cta: {
      title: "Hand over the billing.",
      accent: "Keep the visibility.",
      body: "We'll walk through a dental claim from benefits check to closed account, using your workflow.",
      actions: [DEMO, { label: "Dental coding", href: "/services/dental-coding/" }],
    },
  },

  /* ------------------------------------------------------------------ DSO */
  {
    route: "/industries/dso/",
    label: "DSOs & groups",
    group: "audiences",
    seo: {
      title: "RCM for DSOs & Group Dental Practices | ConvergeFlow",
      description:
        "Managed revenue cycle work for DSOs and group practices, with location and central responsibilities, escalation and reporting agreed up front.",
    },
    hero: {
      eyebrow: "DSOs & group practices",
      title: "Revenue cycle support for DSOs and groups,",
      accent: "agreed location by location.",
      lead: "Groups often split revenue cycle work between locations and a central team. We agree which work sits where, who escalates to whom and how we report, before the work starts.",
      actions: [DEMO, { label: "Dental billing scope", href: "/industries/dental/" }],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/audience-dso.jpg", alt: "Operations team of a dental group reviewing reports together at a long table", caption: "Shared review" },
        note: "Owners agreed up front",
      },
    },
    sections: [
      {
        kind: "split",
        eyebrow: "Practice versus central responsibilities",
        title: "Clear lines between",
        accent: "locations and the center.",
        intro: "Every group divides the work differently. We record the split you choose.",
        practice: {
          title: "Each location",
          items: ["Clinical records and documentation", "Patient-facing conversations", "Provider clarification", "Local scheduling details"],
        },
        team: {
          title: "Central team + ConvergeFlow",
          items: ["The stages placed in our scope", "Escalation contacts per location", "Shared review of queues and trends", "Reporting on measures you define"],
        },
      },
      {
        kind: "cards",
        eyebrow: "Shared review and escalation",
        title: "One accountable team,",
        accent: "many front desks.",
        cols: 3,
        items: [
          { icon: "user", title: "Named owners", body: "Every handoff has a named owner and a documented status, at every location." },
          { icon: "flag", title: "Escalation paths", body: "Escalation contacts confirmed at launch, so questions reach the right person." },
          { icon: "chart", title: "Shared review", body: "Daily queues and weekly trends reviewed with the people who need them." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "To confirm during scoping",
        title: "Location context",
        accent: "and access.",
        cols: 2,
        items: [
          { icon: "building", title: "Location context", body: "Providers, service locations and payer mix for each practice in scope." },
          { icon: "chart", title: "Reporting requirements", body: "Which measures your group reviews, and at what level, defined with you." },
          { icon: "lock", title: "Access boundaries", body: "Who can see which locations and evidence, agreed before access is granted." },
          { icon: "link", title: "Systems", body: "Practice systems confirmed location by location, starting with OpenDental." },
        ],
      },
      {
        kind: "steps",
        eyebrow: "Starting with one workflow",
        title: "Prove the model,",
        accent: "then extend it.",
        items: [
          { title: "Choose a starting point", body: "One location or one stage where the work is clearest." },
          { title: "Agree owners", body: "Location, central and ConvergeFlow responsibilities written down." },
          { title: "Launch review", body: "Queues, escalation contacts and reporting cadence confirmed." },
          { title: "Extend", body: "Add locations or stages on the same agreed model." },
        ],
      },
      {
        kind: "statement",
        text: "Targets are set from your baseline and agreed scope.",
        accent: "No reimbursement outcome is guaranteed.",
      },
    ],
    faq: [
      { q: "Can you report across all of our locations?", a: "Reporting is defined with you during scoping. Tell us which measures your group reviews and at what level, and we'll confirm what the service will provide." },
      { q: "Do all locations need to start at once?", a: "No. You can start with one location or one stage, confirm the operating model, then extend it." },
      { q: "How are access permissions handled?", a: "Access is approved by your organization and agreed before it is granted. Your access and reporting requirements are confirmed with you during scoping." },
    ],
    cta: {
      title: "Bring one location's workflow.",
      accent: "We'll map the rest from there.",
      body: "Tell us how work is split across your group today and we'll show you where ConvergeFlow fits.",
      actions: [DEMO, { label: "How it works", href: "/how-it-works/" }],
    },
  },

  /* -------------------------------------------------------------- medical */
  {
    route: "/industries/medical/",
    label: "Medical practices",
    group: "audiences",
    seo: {
      title: "Managed Medical Billing & RCM Services | ConvergeFlow",
      description:
        "Managed revenue cycle support for medical practices: coverage verified before the visit, claims scrubbed and sent, and payments and A/R followed up.",
    },
    hero: {
      eyebrow: "Medical practices",
      title: "Medical billing and revenue cycle,",
      accent: "fully managed.",
      lead: "From verified coverage before the visit to a reconciled account after it. ConvergeFlow's team supports medical practices across verification, claims, payments and follow-up, within a scope agreed for your practice.",
      actions: [DEMO, { label: "Explore services", href: "/services/" }],
      visual: {
        kind: "photo",
        photo: { src: "/assets/photos/v2/audience-medical.jpg", alt: "Medical billing specialist with a headset at her desk as a physician walks past", caption: "Specialists own the work" },
        note: "People behind the automation",
      },
    },
    sections: [
      {
        kind: "stages",
        layout: "flow",
        eyebrow: "Supported medical service scope",
        title: "Three stages,",
        accent: "worked end to end.",
        items: [
          { title: "Before care", body: "Insurance verification, registration and demographics, referrals and prior authorization, and patient estimates.", href: "/services/eligibility-verification/" },
          { title: "After care & submission", body: "Documentation and coding review, charge capture, claim scrubbing, electronic submission and claim status.", href: "/services/claims-submission/" },
          { title: "Payment & resolution", body: "Payment posting, secondary billing, denials and appeals, A/R follow-up and patient billing.", href: "/services/ar-management/" },
        ],
        note: "Automation supports staff review. Final payment always depends on payer adjudication.",
      },
      {
        kind: "cards",
        eyebrow: "Documentation and submission",
        title: "Codes supported",
        accent: "by the record.",
        cols: 3,
        items: [
          { icon: "clipboard", title: "Coding review", body: "Codes supported by the record, with compliant provider queries for gaps." },
          { icon: "calendar", title: "Charge capture", body: "Encounters reconciled against charges so nothing goes unbilled." },
          { icon: "send", title: "Submission", body: "Payer-approved channels, with proof of every transmission." },
        ],
      },
      {
        kind: "split",
        eyebrow: "Working with the practice",
        title: "Your clinicians document.",
        accent: "We work the claim.",
        practice: {
          title: "Your practice",
          items: ["Clinical documentation and provider answers to queries", "Provider details and payer contracts", "Approved system access", "Patient care decisions"],
        },
        team: {
          title: "ConvergeFlow team",
          items: ["Verification and authorization tracking", "Coding review, scrubbing and submission", "Posting, denials and A/R follow-up", "Reporting on agreed measures"],
        },
      },
      {
        kind: "feature",
        eyebrow: "Systems, payers and specialties",
        title: "Scope confirmed",
        accent: "before we start.",
        body: [
          "Medical practices vary widely in systems, payer mix and specialty rules. We confirm your practice system, payers and specialty-specific requirements before agreeing scope.",
          "Not every specialty or hospital workflow is in scope; we'll tell you plainly what we can own.",
        ],
        points: ["Practice system and data access", "Payer mix and portals", "Specialty documentation rules", "Reporting measures"],
      },
    ],
    faq: [
      { q: "Do you support my specialty?", a: "Specialty requirements are confirmed during scoping. Bring your specialty, payer mix and systems to the demo and we'll tell you what the service can own." },
      { q: "Do you work with hospitals?", a: "ConvergeFlow is built for dental and medical practices. If you're a hospital or health system, talk to us about scope before assuming a fit." },
      { q: "Which practice systems do you support for medical practices?", a: "We confirm supported systems and data access during scoping, before any work starts." },
    ],
    cta: {
      title: "From verified coverage",
      accent: "to a reconciled account.",
      body: "Show us your specialty and payer mix, and we'll map the stages our team would own.",
      actions: [DEMO, { label: "Explore services", href: "/services/" }],
    },
  },
];
