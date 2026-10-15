import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

export function AddButton({ product, qty = 1, option = null, onAdd, className, children }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className={`${className}${done ? ' is-done' : ''}`}
      onClick={() => {
        const result = onAdd(product, qty, option);
        if (result === 'max') return;
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 1000);
      }}
    >
      {done ? t('added') : children}
    </button>
  );
}
