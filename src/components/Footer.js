import React from "react"
import ThemeToggle from "./ThemeToggle"

const Footer = ({ locale = "en" }) => {
  const isJapanese = locale === "ja"

  return (
    <footer className="site-footer">
      <p className="footer-copyright">
        {isJapanese
          ? `© ${new Date().getFullYear()} Vinit Kumar.`
          : `© Copyright ${new Date().getFullYear()} by Vinit Kumar.`}
      </p>
      <p className="footer-license">
        {isJapanese
          ? "コンテンツのライセンス："
          : "Content licensed under the "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isJapanese
            ? "クリエイティブ・コモンズ 表示—非営利—継承 4.0"
            : "Creative Commons attribution-noncommercial-sharealike License"}
        </a>
        {isJapanese ? "。" : "."}
      </p>
      <p className="footer-contact">
        {isJapanese ? "連絡先：" : "Contact me via "}
        <a href="mailto:mail@vinitkumar.me">{isJapanese ? "メール" : "mail"}</a>
        {isJapanese ? "、" : ", "}
        <a
          href="https://bsky.app/profile/vinitkme.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          bluesky
        </a>
        {isJapanese ? "、" : ", "}
        <a
          href="https://fosstodon.org/@vinitkme"
          target="_blank"
          rel="noopener noreferrer"
        >
          mastodon
        </a>
        {isJapanese ? "、" : ", "}
        <a
          href="https://x.com/intent/user?screen_name=vinitkme"
          target="_blank"
          rel="noopener noreferrer"
        >
          x
        </a>
        {isJapanese ? "、" : ", or "}
        <a
          href="https://github.com/vinitkumar"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        {isJapanese ? "。" : "."}
      </p>
      <p className="footer-sponsor">
        {isJapanese ? "スポンサー：" : "You can sponsor me on "}
        <a
          href="https://github.com/sponsors/vinitkumar"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        {isJapanese ? "。" : "."}
      </p>
      <p className="footer-info">
        {isJapanese ? "詳細：" : "More info: "}
        <a href="/ai-transparency">
          {isJapanese ? "AI利用の透明性 (EN)" : "AI transparency"}
        </a>
        {isJapanese ? "。購読：" : ". Subscribe via "}
        <a href="/rss.xml">RSS</a>
        {isJapanese ? "。" : "."}
      </p>
      <p className="footer-fonts">
        {isJapanese ? "使用フォント：" : "Set in "}
        <a
          href="https://github.com/vinitkumar/berka-mono-closer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Berka Mono Instrument
        </a>
        {isJapanese ? "" : " "}
        {isJapanese ? "。" : "throughout."}
      </p>
      <p className="footer-theme">
        <span>{isJapanese ? "テーマ：" : "Theme:"}</span>
        <ThemeToggle locale={locale} />
      </p>
    </footer>
  )
}

export default Footer
