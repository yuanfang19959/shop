import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { COUNTRIES, getCountry, shippingCost } from '../data/shipping';
import { useI18n } from '../i18n';
import { money } from '../lib/money';

function orderNumber() {
  return `AH-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function Checkout({ onShop, onEditBag, onPlaced }) {
  const { t, tx, lang } = useI18n();
  const { lines, subtotal, country, setCountry, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postal: '' });
  const [errors, setErrors] = useState({});
  const shipping = shippingCost(country, subtotal);
  const total = subtotal + shipping;
  const countryInfo = getCountry(country);

  if (!lines.length) {
    return (
      <div className="wrap empty">
        <h1>{t('cartEmptyTitle')}</h1>
        <p>{t('cartEmptyBody')}</p>
        <button type="button" className="btn btn-primary" onClick={onShop}>
          {t('continue')}
        </button>
      </div>
    );
  }

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = t('err.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t('err.email');
    if (!form.address.trim()) next.address = t('err.address');
    if (!form.city.trim()) next.city = t('err.city');
    if (!form.postal.trim()) next.postal = t('err.postal');
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`checkout-${first}`)?.focus();
      return;
    }

    const order = {
      number: orderNumber(),
      email: form.email.trim(),
      person: form.name.trim(),
      country,
      lines: lines.map((line) => ({
        id: line.id,
        qty: line.qty,
        option: line.option,
        price: line.product.price,
        name: line.product.name,
        optionLabel: line.product.options?.label || null,
        image: line.product.image,
        tone: line.product.tone,
      })),
      subtotal,
      shipping,
      total,
    };
    clear();
    onPlaced(order);
  };

  return (
    <div className="wrap checkout">
      <form className="checkout-form" onSubmit={onSubmit} noValidate>
        <button type="button" className="text-btn back" onClick={onShop}>
          ← {t('continue')}
        </button>
        <h1>{t('checkoutTitle')}</h1>
        <p className="demo-note">{t('demoNote')}</p>
        {Object.values(errors).some(Boolean) && (
          <p className="form-alert" role="alert">
            {t('err.summary')}
          </p>
        )}

        <label className="field">
          <span>{t('fullName')}</span>
          <input
            id="checkout-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <small className="err">{errors.name}</small>}
        </label>
        <label className="field">
          <span>{t('email')}</span>
          <input
            id="checkout-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small className="err">{errors.email}</small>}
        </label>
        <label className="field">
          <span>{t('country')}</span>
          <select id="checkout-country" value={country} onChange={(event) => setCountry(event.target.value)}>
            {COUNTRIES.map((item) => (
              <option key={item.code} value={item.code}>
                {lang === 'zh' ? item.zh : item.en}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t('address')}</span>
          <input
            id="checkout-address"
            name="address"
            autoComplete="street-address"
            value={form.address}
            onChange={update('address')}
            aria-invalid={Boolean(errors.address)}
          />
          {errors.address && <small className="err">{errors.address}</small>}
        </label>
        <div className="split">
          <label className="field">
            <span>{t('city')}</span>
            <input
              id="checkout-city"
              name="city"
              autoComplete="address-level2"
              value={form.city}
              onChange={update('city')}
              aria-invalid={Boolean(errors.city)}
            />
            {errors.city && <small className="err">{errors.city}</small>}
          </label>
          <label className="field">
            <span>{t('postal')}</span>
            <input
              id="checkout-postal"
              name="postal"
              autoComplete="postal-code"
              value={form.postal}
              onChange={update('postal')}
              aria-invalid={Boolean(errors.postal)}
            />
            {errors.postal && <small className="err">{errors.postal}</small>}
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {t('placeOrder', { total: money(total) })}
        </button>
        <button type="button" className="text-btn edit-bag" onClick={onEditBag}>
          {t('editBag')}
        </button>
      </form>

      <aside className="summary-card">
        <h2>{t('summary')}</h2>
        <ul className="summary-lines">
          {lines.map((line) => (
            <li key={`${line.id}-${line.option || ''}`}>
              <span>
                {tx(line.product.name)}
                {line.option ? ` · ${line.option}` : ''} × {line.qty}
              </span>
              <span>{money(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
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
        <p className="quiet">{t('duties')}</p>
      </aside>
    </div>
  );
}
