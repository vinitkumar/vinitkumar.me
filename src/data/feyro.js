/**
 * Copy for the Feyro product pages: /feyro, /feyro/support and /feyro/privacy.
 *
 * The landing page copy is a shortened form of the App Store listing in the
 * feyro-camera repository (RELEASE.md "Store copy"). Prices and subscription
 * terms must match the listing.
 */

const name = "Feyro"
const subtitle = "Pro camera. Nothing added."
const supportEmail = "mail@vinitkumar.me"
const platform = "For iPhone. Requires iOS 18 or later."
const appStoreLabel = "Download on the App Store"
const appStoreUrl = "https://apps.apple.com/us/app/feyro/id6827645502"
const appleTermsUrl =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"

const intro =
  "Every manual control of the iPhone camera. Every frame saved exactly as the sensor captured it."

// Used for the page description in search results and link previews.
const promo =
  "Shutter, ISO, focus and white balance on precise dials. ProRAW, RAW and 48 MP HEIF. Waveform, RGB histogram, zebras and a focus loupe. Saved exactly as shot."

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

const pages = [
  { to: "/feyro/", label: "Feyro" },
  { to: "/feyro/support/", label: "Support" },
  { to: "/feyro/privacy/", label: "Privacy" },
]

module.exports = {
  appStoreLabel,
  appStoreUrl,
  appleTermsUrl,
  features,
  intro,
  name,
  pages,
  plans,
  platform,
  privacyNote,
  promo,
  subscriptionTerms,
  subtitle,
  supportEmail,
}
