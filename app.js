const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到浅色外观' : '切换到深色外观');
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101827' : '#eef3fa';
}
try { applyTheme(localStorage.getItem('mikey-theme') || 'light'); } catch { applyTheme('light'); }
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('mikey-theme', next); } catch { /* Storage is optional. */ }
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-download]').forEach(link => link.addEventListener('click', event => {
  if (link.getAttribute('aria-disabled') === 'true') event.preventDefault();
}));
async function loadReleases() {
  try {
    const response = await fetch('./releases.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Release information unavailable');
    const releases = await response.json();
    for (const platform of ['android', 'windows']) {
      const release = releases[platform];
      const link = document.querySelector(`[data-download="${platform}"]`);
      const detail = document.querySelector(`[data-detail="${platform}"]`);
      if (platform === 'android') {
        if (release?.channel) document.querySelector('[data-platform="android"] .platform-tag').textContent = release.channel;
        if (release?.minAndroid) document.querySelector('[data-meta="android"]').textContent = `Android ${release.minAndroid} 及以上 · APK 安装包`;
      }
      if (release?.status === 'available' && release.url) {
        const url = new URL(release.url, location.href);
        if (!['https:', 'http:'].includes(url.protocol) || (url.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(url.hostname))) continue;
        link.href = url.href;
        link.removeAttribute('aria-disabled');
        link.setAttribute('download', '');
        link.innerHTML = `下载 ${platform === 'android' ? 'APK' : 'Windows 版'} <span aria-hidden="true">↓</span>`;
        detail.textContent = `v${release.version || releases.version}${release.size ? ` · ${release.size}` : ''}`;
        if (platform === 'android' && release.label) detail.textContent = `${release.label} · ${detail.textContent}`;
        if (release.sha256) {
          const hash = document.createElement('button');
          hash.className = 'checksum';
          hash.textContent = 'SHA-256 校验';
          hash.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(release.sha256);
              const toast = document.querySelector('#toast');
              toast.textContent = 'SHA-256 已复制'; toast.hidden = false;
              setTimeout(() => { toast.hidden = true; }, 2600);
            } catch { detail.textContent = `SHA-256: ${release.sha256}`; }
          });
          detail.after(hash);
        }
      } else if (release?.label) {
        detail.textContent = release.label;
      }
    }
  } catch {
    document.querySelector('#release-status').textContent = '暂时无法获取最新安装包信息，请刷新页面重试。网页版仍可正常访问。';
  }
}
loadReleases();
