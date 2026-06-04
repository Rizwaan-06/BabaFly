import { Globe, Share2, Rss, Link } from 'lucide-react';

const LINKS = {
  Platform: ['Marketplace', 'Charter', 'Aircraft Sales', 'MRO Services'],
  Company:  ['About Us', 'Careers', 'Press', 'Contact'],
  Legal:    ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
};

const SOCIALS = [
  { Icon: Globe,   id: 'footer-instagram', label: 'Instagram' },
  { Icon: Share2,  id: 'footer-twitter',   label: 'Twitter'   },
  { Icon: Link,    id: 'footer-linkedin',  label: 'LinkedIn'  },
  { Icon: Rss,     id: 'footer-youtube',   label: 'YouTube'   },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '72px 40px 40px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row */}
        <div className="grid-footer">
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800, fontSize: 17,
              letterSpacing: '0.12em',
              color: '#fff', textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              BabaFly
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.75, maxWidth: 240, marginBottom: 28,
            }}>
              Elevated excellence. Experience the pinnacle of modern aerospace travel.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 14 }}>
              {SOCIALS.map(({ Icon, id, label }) => (
                <button
                  key={id}
                  id={id}
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', marginBottom: 20,
              }}>
                {col}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13, color: 'rgba(255,255,255,0.45)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="footer-bottom" style={{
          paddingTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, color: 'rgba(255,255,255,0.2)',
          }}>
            © 2026 BabaFly. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, color: 'rgba(255,255,255,0.2)',
          }}>
            Crafted for those who fly above ordinary.
          </p>
        </div>
      </div>
    </footer>
  );
}
