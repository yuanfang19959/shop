import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/catalog';
import { useI18n } from '../i18n';

export function Header({
  query,
  onQuery,
  count,
  onCart,
  onHome,
  category,
  onCategory,
  showCats,
  cartOpen,
}) {
  const { t, lang, setLang } = useI18n();
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const pendingFocus = useRef(false);

  useEffect(() => {
    if (searching && pendingFocus.current) {
      inputRef.current?.focus();
      pendingFocus.current = false;
    }
  }, [searching]);

  useEffect(() => {
    const onKey = (event) => {
      const tag = document.activeElement?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (event.key === '/' && !typing && !cartOpen) {
        event.preventDefault();
        pendingFocus.current = true;
        setSearching(true);
        inputRef.current?.focus();
      }
      if (event.key === 'Escape' && searching) {
        setSearching(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, searching]);

  return (
    <header className={`site-header${searching ? ' is-searching' : ''}`}>
      <p className="announce">{t('announce')}</p>
      <div className="wrap bar">
        <button type="button" className="brand" onClick={onHome}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M16 6c2.4 3 3.8 6.3 3.8 10S18.4 23 16 26c-2.4-3-3.8-6.3-3.8-10S13.6 9 16 6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M6.5 16h19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Atlas House</span>
            <span className="brand-sub">{t('brandTag')}</span>
          </span>
        </button>

        <form
          className="search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            inputRef.current?.blur();
          }}
        >
          <input
            id="search"
            ref={inputRef}
            type="search"
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            value={query}
            enterKeyHint="search"
            onChange={(event) => onQuery(event.target.value)}
            onFocus={() => setSearching(true)}
          />
          {query && (
            <button type="button" className="clear-search" onClick={() => onQuery('')} aria-label={t('clearSearch')}>
              ×
            </button>
          )}
        </form>

        <button
          type="button"
          className={`icon-btn search-toggle${query ? ' has-query' : ''}`}
          aria-label={searching ? t('closeSearch') : t('openSearch')}
          aria-expanded={searching}
          onClick={() => {
            if (searching) {
              setSearching(false);
              return;
            }
            pendingFocus.current = true;
            setSearching(true);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M15.2 15.2 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          className="lang-btn"
          aria-label={lang === 'en' ? '切换到中文' : 'Switch to English'}
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
        >
          {lang === 'en' ? '中文' : 'EN'}
        </button>

        <button type="button" className="bag-btn" onClick={onCart} aria-label={t('bagCount', { count })}>
          <span>{t('bag')}</span>
          <span className="count-pill" key={count}>
            {count}
          </span>
        </button>
      </div>

      {showCats && (
        <div className="wrap">
          <nav className="cats" aria-label={t('categories')}>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'cat is-on' : 'cat'}
                aria-pressed={category === item}
                onClick={() => onCategory(item)}
              >
                {t(`cat.${item}`)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
