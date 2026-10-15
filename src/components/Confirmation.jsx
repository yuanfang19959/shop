import { getCountry } from '../data/shipping';
import { useI18n } from '../i18n';
import { money } from '../lib/money';
import { ProductImage } from './ProductImage';

export function Confirmation({ order, onShop }) {
  const { t, tx, lang } = useI18n();

  if (!order) {
    return (
      <div className="wrap empty">
        <h1>{t('missingOrder')}</h1>
        <button type="button" className="btn btn-primary" onClick={onShop}>
          {t('backShop')}
        </button>
      </div>
    );
  }

  const country = getCountry(order.country);

  return (
    <div className="wrap confirm">
      <p className="kicker">{t('confirmKicker')}</p>
      <h1>{t('confirmTitle')}</h1>
      <p className="story">{t('confirmBody', { email: order.email })}</p>
      <p className="order-no">
        <span>{t('orderNo')}</span>
        {order.number}
      </p>
      <p>
        {t('confirmFor', { name: order.person })}
        {' · '}
        {t('shipTo')} {lang === 'zh' ? country.zh : country.en}
      </p>
      <ul className="summary-lines">
        {order.lines.map((line) => (
          <li key={`${line.id}-${line.option || ''}`}>
            <span className="confirm-item">
              <ProductImage product={{ name: line.name, image: line.image, tone: line.tone }} alt="" />
              <span>
                {tx(line.name)}
                {line.option ? ` · ${line.option}` : ''} × {line.qty}
              </span>
            </span>
            <span>{money(line.price * line.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="totals">
        <div>
          <dt>{t('subtotal')}</dt>
          <dd>{money(order.subtotal)}</dd>
        </div>
        <div>
          <dt>{t('shipping')}</dt>
          <dd>{order.shipping === 0 ? t('free') : money(order.shipping)}</dd>
        </div>
        <div className="grand">
          <dt>{t('total')}</dt>
          <dd>{money(order.total)}</dd>
        </div>
      </dl>
      <button type="button" className="btn btn-primary" onClick={onShop}>
        {t('backShop')}
      </button>
    </div>
  );
}
