# CSS：Tailwind（v4）

`index.html` のクラスと `src/input.css` を編集し、`css/style.css` にビルドする。
**`css/style.css` は直接編集しない。** 設定ファイル（`tailwind.config.js`）は使わない。

## コマンド

```bash
npm install      # 初回のみ
npm run dev      # 監視。保存のたびに css/style.css を更新する
npm run build    # 納品用。圧縮して出力する
```

`npm run dev` を動かしたまま Live Server で確認する。
`css/style.css` はコミットする（納品物そのもの）。

`css/style.css` が Git で競合したら、手で直さずにどちらかを採用して `npm run build` し直す。

## ファイル構成

| ファイル | 役割 |
|---|---|
| `src/input.css` | 入口。トークン（`@theme`）・基本スタイル・自前のユーティリティ |
| `css/style.css` | ビルド結果。編集しない |

クラスの走査対象は `src/input.css` の `@source` に書いたファイルだけ（ルートの `*.html` と `js/*.js`）。
HTML を別フォルダに足した場合は `@source` も足す。足さないとクラスが出力されない。

## トークン

- `src/input.css` の `@theme` に定義する。定義した名前がそのままユーティリティになる
  （`--color-primary` → `bg-primary` / `text-primary`）
- ユーティリティにならない値（`--container-width`、`--z-index-*` など）は `@layer base` の `:root` にある
- 任意値（`w-[327px]`、`text-[#3dbf7a]`）は値のベタ書きにあたるので使わない。トークンを足す
- z-index は `z-(--z-index-header)` のように変数を参照する

## px の書き方

標準のスケール（px ÷ 4）を使う。24px → `p-6`、40px → `gap-10`。

- スケールに無い値（コンテナ幅など）は `@theme` にトークンを足す
- 4 で割り切れない値（18px → `p-4.5` など）は、実際にビルドして `css/style.css` に出力されるか確認してから書き方を決める
- `border` の 1px や `letter-spacing`（em で書く）など、rem にしない値はそのまま書く

## ブレークポイント

`sm:` / `md:` / `lg:` / `xl:` を使う。値は `@theme` の `--breakpoint-*`。
`max-*:` は使わない（モバイルファースト）。

## クラスの書き方

- クラス名を動的に組み立てない（`'text-' + color`）。走査で拾われず出力されない
- 同じクラスの並びが2か所に出たら、`src/input.css` に `@utility` で部品化する
- `@apply` は `@utility` と `@layer base` の中だけで使う
- 並び順：レイアウト → サイズ → 余白 → タイポ → 色 → 装飾 → 状態（`hover:` 等）→ レスポンシブ

## 状態（`is-`）

JS は `is-` クラスを付け外しする。見た目は任意バリアントで当てる。

```html
<nav class="js-drawer translate-x-full [&.is-open]:translate-x-0">
```

## ベンダープレフィックス

ユーティリティはビルド時に自動で付く。
`src/input.css` に自前で書いた分は、ビルド後の `css/style.css` に `-webkit-` が出ているか確認する。
出ていなければ CLAUDE.md の方法で手で書く。
