import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { getLanguageAlternates } from "../../utils/i18n"
import portrait from "../../../content/assets/vinitgreynew.png"

const startDate = new Date("2013-02-01")

const getExperience = () => {
  const currentDate = new Date()
  let years = currentDate.getFullYear() - startDate.getFullYear()
  let months = currentDate.getMonth() - startDate.getMonth()

  if (currentDate.getDate() < startDate.getDate()) months--
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months }
}

const formatNumber = (value) => value.toLocaleString("ja-JP")

const currentFocus = [
  "Scalefusionで、ライブSSHターミナルのワークフローを含むシステムレベルの製品機能と、実際の利用環境でも安定して動くインフラを構築しています。",
  "Django CMSフェローとして、レビュー、モダナイゼーション、互換性対応を行い、成熟したPythonエコシステムを着実に維持しています。",
  "判断力、審美眼、責任を手放すことなく、AIを活用したエンジニアリングのワークフローを磨いています。",
  "Goによるターミナル中心のツール、Rustを活用したNeovimのワークフロー、日々の開発を速くする小さなユーティリティを作っています。",
]

const principles = [
  "本番環境では退屈なほど安定し、開発者の手には鋭くなじむソフトウェアが好きです。",
  "大がかりな書き直しより、テスト、プロファイリング、レビュー、小さなコミットを信頼します。",
  "AIは、自分が出荷するコードを理解することの代替ではなく、力を増幅する道具として使います。",
  "文章を書くことで、散らばった技術経験を再利用できる知識へ変えられると考えています。",
]

const selectedWork = [
  {
    title: "github-pr-attention",
    body: "GitHubのプルリクエストを受信箱のように扱い、ブラウザのタブに埋もれずに確認、レビュー、承認、マージできるGo製TUIです。",
    href: "/github-pr-attention/",
  },
  {
    title: "fff.nvim fork",
    body: "Rust製の高速なコアを土台に、バッファ切り替え、Gitステータス選択、カラースキームのライブプレビューを加えたNeovimピッカーです。",
    href: "/fff-nvim-fork/",
  },
  {
    title: "Python、Go、Zigでのjson2xml",
    body: "CLI、移植、ベンチマーク、ドキュメント、ファズテストを通じて、長く続くプロジェクトを複数言語へ広げたオープンソースの取り組みです。",
    href: "/json2xml-multiplatform-day/",
  },
]

const career = [
  {
    organization: "Scalefusion",
    role: "プリンシパルエンジニア",
    period: "2024年11月—現在",
    href: "https://scalefusion.com",
  },
  {
    organization: "django CMS",
    role: "Django CMSフェロー",
    period: "2024年11月—現在",
    href: "https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/",
  },
  {
    organization: "Django Software Foundation",
    role: "個人会員",
    period: "2024年2月—現在",
    href: "https://www.djangoproject.com/foundation/individual-members/",
  },
  {
    organization: "KidsKonnect",
    role: "スタッフソフトウェアエンジニア",
    period: "2023年2月—2024年11月",
  },
  {
    organization: "Social Schools",
    role: "スタッフ／シニアソフトウェアエンジニア",
    period: "2013年2月—2023年2月",
  },
]

const elsewhereLinks = [
  ["GitHub", "@vinitkumar", "https://github.com/vinitkumar"],
  [
    "LinkedIn",
    "/in/vinitatlinkedin",
    "https://www.linkedin.com/in/vinitatlinkedin/",
  ],
  ["GotchaCode", "gotchacode.com", "https://www.gotchacode.com"],
  [
    "Bluesky",
    "@vinitkme.bsky.social",
    "https://bsky.app/profile/vinitkme.bsky.social",
  ],
  ["Mastodon", "@vinitkme@fosstodon.org", "https://fosstodon.org/@vinitkme"],
  ["X", "@vinitkme", "https://x.com/vinitkme"],
  ["メール", "mail@vinitkumar.me", "mailto:mail@vinitkumar.me"],
].map(([label, value, href]) => ({ label, value, href }))

const JapaneseAbout = ({ location }) => {
  const data = useStaticQuery(graphql`
    query JapaneseAboutQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              title
              featured
            }
            fields {
              slug
              collection
            }
            wordCount {
              words
            }
          }
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges.map(({ node }) => node)
  const essays = posts.filter((post) => post.fields.collection !== "til")
  const tilPosts = posts.filter((post) => post.fields.collection === "til")
  const featuredCount = essays.filter(
    (post) => post.frontmatter.featured
  ).length
  const totalWords = posts.reduce(
    (sum, post) => sum + (post.wordCount?.words || 0),
    0
  )
  const latestEssay = essays[0]
  const { years, months } = getExperience()
  const metrics = [
    { label: "実務経験", value: `${years}年以上` },
    { label: "エッセイとメモ", value: formatNumber(posts.length) },
    { label: "注目エッセイ", value: formatNumber(featuredCount) },
    { label: "公開した単語数", value: formatNumber(totalWords) },
  ]

  return (
    <Layout location={location} title={title}>
      <div className="about-page">
        <header className="about-intro">
          <div className="about-intro-heading">
            <h1>こんにちは。</h1>
            <p>
              Vinitです。ソフトウェアを作り、オープンソースを維持し、学んだことを書き残しています。
            </p>
          </div>

          <div className="about-portrait">
            <div className="about-portrait-frame">
              <img alt="Vinit Kumarのポートレート" src={portrait} />
            </div>
          </div>

          <div className="about-intro-prose">
            <p>
              長く使えるコードが好きなプログラマーです。細部を大切にしますが、それ以上に、本番環境で安定して動く有用なソフトウェアを届けることを大切にしています。
            </p>
            <p>
              <a href="https://scalefusion.com">Scalefusion</a>
              のプリンシパルエンジニアであり、
              <a href="https://www.django-cms.org/en/blog/2024/11/07/welcoming-vinit-kumar-as-the-newest-django-cms-fellow/">
                Django CMSフェロー
              </a>
              です。製品開発、インフラ、開発者向けツール、成熟したオープンソースプロジェクトを健全に保つ地道なメンテナンスに携わっています。
            </p>
            <p>
              2013年2月からプロとして開発を続けています。今でも、空のファイルから始め、難しいシステムを理解し、見つけたときより少しだけシンプルにすることが好きです。このサイトは、その学びを残す場所です。
            </p>
          </div>
        </header>

        <section className="about-metrics" aria-label="プロフィール概要">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="about-section about-now">
          <div>
            <p className="eyebrow">現在</p>
            <h2>2026年に注力していること</h2>
          </div>
          <div className="about-now-list">
            {currentFocus.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">仕事の進め方</p>
            <h2>見せかけではない、シニアエンジニアリング。</h2>
            <p>
              2013年2月から数えて{years}年{months}
              か月、システムがどう壊れ、チームがどう迷走し、それでも良いソフトウェアがどう作られるのかを学び続けています。
            </p>
            <p>
              私が最も力を発揮するのは曖昧で複雑な中間領域です。漠然とした製品要求を長く使えるインターフェースへ変え、性能を改善し、デプロイを安全にし、丁寧にコードをレビューし、チームが自信を持って出荷できるよう支援します。
            </p>
          </div>
          <div className="about-principles">
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </section>

        <section className="about-section about-career">
          <div>
            <p className="eyebrow">経歴</p>
            <h2>バックエンドからオープンソースまで、長期的に責任を持つ。</h2>
            <p>
              製品開発、分散システム、チームリーダーシップ、オープンソースの運営を経験してきました。
            </p>
          </div>
          <div>
            <ol className="about-career-list">
              {career.map((item) => (
                <li key={`${item.organization}-${item.role}`}>
                  <div className="about-career-position">
                    {item.href ? (
                      <a href={item.href}>
                        <strong>{item.organization}</strong>
                      </a>
                    ) : (
                      <strong>{item.organization}</strong>
                    )}
                    <span>{item.role}</span>
                  </div>
                  <span className="about-career-period">{item.period}</span>
                </li>
              ))}
            </ol>
            <p className="about-career-education">
              ビルラ工科大学メスラ校 土木工学学士、2008—2012年。
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">主な仕事</p>
              <h2>最近の仕事から分かる、私の価値観</h2>
            </div>
          </div>
          <div className="about-work-grid">
            {selectedWork.map((item) => (
              <Link key={item.href} to={item.href} className="about-work-item">
                <span lang="en">{item.title}</span>
                <p>{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">文章</p>
            <h2>このサイトは公開ノートです。</h2>
          </div>
          <div>
            <p>
              プログラミング、開発ツール、オープンソース、個人の仕事術、そしてAIをうまく使いながら自分のエンジニアリング能力を保つことについて書いています。記事本文は英語です。
            </p>
            {latestEssay && (
              <p>
                最新の記事：
                <Link to={latestEssay.fields.slug} lang="en">
                  {latestEssay.frontmatter.title}
                </Link>
                。
              </p>
            )}
            <p>
              現在のアーカイブには{formatNumber(essays.length)}本の記事、
              {formatNumber(tilPosts.length)}本のTILメモ、合計
              {formatNumber(totalWords)}語が掲載されています。
            </p>
          </div>
        </section>

        <section className="about-section about-split">
          <div>
            <p className="eyebrow">コードの外</p>
            <h2>充実した生活が、仕事を誠実に保つ。</h2>
          </div>
          <div>
            <p>
              読書、スケッチ、音楽を聴くことと演奏すること、筋力トレーニング、家族との時間を楽しんでいます。インターネットが騒がしくなりすぎたときは、長い時間をかけて考えることに戻ります。
            </p>
            <p>
              妻の<a href="https://rituparnadey.com">Rituparna Dey</a>は、
              デジタルマーケティング会社
              <a href="https://scoophubs.com">ScoopHubs</a>を経営しています。
            </p>
          </div>
        </section>

        <section className="about-section about-elsewhere">
          <div>
            <p className="eyebrow">オンライン</p>
            <h2>インターネット上の活動場所</h2>
          </div>
          <div>
            <p>
              公開コードの多くはGitHubにあります。短い返信では足りない内容には、メールが最適です。
            </p>
            <ul className="about-link-list">
              {elsewhereLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default JapaneseAbout

export const Head = ({ location }) => (
  <Seo
    alternates={getLanguageAlternates(location.pathname)}
    title="プロフィール"
    description="プリンシパルエンジニア、Django CMSフェロー、オープンソースメンテナー、ライターとして活動するVinit Kumarのプロフィール。"
    lang="ja"
    pathname={location.pathname}
  />
)
