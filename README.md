# IEEE CSTMC Website

This is the 2026/2027 website for IEEE Computer Society Toronto Metropolitan Chapter. It's plain HTML, CSS, and JavaScript, with no frameworks or build step.

## Folder layout

```
index.html            Home page     -> https://ieeecstmc.ca/
events/index.html     Events page   -> https://ieeecstmc.ca/events
team/index.html       Team page     -> https://ieeecstmc.ca/team
sponsors/index.html   Sponsors page -> https://ieeecstmc.ca/sponsors
join/index.html       Join page     -> https://ieeecstmc.ca/join
contact/index.html    Contact page  -> https://ieeecstmc.ca/contact
css/style.css         All styles (colors are variables at the top of the file)
js/main.js            All interactivity
assets/images/        Logo, photos, posters, headshots, sponsor logos
```

## What's on each page

- **Home:** hero with a typing line and stats, a scrolling photo band, About Us with the team photo, and a scrolling partner logo strip.
- **Events:** "Why Attend?", upcoming events with a live countdown, and a past-events archive you can filter by school year. Clicking a poster opens it full screen.
- **Team:** exec members grouped by team (Co-Chairs, Events, External, Marketing, Finance, Operations, Web).
- **Sponsors:** past partner logos, stats, why sponsor, and the 4 sponsorship tiers (Bronze, Silver, Gold, Platinum).
- **Join:** "Four ways to level up" and sign-up links (Instagram, Linktree event sign-up, Mailchimp mailing list).
- **Contact:** email, Instagram, LinkedIn, and an FAQ.

## To run

- **VS Code:** install the "Live Server" extension, right-click `index.html`, then choose "Open with Live Server".
- **Or in a terminal:** run `npx serve .` (needs Node.js) and open the URL it prints.

## Common edits

**Every page**
- **Header and footer:** they are copied into all 6 pages. If you change one, change all of them (subpages use `../` in front of every link). The header also has the "Sponsor Us" and "Join Us" buttons.
- **Colors:** edit the variables in `:root` at the top of `css/style.css`.

**Home page**
- **Hero typing line:** edit `data-words` on `.typed` in `index.html`. Separate phrases with `|`.
- **Stats (50+, 500+...):** edit `data-target` and `data-suffix` on each `.stat-number`. They appear on the home page and the sponsors page, so update both.
- **Photo band:** add one `<figure class="photo-item">` inside `.photo-track`. List each photo once; `main.js` copies them so the row loops without a gap.
- **Team photo:** replace `assets/images/team/team_photo.jpg` (keep the same name, or update the `<img>` in the About section).

**Events page**
- **Upcoming event:** copy one `<article class="event-card event-card-wide">` block in the Upcoming section and edit it. Posters go in `assets/images/events/`.
- **Countdown:** set `data-countdown` on the `.countdown` div. Add Toronto's UTC offset so it ends at the right time for everyone: `2026-11-04T18:00:00-05:00` (use `-05:00` from November to mid-March, `-04:00` from mid-March to early November). Without the offset, each visitor's own time zone is used. After the time passes it shows "This event has started". Change that message with `data-ended-text="..."`.
- **Past event:** once an event is over, move its card into the right `.year-group` and remove the countdown, "Upcoming" tag, and Register button.
- **New school year:** add a `<button class="filter-btn" data-year="2027-28">` to `.year-filter` and a matching `<div class="year-group" data-year="2027-28">`. The two `data-year` values must match.

**Team page**
- **Members:** copy one `<article class="member-card">` block into the right team group. Put headshots in `assets/images/team/` (until then, use `placeholder.svg`), and update the name, role, LinkedIn link, and the `aria-label` on the link.

**Sponsors page**
- **Sponsorship tiers:** prices and perks are in the `.tier-card` blocks in `sponsors/index.html`. The "Get in touch" buttons link to the sponsorship package on Google Drive. If you upload a new package, update the link on all 4 tiers.
- **New partner logo:** add it to `assets/images/sponsors/`, then add it in three places: a `.partner-tile` on the sponsors page, and two `<img>` tags in the home page logo strip (one in each set, with `alt=""` and `aria-hidden="true"` on the second).

**Contact page**
- **FAQ:** copy one `<details class="faq-item">` block to add a question.

## Accessibility

Animations (typing, photo band, mouse glow) turn off for visitors who have "reduce motion" turned on in their device settings. Keep `alt` text on every image you add, and leave `alt=""` on decorative copies.
