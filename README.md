# Dinamo Bucuresti - Website

A front-end project built for the Web Development Techniques course, dedicated to Dinamo Bucuresti. It is a website made with HTML, CSS, and JavaScript.

## Pages Overview

- `index.html`: The main landing page featuring an introduction, recent match results table, and the latest club news.
- `istorie.html`: Historical background of the club from 1948 to modern times, plus a quick timeline of key milestones.
- `echipa.html`: Full squad roster and technical staff cards organized with responsive grids.
- `contact.html`: Stadium information, weekly schedule, and the interactive messaging area driven by JS.

## JavaScript Features (`script.js`)

- **Local Login:** Fetches user credentials from `users.json` and keeps the active user in `sessionStorage`.
- **Contact Form:** Validates email addresses using regular expressions before saving.
- **Persistent Messages:** Stores user messages directly in `localStorage` so they stay there on page reload.
- **Real-time Filter:** Quick text search across existing messages, reset anytime by pressing `Escape`.
- **Delete Items:** Remove any individual comment directly from the UI and local data.
- **Dynamic Border:** Box border shifting random colors every 2 seconds via an interval.
