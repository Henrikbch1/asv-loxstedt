import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const styles = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4',
  close:
    'absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20',
  closeIcon: 'h-6 w-6',
  image: 'max-h-[90vh] max-w-full rounded-lg object-contain',
} as const;

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return createPortal(
    <div
      aria-label="Bild schließen"
      aria-modal="true"
      className={styles.overlay}
      role="dialog"
      onClick={onClose}
    >
      <button
        aria-label="Schließen"
        className={styles.close}
        type="button"
        onClick={onClose}
      >
        <svg
          className={styles.closeIcon}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <img
        alt={alt}
        className={styles.image}
        src={src}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}
