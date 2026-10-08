# presets — CSS 方式の展開手順

着手時に1回だけ行う。終わったらこのフォルダごと削除する。

## 1. 方式を決める

`サイト情報.md` の「CSS」を見る。

- 「方式」が空欄：カンプの内容から Tailwind か Sass を提案し、依頼者に確認してから進める
- 「命名」が空欄：FLOCSS とする（Tailwind の場合は不要）

## 2. ファイルを展開する

選んだ方式のフォルダの中身を、リポジトリのルートへ移動する。

| 方式 | 移動するもの | ルートにできるもの |
|---|---|---|
| 素の CSS | `presets/plain/` の中身 | `css/` |
| Sass | `presets/sass/` の中身 | `scss/`、`package.json` |
| Tailwind | `presets/tailwind/` の中身 | `src/`、`package.json` |

## 3. `index.html` を合わせる

素の CSS：変更なし。

Sass / Tailwind：CSS の `<link>` 4行を次の1行に置き換える。直上のコメントも合わせて直す。

```html
<link rel="stylesheet" href="css/style.css">
```

`<body>` 内のクラスは FLOCSS で書いてある。FLOCSS ならそのまま使う。

BEM：`l-` を外す（`l-header` → `header`、`l-inner` → `inner`）。
`l-inner` は基本スタイルのファイル（`base.css` / `_base.scss`）に定義があるので、そちらも `inner` に直す。

Tailwind：`l-header` などはユーティリティに置き換える。`l-inner` は `inner` に直す
（`src/input.css` に `@utility inner` として定義済み）。

## 4. 使わないものを削除する

- `presets/` をフォルダごと
- `rules/css-*.md` のうち、選ばなかった方式の2つ
- `rules/naming-*.md` のうち、選ばなかった命名（Tailwind の場合は両方）
- Figma のカンプが無い案件：`rules/figma-mcp.md` と `scripts/`

`rules/` には、この案件で使うファイルだけが残る。

## 5. 準備する

Sass / Tailwind：

```bash
npm install
npm run build
```

`css/style.css` が出力されることを確認する。

Figma の案件：`.claude/settings.local.json` を作る（中身は `rules/figma-mcp.md`「準備」）。
Git には入らない（`.gitignore` 済み）。

トークンの値には `仮` の目印が付いている。置き換え方は CLAUDE.md「仮の値」を参照。

最後に `README.md` の「構成」を、展開後の実際の構成に書き換える。
