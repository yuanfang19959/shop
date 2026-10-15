import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../data/catalog';
import { COUNTRIES } from '../data/shipping';

const CART_KEY = 'atlas-house-cart';
const COUNTRY_KEY = 'atlas-house-country';

function sameLine(line, id, option) {
  return line.id === id && (line.option || null) === (option || null);
}

function reducer(state, action) {
  const option = action.option || null;
  switch (action.type) {
    case 'add': {
      const addQty = action.qty || 1;
      const found = state.find((line) => sameLine(line, action.id, option));
      if (!found) return [...state, { id: action.id, option, qty: Math.min(8, addQty) }];
      return state.map((line) =>
        sameLine(line, action.id, option) ? { ...line, qty: Math.min(8, line.qty + addQty) } : line
      );
    }
    case 'setQty': {
      const qty = Math.max(1, Math.min(8, action.qty));
      return state.map((line) => (sameLine(line, action.id, option) ? { ...line, qty } : line));
    }
    case 'remove':
      return state.filter((line) => !sameLine(line, action.id, option));
    case 'clear':
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((line) => line && typeof line.id === 'string' && Number.isInteger(line.qty) && line.qty >= 1 && line.qty <= 8)
      .map((line) => ({
        id: line.id,
        qty: line.qty,
        option: typeof line.option === 'string' ? line.option : null,
      }));
  } catch {
    return [];
  }
}

function loadCountry() {
  try {
    const code = localStorage.getItem(COUNTRY_KEY);
    return COUNTRIES.some((country) => country.code === code) ? code : 'US';
  } catch {
    return 'US';
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], loadCart);
  const [country, setCountryState] = useState(loadCountry);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const setCountry = (code) => {
    const next = COUNTRIES.some((item) => item.code === code) ? code : 'US';
    setCountryState(next);
    try {
      localStorage.setItem(COUNTRY_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const product = getProduct(item.id);
        if (!product) return [];
        return [{ ...item, product, lineTotal: product.price * item.qty }];
      }),
    [items]
  );

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      country,
      setCountry,
      add: (id, qty = 1, option = null) => dispatch({ type: 'add', id, qty, option }),
      setQty: (id, qty, option = null) => dispatch({ type: 'setQty', id, qty, option }),
      remove: (id, option = null) => dispatch({ type: 'remove', id, option }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [lines, count, subtotal, country]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
