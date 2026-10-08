# 命名：FLOCSS

## 接頭辞

| 接頭辞 | 用途 |
|---|---|
| `l-` | レイアウト（wrapper, container等） |
| `c-` | コンポーネント（ボタン、カード等） |
| `p-` | プロジェクト固有パーツ（セクション等） |
| `u-` | ユーティリティ |
| `is-` | 状態変化（active, open等） |
| `js-` | JS用フック（スタイルを当てない） |

要素・モディファイアは BEM 記法（`c-card__title` / `c-card--large`）。

## 記述順

Layout → Component → Project → Utility の順に書く。

Sass の場合は層ごとにフォルダを分け、`style.scss` の `@use` もこの順に並べる。

```
scss/
├── layout/              _header.scss など
└── object/
    ├── component/
    ├── project/
    └── utility/
```

## 上書き順

**Layout 層は Component 層に負ける。** 後に来る `.c-*` が勝つため、親を含めた2階層にする。

```css
/* NG：.c-button が後に来るので効かない */
.l-header__cta { display: none; }

/* OK */
.l-header__inner .l-header__cta { display: none; }
```
