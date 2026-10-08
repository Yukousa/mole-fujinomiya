# CSS：Sass

`scss/` を編集し、`css/style.css` にコンパイルする。**`css/style.css` は直接編集しない。**

## コマンド

```bash
npm install      # 初回のみ
npm run dev      # 監視。保存のたびに css/style.css を更新する
npm run build    # 納品用。ソースマップなしで出力する
```

`npm run dev` を動かしたまま Live Server で確認する。
`css/style.css` はコミットする（納品物そのもの）。`*.css.map` はコミットしない。

`css/style.css` が Git で競合したら、手で直さずにどちらかを採用して `npm run build` し直す。

## ファイル構成

```
scss/
├── style.scss              入口。@use を並べるだけ
└── foundation/
    ├── _variables.scss     トークン定義（:root）
    ├── _mixin.scss         ブレークポイントの mixin。_function.scss も一緒に渡す
    ├── _function.scss      myrem()
    ├── _reset.scss         リセット。編集しない
    └── _base.scss          全体の基本スタイル
```

これ以外のフォルダ構成は `rules/naming-*.md` に従う。

- パーシャルを追加したら `style.scss` に `@use` を足す。足さないと出力されない
- `@use` の順が出力順になる。`foundation/variables` は必ず先頭
- `@import` は使わない（Sass で廃止予定）
- パーシャルの先頭に `@use "../foundation/mixin" as *;` と書くと、`mq()` と `myrem()` の両方が使える
- コメントは `//` で書く（`/* */` は `css/style.css` に出力される）

## トークン

- `foundation/_variables.scss` の `--*`（CSS カスタムプロパティ）を `var()` で参照する
- Sass 変数（`$`）にトークンを持たせない。ブレークポイントだけが例外
- この案件だけで使う追加トークンは `_variables.scss` 末尾の「案件追加」に置く

## px の書き方

カンプの px は `myrem()` にそのまま渡す。自分で 16 で割らない。

```scss
@use "../foundation/mixin" as *;

.p-hero__title {
  margin-bottom: myrem(24); // → 1.5rem
}
```

`:root` のトークンは CSS カスタムプロパティなので `myrem()` が使えない。
rem に換算して書き、元の px をコメントで残す（`--container-width: 75rem; // 1200px`）。

`border` の 1px や `letter-spacing`（em で書く）など、rem にしない値はそのまま書く。

## ブレークポイント

`mq()` を使う。値は `foundation/_mixin.scss` の `$breakpoints`。

```scss
@use "../foundation/mixin" as *;

.p-hero {
  padding-block: var(--space-6);

  @include mq(md) {
    padding-block: var(--space-8);
  }
}
```

## ネスト

2階層までの制限は、`&__element` や `@include mq()` も1階層として数える。
`&__element` の中にさらに `&__element` を書かない。
