/**
 * Copy for the Feyro product pages: /feyro, /feyro/support and /feyro/privacy.
 *
 * The landing page copy is a shortened form of the App Store listing in the
 * feyro-camera repository (RELEASE.md "Store copy"). Prices and subscription
 * terms must match the listing.
 *
 * gatsby-node.js also reads this file to write /feyro.md and the Feyro
 * section of llms.txt, so keep it free of JSX and browser-only code.
 */

const name = "Feyro"
const subtitle = "Pro camera. Nothing added."
const supportEmail = "mail@vinitkumar.me"
const platform = "For iPhone. Requires iOS 18 or later."
const appStoreLabel = "Download on the App Store"
const appStoreId = "6827645502"
const appStoreUrl = `https://apps.apple.com/us/app/feyro/id${appStoreId}`
const appleTermsUrl =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"

const intro =
  "Every manual control of the iPhone camera. Every frame saved exactly as the sensor captured it."

const promo =
  "Shutter, ISO, focus and white balance on precise dials. ProRAW, RAW and 48 MP HEIF. Waveform, RGB histogram, zebras and a focus loupe. Saved exactly as shot."

// What Feyro is, in the words people search for. The hero shows `kind` above
// the name, and both are part of the page's h1.
const kind = "Manual camera app for iPhone"

// Browser tab and search result title. It names the product and what it is,
// because "Feyro" alone tells a search engine nothing.
const seoTitle = "Feyro: Manual Camera App for iPhone"
const seoFullTitle = `${seoTitle} (ProRAW, RAW, HEIF)`

// Page description in search results and link previews. The first sentence
// defines the app, so a result or an AI answer can quote it on its own.
const description = `Feyro is a manual camera app for iPhone. ${promo}`

const features = [
  {
    title: "Control",
    items: [
      "Shutter, ISO, focus and white balance on dials",
      "Focus peaking and a 4× focus loupe",
    ],
  },
  {
    title: "Exposure",
    items: ["Histogram, waveform and zebras"],
  },
  {
    title: "Capture",
    items: [
      "48 MP HEIF, ProRAW, RAW (DNG) and JPEG",
      "No filters or re-processing",
    ],
  },
  {
    title: "Speed",
    items: [
      "Shoot from the Lock Screen, Camera Control or the volume buttons",
    ],
  },
]

const privacyNote = "No account, no analytics, no server."

// US App Store prices, as shown in the listing.
const plans = [
  {
    name: "Annual Pro",
    price: "$14.99",
    period: "per year",
    body: "Free trial for new subscribers.",
  },
  {
    name: "Lifetime Pro",
    price: "$74.99",
    period: "one-time purchase",
    body: "Pay once.",
  },
]

// Apple requires this auto-renewal disclosure next to subscription prices.
const subscriptionTerms =
  "Payment is charged to your Apple Account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period and can be managed in your Apple Account settings."

// Questions people ask before they install. Shown on the landing page, and
// published as schema.org FAQPage data and in /feyro.md. Every answer repeats
// facts stated elsewhere in this file or on the support and privacy pages.
const questions = [
  {
    question: "What is Feyro?",
    answer:
      "Feyro is a manual camera app for iPhone. It puts shutter speed, ISO, focus and white balance on dials, shoots 48 MP HEIF, ProRAW, RAW (DNG) and JPEG, and saves each photograph with no filters or re-processing.",
  },
  {
    question: "How is Feyro different from the iPhone Camera app?",
    answer:
      "The built-in Camera app sets shutter speed and ISO for you. Feyro lets you set shutter, ISO, focus and white balance yourself, and shows a histogram, a waveform, zebras, focus peaking and a 4× focus loupe, so you can judge exposure and focus before you shoot.",
  },
  {
    question: "Is Feyro free?",
    answer: `Feyro is free to download. Feyro Pro unlocks manual exposure, manual focus, white balance, the RAW formats and the shooting tools. Pro costs ${plans[0].price} ${plans[0].period}, with a free trial for new subscribers, or ${plans[1].price} as a one-time lifetime purchase. These are US App Store prices.`,
  },
  {
    question: "Which iPhones does Feyro support?",
    answer:
      "Any iPhone running iOS 18 or later. ProRAW and RAW are offered only on lenses that support them. The main (wide) lens has the full list of formats.",
  },
  {
    question: "Does Feyro collect any data?",
    answer:
      "No. Feyro has no account, no analytics and no server. Photographs stay on your iPhone unless you move them yourself.",
  },
]

// Support page questions, in the order they appear on /feyro/support.
const supportQuestions = [
  {
    question: "Where are my photos?",
    answer:
      "In Feyro’s own library, opened from the thumbnail beside the shutter. Each photograph is kept with its original. To also add photos to the Photos app, turn on Save to Photos in Feyro’s Settings, or export any photo from its review screen.",
  },
  {
    question: "Why is a format missing on one lens?",
    answer:
      "ProRAW and RAW are offered only on lenses that support them. Switch to the main (wide) lens for the full list.",
  },
  {
    question: "Why does the photo look different from the viewfinder?",
    answer:
      "The viewfinder is a live video preview. The photograph is the camera’s full-quality capture, with Apple’s multi-frame processing for HEIF and ProRAW. In dim light Feyro also steadies the preview; that never changes the photograph.",
  },
  {
    question: "Why are the manual controls locked?",
    answer:
      "Manual exposure, manual focus, white balance, RAW formats and the shooting tools are part of Feyro Pro, sold as an annual subscription with a free trial for new subscribers or as a one-time lifetime purchase. If you have bought Pro before, open Settings and tap Restore Purchases.",
  },
  {
    question: "How do I cancel Feyro Pro?",
    answer:
      "Annual Pro is an App Store subscription. On your iPhone, open the Settings app, tap your name, tap Subscriptions, choose Feyro and tap Cancel Subscription. You keep Pro until the end of the period you have paid for. To avoid a charge after a free trial, cancel at least 24 hours before the trial ends. Lifetime Pro is a one-time purchase, so there is nothing to cancel.",
  },
  {
    question: "How do I restore Feyro Pro on a new iPhone?",
    answer:
      "Sign in with the Apple Account you bought Pro with. Then open Feyro’s Settings and tap Restore Purchases.",
  },
  {
    question: "How do I get a refund?",
    answer:
      "Apple takes the payment for Feyro Pro and decides refunds. Request one at reportaproblem.apple.com.",
  },
  {
    question: "How do I shoot from the Lock Screen?",
    answer:
      "Add the Feyro Camera control to Control Center or to the Lock Screen (long-press the Lock Screen, Customize, then add a control). Photographs taken there appear in Feyro’s library when you next unlock your iPhone and open the app.",
  },
]

// schema.org description of the app, so search engines and assistants read
// the platform, category and prices as data. The free download is the first
// offer and the two Pro plans follow it.
const buildAppSchema = ({ siteUrl, image }) => ({
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": `${siteUrl}/feyro/#app`,
  name,
  description,
  url: `${siteUrl}/feyro/`,
  ...(image ? { image } : {}),
  operatingSystem: "iOS 18.0 or later",
  availableOnDevice: "iPhone",
  // Google accepts a fixed list of categories and has none for photography.
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Photo & Video",
  downloadUrl: appStoreUrl,
  installUrl: appStoreUrl,
  sameAs: [appStoreUrl],
  isAccessibleForFree: true,
  featureList: features.flatMap((feature) => feature.items),
  softwareHelp: {
    "@type": "CreativeWork",
    url: `${siteUrl}/feyro/support/`,
  },
  author: {
    "@type": "Person",
    name: "Vinit Kumar",
    url: `${siteUrl}/about/`,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Feyro (free download)",
      price: "0",
      priceCurrency: "USD",
      url: appStoreUrl,
    },
    ...plans.map((plan) => ({
      "@type": "Offer",
      name: `Feyro ${plan.name}`,
      description: `${plan.price} ${plan.period}. ${plan.body}`,
      price: plan.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      url: appStoreUrl,
    })),
  ],
})

// schema.org FAQPage for a list of { question, answer } pairs.
const buildFaqSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
})

const pages = [
  { to: "/feyro/", label: "Feyro" },
  { to: "/feyro/support/", label: "Support" },
  { to: "/feyro/privacy/", label: "Privacy" },
]

module.exports = {
  appStoreId,
  appStoreLabel,
  appStoreUrl,
  appleTermsUrl,
  buildAppSchema,
  buildFaqSchema,
  description,
  features,
  intro,
  kind,
  name,
  pages,
  plans,
  platform,
  privacyNote,
  promo,
  questions,
  seoFullTitle,
  seoTitle,
  subscriptionTerms,
  subtitle,
  supportEmail,
  supportQuestions,
}
