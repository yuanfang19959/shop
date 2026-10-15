import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">Atlas House</p>
          <p>{t('footerBlurb')}</p>
        </div>
        <p>{t('footerShip')}</p>
        <p>{t('footerReturns')}</p>
      </div>
    </footer>
  );
}
