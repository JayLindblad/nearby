import React, { useState, useRef } from 'react';

const THEME = {
  // Fonts
  fontHeading: '"Outfit", sans-serif',
  fontBody: '"DM Sans", sans-serif',
  fontMono: '"Space Mono", monospace',

  // Backgrounds
  bgPage: '#f5f3f0',
  bgCard: '#ffffff',
  bgHover: '#faf8f5',
  bgHeader: 'rgba(255,255,255,0.95)',
  bgSecondary: '#f0ede8',
  bgTag: '#f0ede8',

  // Text
  textPrimary: '#181c27',
  textSecondary: '#5c5e6e',
  textMuted: '#9296a5',

  // Colors
  primary: '#e55a4e',
  primaryHover: '#cc4a3f',
  primaryFg: '#ffffff',
  accent: '#6c5ce7',
  accentHover: '#5a4db3',
  accentLight: '#f3efff',
  accentGradient: 'linear-gradient(135deg, #e55a4e 0%, #6c5ce7 100%)',
  heroOverlay: 'linear-gradient(135deg, rgba(229,90,78,0.92) 0%, rgba(108,92,231,0.85) 100%)',

  // Borders & Shadows
  border: '#e1e3e8',
  shadowSm: '0 1px 3px rgba(0,0,0,0.07)',
  shadowMd: '0 4px 20px -4px rgba(24,28,39,0.08)',
  shadowLg: '0 8px 32px rgba(24,28,39,0.14)',
  shadowEvent: '0 4px 20px -4px rgba(24,28,39,0.08)',

  // Radii
  radiusSm: '8px',
  radiusMd: '12px',
  radiusLg: '16px',
  radiusPill: '999px',

  // Layout
  maxWidth: '1100px',
  containerPad: '0 20px',

  // Category colors
  catColors: {
    music: '#6c5ce7',
    arts: '#e55a4e',
    food: '#f59e0b',
    outdoors: '#10b981',
    sports: '#3b82f6',
    community: '#ec4899',
    markets: '#8b5cf6',
    fitness: '#06b6d4',
    family: '#f97316',
    comedy: '#eab308',
    theatre: '#d946ef',
    nightlife: '#6366f1',
  },
};

const T = THEME;

const CATEGORIES = [
  { label: '#music',     value: 'music' },
  { label: '#arts',      value: 'arts' },
  { label: '#food',      value: 'food' },
  { label: '#outdoors',  value: 'outdoors' },
  { label: '#sports',    value: 'sports' },
  { label: '#community', value: 'community' },
  { label: '#markets',   value: 'markets' },
  { label: '#fitness',   value: 'fitness' },
  { label: '#family',    value: 'family' },
  { label: '#comedy',    value: 'comedy' },
  { label: '#theatre',   value: 'theatre' },
  { label: '#nightlife', value: 'nightlife' },
];

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Jazz Night at the Rustic Cellar',
    location: 'Media, PA',
    category: 'music',
    date: 'Today',
    time: '7:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Farmers Market — Spring Edition',
    location: 'Broomall, PA',
    category: 'markets',
    date: 'Saturday',
    time: '9:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Wissahickon Trail Morning Hike',
    location: 'Chestnut Hill, PA',
    category: 'outdoors',
    date: 'Sunday',
    time: '8:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
  },
];

// ── SVG Icon helpers ─────────────────────────────────────────────────────────

function MapPinIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SearchIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChevronLeftIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ArrowUpRightIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── Tag Bar ──────────────────────────────────────────────────────────────────

function TagBar({ activeTag, onTagClick }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      borderBottom: `1px solid ${T.border}`,
      backgroundColor: T.bgCard,
    }}>
      <div style={{
        maxWidth: T.maxWidth,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}>
        <span style={{
          flexShrink: 0,
          fontSize: '11px',
          fontFamily: T.fontHeading,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: T.textMuted,
        }}>
          Filter:
        </span>
        <button
          onClick={() => scroll('left')}
          style={{ flexShrink: 0, padding: '4px', color: T.textMuted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
        >
          <ChevronLeftIcon />
        </button>
        <div ref={scrollRef} style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeTag === cat.value;
            const color = T.catColors[cat.value] || T.accent;
            return (
              <button
                key={cat.value}
                onClick={() => onTagClick(isActive ? null : cat.value)}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: T.radiusPill,
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: T.fontBody,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  border: isActive ? 'none' : `1px solid ${T.border}`,
                  backgroundColor: isActive ? color : T.bgTag,
                  color: isActive ? '#ffffff' : T.textPrimary,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => scroll('right')}
          style={{ flexShrink: 0, padding: '4px', color: T.textMuted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

// ── Date Strip ───────────────────────────────────────────────────────────────

function DateStrip({ selectedIndex, onSelect }) {
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const mockCounts = [4, 7, 2, 9, 5, 12, 8, 3, 6, 4, 7, 2, 5, 3];

  const getDayLabel = (date, i) => {
    if (i === 0) return 'TODAY';
    if (i === 1) return 'TOM';
    return DAY_NAMES[date.getDay()];
  };

  return (
    <div style={{
      backgroundColor: T.bgCard,
      borderRadius: T.radiusLg,
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowMd,
      padding: '20px',
      maxWidth: '560px',
      margin: '0 auto',
    }}>
      <p style={{
        fontSize: '11px',
        fontFamily: T.fontHeading,
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: T.textMuted,
        textAlign: 'center',
        marginBottom: '16px',
      }}>
        What's happening near you?
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        {dates.map((date, i) => {
          const isActive = selectedIndex === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 4px',
                borderRadius: T.radiusMd,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
                backgroundColor: isActive ? T.accent : 'transparent',
                color: isActive ? '#ffffff' : T.textPrimary,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isActive ? T.shadowMd : 'none',
                fontFamily: T.fontBody,
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.8 }}>
                {getDayLabel(date, i)}
              </span>
              <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: T.fontHeading, lineHeight: 1.2 }}>
                {date.getDate()}
              </span>
              <span style={{ fontSize: '10px', opacity: isActive ? 0.8 : 0.5 }}>
                {mockCounts[i]}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => {
            const day = today.getDay();
            onSelect(6 - day);
          }}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: T.radiusMd,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: T.primary,
            color: T.primaryFg,
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: T.fontHeading,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          This Weekend
        </button>
      </div>
    </div>
  );
}

// ── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event }) {
  const [hovered, setHovered] = useState(false);
  const color = T.catColors[event.category] || T.accent;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: T.bgCard,
        borderRadius: T.radiusLg,
        border: `1px solid ${T.border}`,
        boxShadow: hovered ? T.shadowLg : T.shadowEvent,
        overflow: 'hidden',
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
          loading="lazy"
        />
        {/* Tag badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '4px 10px',
          borderRadius: T.radiusPill,
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: T.fontBody,
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(4px)',
          color: color,
        }}>
          #{event.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <MapPinIcon size={12} color={T.textMuted} />
          <span style={{ fontSize: '12px', color: T.textMuted }}>{event.location}</span>
        </div>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 600,
          fontFamily: T.fontHeading,
          color: T.textPrimary,
          lineHeight: 1.35,
          marginBottom: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {event.title}
        </h3>
        <p style={{ fontSize: '13px', color: T.textSecondary }}>
          {event.date} · {event.time}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: `1px solid ${T.border}`,
        }}>
          <button style={{
            fontSize: '12px',
            fontWeight: 500,
            color: T.primary,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: T.fontBody,
          }}>
            Visit Site <ExternalLinkIcon />
          </button>
          <button style={{
            fontSize: '12px',
            fontWeight: 500,
            color: T.textMuted,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 'auto',
            fontFamily: T.fontBody,
          }}>
            + Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Site Header ──────────────────────────────────────────────────────────────

function SiteHeader({ searchQuery, onSearchChange }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: T.bgHeader,
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${T.border}`,
      boxShadow: T.shadowSm,
    }}>
      <div style={{
        maxWidth: T.maxWidth,
        margin: '0 auto',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: T.radiusMd,
            background: T.accentGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MapPinIcon size={18} color="#ffffff" />
          </div>
          <span style={{
            fontFamily: T.fontHeading,
            fontWeight: 700,
            fontSize: '20px',
            letterSpacing: '-0.3px',
            color: T.textPrimary,
          }}>
            Nearby
          </span>
        </a>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '480px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: '12px', color: T.textMuted, display: 'flex' }}>
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search events, locations..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 38px',
              borderRadius: T.radiusPill,
              border: 'none',
              backgroundColor: T.bgSecondary,
              fontFamily: T.fontBody,
              fontSize: '14px',
              color: T.textPrimary,
              outline: 'none',
            }}
          />
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
          {['Browse', 'About'].map(label => (
            <button key={label} style={{
              padding: '6px 12px',
              borderRadius: T.radiusMd,
              border: 'none',
              backgroundColor: 'transparent',
              color: T.textSecondary,
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: T.fontBody,
              cursor: 'pointer',
            }}>
              {label}
            </button>
          ))}
          <button style={{
            padding: '8px 20px',
            borderRadius: T.radiusPill,
            border: 'none',
            background: T.accentGradient,
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: T.fontHeading,
            cursor: 'pointer',
            marginLeft: '4px',
          }}>
            Add an Event
          </button>
        </nav>
      </div>
    </header>
  );
}

// ── Weekend Banner ───────────────────────────────────────────────────────────

function WeekendBanner() {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#2d1f4e',
    }}>
      <img
        src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=400&fit=crop"
        alt="Local events"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: T.heroOverlay }} />
      <div style={{
        position: 'relative',
        maxWidth: T.maxWidth,
        margin: '0 auto',
        padding: '40px 20px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{
            fontSize: '12px',
            fontFamily: T.fontHeading,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '8px',
          }}>
            Explore the Weekend Guide
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontFamily: T.fontHeading,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
          }}>
            Events near Broomall, PA
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '16px',
            marginTop: '8px',
            fontFamily: T.fontBody,
          }}>
            Add once, never miss anything local again
          </p>
        </div>
        <div style={{ opacity: 0.7 }}>
          <ArrowUpRightIcon size={36} />
        </div>
      </div>
    </div>
  );
}

// ── Events Near Me Button ────────────────────────────────────────────────────

function EventsNearMeButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '14px 24px',
        borderRadius: T.radiusLg,
        border: 'none',
        backgroundColor: hovered ? '#111827' : T.textPrimary,
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 600,
        fontFamily: T.fontHeading,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: hovered ? T.shadowLg : T.shadowMd,
      }}
    >
      <MapPinIcon size={20} color="#ffffff" />
      Events Near Me
    </button>
  );
}

// ── Feature Highlights ───────────────────────────────────────────────────────

const FEATURES = [
  { icon: '📝', title: 'Add Manually', text: 'Quick form for event name, date, time, location, and link. Takes 30 seconds.' },
  { icon: '📋', title: 'Paste & Parse', text: 'Dump text from a flyer, email, or post. Nearby extracts dates and details automatically.' },
  { icon: '🔗', title: 'From Any Link', text: 'Paste a venue URL and fill in the rest. The link stays with your event.' },
  { icon: '📅', title: 'Two Views', text: 'List mode for quick scanning, calendar mode to visualize your month at a glance.' },
  { icon: '🔍', title: 'Search & Filter', text: 'Find events by name, location, or category. Past events fade away automatically.' },
  { icon: '💾', title: 'Always Saved', text: 'Your events persist across sessions. Everything is private and local to you.' },
];

// ── Main App ─────────────────────────────────────────────────────────────────

function HomePage() {
  const [activeTag, setActiveTag] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = activeTag
    ? MOCK_EVENTS.filter(e => e.category === activeTag)
    : MOCK_EVENTS;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ minHeight: '100vh', backgroundColor: T.bgPage, fontFamily: T.fontBody, color: T.textPrimary }}>

        <SiteHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TagBar activeTag={activeTag} onTagClick={setActiveTag} />
        <WeekendBanner />

        <main style={{ maxWidth: T.maxWidth, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Events Near Me */}
          <EventsNearMeButton />

          {/* Date Selector */}
          <DateStrip selectedIndex={selectedDateIndex} onSelect={setSelectedDateIndex} />

          {/* My Neighborhoods / ACCESS filter row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {['My Neighborhoods', 'Saved Events', 'This Week'].map(label => (
              <button key={label} style={{
                padding: '10px 20px',
                borderRadius: T.radiusPill,
                border: `1px solid ${T.border}`,
                backgroundColor: T.bgCard,
                color: T.textPrimary,
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: T.fontBody,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = T.bgHover}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = T.bgCard}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Events Section */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontFamily: T.fontHeading,
                fontWeight: 700,
                color: T.textPrimary,
              }}>
                {filteredEvents.length} Events · Upcoming
              </h2>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                fontWeight: 500,
                color: T.primary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: T.fontBody,
              }}>
                View All <ChevronRightIcon size={14} />
              </button>
            </div>

            {filteredEvents.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '64px 24px',
                backgroundColor: T.bgCard,
                borderRadius: T.radiusLg,
                border: `1px solid ${T.border}`,
              }}>
                <p style={{ color: T.textMuted }}>No events for this category.</p>
                <button
                  onClick={() => setActiveTag(null)}
                  style={{ marginTop: '8px', fontSize: '14px', color: T.primary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: T.fontBody }}
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}>
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>

          {/* How It Works */}
          <section style={{ marginTop: '16px' }}>
            <h2 style={{
              fontSize: '24px',
              fontFamily: T.fontHeading,
              fontWeight: 700,
              color: T.textPrimary,
              textAlign: 'center',
              marginBottom: '24px',
            }}>
              How It Works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {FEATURES.map(f => (
                <div
                  key={f.title}
                  style={{
                    backgroundColor: T.bgCard,
                    padding: '24px 20px',
                    borderRadius: T.radiusLg,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.shadowSm,
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>{f.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: T.fontHeading, color: T.textPrimary, marginBottom: '8px' }}>{f.title}</div>
                  <div style={{ fontSize: '14px', color: T.textSecondary, lineHeight: 1.6 }}>{f.text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <p style={{ color: T.textSecondary, fontSize: '16px', marginBottom: '20px' }}>
              Have an event to share? Add it in seconds.
            </p>
            <button
              style={{
                padding: '14px 40px',
                borderRadius: T.radiusPill,
                border: 'none',
                background: T.accentGradient,
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: T.fontHeading,
                cursor: 'pointer',
                boxShadow: T.shadowMd,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowLg; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadowMd; e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={() => window.location.href = '#nearby-app'}
            >
              Add an Event →
            </button>
          </div>

        </main>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${T.border}`,
          backgroundColor: T.bgCard,
          marginTop: '32px',
        }}>
          <div style={{
            maxWidth: T.maxWidth,
            margin: '0 auto',
            padding: '32px 20px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: T.fontHeading, fontWeight: 600, color: T.textPrimary, marginBottom: '4px' }}>Nearby</p>
            <p style={{ fontSize: '13px', color: T.textMuted }}>
              Your personal events hub · Broomall, PA · Built for exploring what's near you
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}

export default HomePage;
