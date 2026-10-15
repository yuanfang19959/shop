import { useEffect, useMemo, useRef, useState } from 'react';
import { products, selectProducts } from './data/catalog';
import { useCart } from './context/CartContext';
import { useI18n } from './i18n';
import { money } from './lib/money';
import { CartDrawer } from './components/CartDrawer';
import { Catalog } from './components/Catalog';
import { Checkout } from './components/Checkout';
import { Confirmation } from './components/Confirmation';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProductView } from './components/ProductView';

export default function App() {
  const { t, tx, lang } = useI18n();
  const { add, count, lines, subtotal } = useCart();
  const [route, setRoute] = useState({ name: 'shop' });
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('featured');
  const [toast, setToast] = useState(null);
  const [order, setOrder] = useState(null);
  const scrollRef = useRef(0);

  const visible = useMemo(
    () => selectProducts(products, { query, category, price, sort, lang }),
    [query, category, price, sort, lang]
  );

  useEffect(() => {
    document.body.classList.toggle('lock', cartOpen);
    return () => document.body.classList.remove('lock');
  }, [cartOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const titles = {
      shop: t('doc.shop'),
      checkout: t('doc.checkout'),
      confirm: t('doc.confirm'),
    };
    let page = titles[route.name] || t('doc.shop');
    if (route.name === 'product') {
      const product = products.find((item) => item.id === route.id);
      page = product ? tx(product.name) : t('missing');
    }
    document.title = `${page} · Atlas House`;
  }, [route, lang, t, tx]);

  useEffect(() => {
    if (route.name === 'shop') window.scrollTo(0, scrollRef.current);
    else window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goShop = () => {
    scrollRef.current = 0;
    setRoute({ name: 'shop' });
  };

  const openProduct = (id) => {
    if (route.name === 'shop') scrollRef.current = window.scrollY;
    setCartOpen(false);
    setRoute({ name: 'product', id });
  };

  const onSearch = (value) => {
    setQuery(value);
    if (route.name !== 'shop') {
      scrollRef.current = 0;
      setRoute({ name: 'shop' });
    }
  };

  const onCategory = (next) => {
    setCategory(next);
    if (route.name !== 'shop') {
      scrollRef.current = 0;
      setRoute({ name: 'shop' });
    }
  };

  const addToBag = (product, qty = 1, option = null) => {
    const current = lines.find((line) => line.id === product.id && (line.option || null) === (option || null))?.qty || 0;
    if (current >= 8) {
      setToast({ type: 'max', name: tx(product.name) });
      return 'max';
    }
    add(product.id, qty, option);
    setToast({ type: 'add', name: tx(product.name) });
    return 'ok';
  };

  const showBagBar = count > 0 && !cartOpen && route.name === 'shop';
  const showCats = route.name === 'shop' || route.name === 'product';
  const pageClass = ['page', showBagBar ? 'pad-bag' : '', route.name === 'product' ? 'pad-buy' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={pageClass}>
      <a className="skip" href="#main">
        {t('skip')}
      </a>
      <Header
        query={query}
        onQuery={onSearch}
        count={count}
        onCart={() => setCartOpen(true)}
        onHome={goShop}
        category={category}
        onCategory={onCategory}
        showCats={showCats}
        cartOpen={cartOpen}
      />
      <main id="main">
        {route.name === 'shop' && (
          <Catalog
            products={visible}
            query={query}
            category={category}
            price={price}
            sort={sort}
            onPrice={setPrice}
            onSort={setSort}
            onOpen={openProduct}
            onAdd={addToBag}
            showLead={category === 'All' && price === 'all' && !query.trim() && sort === 'featured'}
            onClear={() => {
              setQuery('');
              setCategory('All');
              setPrice('all');
              setSort('featured');
            }}
          />
        )}
        {route.name === 'product' && (
          <ProductView id={route.id} onBack={goShop} onOpen={openProduct} onAdd={addToBag} />
        )}
        {route.name === 'checkout' && (
          <Checkout
            onShop={goShop}
            onEditBag={() => setCartOpen(true)}
            onPlaced={(next) => {
              setOrder(next);
              setRoute({ name: 'confirm' });
            }}
          />
        )}
        {route.name === 'confirm' && <Confirmation order={order} onShop={goShop} />}
      </main>
      <Footer />
      {toast && (
        <div className="toast" role="status">
          <p>{toast.type === 'max' ? t('toastMax', { name: toast.name }) : t('toastAdded', { name: toast.name })}</p>
          {toast.type === 'add' && (
            <button
              type="button"
              onClick={() => {
                setToast(null);
                setCartOpen(true);
              }}
            >
              {t('viewBag')}
            </button>
          )}
        </div>
      )}
      {showBagBar && (
        <button type="button" className="bag-bar" onClick={() => setCartOpen(true)}>
          <span>{t('bag')}</span>
          <span>{count}</span>
          <span>{money(subtotal)}</span>
        </button>
      )}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onOpenProduct={openProduct}
        onCheckout={() => {
          setCartOpen(false);
          scrollRef.current = 0;
          setRoute({ name: 'checkout' });
        }}
      />
    </div>
  );
}
