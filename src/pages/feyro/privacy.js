import React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import FeyroNav from "../../components/FeyroNav"
import { supportEmail } from "../../data/feyro"

// The App Store listing links to this exact URL (/feyro/privacy).
const PrivacyPage = ({ location }) => (
  <Layout location={location} title="Vinit Kumar">
    <div className="feyro-page feyro-doc">
      <FeyroNav />

      <header className="feyro-doc-header">
        <p className="eyebrow">Feyro</p>
        <h1>Feyro Privacy Policy</h1>
        <p className="feyro-doc-meta">
          Effective <time dateTime="2026-10-27">October 27, 2026</time>
        </p>
      </header>

      <div className="post-content feyro-doc-body">
        <p>
          Feyro is a camera app for iPhone made by Vinit Kumar. It is built so
          that your photographs never leave your phone unless you move them
          yourself.
        </p>

        <h2>What Feyro collects</h2>
        <p>
          Nothing. Feyro has no accounts, no analytics, no advertising, no
          crash-reporting service of its own, and no server. It makes no network
          connections except to the App Store, described under Purchases.
        </p>

        <h2>Camera</h2>
        <p>
          Feyro asks for camera access to show a live viewfinder and to take
          photographs. Frames are processed on your iPhone to draw the
          viewfinder, the meters and the focus aids, and to encode your
          photographs. They are not stored or sent anywhere.
        </p>

        <h2>Your photographs</h2>
        <p>
          Photographs are saved in Feyro’s private library on your iPhone,
          exactly as the camera produced them, together with their originals.
          Deleting the app deletes that library.
        </p>
        <p>
          If you turn on Save to Photos, Feyro asks for permission to add images
          to your Photos library. It never reads your Photos library.
        </p>
        <p>
          Exporting uses the iOS share sheet. The destination you choose handles
          the files under its own privacy policy.
        </p>
        <p>
          Photographs contain the metadata the camera records, such as exposure
          settings and the date. Feyro does not add location data.
        </p>

        <h2>Lock Screen and Control Center</h2>
        <p>
          Photographs taken from the Lock Screen are kept in a protected
          location provided by iOS until you unlock your iPhone and open Feyro,
          which moves them into its library.
        </p>

        <h2>Purchases</h2>
        <p>
          Feyro Pro is sold through Apple’s in-app purchase system. Apple
          processes the payment. Feyro receives only a signed transaction saying
          whether Pro is active, never your payment details. Subscriptions are
          managed in your Apple Account settings.
        </p>

        <h2>Children</h2>
        <p>
          Feyro does not collect personal information from anyone, including
          children.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the new version will be published at this
          address with a new effective date.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </p>
      </div>
    </div>
  </Layout>
)

export default PrivacyPage

export const Head = ({ location }) => (
  <Seo
    title="Feyro Privacy Policy"
    description="Feyro collects nothing: no accounts, no analytics, no server. Photographs stay on your iPhone unless you move them. Effective October 27, 2026."
    pathname={location.pathname}
  />
)
