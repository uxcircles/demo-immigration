# Laurelgate Immigration Law — design demo

> **Fictional firm.** A design demo by [UX CIRCLES](https://ux-circles.com/professionals). Laurelgate Immigration Law is not a real business, and nothing on this site is legal advice. Fees and regulatory numbers are placeholders.

A four-language website (English · 繁體中文 · 廣東話 written Cantonese · 简体中文) for a London immigration law firm serving Hong Kong and Taiwanese clients.

- `/` English · `/zh-hant/` Traditional Chinese · `/yue/` Cantonese · `/zh-hans/` Simplified Chinese, linked with `hreflang` (the Cantonese page uses `lang="yue-Hant-HK"` and `hreflang="zh-HK"`, since Google does not support `yue` in hreflang)
- Published fee table and SRA-style transparency information
- Hero photo from [Pexels](https://www.pexels.com/photo/big-ben-london-during-night-time-11567961/) (free to use under the Pexels License)
- `LegalService`, `Person` and `FAQPage` structured data
- Plain HTML, CSS and JavaScript — no build step. Pages are `noindex` so the fictional firm does not appear in search results.

Live demo: https://uxcircles.github.io/demo-immigration/
