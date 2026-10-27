import React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import FeyroNav from "../../components/FeyroNav"
import { supportEmail } from "../../data/feyro"

const SupportPage = ({ location }) => (
  <Layout location={location} title="Vinit Kumar">
    <div className="feyro-page feyro-doc">
      <FeyroNav />

      <header className="feyro-doc-header">
        <p className="eyebrow">Feyro</p>
        <h1>Feyro Support</h1>
      </header>

      <div className="post-content feyro-doc-body">
        <p>
          Feyro is a pro camera for iPhone: manual shutter, ISO, focus and white
          balance; HEIF, ProRAW and RAW; and photographs saved exactly as the
          camera took them.
        </p>

        <h2>Where are my photos?</h2>
        <p>
          In Feyro’s own library, opened from the thumbnail beside the shutter.
          Each photograph is kept with its original. To also add photos to the
          Photos app, turn on Save to Photos in Feyro’s Settings, or export any
          photo from its review screen.
        </p>

        <h2>Why is a format missing on one lens?</h2>
        <p>
          ProRAW and RAW are offered only on lenses that support them. Switch to
          the main (wide) lens for the full list.
        </p>

        <h2>Why does the photo look different from the viewfinder?</h2>
        <p>
          The viewfinder is a live video preview. The photograph is the camera’s
          full-quality capture, with Apple’s multi-frame processing for HEIF and
          ProRAW. In dim light Feyro also steadies the preview; that never
          changes the photograph.
        </p>

        <h2>The manual controls are locked</h2>
        <p>
          Manual exposure, manual focus, white balance, RAW formats and the
          shooting tools are part of Feyro Pro, sold as an annual subscription
          with a free trial for new subscribers or as a one-time lifetime
          purchase. If you have bought Pro before, open Settings and tap Restore
          Purchases.
        </p>

        <h2>Shooting from the Lock Screen</h2>
        <p>
          Add the Feyro Camera control to Control Center or to the Lock Screen
          (long-press the Lock Screen, Customize, then add a control).
          Photographs taken there appear in Feyro’s library when you next unlock
          your iPhone and open the app.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </p>
      </div>
    </div>
  </Layout>
)

export default SupportPage

export const Head = ({ location }) => (
  <Seo
    title="Feyro Support"
    description="Help for Feyro, the pro camera app for iPhone: where photos are kept, formats per lens, Feyro Pro, the Lock Screen control, and how to get in touch."
    pathname={location.pathname}
  />
)
