# IEEE CSTMC Website

This is the 2026/2027 website for IEEE Computer Society Toronto Metropolitan Chapter.

## Folder layout

```
index.html            Home page
events/index.html     Events page   -> https://ieeecstmc.ca//events
team/index.html       Team page     -> https://ieeecstmc.ca//team
sponsors/index.html   Sponsors page -> https://ieeecstmc.ca//sponsors
contact/index.html    Contact page  -> https://ieeecstmc.ca//contact
css/style.css         All coloring styles
js/main.js            All interactivity
assets/images/        Logo, photos, posters, headshots, sponsor logos
```

To run:

- **VS Code:** install the "Live Server" extension, right-click `index.html`, then choose "Open with Live Server".
- **Or in a terminal:** run `npx serve .` (needs Node.js) and open the URL it prints.

## Common edits

- **Header and footer:** they are copied into all 5 pages. If you change one, change all of them (subpages use `../` in front of every link).
- **Home page photos:** add one `<figure class="photo-item">` inside `.photo-track`. List each photo once; `main.js` copies them so the row loops left to right without a gap.
- **Countdown on an upcoming event (events page):** set `data-countdown="YYYY-MM-DDTHH:MM:SS"` on the `.countdown` div (Toronto time). After that time it shows "This event has started". Change the message with `data-ended-text="..."`.
- **Hero typing line:** edit `data-words` on `.typed` in `index.html`. Separate phrases with `|`.
- **Stats (50+, 500+...):** edit `data-target` and `data-suffix` on each `.stat-number`. They appear on the home page and the sponsors page.
- **Sponsorship tiers:** prices and perks are in `sponsors/index.html` (`.tier-card`). New partner logos go in `assets/images/sponsors/` plus a `.partner-tile` on the sponsors page and an `<img>` in the home page logo strip (twice: once in each set).
- **FAQ:** on `contact/index.html`. Copy one `<details class="faq-item">` block to add a question.
