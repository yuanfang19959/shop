import { useState } from 'react';
import { useI18n } from '../i18n';

export function ProductImage({ product, badge, eager = false, alt }) {
  const { tx } = useI18n();
  const [ok, setOk] = useState(true);
  const label = alt === undefined ? tx(product.name) : alt;

  return (
    <div className={`media${ok ? '' : ' is-fallback'}`} data-tone={product.tone || 'sand'}>
      {ok && (
        <img
          src={product.image}
          alt={label}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setOk(false)}
        />
      )}
      {!ok && <span className="mono" aria-hidden="true">{tx(product.name).slice(0, 1)}</span>}
      {badge ? <span className="badge">{badge}</span> : null}
    </div>
  );
}
