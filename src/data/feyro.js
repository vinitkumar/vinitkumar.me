/**
 * Copy for the Feyro product pages: /feyro, /feyro/support and /feyro/privacy.
 *
 * This mirrors the App Store listing kept in the feyro-camera repository
 * (RELEASE.md "Store copy", docs/support.md and docs/privacy-policy.md).
 * When the listing changes, change it here too.
 */

const name = "Feyro"
const subtitle = "Pro camera. Nothing added."
const supportEmail = "mail@vinitkumar.me"
const platform = "For iPhone. Requires iOS 18 or later."
const appStoreStatus = "Coming soon to the App Store"
const appleTermsUrl =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"

const intro =
  "Feyro is a camera for photographers who want the iPhone’s sensors and nothing in the way. Every photograph is saved exactly as the camera produced it: no filters, no looks, no re-processing."

const promo =
  "Manual shutter, ISO, focus and white balance on real dials. ProRAW, RAW and 48 MP HEIF. Waveform, RGB histogram, zebras and a focus loupe. Saved exactly as shot."

const features = [
  {
    title: "Viewfinder",
    items: [
      "The live picture edge to edge, with the controls floating over it",
      "Three physical lenses, ultra wide, wide and telephoto, each with its own capabilities",
      "Grid, level, and a steadier preview in dim light that never touches your photographs",
    ],
  },
  {
    title: "Capture",
    items: [
      "HEIF at up to 48 MP, ProRAW, Bayer RAW (DNG) and JPEG",
      "Full-screen, 4:3, 3:2, 16:9, 5:4, square and panoramic framing, applied without touching the original",
      "Flash, timer, burst, Camera Control and the volume buttons as a shutter",
      "The thumbnail appears the instant you press",
    ],
  },
  {
    title: "Feyro Pro",
    items: [
      "Manual shutter speed, ISO, exposure compensation, focus and white balance on precise dials",
      "ProRAW and RAW capture",
      "Luminance and RGB histograms, a waveform, and zebras with channel colours and selectable thresholds",
      "Focus peaking and a live 4× focus loupe",
      "Save and recall your shooting controls",
    ],
  },
  {
    title: "Library",
    items: [
      "A private library that keeps the original of every photograph",
      "Review at full resolution, including HDR, straight after each shot",
      "Export the photo, the DNG or the untouched original, or save to Photos",
    ],
  },
  {
    title: "Lock Screen",
    items: [
      "Open Feyro from the Lock Screen or Control Center and shoot before you unlock",
    ],
  },
]

const privacyNote =
  "Feyro has no account, no analytics and no server. Your photographs stay on your iPhone until you move them."

// US App Store prices, as shown in the listing.
const plans = [
  {
    name: "Annual Pro",
    price: "$14.99",
    period: "per year",
    body: "A year of manual controls, RAW and ProRAW, and the shooting tools. Free trial for new subscribers.",
  },
  {
    name: "Lifetime Pro",
    price: "$74.99",
    period: "one-time purchase",
    body: "All of Feyro Pro on this device, with one purchase.",
  },
]

const subscriptionTerms =
  "Feyro Pro is available as an annual subscription with a free trial for new subscribers, or as a one-time lifetime purchase. Payment is charged to your Apple Account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period and can be managed in your Apple Account settings."

const pages = [
  { to: "/feyro/", label: "Feyro" },
  { to: "/feyro/support/", label: "Support" },
  { to: "/feyro/privacy/", label: "Privacy" },
]

module.exports = {
  appStoreStatus,
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
