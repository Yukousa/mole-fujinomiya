---
name: pixel-check
description: ずれの指摘を受けたら、値を変える前に Figma の書き出し画像と実装をピクセル比較する
metadata:
  type: feedback
---

依頼者は PerfectPixel でカンプと重ねて確認する。ずれの指摘を受けたら、数値を変える前に
Figma の get_screenshot（SP は maxDimension=912 で 1x）と、headless Chrome で撮った実装
（SP は scratchpad の 390px iframe、--force-device-scale-factor=1）を sharp で読み、要素の端の座標を比較する。

**Why:** 2026-10-10 のヒーローのボタンで、Dev Mode の読み取り値（空き 20px）に合わせて直したら 4px ずれた。正しいのは API の値（16px）で、ピクセル比較で確定できた。
**How to apply:** Dev Mode の値と API の値が食い違ったら、ピクセル比較で決める。結果は表で示す。

ピクセル比較の道具（scratchpad、セッションごとに作り直しが必要）：Figma の全体画像は get_screenshot で SP（67:1279, maxDimension 7369）・PC（59:758, maxDimension 8365）を images/_src/_cmp-sp.png / _cmp-pc.png に保存。要素ごとの白インクの上下端比較と、番号の四角の左端の列で縦位置を比べる方法が有効だった。

**依頼者の画面は表示倍率 150%（devicePixelRatio 1.5）。** 自分の比較は倍率 1 だけでなく 1.5 でも行う（--force-device-scale-factor=1.5）。
倍率 1.5 では 1px の border が約 0.67px に描かれ、border＋padding で高さが決まる要素は1つごとに低くなって積み重なる
（2026-10-10、FIVE FIELDS のタグ9段でセクション末が 6px ずれた）。枠線付きで並ぶ要素は height を固定する（縦の積み重ねを防ぐ）。線は border のまま。横幅の約 0.7px の縮みは許容する。
依頼者は DevTools のデバイスモードで DPR 2 を指定しているが、それでも h3 の高さは 151.33（線が 0.67px）になる。原因は DPR が「デフォルト」（上書きなし）だったこと。外部モニターが Windows 150%（本体は 125%）。2026-10-11 にデバイスモードで DPR「1」を明示すると devicePixelRatio=1 になったが、h3 は 151.33 のまま（DevTools の DPR 上書きでは線の丸めは直らない）。Windows 100% は文字が小さすぎ、Chrome ズーム 200% も大きすぎで不採用。→ 依頼者は確認用 Chrome を --force-device-scale-factor=2 --user-data-dir で別起動する方法に決定（2026-10-11、解決済み）。以後、線の丸めのずれは依頼者の環境では出ない前提。
文章量で高さが変わる要素（記事の h3 など）は height を固定できない。疑似要素で線を描く案は依頼者が却下（2026-10-11：「ズレのために疑似要素を追加するのは適切ではない」）→ border のまま、その分の積み重なり（h3 1つにつき約 0.67px）は許容。
リセット CSS は ol の margin を消していない（ul は消す）。ol を使うときは margin-bottom: 0 を書く。セクション下端も数値で比較すること（目視で 16px 見落とした）。
Figma で小数幅の要素（例 254.53px）を2倍で書き出すと、端の1列が白で埋まる（JPG は透明不可）。写真を受け取ったら端の列の色を確認し、白なら切り落として WebP を作り直す（2026-10-10、business-fields-01〜03 で発生）。
Figma は Inter 指定の日本語（代替フォント）を字詰めしない。ブラウザの Noto Sans JP はカナ・長音を詰めるので幅が 0.4〜0.6px 狭くなる → その要素だけ font-kerning: none（FIVE FIELDS のタグで適用）。Noto Sans CJK JP 指定の本文は Figma も詰めているので触らない。
Figma の absolute 配置の座標は枠線の外側（border-box）から。CSS の top/right/bottom/left は枠線の内側（padding-box）から測るので、枠線の太さを引く（2026-10-11、stat カードの三角が 2〜4px 内側にずれた）。
headless Chrome の --virtual-time-budget では IntersectionObserver が発火しない（スクロールは効く）。CDP での実時間テストは許可されなかったので、IO を使う動きの確認は依頼者に頼む。見た目は is-visible を手で付けて撮影する。
Google Fonts の Inter は「→」（U+2192）を含まない（7つの subset どれにも無い）→ 矢印は SVG にした（icon-arrow-footer.svg）。
Inter の大文字の連続（例：SP フッターの FUJINOMIYA FIVE FIELDS）は Figma より約 1.5px 広い（Inter のバージョン差と推測）→ その span だけ letter-spacing -0.006em。小文字まじりのタグは一致していたので全体には掛けない。
