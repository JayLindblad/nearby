# Nearby — Personal Events Hub

## What This Is

A single-file React app (JSX) that acts as a personal "what's happening near me" database. The user (one person, not multi-user) manually adds local events from various sources and views them in one place. It persists data across sessions using `window.storage` (Claude artifact persistent storage API). The app is rendered as a Claude artifact (`.jsx` file).

## Core Functionality

### Three Input Modes
1. **Manual** — form with fields for name, date, time, location, link, category
2. **Paste Text** — textarea where user dumps raw text (flyer copy, social post, email). A `smartParse()` function extracts name, date, time, location, and URL via regex, then drops into the manual form for review/edit
3. **From URL** — paste a link first, then fill in details manually. The link is saved with the event for quick access later

### Two Views
1. **List** — events grouped into Upcoming / Past / No Date Set sections, sorted by date ascending
2. **Calendar** — month grid. Days with events show colored pills. Clicking a day opens a modal with that day's event cards

### Other Features
- Search by name or location (case-insensitive substring)
- Filter by category dropdown
- Delete events (× button on each card)
- Event names that have a link render as clickable `↗` links opening in new tab
- Past events render at reduced opacity (0.55)

## Architecture

### Single File
Everything lives in one `.jsx` file. No separate CSS, no external components. This is intentional — it's a Claude artifact and must be self-contained.

### Key Sections (in order)
1. **`THEME` object** — every visual property (see Theme System below)
2. **`CATEGORIES` / `MONTH_NAMES` / `DAY_NAMES`** — static config arrays
3. **Utility functions** — `parseDate`, `fmtTime`, `dateKey`, `smartParse`
4. **Storage helpers** — `loadEvents`, `saveEvents` using `window.storage`
5. **Style builders (`S` object)** — functions that return style objects, all referencing `THEME`
6. **Components** — `Modal`, `EventForm`, `CalendarView`, `EventCard`
7. **Main app** — `EventsHub` (default export)

### Storage
- Uses `window.storage.get/set` (Claude artifact persistent storage)
- Single key: `"events-hub-data"` stores the full events array as JSON
- All reads/writes are async with try/catch
- Events are loaded on mount, saved on every add/delete

### Event Data Shape
```js
{
  id: string,          // generated from Date.now().toString(36) + random
  name: string,        // required
  datetime: string|null, // ISO string if parseable, null otherwise
  dateRaw: string,     // raw date input value
  timeRaw: string,     // raw time input value
  location: string,
  link: string,        // URL
  category: string,    // one of CATEGORIES
  created: string,     // ISO timestamp of when event was added
}
```

## Theme System

**Every visual property is parameterized in the `THEME` object at the top of the file.** Nothing is hardcoded in components. To restyle the app, only edit `THEME`.

The current theme is a **warm light mode** with these key values:

### Referencing Theme
- `T` is a shorthand alias for `THEME` (declared right after the object)
- `S` is an object of style-builder functions (e.g., `S.input()`, `S.pill(active)`, `S.catChip(cat, active)`) that return inline style objects composed from `T`
- `catColor(category)` returns the color for a given category from `T.catColors`

### Theme Properties
| Group | Properties |
|-------|-----------|
| Fonts | `fontBody`, `fontMono`, `fontUrl` |
| Backgrounds | `bgPage`, `bgCard`, `bgInput`, `bgModal`, `bgOverlay`, `bgHover` |
| Text | `textPrimary`, `textSecondary`, `textMuted` |
| Borders | `border`, `borderHover` |
| Accent | `accent`, `accentHover`, `accentLight`, `accentText`, `accentGradient` |
| Shadows | `shadowSm`, `shadowMd`, `shadowLg`, `shadowAccent` |
| Radii | `radiusSm` (8), `radiusMd` (12), `radiusLg` (16), `radiusPill` (20) |
| Section labels | `labelUpcoming`, `labelPast`, `labelUndated` |
| Categories | `catColors` — object mapping each category name to a hex color |
| Layout | `maxWidth` (800), `headerPadding`, `contentPadding` |
| Calendar | `calCellMinHeight`, `calTodayBg`, `calTodayBorder`, `calEventCellBg` |
| Delete | `deleteColor`, `deleteHoverBg` |

### Current Palette (Light Mode)
- Page: `#f5f3f0` (warm off-white)
- Cards: `#ffffff`
- Inputs: `#f0ede8` (sandy)
- Text: `#1a1a1a` / `#5c5c5c` / `#9a9a9a`
- Accent: `#6c5ce7` (purple)
- Borders: `#e5e1db`
- Gradient: purple → pink for the "Nearby" title

## Style Conventions

- All styling is inline `style={{}}` objects — no CSS classes, no Tailwind
- Hover effects use `onMouseEnter` / `onMouseLeave` handlers that mutate `e.currentTarget.style`
- Fonts loaded via `<link>` tag inside the component render: DM Sans (body) + Space Mono (headings, date badges, monospace accents)
- Category colors are applied at ~15-18% opacity for backgrounds (e.g., `cc + "15"`) with full color for text
- Transitions are typically `"all 0.2s"` or `"all 0.15s"`

## When Modifying This App

### Adding a new field to events
1. Add to the form state in `EventForm`
2. Add input field to the form JSX
3. Include in the `onAdd` object construction in `handleSubmit`
4. Display in `EventCard`
5. If it should be parsed from text, update `smartParse()`

### Adding a new category
Just add the string to the `CATEGORIES` array and add a color entry in `THEME.catColors`.

### Changing the visual theme
Only edit the `THEME` object. Every component reads from it. To go dark mode, swap the bg/text/border values. To change the accent, update the `accent*` properties and `accentGradient`.

### Adding a new view
Add a new option to the view toggle buttons in the header, add a new branch in the content area's ternary/conditional rendering.

## Dependencies

- React (`useState`, `useEffect`, `useMemo`) — provided by artifact runtime
- Google Fonts (DM Sans, Space Mono) — loaded via CDN link tag
- `window.storage` — Claude artifact persistent storage API (get/set/delete/list)
- No other libraries. No build step. No external components.

## User Context

- This is a personal tool for one user located near Broomall, Pennsylvania
- The user is tired of checking individual venue websites/social media for local events
- They want everything in one place with minimal friction to add new events
- The user prefers a light/bright visual style
- The user values having things parameterized so they can be easily changed later
