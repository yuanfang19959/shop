import { useI18n } from '../i18n';
import { AddButton } from './AddButton';
import { Price } from './Price';
import { ProductImage } from './ProductImage';

export function ProductCard({ product, lead = false, onOpen, onAdd }) {
  const { t, tx } = useI18n();
  const name = tx(product.name);
  const badge = product.badge ? tx(product.badge) : null;
  const action = product.options ? (
    <button type="button" className="btn btn-line quick-add" onClick={() => onOpen(product.id)}>
      {t('chooseSize')}
    </button>
  ) : (
    <AddButton product={product} onAdd={onAdd} className={lead ? 'btn btn-primary' : 'btn btn-line quick-add'}>
      {lead ? t('add') : t('addShort')}
    </AddButton>
  );

  if (lead) {
    return (
      <article className="card lead">
        <button type="button" className="media-btn" onClick={() => onOpen(product.id)} aria-label={name}>
          <ProductImage product={product} badge={badge} alt="" />
        </button>
        <div className="lead-copy">
          <button type="button" className="text-hit" onClick={() => onOpen(product.id)}>
            <span className="kicker">{t('leadKicker')}</span>
            <span className="cat-label">{t(`cat.${product.category}`)}</span>
            <span className="name">{name}</span>
            <span className="blurb">{tx(product.blurb)}</span>
            <Price product={product} />
          </button>
          {action}
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <button type="button" className="card-open" onClick={() => onOpen(product.id)}>
        <ProductImage product={product} badge={badge} alt="" />
        <span className="meta">
          <span className="cat-label">{t(`cat.${product.category}`)}</span>
          <span className="name">{name}</span>
          <Price product={product} />
        </span>
      </button>
      {action}
    </article>
  );
}
