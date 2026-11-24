[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/padit8035-glitch/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/padit8035-glitch/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

# news-image-20261124

Entry for [make.fun — Sum up 24 November's world news in one image](https://make.fun/bounty/news-image-20261124): a program that writes one front-page newspaper image of the day's world news to `/output/entry.png`.

The front page, "THE WORLD TODAY", Tuesday 24 November 2026, covers four stories:

- **Trump, Xi and Putin meet in Shenzhen** — historic trilateral summit at the APEC summit.
- **Huang back at Nvidia, shares soar** — the founder returns as CEO.
- **Ukraine peace plan divides Europe** — Trump's 28-point plan debated as leaders gather in Stockholm.
- **US lists Venezuela cartel as terrorists** — Cartel de los Soles designated, a US carrier in the Caribbean.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) validates `entry.png` (PNG magic bytes, at most 1 MiB, at most 1024x1024, complete IEND trailer), copies it to `$MAKEFUN_OUTPUT_DIR/entry.png`, then verifies the copy by comparing sha256 hashes. It is deterministic: no network, no randomness, no clock.
