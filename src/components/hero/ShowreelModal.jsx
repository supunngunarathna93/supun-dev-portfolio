import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export default function ShowreelModal({ isOpen, onClose }) {
  const { t } = useTranslation();

  // Escape key handler & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="showreel-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            background: 'rgba(11, 11, 13, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Supun Gunarathna — Showreel"
        >
          {/* Modal Container */}
          <motion.div
            key="showreel-modal"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              aspectRatio: '16/9',
              background: 'var(--surface-2)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--amber-border)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 168, 67, 0.12)',
              overflow: 'hidden',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label={t('work.lightbox_close', 'Close')}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(11, 11, 13, 0.8)',
                border: '1px solid var(--border-2)',
                color: 'var(--bone)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--amber)';
                e.currentTarget.style.color = 'var(--amber)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-2)';
                e.currentTarget.style.color = 'var(--bone)';
              }}
            >
              <X size={18} />
            </button>

            {/* Video element */}
            <video
              src="/showreel-placeholder.mp4"
              poster="https://picsum.photos/seed/cinematic-edit-suite/1280/720"
              controls
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: '#000',
              }}
            >
              <img
                src="https://picsum.photos/seed/cinematic-edit-suite/1280/720"
                alt="Showreel preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
