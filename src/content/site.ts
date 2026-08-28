/**
 * Every piece of copy on the page lives here.
 *
 * Nothing user-visible is hardcoded in a component. The headline and the
 * problem copy get rewritten after customer interviews — that must stay a
 * one-file change.
 */

/* ------------------------------------------------------------------ types */

export type Exchange = {
  langCode: 'tl' | 'hi' | 'ar' | 'ur' | 'en';
  /** Chip label, written in its own script. */
  label: string;
  dir: 'ltr' | 'rtl';
  /** Font stack for this script, resolved from the CSS custom properties. */
  fontVar: string;
  question: string;
  /** Newline-separated lines; each renders as its own line in the bubble. */
  answer: string;
  /** e.g. 'Menu spec — Sea bass v4'. `null` renders as an escalation. */
  source: string | null;
};

export type SliderSpec = {
  id: string;
  key: 'locations' | 'staffPerLocation' | 'turnoverPct';
  label: string;
  min: number;
  max: number;
  step: number;
  /** Value shown next to the label and announced as aria-valuetext. */
  format: (value: number) => string;
};

export type Step = { number: string; title: string; body: string };
export type Founder = { name: string; role: string; bio: string; photo: string };
export type FaqItem = { question: string; answer: string };

/* ------------------------------------------------------------------- meta */

export const meta = {
  title: 'Novi — staff answers, in their language',
  description:
    'New kitchen and floor staff get answers from your own SOPs, in their own language, on their own phone. Built for multi-site restaurant groups in Dubai.',
  locale: 'en',
} as const;

export const nav = {
  wordmark: 'Novi',
  homeLabel: 'Novi — back to top',
  ctaLabel: 'Book 15 minutes',
  skipToContent: 'Skip to content',
} as const;

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Staff answers, in their language',
  headline: 'Your staff have questions.',
  headlineMuted: 'Your managers have a dinner service.',
  body: 'New kitchen and floor staff get answers from your own SOPs, in their own language, on their own phone. No app, no login, no interruption to the pass.',
  ctaLabel: 'Book 15 minutes',
  ctaNote: 'Straight to a founder. No demo deck.',
} as const;

/* ------------------------------------------------------------- phone demo */

export const phoneDemo = {
  deviceLabel: 'Novi · Al Bahar — Marina',
  /** Labelled as an example: Novi has no customers yet. */
  exampleNote: 'Example content · Al Bahar Hospitality',
  chipGroupLabel: 'Choose a language for the example exchange',
  escalatedSourceLabel: 'No source found — escalated',
  threadLabel: 'Example conversation between a staff member and Novi',
} as const;

/**
 * Order is Tagalog · हिन्दी · العربية · اردو · English.
 */
export const exchanges: readonly Exchange[] = [
  {
    langCode: 'tl',
    label: 'Tagalog',
    dir: 'ltr',
    fontVar: 'var(--font-body)',
    question: 'Ano ang sahog ng sea bass? May nuts ba?',
    answer:
      'Sea bass fillet, lemon butter sauce, capers, parsley, at roasted fennel.\nWalang tree nuts sa dish na ito. Pero niluluto ito sa shared fryer kasama ng mga item na may gluten — sabihin ito sa guest kung may allergy.',
    source: 'Menu spec — Sea bass v4',
  },
  {
    langCode: 'hi',
    label: 'हिन्दी',
    dir: 'ltr',
    fontVar: 'var(--font-devanagari)',
    question: 'POS pe modifier kaise add karte hain?',
    answer:
      '1. Item select karein, phir MOD button dabayein.\n2. List se modifier chunein — No onion, Extra spicy, Sauce on side.\n3. SEND dabayein taaki kitchen ticket par print ho jaye.',
    source: 'POS notes — Micros v3',
  },
  {
    langCode: 'ar',
    label: 'العربية',
    dir: 'rtl',
    fontVar: 'var(--font-arabic)',
    question: 'ما هو إجراء إغلاق البار؟',
    answer:
      '١. أغلق نظام نقاط البيع واطبع تقرير المبيعات.\n٢. غطِّ ورتّب جميع الزجاجات المفتوحة.\n٣. أفرغ ونظّف مصائد الثلج والمصافي.\n٤. سجّل درجة حرارة الثلاجة وسلّم المفاتيح للمدير.',
    source: 'Closing checklist — Bar',
  },
  {
    langCode: 'ur',
    label: 'اردو',
    dir: 'rtl',
    fontVar: 'var(--font-arabic)',
    question: 'کیا فرائر کا تیل روزانہ بدلنا ہوتا ہے؟',
    answer:
      'نہیں۔ ہر رات تیل کو چھان کر صاف کریں اور فرائر کی صفائی کریں۔\nتیل ہفتے میں دو بار یا رنگ گہرا ہونے پر بدلا جاتا ہے — شفٹ مینیجر سے تصدیق کریں۔',
    source: 'Closing checklist — Kitchen',
  },
  {
    langCode: 'en',
    label: 'English',
    dir: 'ltr',
    fontVar: 'var(--font-body)',
    question: 'Can I swap a shift with someone?',
    answer:
      "Yes — find cover from the same section, then get your shift manager to approve it at least 48 hours ahead.\nThe swap isn't valid until it shows on the rota.",
    source: 'Staff handbook — Rota & shifts',
  },
];

/* -------------------------------------------------------- cost calculator */

export const costCalculator = {
  eyebrow: 'The cost nobody books',
  heading: 'What turnover is costing you this year',
  body: "Restaurant turnover runs around 75% a year, and over 100% in quick service. Replacing one hourly employee costs $2,000–$5,000 once you count recruiting, training time and the weeks before they're at full speed. None of it appears as a line on your P&L, which is why it goes unmanaged.",
  statLead: 'Only ',
  statValue: '12%',
  statTrail: ' of employees say their company onboards them well.',
  sources: 'Sources: industry reporting 2025–26; Gallup; Cornell.',
  docketTitle: 'Turnover cost — annual',
  docketFooter: 'Not a line on your P&L',
  controlsLabel: 'Turnover cost assumptions',
  rowLabels: {
    locations: 'Locations',
    staffPerLocation: 'Staff/site',
    turnoverPct: 'Turnover',
    replacements: 'Replacements/yr',
    costLow: 'Cost @ $2,000',
    costHigh: 'Cost @ $5,000',
  },
} as const;

/** Per-replacement cost band. Output is always shown as a range. */
export const REPLACEMENT_COST_LOW = 2000;
export const REPLACEMENT_COST_HIGH = 5000;

export const sliders: readonly SliderSpec[] = [
  {
    id: 'novi-locations',
    key: 'locations',
    label: 'Locations',
    min: 1,
    max: 25,
    step: 1,
    format: (v) => String(v),
  },
  {
    id: 'novi-staff',
    key: 'staffPerLocation',
    label: 'Staff per location',
    min: 10,
    max: 80,
    step: 5,
    format: (v) => String(v),
  },
  {
    id: 'novi-turnover',
    key: 'turnoverPct',
    label: 'Annual turnover',
    min: 20,
    max: 120,
    step: 5,
    format: (v) => `${v}%`,
  },
];

export const sliderDefaults = {
  locations: 8,
  staffPerLocation: 30,
  turnoverPct: 70,
} as const;

/* ----------------------------------------------------------- how it works */

export const howItWorks = {
  eyebrow: 'How it works',
  heading: 'Live in a week, from what you already have',
  steps: [
    {
      number: '01',
      title: 'You send what you already have',
      body: "Menu specs, allergen matrix, opening and closing checklists, POS notes. Photos of printed sheets and voice notes are fine — most of it isn't in clean documents and we don't expect it to be.",
    },
    {
      number: '02',
      title: 'We build it for one of your sites',
      body: 'Under a week. You get a QR poster for the back of house.',
    },
    {
      number: '03',
      title: 'Your staff ask. You see what they asked',
      body: 'A weekly report: what came up, what went unanswered, usage per site.',
    },
  ] satisfies readonly Step[],
} as const;

/* ------------------------------------------------------------------ trust */

export const trust = {
  eyebrow: 'Refusal is the feature',
  heading: "Why it doesn't make things up",
  lead: 'An assistant that invents an allergen answer is worse than no assistant.',
  body: "It only answers from your documents, and shows which one. Allergen, food safety and equipment questions always route to a named person. When it doesn't know, it says so.",
  example: {
    question: 'Is the tiramisu nut free?',
    answer:
      "I don't have that in your allergen matrix. Ask your shift manager before serving — allergen questions always go to a person.",
    source: 'No source found — escalated',
  },
} as const;

/* ------------------------------------------------------------------ pilot */

export const pilot = {
  eyebrow: 'The pilot',
  heading: 'One site, four weeks, a fixed price',
  body: "We agree the measure before we start — repeat questions reaching managers, or manager hours per new hire. You'll know whether it worked.",
  ctaLabel: 'Book 15 minutes',
  docketTitle: 'Pilot',
  terms: ['One location', '4 weeks'],
  price: '$1,500 fixed',
  includedTitle: 'Included',
  included: [
    'Setup from your material',
    'QR poster, back of house',
    'Up to 6 languages',
    'Weekly usage report',
    'Baseline + end measurement',
  ],
  requiredTitle: 'We need from you',
  required: ['Your existing documents', 'One named site manager', '~2 hours of their time'],
} as const;

/* --------------------------------------------------------------- founders */

export const founders = {
  eyebrow: 'Who we are',
  heading: 'Two engineers. No account manager.',
  intro:
    "We're taking on three pilot groups. You'll work with us directly — there's nobody else to hand you to. We have no restaurant customers yet, and we'd rather tell you that than show you a wall of logos.",
  people: [
    {
      name: '[FOUNDER_NAME]',
      role: '[Role]',
      bio: 'Built and shipped AI features in production at a B2B software company, including natural-language logic generation and voice-to-data extraction.',
      photo: '/founders/founder-1.png',
    },
    {
      name: '[FOUNDER_NAME]',
      role: '[Role]',
      bio: '[Background — what they built, where, and why that matters for a restaurant group handing over its SOPs.]',
      photo: '/founders/founder-2.png',
    },
  ] satisfies readonly Founder[],
} as const;

/* -------------------------------------------------------------------- faq */

export const faq = {
  eyebrow: 'Questions',
  heading: 'Before you ask',
  items: [
    {
      question: 'Does this replace training?',
      answer: 'No. It answers the questions staff would otherwise interrupt a manager with.',
    },
    {
      question: 'What if our SOPs are out of date or on paper?',
      answer: "Normal. Photos and voice notes are fine — that's most of what we receive.",
    },
    {
      question: 'Do staff need an app or a work email?',
      answer: 'Neither. A QR code and their own phone.',
    },
    {
      question: 'Who sees what staff ask?',
      answer:
        "You get aggregate usage and the unanswered questions. It isn't a monitoring tool and we don't report on individuals.",
    },
  ] satisfies readonly FaqItem[],
} as const;

/* ------------------------------------------------------------ closing cta */

export const closingCta = {
  lead: "Fifteen minutes. We'll ask how you onboard now — and if it isn't a fit, we'll say so.",
  heading: 'Give your managers the pass back',
  ctaLabel: 'Book 15 minutes',
  ctaNote: 'Straight to a founder. No demo deck.',
} as const;

/* ----------------------------------------------------------------- footer */

export const footer = {
  wordmark: 'Novi',
  location: 'Dubai, UAE',
  email: 'hello@novi.ae',
} as const;
