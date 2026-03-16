# Personal Events Hub — Setup Guide

## GitHub Pages Deployment (Recommended)

This app is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Step 1: Set GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these two:

   **Secret 1:**
   - Name: `SUPABASE_URL`
   - Value: `https://vjlqtrrpbkottvmmzbld.supabase.co`

   **Secret 2:**
   - Name: `SUPABASE_KEY`
   - Value: Your anon key (the long JWT token)

### Step 2: Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Save (it's already configured via `.github/workflows/deploy.yml`)

### Step 3: Deploy

Push to the `claude/personal-events-hub-R3AoU` branch:

```bash
git push
```

The GitHub Actions workflow will automatically:
1. Build the app with your Supabase credentials injected
2. Deploy to GitHub Pages
3. Your site will be live at `https://<username>.github.io/nearby/` (or with custom domain)

Your credentials **never appear in the source code** — they're injected at build time from GitHub Secrets.

---

## Supabase Table Setup

Before the app can work, you need to create an `events` table in your Supabase project.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to https://app.supabase.com and sign in
2. Select your project (already set up)
3. Go to **SQL Editor** on the left sidebar
4. Click **New Query**
5. Copy and paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  datetime TIMESTAMP,
  dateRaw TEXT,
  timeRaw TEXT,
  location TEXT,
  link TEXT,
  category TEXT DEFAULT 'Other',
  created TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for this table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all reads
CREATE POLICY "Allow public read" ON events
FOR SELECT USING (true);

-- Create policy to allow all inserts
CREATE POLICY "Allow public insert" ON events
FOR INSERT WITH CHECK (true);

-- Create policy to allow all deletes
CREATE POLICY "Allow public delete" ON events
FOR DELETE USING (true);
```

6. Click **Run** to execute the SQL
7. Done! The table is now ready

### Option 2: Using Supabase UI

1. Go to **Table Editor** on the left sidebar
2. Click **Create a new table** → Name it `events`
3. Add these columns:
   - `id` (Text, Primary key)
   - `name` (Text, Required)
   - `datetime` (Timestamp with timezone, Optional)
   - `dateRaw` (Text, Optional)
   - `timeRaw` (Text, Optional)
   - `location` (Text, Optional)
   - `link` (Text, Optional)
   - `category` (Text, Default value: 'Other')
   - `created` (Timestamp with timezone, Auto-set to now)

4. Once the table is created:
   - Go to **Authentication** > **Policies**
   - Enable Row Level Security for the `events` table
   - Add these policies:
     - **All public reads** (SELECT)
     - **All public inserts** (INSERT)
     - **All public deletes** (DELETE)

## Using the App

### Three Input Modes

1. **Manual** — Fill in the form directly (name, date, time, location, link, category)
2. **Paste Text** — Paste text from a flyer, email, or social post. The app will try to extract details
3. **From URL** — Save the link with the event

### Three View Modes

1. **List** — Events grouped into Upcoming, No Date Set, and Past sections
2. **Calendar** — Month grid view with events shown as colored pills per day
3. **Map** — Geographic view of events by location (shows events near Broomall, PA area)

### Features

- **Search** — Find events by name or location
- **Filter** — Filter by category (Music, Food, Art, Sports, Comedy, Tech, Theater, Other)
- **Delete** — Remove events with the × button on each card
- **Links** — Event names with links show a ↗ icon and open in a new tab
- **Past events** — Appear at reduced opacity

## Local Development

To test locally with environment variables:

```bash
# Build with your credentials (reads from .env or hardcoded defaults)
node build.js

# Then open dist/index.html in your browser
```

Or create a `.env` file (gitignored):
```
SUPABASE_URL=https://vjlqtrrpbkottvmmzbld.supabase.co
SUPABASE_KEY=your_key_here
```

Then run `node build.js` again.

## Other Deployment Options

- **Netlify** — Point to the `dist/` folder (or use the GitHub Pages method)
- **Vercel** — Same as Netlify
- **Any static host** — The `dist/index.html` file is pure HTML/CSS/JS with no dependencies

## Troubleshooting

**Events not loading?**
- Check browser console for errors (F12)
- Verify Supabase credentials are correct
- Ensure the `events` table exists and RLS policies are set up

**Paste parsing not working well?**
- The smartParse function looks for common patterns
- Try formatting as: "Event Name at Location on Date at Time"

**Map not showing events?**
- Check that event locations match known PA areas (Broomall, Philadelphia, Media, Chester, etc.)
- Or add custom coordinates in the `getCoordinates()` function

## Customization

All styling is controlled by the `THEME` object at the top of the HTML file. To customize:

1. Open `index.html` in a text editor
2. Find the `THEME` object (near the top of the `<script>` tag)
3. Change colors, fonts, or layout properties
4. Save and refresh your browser

### Key Theme Properties

- `bgPage` — Page background color
- `accent` — Primary accent color (purple by default)
- `catColors` — Colors for each category
- `fontBody` — Main font
- `maxWidth` — Max content width

That's it! Enjoy managing your local events in one place. 🗺️
