# lp-starter

静的 LP の案件用テンプレートリポジトリ。
HTML、バニラ JS。CSS は案件ごとに 素の CSS / Sass / Tailwind から選ぶ。

---

## 案件の始め方

1. GitHub の「Use this template」で案件リポジトリを作成し、clone する
2. `サイト情報.md` に制作管理シートの内容を転記する（埋まっているところだけでよい）。
   CSS の方式と命名に指定があれば、ここに書く
3. Cursor / Claude Code に「着手して」と伝える。CSS 方式が展開され、`presets/` が消える
4. Sass / Tailwind の場合は `npm run dev` を動かしておく
5. Live Server で `index.html` を開く
6. カンプを渡して実装を開始する。Figma の場合は SP と PC のフレームのリンクを渡す

`CLAUDE.md` は自動で読まれるので、ルールを説明し直す必要はない。
`サイト情報.md` に空欄があれば指摘してくれる。

完成したら「納品前チェックして」と伝える。

---

## 構成

```
lp-starter/
├── CLAUDE.md          コーディング規約（Claude Code が自動読込）。方式を問わないルール
├── サイト情報.md       案件ごとの情報。着手時に転記する
├── rules/             CSS の方式・命名ごとのルール。展開時に使う分だけ残す
│   ├── css-plain.md / css-sass.md / css-tailwind.md
│   ├── naming-flocss.md / naming-bem.md
│   └── figma-mcp.md   Figma のカンプから実装する手順（方式共通）
├── scripts/
│   └── figma-asset.mjs  Figma の画像を images/ に保存する
├── presets/           CSS 方式ごとの初期ファイル。展開後に削除する
│   ├── README.md      展開手順
│   ├── plain/         css/（variables / reset / base / style）
│   ├── sass/          scss/、package.json
│   └── tailwind/      src/input.css、package.json
├── index.html
├── js/main.js
├── images/            画像（_src/ に元画像を置く）
├── .vscode/settings.json
├── .gitignore
└── .gitattributes
```

テンプレートの状態では `css/` が無いため、`index.html` を開いてもスタイルは当たらない。

---

## 注意

- ファイルはすべて BOM なし UTF-8。PowerShell で作らず Cursor で編集する
- Sass / Tailwind では `css/style.css` を直接編集しない（ビルドで上書きされる）
- この README は着手後、案件用の内容（案件名・公開 URL・確認方法）に書き換える

---

## 着手前に揃えるもの

揃っていないと途中で止まる。制作管理シートで確認する。

- カンプ（確定版）
- サイトタイトル、description
- 実装するセクションと順番
- フォントと**ウェイト**（Google Fonts に無いウェイトは合成太字になる）
- 対象ブラウザ（WebP の扱いが変わる）
- canonical URL、OGP 画像（1200×630）
- favicon 一式、ロゴ（SVG 推奨）
- 画像（WebP 変換済み、寸法確定、SP / PC 出し分けの要否）
- FV・全幅素材（1920px 以上でも破綻しないもの）
- カンプに写らない仕様：hover / focus、ヘッダー固定、ドロワー、
  フローティング CTA、back-to-top、リンク先、フォーム送信先

該当する案件のみ。

- アニメーション：プロトタイプ → 画面録画 → AI に渡す工程。**別工数として先に合意する**
- 段階提出：どのセクションを先に出すか
