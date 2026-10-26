/** Demo request form (V2: concise; name, email and organization required). */
export const DEMO_FORM = {
  title: "Request a demo",
  fields: [
    { label: "First name", required: true },
    { label: "Last name", required: true },
    { label: "Work email", required: true },
    { label: "Practice or organization", required: true },
    { label: "Practice type", required: false },
    { label: "Primary PMS or EHR", required: false },
    { label: "What would you like to discuss?", required: false },
  ],
  submit: "Request a Demo",
};

export const PRACTICE_TYPES = ["Dental practice", "DSO or group practice", "Medical practice", "Other"];

/** Shown beside every demo form until delivery is configured and approved. */
export const FORM_NOTICE =
  "Online requests are not enabled yet. The form will open once request delivery and the privacy notice are confirmed. Until then, email hari@softqubes.com.";
