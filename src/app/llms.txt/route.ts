import { ROBOTS, SITE_URL } from "@/lib/site";

/**
 * llms.txt: a plain-language summary and key URLs for AI tools. Served only on the
 * production origin (confirmed origin + indexing allowed); 404 on staging/preview so
 * drafts are not summarised. (CF-045)
 */
export function GET() {
  if (!SITE_URL || !ROBOTS.index) {
    return new Response("Not found", { status: 404 });
  }

  const body = `# ConvergeFlow

> ConvergeFlow is a managed revenue cycle management (RCM) service for dental and medical practices in the US. A specialist team handles verification, coding, claims, payments and follow-up, supported by workflow technology, starting with OpenDental practices. Final payment always depends on payer adjudication; no reimbursement outcome is guaranteed.

## Services
- [Patient registration and demographic review](${SITE_URL}/services/patient-registration/): Legal name, date of birth, subscriber details and member ID verified before the visit, with duplicate records caught before they reach a claim.
- [Insurance eligibility and benefits verification](${SITE_URL}/services/eligibility-verification/): Coverage, deductibles, maximums, frequencies and waiting periods checked before the visit, with the payer reference, date and source recorded.
- [Prior authorization and predetermination](${SITE_URL}/services/prior-authorization/): Authorization requirements checked, requests tracked to a decision, and reference numbers and valid dates recorded against the planned service.
- [Dental coding and claim preparation](${SITE_URL}/services/dental-coding/): CDT codes matched to the documented care, with tooth, surface, narrative and attachment detail checked before each dental claim is created.
- [Claims submission and claim status follow-up](${SITE_URL}/services/claims-submission/): Claims scrubbed for required fields and payer rules, sent through payer-approved channels with proof of transmission, and followed to a decision.
- [Payment posting and reconciliation](${SITE_URL}/services/payment-posting/): ERAs and EOBs posted to the right claim and matched to EFT or check deposits, with every adjustment traceable and secondary coverage passed on.
- [Denial management and appeals](${SITE_URL}/services/denial-management/): Denials classified by root cause, then corrected, reconsidered or appealed on deadline, with underpayments reviewed against your payer contract.
- [Accounts receivable follow-up and reporting](${SITE_URL}/services/ar-management/): Accounts receivable worked by age and value, every payer contact documented, patients billed only for verified balances and credits resolved.

## Who we help
- [Dental practices](${SITE_URL}/industries/dental/): Dental billing, fully managed: benefits verified before treatment, CDT codes matched to the chart and balances resolved with a named owner.
- [DSOs and group practices](${SITE_URL}/industries/dso/): Managed revenue cycle work for DSOs and group practices, with location and central responsibilities, escalation and reporting agreed up front.
- [Medical practices](${SITE_URL}/industries/medical/): Managed revenue cycle support for medical practices: coverage verified before the visit, claims scrubbed and sent, and payments and A/R followed up.

## Company
- [How it works](${SITE_URL}/how-it-works/)
- [Security and data handling](${SITE_URL}/technology/security/)
- [Pricing](${SITE_URL}/pricing/)
- [Contact](${SITE_URL}/contact/): Hari Patel, hari@softqubes.com, +1 (512) 733-3085
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
