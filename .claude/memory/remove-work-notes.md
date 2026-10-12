---
name: remove-work-notes
description: 提出前に「確認中」「仮」など制作メモのコメントを納品ファイルから削除する
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6672a20d-43d2-4af5-b0f2-a3b856449f47
  modified: 2026-10-12T00:30:52.535Z
---

「先方確認待ち」「確認中」「仮：〜」「カンプ無しのため仮デザイン」などの制作メモは、提出前に削除する（依頼者の指示 2026-10-13）。

**Why:** HTML コメントや CSS の /* */ コメントは納品ファイルにそのまま残り、ソースを見た先方の目に触れる。社内向けのやりとりや未確定の事情は納品物に含めない。
**How to apply:** 納品前チェックで次を確認して削除・書き換えする。
- index.html / news.html / news-detail.html の HTML コメント（2026-10-13 時点で index に「先方確認待ち」「先方確認中」「仮：」、各ページのドロワー「カンプ無しのため仮デザイン」、news の「2ページ目は未作成」、news-detail の「記事の内容はカンプのダミー」など）
- css/style.css の /* */ コメント（_reset.scss の Scroll behavior の説明など）。Sass の // コメントはビルドで消えるので対象外
- 構造の説明（「OGP」「favicon」「CSS（scss からビルド…）」など）は残してよいか依頼者に確認する
- 残すべき情報（YouTube の ID 差し替えなど）は、コメントではなく納品時の申し送りに移す
関連：[[project-status]]
