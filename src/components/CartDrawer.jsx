import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { COUNTRIES, FREE_AT, getCountry, shippingCost } from '../data/shipping';
import { useI18n } from '../i18n';
import { money } from '../lib/money';
import { ProductImage } from './ProductImage';
import { Qty } from './Qty';

export function CartDrawer({ open, onClose, onOpenProduct, onCheckout }) {
  const { t, tx, lang } = useI18n();
  const { lines, subtotal, country, setCountry, setQty, remove } = useCart();
  const panelRef = useRef(null);
  const shipping = shippingCost(country, subtotal);
  const total = subtotal + shipping;
  const countryInfo = getCountry(country);
  const remaining = Math.max(0, FREE_AT - subtotal);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    if (!panel) return undefined;
    const previously = document.activeElement;
    const focusable = () =>
      [...panel.querySelectorAll('button, [href], input, select, textarea')].filter(
        (node) => !node.hasAttribute('disabled')
      );
    focusable()[0]?.focus();
    const onKey = (event) => {
      if (event.key !== 'Tab') return;
      const nodes = focusable();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener('keydown', onKey);
    return () => {
      panel.removeEventListener('keydown', onKey);
      if (previously instanceof HTMLElement) previously.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="drawer-root">
      <button type="button" className="overlay" aria-label={t('close')} onClick={onClose} />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        ref={panelRef}
      >
        <div className="drawer-head">
          <h2 id="bag-title">{t('cartTitle')}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('close')}>
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-body empty-bag">
            <p className="empty-title">{t('cartEmptyTitle')}</p>
            <p>{t('cartEmptyBody')}</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              {t('continue')}
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <ul className="lines">
                {lines.map((line) => (
                  <li key={`${line.id}-${line.option || ''}`} className="line">
                    <button type="button" className="line-open" onClick={() => onOpenProduct(line.id)} aria-label={tx(line.product.name)}>
                      <ProductImage product={line.product} alt="" />
                    </button>
                    <div className="line-copy">
                      <button type="button" className="line-name" onClick={() => onOpenProduct(line.id)}>
                        {tx(line.product.name)}
                      </button>
                      {line.option && (
                        <p className="quiet">
                          {tx(line.product.options.label)} {line.option}
                        </p>
                      )}
                      <p className="line-price">{money(line.lineTotal)}</p>
                      <div className="line-actions">
                        <Qty value={line.qty} onChange={(qty) => setQty(line.id, qty, line.option)} />
                        <button type="button" className="text-btn" onClick={() => remove(line.id, line.option)}>
                          {t('remove')}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="drawer-foot">
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (subtotal / FREE_AT) * 100)}%` }} />
              </div>
              <p className="ship-note">
                {remaining === 0 ? t('shipUnlocked') : t('shipProgress', { amount: money(remaining) })}
              </p>
              <label className="field">
                <span>{t('shipsTo')}</span>
                <select id="drawer-country" value={country} onChange={(event) => setCountry(event.target.value)}>
                  {COUNTRIES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {lang === 'zh' ? item.zh : item.en}
                    </option>
                  ))}
                </select>
              </label>
              <dl className="totals">
                <div>
                  <dt>{t('subtotal')}</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>{t('shipping')}</dt>
                  <dd>{shipping === 0 ? t('free') : money(shipping)}</dd>
                </div>
                <div className="grand">
                  <dt>{t('total')}</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>
              <p className="quiet">{t('arrives', { days: countryInfo.days })}</p>
              <button type="button" className="btn btn-primary btn-block" onClick={onCheckout}>
                {t('checkout')} · {money(total)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
