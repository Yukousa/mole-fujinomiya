# 命名：BEM

`block__element--modifier`。単語の区切りはハイフン1つ（`site-header__nav-item`）。

## ルール

- 接頭辞（`l-` / `c-` / `p-` / `u-`）は付けない。`is-`（状態）と `js-`（JS 用フック）だけ使う
- Element を重ねない。`card__body__title` ではなく `card__title`
- Modifier は単独で使わず、元のクラスと併記する（`class="button button--primary"`）
- Block 自身には外側の余白・位置を持たせない。置く側の Element に持たせる（Mix）

```html
<!-- 位置は header__cta、見た目は button -->
<a class="header__cta button button--primary" href="">申し込む</a>
```

## 上書き順

Mix した2つのクラスが同じプロパティを持つと、後に書いた方が勝つ。
置く側（`header__cta`）で上書きする場合は、親を含めた2階層にする。

```css
.header .header__cta { display: none; }
```

## ファイルの分け方

素の CSS：`style.css` に Block 単位でまとめ、Block ごとに見出しコメントを付ける。

Sass：1 Block = 1 ファイル。ファイル名は Block 名と揃える。

```
scss/
└── block/
    ├── _header.scss
    ├── _button.scss
    └── _hero.scss
```
