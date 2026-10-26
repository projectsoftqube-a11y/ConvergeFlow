/**
 * Homepage content. Sources: RCM brochure, Dental billing brochure, V2 design notes.
 */
import type { Cta, Faq } from "./types";

export const HOME_META = {
  title: "Managed RCM for Dental & Medical Practices | ConvergeFlow",
  description:
    "ConvergeFlow's specialists run your revenue cycle: benefits verified before care, claims followed to a decision, payments posted and balances closed.",
};

export const HOME_HERO = {
  eyebrow: "Managed revenue cycle services",
  title: "Your revenue cycle,",
  accent: "fully managed.",
  lead: "From verified coverage before the visit to a reconciled account after it. ConvergeFlow's specialists handle verification, coding, claims, payments and follow-up for dental and medical practices.",
  actions: [
    { label: "Request a Demo", href: "/demo/" },
    { label: "Explore services", href: "/services/" },
  ],
};

export const HOME_FAQ: Faq[] = [
  { q: "Is ConvergeFlow software or a service?", a: "A fully managed service. Our specialists own the agreed work, not just a dashboard, with workflow technology supporting them." },
  { q: "Which stages can you take on?", a: "Any of the eight, from registration to A/R and reporting. Scope is agreed with your practice before we start, and recorded so ownership is clear." },
  { q: "Which systems do you work with?", a: "We start with OpenDental, so results land where your staff already look. Other practice systems are confirmed during scoping." },
  { q: "What does our practice stay responsible for?", a: "Clinical records and decisions, provider details, payer contracts, approved access and timely answers to clarification questions." },
  { q: "How do we get a proposal?", a: "Request a demo. We'll discuss your workflow and scope, then prepare a proposal based on the stages our team would own." },
  { q: "Do you guarantee payment?", a: "No. Automation supports staff review, and final payment always depends on payer adjudication. Targets are set from your baseline and agreed scope." },
];

export const HOME_CTA: Cta = {
  title: "Bring your practice workflow",
  accent: "to the team.",
  body: "Tell us where claims stall today. We'll show you the stages our specialists would own, and how you'll see every handoff.",
  actions: [
    { label: "Request a Demo", href: "/demo/" },
    { label: "Contact the team", href: "/contact/" },
  ],
};

/* ------------------------------------------------------------------ */
/* V4 homepage additions (dark "glow" design). Sources: RCM brochure, */
/* Dental billing brochure. No figures beyond the brochure's own.     */
/* ------------------------------------------------------------------ */

export const HOME_HERO_POINTS = ["Benefits verified before care", "Claims followed to a decision", "Balances resolved with an owner"];

/** Illustrative status chips for the ticker rows (no figures). */
export const HOME_TICKER: { label: string; status: string; tone: "ok" | "work" }[][] = [
  [
    { label: "Benefits", status: "Verified", tone: "ok" },
    { label: "Claim 837D", status: "Accepted", tone: "ok" },
    { label: "Prior auth", status: "Tracked", tone: "work" },
    { label: "ERA", status: "Posted", tone: "ok" },
    { label: "Attachment", status: "Linked", tone: "ok" },
    { label: "Denial", status: "Appealed", tone: "work" },
    { label: "COB", status: "Confirmed", tone: "ok" },
    { label: "Balance", status: "Resolved", tone: "ok" },
  ],
  [
    { label: "Registration", status: "Duplicate caught", tone: "work" },
    { label: "Coverage", status: "Active", tone: "ok" },
    { label: "Frequency", status: "Checked", tone: "ok" },
    { label: "Scrub", status: "Passed", tone: "ok" },
    { label: "Rejection", status: "Fixed at source", tone: "work" },
    { label: "Deposit", status: "Matched", tone: "ok" },
    { label: "Underpayment", status: "Reviewed", tone: "work" },
    { label: "Credit", status: "Reconciled", tone: "ok" },
  ],
];

export const HOME_INTRO = {
  marquee: "Verification · Coding · Claims · Payments · Follow-up · ",
  big: "Your practice keeps the care.",
  bigAccent: "We own the agreed work.",
  chip: "What is ConvergeFlow?",
  title: "Fully managed revenue cycle for dental and medical practices.",
  body: [
    "ConvergeFlow handles verification, coding, claims, payments and follow-up, so your team can focus on patients.",
    "Before we start, we agree on scope, owners and how we'll report, so you always know where every claim stands.",
  ],
};

export const HOME_FACTS: { title: string; accent: string; intro: string; cells: { value: string; label: string; detail: string; viz: "ring" | "core" | "clock" | "week" }[] } = {
  title: "From the chair",
  accent: "to a closed account.",
  intro: "The cycle ends only when the account has a documented financial resolution.",
  cells: [
    { value: "8", label: "Managed stages", detail: "From registration to A/R and reporting.", viz: "ring" },
    { value: "One", label: "Accountable team", detail: "Owning every stage in your agreed scope.", viz: "core" },
    { value: "Daily", label: "Queue reviews", detail: "Incomplete records, holds, rejections, unposted receipts.", viz: "clock" },
    { value: "Weekly", label: "Trend reviews", detail: "Denial causes, aging, underpayments, attachment delays.", viz: "week" },
  ],
};

export const HOME_HELIX = {
  eyebrow: "Fully managed service",
  title: "Our specialists own the work,",
  accent: "not just a dashboard.",
  body: "One accountable team works the whole cycle, and results land where your staff already look, starting with OpenDental.",
  word: "Fully managed",
  roles: [
    { icon: "shield", title: "Verification specialists", body: "Benefits checks, portal changes, MFA and exceptions resolved." },
    { icon: "tooth", title: "Coding and claim specialists", body: "Documentation reviewed, codes matched to the record, claims scrubbed and sent." },
    { icon: "coins", title: "Payment and A/R specialists", body: "Posting, denials and balances followed to resolution." },
  ] as { icon: "shield" | "tooth" | "coins"; title: string; body: string }[],
};

/** "How it works": the four onboarding steps, each with an illustrative card. */
export const HOME_STEPS = {
  title: "How does it",
  accent: "work?",
  intro: "Your path to a managed revenue cycle.",
  steps: [
    {
      title: "Practice inputs",
      body: "Complete clinical records, provider details, payer contracts and timely clarification. We agree the scope and owners before anything moves.",
      card: { kicker: "Inputs", rows: ["Clinical records", "Provider details", "Payer contracts", "Escalation contacts"] },
    },
    {
      title: "Access setup",
      body: "Approved system access, payer connectivity, secure exchange and privacy arrangements, starting with OpenDental.",
      card: { kicker: "Access", rows: ["Practice system · approved", "Payer portals · approved", "Secure exchange · set", "Credentials · secured"] },
    },
    {
      title: "Agreed workflow",
      body: "Coding review, claim preparation, submission monitoring, posting and follow-up, each with a named owner.",
      card: { kicker: "Workflow", rows: ["Coding review", "Claim preparation", "Submission monitoring", "Posting & follow-up"] },
    },
    {
      title: "Launch review",
      body: "Work queues, escalation contacts, reporting cadence and acceptance criteria confirmed. Then the daily work begins.",
      card: { kicker: "Launch", rows: ["Work queues", "Reporting cadence", "Acceptance criteria", "Daily & weekly reviews"] },
    },
  ],
};

/** Big split words around a glowing claim card. */
export const HOME_STATUS = {
  left: "Verified",
  right: "Paid",
  caption: "Every claim followed to a decision, with the payer reference, dates and submission proof retained.",
  states: [
    { kicker: "Benefits verification", title: "Coverage active", meta: [["Deductible", "Met"], ["Payer order", "Primary"]], ring: "Verified" },
    { kicker: "Claim submission", title: "837D accepted", meta: [["Scrub", "Passed"], ["Attachment", "Linked"]], ring: "Accepted" },
    { kicker: "Payment posting", title: "ERA posted", meta: [["Deposit", "Matched"], ["Adjustment", "Traceable"]], ring: "Paid" },
  ] as { kicker: string; title: string; meta: [string, string][]; ring: string }[],
};

/** The six "Why ConvergeFlow" reasons from the dental billing brochure. */
export const HOME_WHY: { title: string; accent: string; intro: string; items: { art: "orbit" | "window" | "tooth" | "chain" | "stack" | "bars"; title: string; body: string }[] } = {
  title: "Why practices choose",
  accent: "ConvergeFlow",
  intro: "Dental claims fail for dental reasons. Our team works the whole cycle so those gaps get caught before the payer finds them.",
  items: [
    { art: "orbit", title: "Fully managed service", body: "Our specialists own the work, not just a dashboard." },
    { art: "window", title: "Built into your PMS", body: "Starting with OpenDental, results land where staff already look." },
    { art: "tooth", title: "Dental-specific expertise", body: "CDT codes, tooth and surface detail, narratives and attachments." },
    { art: "chain", title: "Clear accountability", body: "Every handoff has a named owner and a documented status." },
    { art: "stack", title: "Evidence for every step", body: "Payer references, dates and submission proof retained." },
    { art: "bars", title: "Reporting you can act on", body: "Daily queues and weekly trends, on measures we agree together." },
  ],
};

/** The dental cycle's four stages, as rising points on a grid floor. */
export const HOME_TIMELINE = {
  title: "Dental claims fail",
  accent: "for dental reasons.",
  body: "A missing tooth number, an expired frequency limit, a radiograph that never got attached. Our team works the whole cycle so those gaps get caught before the payer finds them.",
  stages: [
    { label: "Before treatment", body: "Registration, benefits verification, treatment planning and estimates." },
    { label: "Clinical & claim prep", body: "Documented care, validated CDT codes and claim attachments." },
    { label: "After submission", body: "Payer acceptance, payment posting, denials and secondary claims." },
    { label: "Account closure", body: "Verified patient balances, reconciled credits and reporting." },
  ],
};

/** Illustrative reporting view (no figures). */
export const HOME_DASH = {
  chip: "Client reporting",
  title: "Every handoff,",
  accent: "visible.",
  body: "Daily queues and weekly trends on measures we agree together, with evidence for every check and a named owner for every next step.",
  daily: ["Incomplete records", "Claims on hold", "Rejections", "Unposted receipts"],
  weekly: ["Denial causes", "Aging balances", "Underpayments", "Attachment delays"],
  evidence: ["Portal capture", "Payer reference", "Timestamp", "Named owner"],
};


