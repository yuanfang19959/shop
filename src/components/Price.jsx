import { money } from '../lib/money';

export function Price({ product }) {
  return (
    <span className="price">
      {product.compareAt ? <span className="compare">{money(product.compareAt)}</span> : null}
      <span className={product.compareAt ? 'now' : undefined}>{money(product.price)}</span>
    </span>
  );
}
