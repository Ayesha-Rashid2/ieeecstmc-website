# IEEE CSTMC Website

The website for the IEEE Computer Society Toronto Metropolitan Chapter.

## Folder layout

```
index.html            Home page
events/index.html     Events page   -> https://ieeecstmc.ca//events
team/index.html       Team page     -> https://ieeecstmc.ca//team
contact/index.html    Contact page  -> https://ieeecstmc.ca//contact
css/style.css         All styles (colours are at the top in :root)
js/main.js            All interactivity (menu, animations, filter, lightbox)
assets/images/        Logo, photos, posters, headshots, sponsor logos
```

- **VS Code:** install the "Live Server" extension, right-click `index.html`, then choose "Open with Live Server".
- **Or in a terminal:** run `npx serve .` (needs Node.js) and open the URL it prints.

## Common edits

### Replace a placeholder image
The files in `assets/images/` are labelled placeholders (`.svg`). Add your real photo (e.g. `industry-night.jpg`) and update the `src="..."` in the HTML to match. You can then delete the placeholder.

Recommended sizes: event posters are square (about 800x800), hero photos are wide (about 900x400) and headshots are square (300x300 or larger).

### Add an event
In `events/index.html`, copy an `<article class="event-card">...</article>` block and edit the poster, date badge, title and description.
- **Upcoming:** paste it in the "Upcoming" section. When the event is over, move the card into the right year in "Past Events".
- **New school year:** copy a whole `<div class="year-group" data-year="2025-26">` block, change the `data-year` and heading, then add a matching filter button: `<button class="filter-btn" data-year="2026-27">2026–27</button>`.
- The home page has its own "Upcoming" and "Recent Events" cards in `index.html`, so update those too.

### Add a team member
In `team/index.html`, copy an `<article class="member-card">...</article>` block and change the photo, name, role and LinkedIn link.

### Change the header or footer
The header and footer are copied into all 4 pages, so edit each one. Pages inside folders use `../` in their paths (e.g. `../css/style.css`).

### Change colours
Every colour is a variable at the top of `css/style.css` (`--sage`, `--turquoise`, etc.).

### Update the stats on the home page
Edit the `data-target` numbers on the `.stat-number` elements in `index.html`.

## Before launch, replace these placeholders

- [ ] Logo (`assets/images/logo.svg`): swap in the official IEEE CS chapter logo
- [ ] Hero photos, group photo, event posters, headshots and sponsor logos
- [ ] LinkedIn URLs (search for `linkedin.com/` and `TODO`)
- [ ] Upcoming event details and Register links
- [ ] Executive names and roles on the Team page
- [ ] Stats numbers on the home page

## Deploying

Any static host works without changes:
- **GitHub Pages:** push the repo, then go to Settings → Pages → deploy from the `main` branch root.
- **Netlify / Vercel:** import the repo or drag and drop the folder. There's no build command, and the publish directory is the root.
