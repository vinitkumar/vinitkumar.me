import React from "react"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import FeyroNav from "../../components/FeyroNav"
import {
  appStoreId,
  buildFaqSchema,
  supportEmail,
  supportQuestions,
} from "../../data/feyro"

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

        {supportQuestions.map((item) => (
          <React.Fragment key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </React.Fragment>
        ))}

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
    description="Help for Feyro, the manual camera app for iPhone: where photos are kept, formats per lens, Feyro Pro, how to cancel or restore a purchase, the Lock Screen control, and how to get in touch."
    pathname={location.pathname}
    schemaType="WebPage"
    structuredData={[buildFaqSchema(supportQuestions)]}
    meta={[{ name: "apple-itunes-app", content: `app-id=${appStoreId}` }]}
  />
)
