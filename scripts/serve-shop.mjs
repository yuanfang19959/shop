import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'dist');
const prefix = '/shop';
const port = Number(process.env.DEPLOY_WEB_PORT || process.env.PM2_SERVE_PORT || 3001);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function fileFor(url = '/') {
  const path = decodeURIComponent(url.split('?')[0]);
  if (path !== prefix && !path.startsWith(`${prefix}/`)) return null;
  let rel = path.slice(prefix.length) || '/';
  if (rel.endsWith('/')) rel += 'index.html';
  const base = normalize(root);
  const full = normalize(join(base, rel));
  if (full !== base && !full.startsWith(base + sep)) return null;
  return full;
}

const server = createServer((req, res) => {
  const requested = fileFor(req.url);
  if (!requested) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  let target = requested;
  try {
    if (statSync(target).isDirectory()) target = join(target, 'index.html');
    statSync(target);
  } catch {
    target = join(root, 'index.html');
  }

  res.writeHead(200, {
    'Content-Type': types[extname(target)] || 'application/octet-stream',
  });
  createReadStream(target).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`shop listening on http://127.0.0.1:${port}${prefix}/`);
});
