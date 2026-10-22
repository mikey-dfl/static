# 易家佳 GitHub 镜像

| 用途 | GitHub 地址 | 原线上地址 |
| --- | --- | --- |
| 管理后台 | https://mikey-dfl.github.io/static/admin/ | https://bybitx.eu.cc/admin/ |
| 电脑网页版聊天 | https://mikey-dfl.github.io/static/web/ | https://bybitx.eu.cc/web/ |
| 手机 H5 聊天 | https://mikey-dfl.github.io/static/h5/ | https://bybitx.eu.cc/h5/ |
| 客户端下载 | https://mikey-dfl.github.io/static/download/ | https://bybitx.eu.cc/download/ |

原 GitHub 下载入口 https://mikey-dfl.github.io/static/ 继续有效。

APK: https://mikey-dfl.github.io/static/yijiajia-3.11.1-android-webview.apk

GitHub Pages 托管前端静态文件与 APK。聊天 API、WebSocket、后台 API 和文件服务仍使用原服务器，账号与数据共用。原线上地址保持不变。现有 APK 仍加载原站 H5。

`site-bundle.tar.gz` 是适配 GitHub 子路径的前端发布产物；不包含后端配置、账号密码、私钥或源码映射。GitHub Actions 校验 `site-bundle.sha256` 后解包并发布。更新时请同时更新归档与校验文件。

Android 3.11.1 APK: 95,121 bytes; SHA-256 `1a9f539c2dcb0814649989eeb1be2993b8fbc458be36f592b34dc6197f93d81f`。
