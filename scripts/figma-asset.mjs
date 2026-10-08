// Figma MCP のアセット URL を images/ にダウンロードする
//
// 使い方：node scripts/figma-asset.mjs <URL> <保存先>
//   例：node scripts/figma-asset.mjs https://www.figma.com/api/mcp/asset/xxx/yyy.svg images/logo.svg
//
// curl はグローバル設定で禁止しているため、画像の取得はこのスクリプトで行う。
// .claude/settings.local.json で `Bash(node scripts/figma-asset.mjs *)` を許可している。
// 許可ルールのワイルドカードでは引数を絞れないので、URL と保存先はここで検証する。
// - URL は https://www.figma.com/api/mcp/asset/ で始まるものだけ
// - 保存先は images/ の中だけ（../ で外に出るものは拒否）

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ALLOWED_PREFIX = 'https://www.figma.com/api/mcp/asset/';
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(projectRoot, 'images');

function fail(message) {
  console.error(`figma-asset: ${message}`);
  process.exit(1);
}

const [rawUrl, rawOut, ...rest] = process.argv.slice(2);
if (!rawUrl || !rawOut || rest.length > 0) {
  fail('使い方: node scripts/figma-asset.mjs <URL> <保存先（images/ 配下）>');
}

let url;
try {
  url = new URL(rawUrl);
} catch {
  fail(`URL として解釈できません: ${rawUrl}`);
}
if (!url.href.startsWith(ALLOWED_PREFIX)) {
  fail(`許可していない URL です（${ALLOWED_PREFIX} で始まるものだけ）: ${url.href}`);
}

const outPath = path.resolve(projectRoot, rawOut);
if (!outPath.startsWith(imagesDir + path.sep)) {
  fail(`保存先は images/ の中だけです: ${rawOut}`);
}

const res = await fetch(url);
if (!res.ok) {
  fail(`ダウンロードに失敗しました（HTTP ${res.status}）: ${url.href}`);
}
const body = Buffer.from(await res.arrayBuffer());
if (body.length === 0) {
  fail(`空のファイルが返されました: ${url.href}`);
}

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, body);

const relOut = path.relative(projectRoot, outPath).split(path.sep).join('/');
console.log(`${relOut}  ${body.length} bytes  ${res.headers.get('content-type') ?? ''}`);
