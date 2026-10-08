# Figma MCP

Figma のリンクを渡されたときの手順。CSS の方式・命名を問わず共通。
**書き方そのもの**（ファイル構成・トークンの置き場所・px の書き方・クラス名）は
`rules/css-*.md` と `rules/naming-*.md` に従う。

## 出力形式（最重要）

- `get_design_context` はデフォルトで React + Tailwind を返す。**参考情報として読むだけ**にし、
  実装はこの案件の方式で書く
- React / JSX は使わない
- Tailwind の案件でも、返ってきたクラスをそのまま貼らない。任意値（`w-[327px]` など）が多いので、
  `rules/css-tailwind.md` のとおりトークンと標準のスケールに置き換える

## 手順

1. **構造の取得**：SP と PC の両方のリンクを受け取り、`get_metadata` で構造を取る。
   セクションの対応表（セクション名・SP の nodeId・PC の nodeId・幅×高さ）を出して**止まる**。まだ実装しない
2. **トークンの照合**：`get_variable_defs` で色・フォント・余白を取得し、既存トークンとの対応表を出して**止まる**。
   トークンの書き換えは承認を得てから行う
   - コンテンツ幅・左右の余白・ヘッダーの高さは Figma の変数に無いことが多い。フレームの寸法から実測して表に入れる
   - フォントはファミリーとウェイトをカンプで確認する。トークンと `index.html` の Google Fonts の両方を直し、`仮` を消す
3. **実装**：セクション単位で `get_design_context` と `get_screenshot` を呼ぶ。SP と PC の両方を読んでから書く。
   1セクション終えたら止まって報告する
4. **画像**：`download_assets` で取得する（下の「画像の取得」）
5. **報告**（セクションごと）
   - Figma から読み取れなかった箇所・推測で補った箇所
   - 追加したトークン
   - 作成・変更したファイル

## フレームにまとまっていないセクション

カンプには手を入れない。次のどちらかで読む。

- 依頼者が Figma の Dev Mode で要素を選択し、右パネル「MCP」の「プロンプト例をコピー」で渡す
  （SP と PC それぞれ）。渡されたリンクを順に `get_design_context` で読む
- `get_metadata` の座標（y の範囲）で、要素をセクションに振り分けてから読む

Figma のレイヤーの並びは重なり順で、画面上の並び順と一致しない。どのセクションの要素か迷うものは
座標で判断し、判断がつかなければ報告する。

## 画像の取得

`download_assets` が返すのは一時的な URL（有効期限あり）。保存は専用のスクリプトで行う。`curl` は使わない。

```bash
node scripts/figma-asset.mjs <URL> images/ファイル名
```

- カンプに書き出し用のフレームがあれば、まずそこから取得する
- 写真は2倍で書き出す。形式・ファイル名・変換は CLAUDE.md「画像」に従う
- 取得できなかった画像は一覧で報告する

## 値の変換

- px の書き方は `rules/css-*.md` の「px の書き方」に従う
- 色・余白・角丸・影はトークンを使う。カンプの HEX や px をベタ書きしない
- Auto Layout は flex / grid に置き換える。gap と padding はカンプの値をそのまま使う
- `position: absolute` の座標は写さない（装飾要素の配置のみ例外）
- 固定 width は避け、`max-width` と `%` / `auto` で組む
- `font-weight` は Google Fonts に実在するウェイトか確認してから使う

## SP / PC

- モバイルファースト。SP をベースに書き、PC はブレークポイントで上書きする
- SP 版フレームが無い箇所は PC 版から妥当に組み、「推測」として報告する
- hover などカンプに無い状態は独自に付けない（基本スタイルの既定ホバーに任せる）。気づいた点は報告だけする

## テキスト

- 文言はカンプのとおり。勝手に作らない・要約しない・省略しない
- カンプ上の改行が意味を持つ箇所だけ `<br>` を使う
- SP と PC で文言が違う箇所は、どちらかに寄せずに止まって報告する（依頼者が先方に確認する）

## 準備（マシンごとに1回）

Figma MCP の登録と認証（Claude Code）：

```bash
claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
```

登録後、`claude` を起動して `/mcp` から figma を認証する。

画像取得スクリプトの許可：案件のリポジトリに `.claude/settings.local.json` を作る
（Git には入れない。`.gitignore` 済み）。

```json
{
  "permissions": {
    "allow": [
      "Bash(node scripts/figma-asset.mjs *)"
    ]
  }
}
```
