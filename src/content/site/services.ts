/**
 * Services: the hub and the eight lifecycle stages.
 * Sources: RCM brochure pp. 2–6, Dental billing brochure pp. 2–6, V2 page outlines 02–10.
 */
import type { JourneyGroup, SitePage } from "./types";

const DEMO = { label: "Request a Demo", href: "/demo/" };

/** The eight stages in lifecycle order, grouped as in the V2 navigation. */
export const JOURNEY: JourneyGroup[] = [
  {
    title: "Before care",
    summary: "Registration, benefits and authorization checked before the patient arrives.",
    stages: [
      { label: "Registration", href: "/services/patient-registration/", body: "Identity, subscriber and member details on file; duplicate records caught." },
      { label: "Eligibility & benefits", href: "/services/eligibility-verification/", body: "Coverage and the plan details that decide payment, recorded with evidence." },
      { label: "Prior authorization", href: "/services/prior-authorization/", body: "Requirements checked; decisions, references and valid dates tracked." },
    ],
  },
  {
    title: "Claims",
    summary: "Documented care coded, prepared, scrubbed and sent with proof.",
    stages: [
      { label: "Dental coding & preparation", href: "/services/dental-coding/", body: "CDT codes, tooth and surface detail, narratives and attachments matched to the chart." },
      { label: "Claims submission", href: "/services/claims-submission/", body: "Scrubbed, sent through approved channels and followed to a decision." },
    ],
  },
  {
    title: "Payments & follow-up",
    summary: "Payments posted, denials worked and every balance resolved.",
    stages: [
      { label: "Payment posting", href: "/services/payment-posting/", body: "ERAs and EOBs posted and matched to deposits; adjustments traceable." },
      { label: "Denial management", href: "/services/denial-management/", body: "Root cause found; corrected, reconsidered or appealed on deadline." },
      { label: "A/R & reporting", href: "/services/ar-management/", body: "Aging worked by priority, balances verified and closed with a documented owner." },
    ],
  },
];

export const STAGES = JOURNEY.flatMap((g) => g.stages.map((s) => ({ ...s, group: g.title })));

const stageOf = (route: string) => {
  const i = STAGES.findIndex((s) => s.href === route);
  return { group: STAGES[i].group, index: i + 1 };
};

export const SERVICE_PAGES: SitePage[] = [
  /* ------------------------------------------------------------------ hub */
  {
    route: "/services/",
    label: "Services",
    group: "services",
    seo: {
      title: "Revenue Cycle Management Services | ConvergeFlow",
      description:
        "Eight managed stages, from registration and benefits checks to claims, payment posting, denials and A/R. Choose the stages our specialists own.",
    },
    hero: {
      eyebrow: "Managed revenue cycle services",
      title: "Managed RCM, from coverage",
      accent: "to account closure.",
      lead: "ConvergeFlow's team works the revenue cycle for dental and medical practices: benefits verified before care, claims prepared and followed to a decision, payments posted and every balance resolved, with an owner and a documented status at each handoff.",
      actions: [DEMO, { label: "See the eight stages", href: "#journey" }],
      visual: { kind: "none" },
      facts: ["Fully managed service", "Evidence for every check", "Starting with OpenDental"],
    },
    sections: [
      {
        kind: "journey",
        id: "journey",
        eyebrow: "The patient-to-payment journey",
        title: "Eight stages,",
        accent: "one accountable team.",
        intro: "Choose the stages in your agreed scope. Each one hands a clean, documented result to the next.",
        groups: JOURNEY,
      },
      {
        kind: "split",
        eyebrow: "Who does what",
        title: "Your practice keeps the care.",
        accent: "We own the agreed work.",
        intro: "Before we start, we agree the scope, the owners and how we report, so every handoff is clear.",
        practice: {
          title: "Your practice",
          items: [
            "Complete clinical records and signed documentation",
            "Provider details, payer contracts and system access",
            "Treatment and clinical decisions",
            "Timely answers when a record needs clarification",
          ],
        },
        team: {
          title: "ConvergeFlow team",
          items: [
            "Verification, authorization and registration review",
            "Coding review, claim preparation and submission",
            "Payment posting, denials and A/R follow-up",
            "Evidence, status and reporting on agreed measures",
          ],
        },
        note: "Every handoff gets an owner and a documented status.",
      },
      {
        kind: "cards",
        eyebrow: "In every stage",
        title: "What comes with",
        accent: "every service.",
        cols: 4,
        items: [
          { icon: "user", title: "A named owner", body: "Specialists own the work, not just a dashboard. Each item has someone accountable for it." },
          { icon: "fileCheck", title: "Evidence retained", body: "Portal captures, payer references, dates and submission proof, stored securely." },
          { icon: "flag", title: "Documented status", body: "Holds, rejections and open questions are visible, assigned and cleared." },
          { icon: "chart", title: "Agreed reporting", body: "Daily queues and weekly trends on measures we define with you." },
        ],
      },
    ],
    faq: [
      {
        q: "Is ConvergeFlow an outsourced billing service?",
        a: "Yes. ConvergeFlow is a fully managed revenue cycle service: our specialists own the agreed work, supported by workflow technology. The stages included are agreed with your practice before we start.",
      },
      {
        q: "Can we start with only some of the stages?",
        a: "Scope is agreed practice by practice and recorded so ownership is clear. You can start with the stages that cause the most rework, such as benefits verification or claim preparation.",
      },
      {
        q: "Which practice management systems do you work with?",
        a: "We start with OpenDental, where results land where your staff already look. If your practice uses another system, tell us during the demo and we will confirm what is supported.",
      },
      {
        q: "Do you guarantee collections or payment amounts?",
        a: "No. Automation supports staff review, and final payment always depends on payer adjudication. Targets are set from your baseline and agreed scope.",
      },
    ],
    cta: {
      title: "Bring your workflow.",
      accent: "We'll show you the stages we'd own.",
      body: "Tell us where claims stall today and we'll walk through how the team would handle it.",
      actions: [DEMO, { label: "See brochures", href: "/resources/" }],
    },
  },

  /* --------------------------------------------------------- registration */
  {
    route: "/services/patient-registration/",
    label: "Registration",
    group: "services",
    stage: stageOf("/services/patient-registration/"),
    seo: {
      title: "Patient Registration & Demographic Review | ConvergeFlow",
      description:
        "Legal name, date of birth, subscriber details and member ID verified before the visit, with duplicate records caught before they reach a claim.",
    },
    hero: {
      eyebrow: "Before care · Registration",
      title: "Clean claims start",
      accent: "at the front desk.",
      lead: "Our team reviews identity, subscriber and insurance details, provider and location context and possible duplicate records before the visit, so the record every later step depends on is accurate from the start.",
      actions: [DEMO, { label: "Next: Eligibility & benefits", href: "/services/eligibility-verification/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "registration",
          title: "Patient record review",
          ref: "Appointment · Thu 9:00",
          rows: [
            ["Patient", "Patient A"],
            ["Date of birth", "Verified"],
            ["Subscriber", "Self"],
            ["Member ID", "•••• 4821"],
            ["Provider · location", "Dr. B · Location 2"],
            ["Duplicate check", "No match found"],
          ],
          stamp: "Reviewed",
          note: "Name matches card ✓",
        },
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "What we review",
        title: "Prepare the patient",
        accent: "and insurance record.",
        cols: 2,
        items: [
          { icon: "id", title: "Identity", body: "Legal name and date of birth checked against the information on file and the insurance details provided." },
          { icon: "users", title: "Subscriber details", body: "Subscriber relationship and member ID verified, so the claim is filed for the right person under the right plan." },
          { icon: "building", title: "Provider and location", body: "Treating provider, service location, plan type and network participation confirmed for the visit." },
          { icon: "copy", title: "Duplicate records", body: "Likely duplicate accounts caught and flagged before they split a patient's history across records." },
        ],
      },
      {
        kind: "steps",
        eyebrow: "How a record moves",
        title: "From the schedule",
        accent: "to a clean record.",
        items: [
          { title: "Appointment scheduled", body: "New and returning patients on the schedule are queued for review ahead of the visit." },
          { title: "Details reviewed", body: "Identity, subscriber, member ID, provider and location are checked together." },
          { title: "Questions returned", body: "Anything missing or conflicting goes back to your team with a clear note." },
          { title: "Handed to benefits", body: "A clean record moves on to eligibility and benefits verification." },
        ],
      },
      {
        kind: "split",
        eyebrow: "Inputs and ownership",
        title: "What your practice supplies,",
        accent: "what we handle.",
        practice: {
          title: "Your practice",
          items: ["New-patient and appointment details", "Insurance card details or images", "Provider and location setup", "Answers when details conflict"],
        },
        team: {
          title: "ConvergeFlow team",
          items: ["Identity and insurance field review", "Duplicate and mismatch flags", "Provider, location and plan context", "A clean handoff to benefits verification"],
        },
      },
      {
        kind: "feature",
        eyebrow: "Estimates and the benefits handoff",
        title: "Registration feeds",
        accent: "every estimate.",
        body: [
          "Once identity and coverage details are right, verified benefits can be applied to help patients understand their share before care.",
          "An estimate helps a patient plan; it does not guarantee the final insurance payment.",
        ],
        photo: { src: "/assets/photos/v2/registration-feature.jpg", alt: "Front-desk coordinator scanning a patient's insurance card at reception", caption: "Right person, right plan" },
        link: { label: "Eligibility & benefits", href: "/services/eligibility-verification/" },
      },
    ],
    faq: [
      {
        q: "Do you change records in our practice system?",
        a: "We review the registration details your practice records and flag what needs correcting. How updates are made in your system is agreed during setup.",
      },
      {
        q: "Can you guarantee there will be no duplicate records?",
        a: "No one can promise that. We review for likely duplicates and flag them for resolution; preventing every duplicate also depends on how records are created in your system.",
      },
      {
        q: "Where do patient estimates come from?",
        a: "From verified benefits, expected fees and contract allowances, covered on the [eligibility page](/services/eligibility-verification/). Estimates help patients plan; final payment depends on payer adjudication.",
      },
    ],
    cta: {
      title: "Start every claim",
      accent: "with a clean record.",
      body: "Show us how new patients are scheduled today and we'll show you where registration review fits.",
      actions: [DEMO, { label: "Eligibility & benefits", href: "/services/eligibility-verification/" }],
    },
  },

  /* ---------------------------------------------------------- eligibility */
  {
    route: "/services/eligibility-verification/",
    label: "Eligibility & benefits",
    group: "services",
    stage: stageOf("/services/eligibility-verification/"),
    seo: {
      title: "Insurance Eligibility Verification Services | ConvergeFlow",
      description:
        "Coverage, deductibles, maximums, frequencies and waiting periods checked before the visit, with the payer reference, date and source recorded.",
    },
    hero: {
      eyebrow: "Before care · Eligibility & benefits",
      title: "Benefits verified",
      accent: "before the visit.",
      lead: "Active coverage is only the starting point. Our team checks the details that actually decide payment across payer portals, records the payer reference, date and source, and returns results where your staff already look, starting with OpenDental.",
      actions: [DEMO, { label: "Next: Prior authorization", href: "/services/prior-authorization/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "insurance",
          title: "Benefits verification",
          ref: "Carrier 1 · PPO",
          rows: [
            ["Coverage", "Active · effective 01/01"],
            ["Deductible", "Met"],
            ["Annual maximum", "Remaining recorded"],
            ["Frequency", "Prophy · 2 per year"],
            ["Waiting period", "None"],
            ["Payer order", "Primary"],
          ],
          stamp: "Verified",
          note: "Portal capture + ref saved",
        },
      },
    },
    sections: [
      {
        kind: "chips",
        eyebrow: "What a benefits check covers",
        title: "The details that",
        accent: "actually decide payment.",
        body: "We record the payer reference, date and source for every check, and recheck coverage when treatment or the service date changes.",
        chips: [
          "Effective dates",
          "Deductible",
          "Covered categories",
          "Coverage %",
          "Patient share",
          "Annual maximum remaining",
          "Waiting periods",
          "Age limits",
          "Exclusions",
          "Frequency limits",
          "Replacement limits",
          "Prior service dates",
          "Missing-tooth provisions",
          "Payer order",
        ],
        note: "Benefits vary by plan; the fields checked depend on the plan and the treatment planned.",
      },
      {
        kind: "evidence",
        eyebrow: "Evidence and system delivery",
        title: "Evidence for",
        accent: "every check.",
        body: "Results are returned with the evidence behind each answer, starting with OpenDental practices, and stored securely.",
        items: [
          { icon: "eye", title: "Portal capture", body: "What the payer portal showed at the time of the check." },
          { icon: "stamp", title: "Payer reference", body: "Reference number recorded against the patient and visit." },
          { icon: "clock", title: "Date and time", body: "When the check was run, so rechecks are easy to judge." },
          { icon: "link", title: "Source", body: "Which portal or channel the answer came from." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "When a specialist steps in",
        title: "People behind",
        accent: "the automation.",
        cols: 3,
        items: [
          { icon: "refresh", title: "Portal changes", body: "When a payer portal changes, specialists adjust the workflow and keep checks moving." },
          { icon: "key", title: "MFA prompts", body: "Portal changes, MFA (multi-factor authentication) prompts and unclear responses go to a specialist." },
          { icon: "alert", title: "Unclear responses", body: "Incomplete or conflicting answers are followed up and noted before the visit." },
        ],
      },
      {
        kind: "statement",
        text: "An estimate helps the patient plan.",
        accent: "It does not guarantee the final insurance payment.",
        sub: "Benefits vary by plan, and final payment always depends on payer adjudication.",
      },
    ],
    faq: [
      {
        q: "Does verified eligibility guarantee the claim will be paid?",
        a: "No. Verification tells you what the plan showed at the time of the check. Final payment depends on payer adjudication, the treatment provided and the plan's rules.",
      },
      {
        q: "When do you recheck coverage?",
        a: "When treatment or the service date changes, and on the schedule agreed for your practice, so checks run ahead of every visit.",
      },
      {
        q: "Which payers do you cover?",
        a: "Payers are mapped during setup, with each carrier routed to the right workflow. Bring your payer mix to the demo and we'll confirm coverage for your practice.",
      },
      {
        q: "Where do results appear?",
        a: "Starting with OpenDental, results land where staff already look. For other systems, we'll confirm the delivery method during scoping.",
      },
    ],
    cta: {
      title: "Know the patient's share",
      accent: "before they sit down.",
      body: "Bring your toughest payer and we'll walk through a benefits check end to end.",
      actions: [DEMO, { label: "Prior authorization", href: "/services/prior-authorization/" }],
    },
  },

  /* ---------------------------------------------------- prior authorization */
  {
    route: "/services/prior-authorization/",
    label: "Prior authorization",
    group: "services",
    stage: stageOf("/services/prior-authorization/"),
    seo: {
      title: "Prior Authorization & Predetermination | ConvergeFlow",
      description:
        "Authorization requirements checked, requests tracked to a decision, and reference numbers and valid dates recorded against the planned service.",
    },
    hero: {
      eyebrow: "Before care · Prior authorization",
      title: "Approvals tracked",
      accent: "against the service.",
      lead: "Where a plan requires approval, our team checks the requirement, prepares the request with the supporting information and follows it to a decision, recording the reference number and valid dates against the planned service.",
      actions: [DEMO, { label: "Next: Dental coding", href: "/services/dental-coding/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "auth",
          title: "Authorization tracker",
          ref: "Planned service · crown",
          rows: [
            ["Requirement", "Approval required"],
            ["Documentation", "Radiograph · narrative"],
            ["Submitted", "Payer portal"],
            ["Reference", "Recorded"],
            ["Valid dates", "Tracked to the visit"],
            ["Owner", "Authorization specialist"],
          ],
          stamp: "Tracked",
          note: "Flag before it expires",
        },
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "When authorization support applies",
        title: "Requirements checked",
        accent: "before care is booked.",
        cols: 2,
        items: [
          { icon: "clipboard", title: "Plans that require approval", body: "We check whether the plan requires approval for the planned service before the appointment." },
          { icon: "route", title: "Referrals", body: "Referral requirements are checked and tracked alongside the visit they apply to." },
          { icon: "refresh", title: "Changed treatment", body: "When the planned treatment or service date changes, the requirement is checked again." },
          { icon: "steth", title: "Medical crossover", body: "Cases that may qualify under medical benefits are handled with their own claim rules." },
        ],
      },
      {
        kind: "table",
        eyebrow: "Two different requests",
        title: "Authorization",
        accent: "versus predetermination.",
        head: ["", "Prior authorization", "Predetermination"],
        rows: [
          ["What it is", "Approval a plan requires before certain services", "An advance estimate of benefits for proposed treatment"],
          ["When it applies", "When the plan requires it", "When the plan offers it"],
          ["What you get", "A decision, reference number and valid dates", "An estimated benefit to plan the patient conversation"],
          ["What it does not do", "Guarantee payment", "Guarantee the final payment"],
        ],
      },
      {
        kind: "steps",
        eyebrow: "Request and decision",
        title: "Followed to",
        accent: "a decision.",
        items: [
          { title: "Requirement checked", body: "Plan rules confirmed for the specific service and date." },
          { title: "Request prepared", body: "Supporting information and documentation assembled from your records." },
          { title: "Submitted and followed", body: "Sent through the payer's channel and followed up until a decision." },
          { title: "Decision recorded", body: "Decision, reference number and valid dates tracked against the service." },
        ],
      },
      {
        kind: "split",
        eyebrow: "Shared responsibilities",
        title: "What remains",
        accent: "with the practice.",
        practice: {
          title: "Your practice",
          items: ["Clinical decisions and treatment plans", "Clinical documentation and records", "Provider clarification when needed", "Treatment conversations with patients"],
        },
        team: {
          title: "ConvergeFlow team",
          items: ["Requirement checks for planned services", "Request preparation and submission", "Follow-up to a decision", "References and valid dates tracked; expirations flagged"],
        },
      },
    ],
    faq: [
      { q: "Is an approval a guarantee of payment?", a: "No. An authorization confirms the plan approved the service; payment still depends on the claim, the plan's rules and payer adjudication." },
      {
        q: "What happens if an approval expires before the visit?",
        a: "Valid dates are tracked against the service and flagged ahead of time, so your team can reschedule or the request can be renewed.",
      },
      {
        q: "Do you request predeterminations too?",
        a: "Yes, where the plan offers them. A predetermination gives an advance benefit estimate for proposed treatment; it does not guarantee the final payment.",
      },
    ],
    cta: {
      title: "Approvals tracked",
      accent: "from request to decision.",
      body: "Walk us through your authorization list and we'll show you how each one would be tracked.",
      actions: [DEMO, { label: "Dental coding", href: "/services/dental-coding/" }],
    },
  },

  /* ------------------------------------------------------------- coding */
  {
    route: "/services/dental-coding/",
    label: "Dental coding & preparation",
    group: "services",
    stage: stageOf("/services/dental-coding/"),
    seo: {
      title: "Dental Coding & Claim Preparation (CDT) | ConvergeFlow",
      description:
        "CDT codes matched to the documented care, with tooth, surface, narrative and attachment detail checked before each dental claim is created.",
    },
    hero: {
      eyebrow: "Claims · Dental coding & preparation",
      title: "Every claim",
      accent: "matches the chart.",
      lead: "Our team reviews documented care before billing: the CDT (Current Dental Terminology) code in effect for the date of service, tooth and surface detail, narratives and attachments, so each claim reflects what the clinical record actually shows.",
      actions: [DEMO, { label: "Next: Claims submission", href: "/services/claims-submission/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "claim",
          title: "Claim preparation",
          ref: "Date of service · 03/14",
          rows: [
            ["Procedure", "Restoration · 2 surfaces"],
            ["Tooth", "30"],
            ["Surfaces", "M · O"],
            ["Chart", "Matches documented care"],
            ["Attachment", "Bitewing · labelled"],
            ["Narrative", "Findings + reason for care"],
          ],
          stamp: "Matched",
          note: "Tooth 30 MO ✓ chart",
        },
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Care documented before billing",
        title: "From the chart",
        accent: "to a ready claim.",
        cols: 2,
        items: [
          { icon: "clipboard", title: "Clinical documentation support", body: "Findings, tooth or area, surfaces, materials and supporting radiographs complete and signed before billing." },
          { icon: "book", title: "CDT coding", body: "The CDT edition in effect for the date of service, matched to the care actually documented." },
          { icon: "calendar", title: "Charge capture", body: "Completed appointments reconciled against the ledger, with multi-visit procedures billed on the right date." },
          { icon: "file", title: "Claim creation", body: "Subscriber, group, provider NPI, tax ID and procedure lines checked against reliable sources." },
        ],
      },
      {
        kind: "anatomy",
        eyebrow: "Tooth, surface and anatomy",
        title: "Anatomy that",
        accent: "matches the procedure.",
        body: "ADA Universal tooth numbers (1–32, A–T), treated surfaces (M, D, O, I, B, L) and quadrant or arch, whenever the code requires them.",
      },
      {
        kind: "cards",
        eyebrow: "Narratives and attachments",
        title: "What the payer needs",
        accent: "to see.",
        cols: 3,
        items: [
          { icon: "clip", title: "Attachments", body: "Legible, correctly labelled images linked to the claim they support." },
          { icon: "chat", title: "Narratives", body: "A clear narrative: tooth, findings, reason for care and history." },
          { icon: "search", title: "Pre-submission review", body: "Code version, anatomy, duplicates, attachments and authorizations validated; every hold assigned and cleared." },
        ],
      },
      {
        kind: "statement",
        text: "When a record is unclear, we ask the dentist.",
        accent: "Reimbursement preferences never determine the code.",
      },
    ],
    faq: [
      { q: "Who decides the code?", a: "The documented care does. When the record is unclear, our team sends a query to the dentist rather than choosing a code for reimbursement reasons." },
      { q: "Which CDT edition do you use?", a: "The CDT edition in effect for the date of service." },
      { q: "Do you handle specialty and crossover cases?", a: "Orthodontic, periodontic and prosthodontic workflows have their own requirements, and medical crossover cases are handled with their own claim rules, within your agreed scope." },
    ],
    cta: {
      title: "Catch the missing tooth number",
      accent: "before the payer does.",
      body: "Bring a recent rejection and we'll show you where preparation would have caught it.",
      actions: [DEMO, { label: "Claims submission", href: "/services/claims-submission/" }],
    },
  },

  /* ------------------------------------------------------------- claims */
  {
    route: "/services/claims-submission/",
    label: "Claims submission",
    group: "services",
    stage: stageOf("/services/claims-submission/"),
    seo: {
      title: "Claims Submission & Claim Status Follow-up | ConvergeFlow",
      description:
        "Claims scrubbed for required fields and payer rules, sent through payer-approved channels with proof of transmission, and followed to a decision.",
    },
    hero: {
      eyebrow: "Claims · Submission",
      title: "Every claim scrubbed,",
      accent: "sent and followed.",
      lead: "Prepared claims are checked against required fields, code edits and payer rules, sent through payer-approved channels with proof of every transmission, then followed through acknowledgments, rejections and claim status until the payer decides.",
      actions: [DEMO, { label: "Next: Payment posting", href: "/services/payment-posting/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "transmission",
          title: "Transmission record",
          ref: "Batch · claim ID linked",
          rows: [
            ["Format", "837D electronic claim"],
            ["Channel", "Approved clearinghouse"],
            ["Attachments", "Linked to claim"],
            ["Acknowledgment", "Accepted"],
            ["Claim status", "Awaiting payer decision"],
            ["Owner", "Claims specialist"],
          ],
          stamp: "Submitted",
          note: "Proof of transmission kept",
        },
      },
    },
    sections: [
      {
        kind: "steps",
        eyebrow: "From a prepared claim to a decision",
        title: "Scrubbed, sent,",
        accent: "followed.",
        items: [
          { title: "Scrub", body: "Required fields, code edits and payer rules checked before release." },
          { title: "Clear holds", body: "Every hold assigned to an owner and cleared, not left in a queue." },
          { title: "Transmit", body: "Sent through payer-approved channels; dental claims as 837D." },
          { title: "Acknowledge", body: "Clearinghouse and payer reports reviewed as they arrive." },
          { title: "Follow", body: "Open claims followed to a decision." },
        ],
      },
      {
        kind: "evidence",
        eyebrow: "Transmission evidence",
        title: "Proof of",
        accent: "every transmission.",
        body: "When someone asks whether a claim went out, the answer is on file.",
        items: [
          { icon: "layers", title: "Batch", body: "The submission batch the claim travelled in." },
          { icon: "file", title: "Claim ID", body: "The identifier used to follow the claim." },
          { icon: "clip", title: "Attachment linkage", body: "Which images and narratives went with it." },
          { icon: "inbox", title: "Acknowledgments", body: "Clearinghouse and payer acceptance or rejection reports." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "After transmission",
        title: "Rejections fixed",
        accent: "at the source.",
        cols: 3,
        items: [
          { icon: "alert", title: "Rejections", body: "Errors fixed at the source and the claim resubmitted, rather than patched downstream." },
          { icon: "search", title: "Claim status", body: "Open claims followed with the payer until a decision is recorded." },
          { icon: "users", title: "Secondary claims", body: "Payer order confirmed and primary results passed on before the final statement." },
        ],
      },
      {
        kind: "feature",
        eyebrow: "Channels and scope",
        title: "Supported channels,",
        accent: "confirmed up front.",
        body: [
          "Dental claims are sent as 837D through approved channels, with the batch, claim ID and attachment linkage retained.",
          "We confirm the clearinghouse and payer channels for your practice during setup, so nothing about submission is assumed.",
        ],
        photo: { src: "/assets/photos/v2/claims-feature.jpg", alt: "Billing specialist reviewing claims across two monitors with a printed checklist", caption: "Sent with proof" },
      },
    ],
    faq: [
      { q: "What is an 837D?", a: "The standard electronic format for dental claims. Medical claims use their own formats and channels, confirmed during scoping." },
      {
        q: "What's the difference between a rejection and a denial?",
        a: "A rejection happens before the payer processes the claim, usually because of a data error; we fix it at the source and resubmit. A denial is a payer decision after processing, handled through [denial management](/services/denial-management/).",
      },
      { q: "Do you submit secondary claims?", a: "Yes, within the agreed scope. Payer order is confirmed and the primary results passed on before the patient's final statement." },
    ],
    cta: {
      title: "Know where every claim is,",
      accent: "without chasing it.",
      body: "We'll show you the status trail a claim leaves from scrub to decision.",
      actions: [DEMO, { label: "Payment posting", href: "/services/payment-posting/" }],
    },
  },

  /* ------------------------------------------------------- payment posting */
  {
    route: "/services/payment-posting/",
    label: "Payment posting",
    group: "services",
    stage: stageOf("/services/payment-posting/"),
    seo: {
      title: "Payment Posting & Reconciliation (ERA/EOB) | ConvergeFlow",
      description:
        "ERAs and EOBs posted to the right claim and matched to EFT or check deposits, with every adjustment traceable and secondary coverage passed on.",
    },
    hero: {
      eyebrow: "Payments & follow-up · Payment posting",
      title: "Paid accurately,",
      accent: "every adjustment traceable.",
      lead: "ERAs and EOBs are posted to the right claim and matched to EFT or check receipts, payer decisions are reviewed against your contract, and secondary coverage is passed on before the patient is billed.",
      actions: [DEMO, { label: "Next: Denial management", href: "/services/denial-management/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "remittance",
          title: "Remittance posting",
          ref: "Illustrative claim",
          rows: [
            ["Charge", "$1,000"],
            ["Contract allowance", "$800"],
            ["Plan pays", "$400"],
            ["Patient share", "$400"],
            ["Adjustment", "$200 contractual"],
            ["Deposit", "Matched to EFT"],
          ],
          stamp: "Posted",
          note: "Adjustment never billed to patient",
        },
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Remittance and receipt matching",
        title: "Every payment",
        accent: "on the right claim.",
        cols: 4,
        items: [
          { icon: "inbox", title: "ERA posting", body: "Electronic remittance advice posted to the claim it pays." },
          { icon: "file", title: "EOB posting", body: "Paper explanations of benefits posted with the same care." },
          { icon: "coins", title: "Deposit matching", body: "Remittances matched to EFT or check receipts." },
          { icon: "flag", title: "Unposted receipts", body: "Anything unmatched appears in the daily queue with an owner." },
        ],
      },
      {
        kind: "balance",
        eyebrow: "Illustrative example",
        title: "How a dental",
        accent: "claim balances.",
        note: "Real liability depends on the plan, contract and applicable rules. A contractual adjustment is never billed to the patient.",
      },
      {
        kind: "cards",
        eyebrow: "Adjustments and exceptions",
        title: "Payer decisions,",
        accent: "checked against your contract.",
        cols: 3,
        items: [
          { icon: "scale", title: "Contract review", body: "Deductibles, limits, exclusions and alternate-benefit allowances reviewed against your contract." },
          { icon: "alert", title: "Underpayments", body: "Payments below what the contract supports go to denial and underpayment review." },
          { icon: "users", title: "Coordination of benefits", body: "Payer order confirmed and primary results passed on before the final statement." },
        ],
      },
    ],
    faq: [
      { q: "What's the difference between an ERA and an EOB?", a: "An EOB (explanation of benefits) is the payer's statement of how a claim was processed, sent on paper or electronically; an ERA (electronic remittance advice) is the electronic version used for posting. Both are posted to the claim they pay." },
      { q: "Is a contractual adjustment ever billed to the patient?", a: "No. A contractual adjustment is written off according to your contract and never billed to the patient." },
      { q: "Who handles balances that don't resolve at posting?", a: "Underpayments and denials go to denial management; remaining balances are worked through A/R follow-up." },
    ],
    cta: {
      title: "Deposits that match.",
      accent: "Adjustments you can trace.",
      body: "We'll walk through how a remittance is posted, matched and handed off.",
      actions: [DEMO, { label: "Denial management", href: "/services/denial-management/" }],
    },
  },

  /* ------------------------------------------------------------- denials */
  {
    route: "/services/denial-management/",
    label: "Denial management",
    group: "services",
    stage: stageOf("/services/denial-management/"),
    seo: {
      title: "Denial Management & Appeals | ConvergeFlow",
      description:
        "Denials classified by root cause, then corrected, reconsidered or appealed on deadline, with underpayments reviewed against your payer contract.",
    },
    hero: {
      eyebrow: "Payments & follow-up · Denial management",
      title: "Denials worked to the root cause,",
      accent: "on deadline.",
      lead: "When a payer denies or underpays a claim, our team classifies the root cause, then corrects, reconsiders or appeals within the payer's deadline, with every step documented and owned.",
      actions: [DEMO, { label: "Next: A/R & reporting", href: "/services/ar-management/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "denial",
          title: "Denial review",
          ref: "Payer response received",
          rows: [
            ["Payer reason", "Frequency limit"],
            ["Root cause", "Prior service date"],
            ["Action", "Corrected claim"],
            ["Deadline", "Tracked"],
            ["Evidence", "History + narrative"],
            ["Owner", "Denials specialist"],
          ],
          stamp: "Owned",
          note: "File before the deadline",
        },
      },
    },
    sections: [
      {
        kind: "steps",
        eyebrow: "Understand the response",
        title: "From payer response",
        accent: "to a decision.",
        items: [
          { title: "Read the response", body: "The payer's reason reviewed against the claim and the record." },
          { title: "Classify the cause", body: "Root cause classified so the fix, and the pattern, are clear." },
          { title: "Choose the path", body: "Correct, reconsider or appeal, based on what caused it." },
          { title: "File on deadline", body: "Submitted within the payer's deadline with supporting evidence." },
          { title: "Track to a decision", body: "Followed until the payer decides; the outcome is documented." },
        ],
      },
      {
        kind: "table",
        eyebrow: "Three paths",
        title: "Correction, reconsideration",
        accent: "or appeal.",
        head: ["Path", "When it fits", "What we send"],
        rows: [
          ["Corrected claim", "The claim data was wrong or incomplete", "A corrected claim with the right information"],
          ["Reconsideration", "The payer can review again with added information", "The request with the missing information"],
          ["Appeal", "The decision should be formally disputed", "Documentation and narrative, within the payer's deadline"],
        ],
        note: "Process names and deadlines vary by payer.",
      },
      {
        kind: "cards",
        eyebrow: "Ownership and evidence",
        title: "Every denial has",
        accent: "an owner.",
        cols: 4,
        items: [
          { icon: "user", title: "Named owner", body: "One specialist accountable for each open denial." },
          { icon: "clock", title: "Deadlines tracked", body: "Payer deadlines recorded and worked ahead of time." },
          { icon: "fileCheck", title: "Evidence kept", body: "What was sent, when and with which documents." },
          { icon: "scale", title: "Underpayments", body: "Payments below the contract reviewed and pursued." },
        ],
      },
      {
        kind: "statement",
        text: "Each denial in your agreed scope is classified, given an owner and followed to a documented decision.",
        accent: "Outcomes remain payer-dependent.",
        sub: "No recovery or reimbursement outcome is guaranteed.",
      },
    ],
    faq: [
      { q: "Can you guarantee overturned denials?", a: "No. We classify the cause and pursue the right path on deadline, but the decision belongs to the payer." },
      { q: "Do you also help prevent denials?", a: "Yes. Verification, coding review and claim scrubbing catch many dental denial causes upstream, and weekly reviews show which causes recur." },
      { q: "How will we see denial trends?", a: "Denial causes are reviewed weekly with your team, alongside aging balances, underpayments and attachment delays." },
    ],
    cta: {
      title: "Appeals filed on deadline,",
      accent: "with an owner on each.",
      body: "Bring your open denials and we'll show you how each would be classified and owned.",
      actions: [DEMO, { label: "A/R & reporting", href: "/services/ar-management/" }],
    },
  },

  /* ------------------------------------------------------------------ AR */
  {
    route: "/services/ar-management/",
    label: "A/R & reporting",
    group: "services",
    stage: stageOf("/services/ar-management/"),
    seo: {
      title: "A/R Follow-up & Revenue Cycle Reporting | ConvergeFlow",
      description:
        "Accounts receivable worked by age and value, every payer contact documented, patients billed only for verified balances and credits resolved.",
    },
    hero: {
      eyebrow: "Payments & follow-up · A/R & reporting",
      title: "Every balance closed",
      accent: "with a documented owner.",
      lead: "Aging is worked by age and value, every payer contact is documented, patients are billed only for verified amounts and credits are resolved, with reporting on measures we agree together.",
      actions: [DEMO, { label: "How it works", href: "/how-it-works/" }],
      visual: {
        kind: "document",
        doc: {
          kind: "aging",
          title: "Aging worklist",
          ref: "Worked by age and value",
          rows: [
            ["Bucket", "61–90 days"],
            ["Payer contact", "Documented"],
            ["Next action", "Resubmit with attachment"],
            ["Patient balance", "Verified before statement"],
            ["Credit", "Reconciled"],
            ["Owner", "A/R specialist"],
          ],
          stamp: "Resolved",
          note: "Closed only when resolved",
        },
      },
    },
    sections: [
      {
        kind: "cards",
        eyebrow: "Work balances by age and priority",
        title: "Aging worked",
        accent: "by priority.",
        cols: 2,
        items: [
          { icon: "chart", title: "Aging priorities", body: "Balances worked by age and value, so the oldest and largest don't wait." },
          { icon: "phone", title: "Payer contacts", body: "Every payer contact documented with the next action and its owner." },
          { icon: "users", title: "Secondary coverage", body: "Secondary balances followed after primary results are passed on." },
          { icon: "file", title: "Patient statements", body: "Clear statements; patients billed only for verified amounts." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "Credits, refunds and closure",
        title: "Closed",
        accent: "cleanly.",
        cols: 3,
        items: [
          { icon: "coins", title: "Credits", body: "Credits reconciled so balances reflect what actually happened." },
          { icon: "refresh", title: "Refunds", body: "Refunds identified and resolved within the agreed scope." },
          { icon: "check", title: "Account closure", body: "The cycle ends only when the account has a documented financial resolution." },
        ],
      },
      {
        kind: "cadence",
        eyebrow: "Reporting definitions and cadence",
        title: "Reporting",
        accent: "you can act on.",
        items: [
          { icon: "clock", title: "Daily", body: "Incomplete records, claims on hold, rejections and unposted receipts." },
          { icon: "calendar", title: "Weekly", body: "Denial causes, aging balances, underpayments and attachment delays." },
          { icon: "chart", title: "Defined measures", body: "Days in A/R, denial rate, net collection rate, charge lag, claim acceptance and verification success by payer, defined with you." },
        ],
        note: "Targets are set from your baseline and agreed scope. No reimbursement outcome is guaranteed.",
      },
    ],
    faq: [
      { q: "What does account closure mean?", a: "An account is closed only when it has a documented financial resolution: paid, adjusted according to contract, billed to the patient for a verified amount, or refunded." },
      { q: "Which reports will we receive?", a: "Daily queues and weekly trends, on measures defined with you during setup, such as days in A/R, denial rate and net collection rate." },
      { q: "Do you contact our patients?", a: "Patient statements are part of the service; the extent of patient-facing communication is agreed during setup." },
    ],
    cta: {
      title: "Know where every balance stands,",
      accent: "every week.",
      body: "We'll show you the daily queue and weekly review your team would receive.",
      actions: [DEMO, { label: "How it works", href: "/how-it-works/" }],
    },
  },
];
