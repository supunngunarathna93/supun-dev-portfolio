import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, X, ArrowSquareOut } from '@phosphor-icons/react';

const ease = [0.16, 1, 0.3, 1];

const CATEGORIES = ['all', 'event', 'social', 'documentary', 'motion'];

// ── Work items data ──
// VIDEO SLOTS: Replace 'thumb' with real thumbnail, 'videoLink' with real URL or set 'videoPath' for local files
const WORKS = [
  {
    id: 'bts-uovt-2026',
    title: 'BTS — Opening Ceremony of HD STUDIO AND PROADCAST STUDIO of UOVT 2026',
    client: 'University Of Vocational Technology',
    role: 'Director / Editor',
    tools: ['Premiere Pro'],
    year: '2026',
    category: 'event',
    timecode: '00:04:12:08',
    // Local public asset (or direct link: https://lh3.googleusercontent.com/d/1P-vAA8wyH9jfcHlcV-XLYWkJKOr1glV7)
    thumb: '/projects/bts-uovt-2026.png',
    videoLink: 'https://drive.google.com/file/d/1aQyKoRgEV2HxwVil0fyPZvU4PCp41dLy/view?usp=sharing',
    featured: true,
  },
  {
    id: 'hanthana-trip-2026',
    title: 'Hanthana Batch Trip',
    client: 'UVOCTECH',
    role: 'Editor',
    tools: ['Premiere Pro'],
    year: '2026',
    category: 'documentary',
    timecode: '00:06:38:14',
    // VIDEO SLOT ↓
    thumb: 'https://picsum.photos/seed/mountain-trip-film/800/450',
    videoLink: 'https://drive.google.com/file/d/1FYkNnhN2gbtFoDSTXEBm3l2FJe7s42v8/view?usp=drive_link',
  },
  {
    id: 'siythra-session-2026',
    title: 'Siythra Educational Session',
    client: 'Dept. of Multimedia & Web Technology',
    role: 'Editor',
    tools: ['Premiere Pro'],
    year: '2026',
    category: 'documentary',
    timecode: '00:03:47:02',
    // VIDEO SLOT ↓
    thumb: 'https://picsum.photos/seed/educational-session/800/450',
    videoLink: 'https://drive.google.com/file/d/1DjOdI3DoeOqLTrH7fZrzAZMXM91Etk01/view?usp=sharing',
  },
  {
    id: 'freshers-reveal-2026',
    title: 'Freshers 2026 Theme Reveal',
    client: 'UVOCTECH',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    year: '2026',
    category: 'motion',
    timecode: '00:01:58:21',
    // VIDEO SLOT ↓
    thumb: 'https://picsum.photos/seed/theme-reveal-cinematic/800/450',
    videoLink: 'https://drive.google.com/file/d/1C9qiE04p2PnkujZGzVaRAd9hH0eJw1qr/view?usp=drive_link',
  },
  {
    id: 'freshers-aftermovie-2026',
    title: 'Freshers 2026 After Movie',
    client: 'UVOCTECH',
    role: 'Director / Editor / Colorist',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    year: '2026',
    category: 'event',
    timecode: '00:08:14:06',
    // VIDEO SLOT ↓
    thumb: 'https://picsum.photos/seed/after-movie-event/800/450',
    videoLink: 'https://drive.google.com/drive/folders/1rWps5NqCg7yySYbCpfljlMz0erLJTsGI?usp=sharing',
    featured: true,
  },
];

function WorkCard({ item, index, onPlay, t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onClick={() => onPlay(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — ${t('work.watch')}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onPlay(item); }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'var(--surface-3)',
      }}>
        <img
          src={item.thumb}
          alt={item.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.55s var(--ease-out-expo)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Hover overlay with play */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(11,11,13,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'var(--amber)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(212,168,67,0.4)',
            transform: hovered ? 'scale(1)' : 'scale(0.7)',
            transition: 'transform 0.3s var(--ease-out-expo)',
          }}>
            <Play size={20} weight="fill" style={{ color: 'var(--ink)', marginLeft: 2 }} />
          </div>
        </div>

        {/* Timecode top-left */}
        <div style={{
          position: 'absolute', top: '0.6rem', left: '0.6rem',
          background: 'rgba(11,11,13,0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--r-sm)',
          padding: '0.18rem 0.55rem',
        }}>
          <span className="timecode">{item.timecode}</span>
        </div>

        {/* Featured badge */}
        {item.featured && (
          <div style={{
            position: 'absolute', top: '0.6rem', right: '0.6rem',
            background: 'var(--amber)',
            borderRadius: 'var(--r-sm)',
            padding: '0.18rem 0.6rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}>Featured</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.975rem',
            fontWeight: 700,
            color: 'var(--bone)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            flex: 1,
            marginRight: '0.75rem',
          }}>{item.title}</h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--fog)',
            flexShrink: 0,
          }}>{item.year}</span>
        </div>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: 'var(--fog)',
          marginBottom: '0.75rem',
          lineHeight: 1.5,
        }}>
          {item.client} · <span style={{ color: 'var(--smoke)' }}>{item.role}</span>
        </p>

        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {item.tools.map((tool) => (
            <span key={tool} className="chip">{tool}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function SelectedWork() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all' ? WORKS : WORKS.filter((w) => w.category === filter);

  const openItem = (item) => {
    if (item.videoLink) {
      window.open(item.videoLink, '_blank', 'noopener,noreferrer');
    } else if (item.videoPath) {
      setLightbox(item);
    } else {
      setLightbox(item);
    }
  };

  return (
    <section id="work" style={{ padding: '8rem 0', position: 'relative' }}>
      <div className="container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: '2.5rem' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--bone)',
            marginBottom: '0.75rem',
          }}>
            {t('work.title')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--smoke)',
            maxWidth: '46ch',
            lineHeight: 1.7,
          }}>
            {t('work.subtitle')}
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          style={{
            display: 'flex', gap: '0.4rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
          role="group"
          aria-label="Filter works by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
            >
              {t(`work.filter_${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Works grid — asymmetric */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '1rem',
            }}
          >
            {filtered.map((item, i) => (
              <WorkCard
                key={item.id}
                item={item}
                index={i}
                onPlay={openItem}
                t={t}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox for local video files */}
      <AnimatePresence>
        {lightbox && lightbox.videoPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ ease }}
              className="lightbox-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label={t('work.lightbox_close')}
              >
                <X size={16} />
              </button>
              <video
                src={lightbox.videoPath}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
