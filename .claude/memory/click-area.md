---
name: click-area
description: サイト全体のルール：リンク・ボタンのクリック範囲を確保する（44px 目安）
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6672a20d-43d2-4af5-b0f2-a3b856449f47
  modified: 2026-10-10T09:02:01.464Z
---

リンク・ボタンなどクリックできる要素は、クリック範囲を確保する。目安は 44×44px。
見た目の位置・間隔はカンプどおりに保ち、padding を広げてその分 gap を減らす（端は負マージンで打ち消す）。

**Why:** ユーザーが「サイト全体のルールとして」と指示した（2026-10-10、ヘッダー実装時）。
**How to apply:** 新しいセクションでリンク・ボタン・アイコンボタンを書くたびに適用し、テキストリンクは display:block / inline-block + padding にする。
