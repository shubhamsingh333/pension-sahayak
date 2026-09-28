import type { ApiErrorCode } from "@/lib/api-errors";
import type { CentreFilter, CentreType } from "@/lib/service-centres";
import type { GrievanceCategory, GrievanceStatus } from "@/lib/validation";
import type {
  Branch,
  PensionStatus,
  WorkflowContent,
  WorkflowSlug,
} from "@/lib/workflows";

/** Source dictionary: its shape is the `Dictionary` type every language must match. */
export const en = {
  meta: {
    title: "Pension Sahayak | A clearer next step",
    titleTemplate: "%s | Pension Sahayak",
    description:
      "A DAD Day demonstration of accessible pension guidance, sample workflows and grievance tracking.",
  },
  topBar: {
    skipToContent: "Skip to content",
    exhibition: "DAD DAY EXHIBITION",
    concept: "A pension support concept",
    largerText: "Toggle larger text",
    language: "Language",
  },
  header: {
    brand: "Pension Sahayak",
    tagline: "Here for every next step",
    homeLabel: "Pension Sahayak home",
    navLabel: "Main navigation",
    help: "Pension help",
    centres: "Service centres",
    grievances: "Grievances",
    track: "Track a request",
  },
  footer: {
    heading: "A little guidance. A clearer next step.",
    disclaimer:
      "DAD Day prototype · Demo only. Not an official government service. Workflows are illustrative and do not determine eligibility or submit official applications.",
    about: "About this demo",
    help: "Get help",
  },
  home: {
    badge: "DAD Day prototype · Demo only",
    title: "Your service matters.",
    titleHighlight: "So does your peace of mind.",
    intro:
      "Pension questions can feel overwhelming. Find simple guidance, prepare your documents, and take the next step with confidence.",
    findHelp: "Find the help you need",
    track: "Track a request",
    privacyNote: "No real PPO, bank or identity details needed",
    hero: {
      label: "With you, step by step",
      cardTitle: "A clearer path forward",
      cardSubtitle: "Your pension support journey",
      steps: [
        "Tell us what you need",
        "Get a simple checklist",
        "Choose your next step",
      ],
      taglineTop: "For pensioners.",
      taglineBottom: "For families. For every next chapter.",
    },
    branchesLabel: "Guidance across the defence community",
    servicesEyebrow: "Start with what matters to you",
    servicesTitle: "How can we help today?",
    servicesAside: "Simple steps. At your own pace.",
    grievanceCard: {
      title: "Raise a grievance",
      description:
        "Describe a sample concern and follow its saved request status.",
      cta: "We’re here to guide you",
    },
    centresBanner: {
      title: "Prefer a helping hand?",
      description:
        "Search {count} official SPARSH service centres, from Defence Accounts offices to partner banks.",
      cta: "Find a service centre",
    },
    faqEyebrow: "A few helpful answers",
    faqTitle: "Before you get started",
    faqs: [
      {
        question: "Is this an official pension portal?",
        answer:
          "No. This is a DAD Day prototype demonstrating possible pension support journeys. It has no connection to government systems.",
      },
      {
        question: "Should I enter my real information?",
        answer:
          "Please use fictional details only. Do not enter real PPO numbers, Aadhaar, account numbers or upload personal documents.",
      },
      {
        question: "What happens when I submit a grievance?",
        answer:
          "A demo record is saved in the demo database and you receive a tracking reference. No government office receives it, and its status does not change automatically.",
      },
    ],
  },
  help: {
    eyebrow: "Pension help",
    title: "Let’s find your next step.",
    description:
      "Choose a topic to get a guided, illustrative checklist. No sign-in or personal documents needed.",
    workflowEyebrow: "Guided pension support · demo",
  },
  workflows: {
    "family-pension": {
      title: "Family pension",
      description:
        "Support after the loss of a pensioner. Find your next steps, at your pace.",
      tag: "Guided support",
      documents: [
        "Sample death certificate reference",
        "Sample family relationship record",
        "Existing demo PPO reference",
      ],
      steps: [
        "Review the family pension details recorded in the PPO.",
        "Prepare the illustrative documents below.",
        "Ask the relevant pension authority to confirm eligibility and its current process.",
      ],
    },
    "pension-not-received": {
      title: "Pension not received",
      description:
        "Work through a missed payment with a simple, guided checklist.",
      tag: "Payment support",
      documents: [
        "Sample pension payment month",
        "Redacted sample bank statement",
        "Demo PPO reference",
      ],
      steps: [
        "Check the expected payment month and sample bank entry.",
        "Check whether a life certificate acknowledgement is available.",
        "Prepare a demo grievance with the payment month and issue.",
      ],
    },
    "life-certificate": {
      title: "Life certificate",
      description:
        "Understand the preparation steps for your next life certificate.",
      tag: "Annual support",
      documents: ["Sample PPO reference", "Sample previous acknowledgement"],
      steps: [
        "Review the recorded life certificate status.",
        "Ask the authorised provider about accepted submission options.",
        "Keep the acknowledgement after completing the official process.",
      ],
    },
    "ppo-help": {
      title: "PPO / e-PPO help",
      description:
        "Explore a sample pension record and understand what to check.",
      tag: "Pension records",
      documents: ["Demo PPO reference", "Sample service details"],
      steps: [
        "Try the sample lookup using DEMO-PPO-12345.",
        "Review the service and sample pension status.",
        "Contact the issuing authority for any actual correction or copy.",
      ],
    },
    "update-details": {
      title: "Update your details",
      description: "Prepare for a change to bank or personal information.",
      tag: "Profile support",
      documents: [
        "Sample details to change",
        "Redacted sample supporting document",
      ],
      steps: [
        "Identify the information that needs updating.",
        "Confirm the authorised channel and supporting documents.",
        "Keep the acknowledgement and check the official record later.",
      ],
    },
  } satisfies Record<WorkflowSlug, WorkflowContent>,
  branches: {
    army: "Army",
    navy: "Navy",
    "air-force": "Air Force",
    "defence-civilian": "Defence Civilian",
  } satisfies Record<Branch, string>,
  statuses: {
    receiving: "Receiving pension",
    "not-started": "Pension not started",
    "not-sure": "Not sure",
  } satisfies Record<PensionStatus, string>,
  checklist: {
    branchReference: "{branch} service reference (sample)",
    statusItems: {
      receiving: "Sample recent pension credit reference",
      "not-started": "Sample sanction / application acknowledgement",
      "not-sure": "Any sample pension correspondence available",
    } satisfies Record<PensionStatus, string>,
  },
  workflow: {
    progressLabel: "Journey progress",
    stepLabels: ["Your situation", "Your checklist", "Next steps"],
    situationTitle: "Tell us a little about the situation",
    situationHint:
      "These choices tailor your sample checklist. They do not verify eligibility.",
    branchLabel: "Service branch",
    statusLabel: "Current pension status",
    checklistTitle: "Your preparation checklist",
    checklistHint: "{branch} · {status}. Tick items as you review them.",
    reviewed: "{count} of {total} reviewed",
    noUpload:
      "No documents are uploaded or stored. You can continue even if some items are unavailable.",
    doneTitle: "You have a clearer next step.",
    download: "Download checklist",
    createGrievance: "Create a demo grievance",
    exploreCentres: "Find a service centre near you",
    back: "Back",
    buildChecklist: "Build my checklist",
    seeNextSteps: "See next steps",
    startAgain: "Start again",
    takeYourTime: "Take your time.",
    takeYourTimeBody:
      "You don’t need to have every answer. Start with what you know and keep the checklist for later.",
    safeTitle: "A safe place to explore",
    safeBody:
      "This is a demo. Use fictional references only. Actual documents, eligibility and processes must be confirmed with the relevant authority.",
    fileHeader: "PENSION SAHAYAK · DAD DAY DEMO",
    fileDisclaimer:
      "Illustrative checklist only. Confirm actual requirements with the authorised provider.",
  },
  ppo: {
    title: "Explore a sample PPO record",
    description:
      "This lookup uses mock data and never queries government systems.",
    label: "Demo PPO reference",
    submit: "Look up sample record",
    busy: "Looking up…",
    lifeCertificate: "Life certificate: {value}",
    recordStatuses: { active: "Active · demo record" },
    lifeCertificateStatuses: { acknowledged: "Acknowledged · illustrative" },
  },
  grievancePage: {
    eyebrow: "Grievance & tracking · demo",
    title: "Every concern deserves clarity.",
    description:
      "Try the complete journey: describe a sample issue, save it, and use your reference to check its status.",
  },
  grievanceForm: {
    eyebrow: "Create a request",
    title: "Tell us what happened",
    intro:
      "Use a fictional example. This saves a demo grievance to the demo database, without contacting any government office.",
    savedTitle: "Demo grievance saved successfully.",
    statusLine: "Status: {status}",
    keepReference: "KEEP YOUR TRACKING REFERENCE",
    referenceHint:
      "This reference gives access to the demo status. Keep a copy before leaving this page.",
    trackThis: "Track this request",
    createAnother: "Create another demo request",
    categoryLabel: "What is this about?",
    subjectLabel: "Short summary",
    subjectPlaceholder: "e.g. Sample pension payment delayed",
    descriptionLabel: "Describe the sample issue",
    descriptionHint:
      "20–1,500 characters. Do not include real names, phone numbers, PPO, Aadhaar or bank details.",
    descriptionPlaceholder:
      "Describe a fictional situation to try the grievance flow.",
    consent:
      "I confirm this contains fictional information only and understand this is not an official grievance.",
    submit: "Submit demo grievance",
    busy: "Saving…",
  },
  tracker: {
    eyebrow: "Already have a reference?",
    title: "Track your request",
    intro: "Enter the tracking reference from a saved demo grievance.",
    label: "Tracking reference",
    submit: "Check status",
    busy: "Checking…",
    resultTitle: "{status} · Demo request",
    category: "Category: {category}",
    saved: "Saved: {date}",
    resultNote:
      "There is no official processing or automatic status progression in this demo.",
    footnote:
      "No tracking reference? Create a demo request first. Lost references cannot be recovered through this prototype.",
  },
  categories: {
    Payment: "Payment",
    "Family pension": "Family pension",
    "Life certificate": "Life certificate",
    PPO: "PPO",
    Other: "Other",
  } satisfies Record<GrievanceCategory, string>,
  grievanceStatuses: { Received: "Received" } satisfies Record<
    GrievanceStatus,
    string
  >,
  centresPage: {
    eyebrow: "A helping hand nearby",
    title: "Find a SPARSH service centre.",
    description:
      "Search {count} official SPARSH service centres run by the Defence Accounts Department and partner banks, by city, district, PIN code or name.",
  },
  centreSearch: {
    label: "Search by city, district, PIN code or name",
    placeholder: "Try Pune, 411001 or PCDA",
    hint: "Names and addresses are shown in English, as published by SPARSH.",
    filterLabel: "Show",
    filters: {
      all: "All",
      defence: "Defence Accounts offices",
      bank: "Partner banks",
    } satisfies Record<CentreFilter, string>,
    found: {
      one: "{count} service centre found",
      other: "{count} service centres found",
    },
    showing: "showing {shown}",
    searching: "Searching…",
    badges: { defence: "Defence Accounts office", bank: "Partner bank" } satisfies Record<CentreType, string>,
    phone: "Phone: {phone}",
    map: "Open in Maps",
    more: "Show more",
    empty: "No service centres match your search.",
    clear: "Clear search",
    source: "Source: SPARSH Service Centre Locator, updated {date}.",
    callAhead: "Please call before visiting. Timings and services can change.",
  },
  about: {
    eyebrow: "DAD Day prototype",
    title: "Built to make the next step simpler.",
    description:
      "Pension Sahayak is an independent demonstration of a more approachable pension-help experience.",
    worksTitle: "What works in this prototype",
    worksBody:
      "Guided pension journeys, downloadable sample checklists, the official SPARSH service-centre directory, a mock PPO lookup, and saved grievances with tracking references.",
    notice:
      "There are no real government API connections. This is not endorsed by DAD, PCDA, SPARSH or any government agency. No official application, payment, grievance or appointment is submitted.",
    dataTitle: "Your demo information",
    dataBody:
      "Grievance category, subject, description, timestamp and status are stored in the demo MongoDB database. No documents are collected. Use fictional information only. Checklists remain in the browser until downloaded and reset on reload.",
    launchTitle: "Before a public launch",
    launchBody:
      "This prototype needs authenticated access, role-based case management, abuse protection, retention controls, security review, verified content, and approved integrations before it can handle real users or personal information.",
  },
  notFound: {
    title: "Let’s get you back on track.",
    body: "This page could not be found.",
    cta: "Explore pension help",
  },
  errorPage: {
    title: "Something interrupted this page.",
    body: "Please try again. Your saved demo grievances are not affected.",
    retry: "Try again",
  },
  loading: "Preparing your next step…",
  errors: {
    generic: "Something went wrong. Please try again.",
    cross_origin: "Requests from other sites are not allowed.",
    unsupported_media_type: "The request was not sent in the right format.",
    body_required: "The request is missing its details.",
    payload_too_large: "Your request is too large. Please shorten the description.",
    invalid_json: "The request could not be read. Please try again.",
    invalid_request: "Please check the form and try again.",
    invalid_category: "Choose a category from the list.",
    invalid_subject: "Use 5–100 characters for the short summary.",
    invalid_description: "Describe the issue in 20–1,500 characters.",
    invalid_demo_consent:
      "Please confirm that you are using fictional information.",
    invalid_ppo: "Use a demo reference such as DEMO-PPO-12345.",
    ppo_not_found: "No sample record found. Try DEMO-PPO-12345.",
    invalid_reference: "Enter a valid tracking reference.",
    grievance_not_found: "No demo grievance found for this reference.",
    service_unavailable:
      "The database is unavailable right now. Please try again later. Nothing was changed.",
  } satisfies Record<ApiErrorCode | "generic", string>,
};

export type Dictionary = typeof en;
