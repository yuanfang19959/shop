import { useI18n } from '../i18n';
import { ProductCard } from './ProductCard';

export function Catalog({
  products,
  query,
  category,
  price,
  sort,
  onPrice,
  onSort,
  onOpen,
  onAdd,
  showLead,
  onClear,
}) {
  const { t } = useI18n();
  const filtered = category !== 'All' || price !== 'all' || query.trim() !== '';

  return (
    <div className="wrap shop">
      {query.trim() ? (
        <h1 className="search-title">{t('searchResults', { query: query.trim() })}</h1>
      ) : (
        <header className="hero">
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroBody')}</p>
        </header>
      )}

      <div className="toolbar">
        <p className="result-count" aria-live="polite">
          {products.length === 1 ? t('resultsOne') : t('resultsMany', { count: products.length })}
        </p>
        <div className="tools">
          <label className="field">
            <span>{t('priceLabel')}</span>
            <select value={price} onChange={(event) => onPrice(event.target.value)}>
              <option value="all">{t('price.all')}</option>
              <option value="under50">{t('price.under50')}</option>
              <option value="mid">{t('price.mid')}</option>
              <option value="over120">{t('price.over120')}</option>
            </select>
          </label>
          <label className="field">
            <span>{t('sortLabel')}</span>
            <select value={sort} onChange={(event) => onSort(event.target.value)}>
              <option value="featured">{t('sort.featured')}</option>
              <option value="priceAsc">{t('sort.priceAsc')}</option>
              <option value="priceDesc">{t('sort.priceDesc')}</option>
              <option value="name">{t('sort.name')}</option>
            </select>
          </label>
          {filtered && (
            <button type="button" className="text-btn clear-filters" onClick={onClear}>
              {t('clearFilters')}
            </button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty">
          <h2>{t('emptyTitle')}</h2>
          <p>{t('emptyBody')}</p>
          <button type="button" className="btn btn-primary" onClick={onClear}>
            {t('clearFilters')}
          </button>
        </div>
      ) : (
        <div className="grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              lead={showLead && index === 0}
              onOpen={onOpen}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
}
