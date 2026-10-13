import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EnvelopeSimple, WhatsappLogo, LinkedinLogo, YoutubeLogo, InstagramLogo, Check } from '@phosphor-icons/react';

const ease = [0.16, 1, 0.3, 1];

const EMAIL = 'supunngunarathna.edit.work@gmail.com';

const SOCIALS = [
  {
    key: 'whatsapp',
    icon: WhatsappLogo,
    href: 'https://wa.me/94000000000', // REPLACE with real WhatsApp number
    handle: '+94 XXX XXX XXX',
  },
  {
    key: 'linkedin',
    icon: LinkedinLogo,
    href: 'https://linkedin.com/in/supun-n-gunarathna-70ab43320',
    handle: 'Supun N Gunarathna',
  },
  {
    key: 'youtube',
    icon: YoutubeLogo,
    href: 'https://youtube.com/@supunngunarathna', // REPLACE with real YouTube channel
    handle: '@supunngunarathna',
  },
  {
    key: 'instagram',
    icon: InstagramLogo,
    href: 'https://instagram.com/supunngunarathna', // REPLACE with real Instagram
    handle: '@supunngunarathna',
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Name is required';
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errs.email = 'Valid email required';
    if (!formState.message.trim() || formState.message.length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormError(errs); return; }
    setFormError({});
    // Opens email client with pre-filled content — replace with real form handler if needed
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`);
    const body = encodeURIComponent(formState.message);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--bone)',
    background: 'var(--surface-2)',
    border: `1px solid ${formError[field] ? 'rgba(232,64,64,0.6)' : 'var(--border)'}`,
    borderRadius: 'var(--r-sm)',
    padding: '0.75rem 1rem',
    outline: 'none',
    transition: 'border-color var(--t-fast)',
    display: 'block',
  });

  return (
    <section id="contact" style={{ position: 'relative' }}>
      {/* Ambient */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 65%)',
        filter: 'blur(80px)',
        pointerEvents: 'none', borderRadius: '50%',
      }} />

      <div className="container" ref={ref}>
        {/* Giant editorial headline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          style={{ marginBottom: '4rem', maxWidth: 900 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            color: 'var(--bone)',
            marginBottom: '1.25rem',
          }}>
            {t('contact.headline')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: 'var(--smoke)',
            maxWidth: '44ch',
            lineHeight: 1.75,
          }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Two-col: form left, links right */}
        <div className="contact-grid">

          {/* Contact form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {submitted ? (
              <div style={{
                padding: '2rem',
                background: 'var(--amber-glow)',
                border: '1px solid var(--amber-border)',
                borderRadius: 'var(--r-lg)',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <Check size={20} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--bone)' }}>
                  Your email client has opened with a pre-filled message. Thank you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--fog)',
                    marginBottom: '0.4rem',
                  }}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={inputStyle('name')}
                    aria-describedby={formError.name ? 'err-name' : undefined}
                    aria-invalid={!!formError.name}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--amber-border-strong)'; }}
                    onBlur={(e) => { e.target.style.borderColor = formError.name ? 'rgba(232,64,64,0.6)' : 'var(--border)'; }}
                  />
                  {formError.name && (
                    <span id="err-name" role="alert" style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
                      color: '#E84040', marginTop: '0.3rem', display: 'block',
                    }}>{formError.name}</span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--fog)',
                    marginBottom: '0.4rem',
                  }}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={inputStyle('email')}
                    aria-describedby={formError.email ? 'err-email' : undefined}
                    aria-invalid={!!formError.email}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--amber-border-strong)'; }}
                    onBlur={(e) => { e.target.style.borderColor = formError.email ? 'rgba(232,64,64,0.6)' : 'var(--border)'; }}
                  />
                  {formError.email && (
                    <span id="err-email" role="alert" style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
                      color: '#E84040', marginTop: '0.3rem', display: 'block',
                    }}>{formError.email}</span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--fog)',
                    marginBottom: '0.4rem',
                  }}>Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                    aria-describedby={formError.message ? 'err-message' : undefined}
                    aria-invalid={!!formError.message}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--amber-border-strong)'; }}
                    onBlur={(e) => { e.target.style.borderColor = formError.message ? 'rgba(232,64,64,0.6)' : 'var(--border)'; }}
                  />
                  {formError.message && (
                    <span id="err-message" role="alert" style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.78rem',
                      color: '#E84040', marginTop: '0.3rem', display: 'block',
                    }}>{formError.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send message
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — email + socials */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Email row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.1rem 1.25rem',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              flexWrap: 'wrap',
            }}>
              <div style={{
                width: 38, height: 38,
                borderRadius: 'var(--r-sm)',
                background: 'var(--amber-glow)',
                border: '1px solid var(--amber-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <EnvelopeSimple size={17} style={{ color: 'var(--amber)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--fog)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                  {t('contact.email_label')}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--bone)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {EMAIL}
                </div>
              </div>
              <button
                onClick={copy}
                className="btn"
                style={{
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.78rem',
                  background: copied ? 'var(--amber-glow)' : 'var(--surface-3)',
                  color: copied ? 'var(--amber)' : 'var(--smoke)',
                  border: `1px solid ${copied ? 'var(--amber-border)' : 'var(--border)'}`,
                  flexShrink: 0,
                }}
                aria-live="polite"
              >
                {copied ? t('contact.copied') : t('contact.copy')}
              </button>
            </div>

            {/* Social links */}
            {SOCIALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.9rem 1.25rem',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-lg)',
                    textDecoration: 'none',
                    transition: 'border-color var(--t-fast), background var(--t-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--amber-border)';
                    e.currentTarget.style.background = 'var(--surface-3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface-2)';
                  }}
                  aria-label={`${t(`contact.${s.key}`)} — ${s.handle}`}
                >
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: 'var(--smoke)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--bone)', marginBottom: '0.1rem' }}>
                      {t(`contact.${s.key}`)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fog)' }}>
                      {s.handle}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '6rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--fog)' }}>
            {t('contact.footer_copy')}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--fog)', letterSpacing: '0.06em' }}>
            {t('contact.footer_built')}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
