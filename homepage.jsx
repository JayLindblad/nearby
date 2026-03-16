import React, { useState } from 'react';

const THEME = {
  fontBody: '"DM Sans", sans-serif',
  fontMono: '"Space Mono", monospace',
  bgPage: '#f5f3f0',
  bgCard: '#ffffff',
  bgHover: '#faf8f5',
  textPrimary: '#1a1a1a',
  textSecondary: '#5c5c5c',
  textMuted: '#9a9a9a',
  border: '#e5e1db',
  accent: '#6c5ce7',
  accentHover: '#5a4db3',
  accentLight: '#f3efff',
  accentGradient: 'linear-gradient(135deg, #6c5ce7 0%, #ee5a6f 100%)',
  shadowSm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  shadowMd: '0 2px 8px rgba(0, 0, 0, 0.12)',
  shadowLg: '0 8px 24px rgba(0, 0, 0, 0.15)',
  radiusMd: '12px',
  radiusLg: '16px',
  maxWidth: '800px',
};

const T = THEME;

const S = {
  container: {
    minHeight: '100vh',
    backgroundColor: T.bgPage,
    fontFamily: T.fontBody,
    color: T.textPrimary,
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    maxWidth: T.maxWidth,
    width: '100%',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    marginTop: '40px',
  },
  title: {
    fontSize: '56px',
    fontWeight: 700,
    background: T.accentGradient,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '16px',
    fontFamily: T.fontMono,
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: '20px',
    color: T.textSecondary,
    marginBottom: '12px',
    lineHeight: '1.6',
    fontWeight: 500,
  },
  tagline: {
    fontSize: '16px',
    color: T.textMuted,
    lineHeight: '1.6',
    maxWidth: '500px',
    margin: '0 auto',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '60px',
  },
  featureCard: {
    backgroundColor: T.bgCard,
    padding: '28px 24px',
    borderRadius: T.radiusMd,
    border: `1px solid ${T.border}`,
    boxShadow: T.shadowSm,
    transition: 'all 0.2s',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '12px',
    color: T.textPrimary,
  },
  featureText: {
    fontSize: '14px',
    color: T.textSecondary,
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: T.accent,
    color: '#ffffff',
    border: 'none',
    padding: '16px 40px',
    fontSize: '16px',
    fontWeight: 600,
    borderRadius: T.radiusLg,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: T.fontBody,
    boxShadow: T.shadowMd,
    display: 'inline-block',
    marginTop: '20px',
  },
  buttonHover: {
    backgroundColor: T.accentHover,
    boxShadow: T.shadowLg,
    transform: 'translateY(-2px)',
  },
  section: {
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px',
    color: T.textPrimary,
    textAlign: 'center',
  },
  descriptionBox: {
    backgroundColor: T.accentLight,
    padding: '28px',
    borderRadius: T.radiusMd,
    border: `1px solid ${T.accent}20`,
    marginBottom: '40px',
    lineHeight: '1.8',
  },
  descriptionText: {
    fontSize: '16px',
    color: T.textPrimary,
    marginBottom: '12px',
  },
  highlight: {
    color: T.accent,
    fontWeight: 600,
  },
  footer: {
    textAlign: 'center',
    color: T.textMuted,
    fontSize: '13px',
    marginTop: '40px',
    paddingTop: '40px',
    borderTop: `1px solid ${T.border}`,
  },
};

function HomePage() {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={S.container}>
        <div style={S.content}>
          {/* Hero */}
          <div style={S.hero}>
            <div style={S.title}>Nearby</div>
            <div style={S.subtitle}>Personal Events Hub</div>
            <div style={S.tagline}>
              Everything happening near you, in one place.
            </div>
          </div>

          {/* Description */}
          <div style={S.section}>
            <div style={S.descriptionBox}>
              <div style={S.descriptionText}>
                <span style={S.highlight}>Nearby</span> is your personal database for local events. Instead of jumping between venue websites, social media feeds, and email newsletters, add events from anywhere and view them all in one place.
              </div>
              <div style={S.descriptionText}>
                Built for one person, just you. No sign-up. No ads. Your data stays local.
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div style={S.section}>
            <div style={S.sectionTitle}>How It Works</div>
            <div style={S.featureGrid}>
              <div style={S.featureCard}>
                <div style={S.featureTitle}>📝 Add Manually</div>
                <div style={S.featureText}>
                  Quick form for event name, date, time, location, and link. Takes 30 seconds.
                </div>
              </div>

              <div style={S.featureCard}>
                <div style={S.featureTitle}>📋 Paste & Parse</div>
                <div style={S.featureText}>
                  Dump text from a flyer, email, or post. Nearby extracts dates and details automatically.
                </div>
              </div>

              <div style={S.featureCard}>
                <div style={S.featureTitle}>🔗 From Any Link</div>
                <div style={S.featureText}>
                  Paste a venue URL and fill in the rest. The link stays with your event.
                </div>
              </div>

              <div style={S.featureCard}>
                <div style={S.featureTitle}>📅 Two Views</div>
                <div style={S.featureText}>
                  Browse upcoming events in a list, or flip to calendar mode to see what's happening each day.
                </div>
              </div>

              <div style={S.featureCard}>
                <div style={S.featureTitle}>🔍 Search & Filter</div>
                <div style={S.featureText}>
                  Find events by name or location. Filter by category. Past events fade away automatically.
                </div>
              </div>

              <div style={S.featureCard}>
                <div style={S.featureTitle}>💾 Always Saved</div>
                <div style={S.featureText}>
                  Your events persist across sessions. Everything is private and local.
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ ...S.section, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: T.textSecondary, marginBottom: '24px' }}>
              Ready to organize your local events?
            </div>
            <button
              style={{
                ...S.button,
                ...(hoverButton ? S.buttonHover : {}),
              }}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={() => window.location.href = '#nearby-app'}
            >
              Get Started →
            </button>
          </div>

          {/* Footer */}
          <div style={S.footer}>
            <div>Built for exploring what's near you.</div>
            <div style={{ marginTop: '8px' }}>Broomall, PA</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
