# LGBT API

This is the core API that [GayBot-v2](https://github.com/GayBot-v2) calls to in the /lgbtqsearch command

### Tech Stack
<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=fff" alt="Bun" />
  <img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?logo=cloudflareworkers&logoColor=fff" alt="Cloudflare Workers" />
</div>

### Contributors
<a href="https://github.com/Girls-Network/LGBT-API/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Girls-Network/LGBT-API" />
</a>

## 🚀 Running Locally
This project runs on [Cloudflare Workers](https://workers.cloudflare.com/) and uses [Bun](https://bun.sh/) for package management.

```bash
bun install
bun run dev      # starts a local Wrangler dev server
bun run deploy   # deploys to Cloudflare
```

Keyword definitions live in the [`define/`](./define) folder, split into `gender/` and `sexuality/` subfolders, and are served as static assets bound to the Worker.

Images live in `define/gifs/`, and are served directly at `/gifs/<path>` — e.g. `define/gifs/yuri/boop/1.gif` is served at `/gifs/yuri/boop/1.gif`.

## 📜 Important Documents
### Licence
Protected by the Girls Network Non-Commercial Source Licence
> See [LICENCE](./LICENCE) for details.

### Security
Any security vulnerabilities, please refer to the [Security Guidelines](./SECURITY.md)

### Contributing

By contributing to our repository, you agree to adhere the [Contributing Guidelines](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md)