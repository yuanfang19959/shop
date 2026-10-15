import { useI18n } from '../i18n';

export function Qty({ value, onChange }) {
  const { t } = useI18n();
  return (
    <div className="qty" role="group" aria-label={t('quantity')}>
      <button
        type="button"
        aria-label={t('decrease')}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        −
      </button>
      <span className="qty-val" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={t('increase')}
        onClick={() => onChange(Math.min(8, value + 1))}
        disabled={value >= 8}
      >
        +
      </button>
    </div>
  );
}
