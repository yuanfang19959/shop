export const FREE_AT = 120;

export const COUNTRIES = [
  { code: 'US', en: 'United States', zh: '美国', rate: 8, days: '3–6' },
  { code: 'CA', en: 'Canada', zh: '加拿大', rate: 10, days: '4–8' },
  { code: 'GB', en: 'United Kingdom', zh: '英国', rate: 12, days: '4–8' },
  { code: 'DE', en: 'Germany', zh: '德国', rate: 14, days: '4–8' },
  { code: 'FR', en: 'France', zh: '法国', rate: 14, days: '4–8' },
  { code: 'NL', en: 'Netherlands', zh: '荷兰', rate: 14, days: '4–8' },
  { code: 'AU', en: 'Australia', zh: '澳大利亚', rate: 18, days: '5–10' },
  { code: 'SG', en: 'Singapore', zh: '新加坡', rate: 10, days: '3–6' },
  { code: 'JP', en: 'Japan', zh: '日本', rate: 16, days: '4–8' },
  { code: 'KR', en: 'South Korea', zh: '韩国', rate: 16, days: '4–8' },
];

export function getCountry(code) {
  return COUNTRIES.find((country) => country.code === code) || COUNTRIES[0];
}

export function shippingCost(code, subtotal) {
  if (subtotal <= 0 || subtotal >= FREE_AT) return 0;
  return getCountry(code).rate;
}
