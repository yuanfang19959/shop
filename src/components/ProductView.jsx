import { useEffect, useState } from 'react';
import { getProduct, products, relatedProducts } from '../data/catalog';
import { useCart } from '../context/CartContext';
import { useI18n } from '../i18n';
import { money } from '../lib/money';
import { AddButton } from './AddButton';
import { Price } from './Price';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';
import { Qty } from './Qty';

export function ProductView({ id, onBack, onOpen, onAdd }) {
  const { t, tx } = useI18n();
  const { lines } = useCart();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const next = getProduct(id);
    setQty(1);
    setOption(next?.options?.values[0] || null);
  }, [id]);

  if (!product) {
    return (
      <div className="wrap empty">
        <h1>{t('missing')}</h1>
        <button type="button" className="btn btn-primary" onClick={onBack}>
          {t('back')}
        </button>
      </div>
    );
  }

  const name = tx(product.name);
  const inBag = lines.find((line) => line.id === product.id && (line.option || null) === (option || null))?.qty || 0;
  const related = relatedProducts(product, products);

  return (
    <div className="wrap view-product">
      <button type="button" className="text-btn back" onClick={onBack}>
        ← {t('back')}
      </button>
      <div className="product-grid">
        <ProductImage product={product} eager />
        <div className="buy">
          <p className="cat-label">{t(`cat.${product.category}`)}</p>
          <h1>{name}</h1>
          <Price product={product} />
          <p className="story">{tx(product.story)}</p>
          {product.options && (
            <fieldset className="sizes">
              <legend>{tx(product.options.label)}</legend>
              <div className="size-row">
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={option === value ? 'size is-on' : 'size'}
                    aria-pressed={option === value}
                    onClick={() => setOption(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <div className="qty-row">
            <span className="qty-label">{t('quantity')}</span>
            <Qty value={qty} onChange={setQty} />
          </div>
          {inBag > 0 && <p className="in-bag">{t('inBag', { count: inBag })}</p>}
          <p className="quiet">{t('maxNote')}</p>
          <div className="desktop-add">
            <AddButton product={product} qty={qty} option={option} onAdd={onAdd} className="btn btn-primary btn-block">
              {t('add')}
            </AddButton>
          </div>
          <p className="quiet">{t('shipsNote')}</p>
          <p className="quiet">{t('pricesNote')}</p>
          <dl className="facts">
            {product.details.map((row) => (
              <div key={row.label.en}>
                <dt>{tx(row.label)}</dt>
                <dd>{tx(row.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="related">
        <h2>{t('alsoLike')}</h2>
        <div className="grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} onOpen={onOpen} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <div className="buy-bar">
        <div className="buy-bar-copy">
          <strong>{money(product.price)}</strong>
          <span>
            {name}
            {option ? ` · ${option}` : ''}
          </span>
        </div>
        <AddButton product={product} qty={qty} option={option} onAdd={onAdd} className="btn btn-primary">
          {t('add')}
        </AddButton>
      </div>
    </div>
  );
}
