import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const dict = {
  en: {
    skip: 'Skip to products',
    announce: 'Complimentary worldwide shipping on orders over $120',
    brandTag: 'Ships worldwide',
    searchPlaceholder: 'Search goods, materials, uses',
    searchLabel: 'Search the shop',
    clearSearch: 'Clear search',
    openSearch: 'Open search',
    closeSearch: 'Close search',
    bag: 'Bag',
    bagCount: 'Bag, {count} items',
    'doc.shop': 'Shop',
    'doc.checkout': 'Checkout',
    'doc.confirm': 'Order confirmed',
    categories: 'Categories',
    'cat.All': 'All',
    'cat.Home': 'Home',
    'cat.Kitchen': 'Kitchen',
    'cat.Apparel': 'Apparel',
    'cat.Travel': 'Travel',
    'cat.Wellness': 'Wellness',
    heroTitle: 'Objects for a life abroad.',
    heroBody: 'Home, kitchen, travel, and clothing, priced in US dollars and packed for doorsteps away from home.',
    searchResults: 'Results for “{query}”',
    resultsOne: '1 piece',
    resultsMany: '{count} pieces',
    sortLabel: 'Sort',
    priceLabel: 'Price',
    'sort.featured': 'Featured',
    'sort.priceAsc': 'Price, low to high',
    'sort.priceDesc': 'Price, high to low',
    'sort.name': 'Name',
    'price.all': 'Any price',
    'price.under50': 'Under $50',
    'price.mid': '$50 – $120',
    'price.over120': 'Over $120',
    clearFilters: 'Clear filters',
    emptyTitle: 'No pieces match.',
    emptyBody: 'Try a different word, or clear the filters to see the full edit.',
    addShort: 'Add',
    add: 'Add to bag',
    added: 'Added',
    chooseSize: 'Choose size',
    leadKicker: 'The piece we ship most',
    back: 'Back to shop',
    quantity: 'Quantity',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    inBag: 'Already in your bag: {count}',
    maxNote: 'Up to 8 of each piece per order.',
    shipsNote: 'Ships worldwide in a recyclable box. Free over $120.',
    pricesNote: 'Prices in US dollars.',
    alsoLike: 'You may also like',
    missing: 'This piece is no longer listed.',
    cartTitle: 'Your bag',
    close: 'Close',
    cartEmptyTitle: 'Your bag is empty',
    cartEmptyBody: 'Add a piece from the edit. We ship to ten countries and regions.',
    continue: 'Continue shopping',
    remove: 'Remove',
    shipProgress: 'Add {amount} more for free worldwide shipping.',
    shipUnlocked: 'Free worldwide shipping on this order.',
    shipsTo: 'Ship to',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    arrives: 'Estimated delivery {days} business days.',
    duties: 'Carriers may collect import duties on delivery.',
    checkoutTitle: 'Checkout',
    demoNote: 'This is a demonstration. Placing an order records a sample only — no payment is taken and nothing ships.',
    fullName: 'Full name',
    email: 'Email',
    country: 'Country or region',
    address: 'Street address',
    city: 'City',
    postal: 'Postal code',
    placeOrder: 'Place sample order · {total}',
    summary: 'Order summary',
    'err.summary': 'Please fix the highlighted fields.',
    'err.name': 'Enter the name for the delivery.',
    'err.email': 'Enter a valid email so it can appear on the receipt.',
    'err.address': 'Enter a street address.',
    'err.city': 'Enter a city.',
    'err.postal': 'Enter a postal code.',
    confirmKicker: 'Sample order',
    confirmTitle: 'Noted.',
    confirmBody: 'A sample receipt for {email}. Nothing was charged.',
    confirmFor: 'For {name}',
    orderNo: 'Order number',
    shipTo: 'Shipping to',
    backShop: 'Back to the shop',
    missingOrder: 'This demo order is not on the page anymore.',
    editBag: 'Edit bag',
    footerBlurb: 'Atlas House is a small edit of everyday goods for people living away from home.',
    footerShip: 'Ships to the United States, Canada, the UK, the EU, Australia, Singapore, Japan, and South Korea. Free over $120. Duties, where charged, may be collected on delivery.',
    footerReturns: 'Returns accepted within 30 days of delivery, unused and in original packing.',
    toastAdded: '{name} added to your bag',
    toastMax: '{name} is limited to 8 per order',
    viewBag: 'View bag',
  },
  zh: {
    skip: '跳到商品',
    announce: '订单满 $120，全球包邮',
    brandTag: '全球寄送',
    searchPlaceholder: '搜索商品、材质或用途',
    searchLabel: '搜索商品',
    clearSearch: '清除搜索',
    openSearch: '打开搜索',
    closeSearch: '关闭搜索',
    bag: '购物袋',
    bagCount: '购物袋，{count} 件',
    'doc.shop': '选购',
    'doc.checkout': '结算',
    'doc.confirm': '订单已提交',
    categories: '分类',
    'cat.All': '全部',
    'cat.Home': '家居',
    'cat.Kitchen': '厨房',
    'cat.Apparel': '服饰',
    'cat.Travel': '出行',
    'cat.Wellness': '护理',
    heroTitle: '给海外生活的器物。',
    heroBody: '家居、厨房、出行与服饰，以美元计价，寄往异乡的家门口。',
    searchResults: '“{query}”的结果',
    resultsOne: '1 件商品',
    resultsMany: '{count} 件商品',
    sortLabel: '排序',
    priceLabel: '价格',
    'sort.featured': '精选',
    'sort.priceAsc': '价格从低到高',
    'sort.priceDesc': '价格从高到低',
    'sort.name': '名称',
    'price.all': '全部价格',
    'price.under50': '$50 以下',
    'price.mid': '$50 – $120',
    'price.over120': '$120 以上',
    clearFilters: '清除筛选',
    emptyTitle: '没有相符的商品。',
    emptyBody: '换个关键词，或清除筛选查看全部商品。',
    addShort: '加入',
    add: '加入购物袋',
    added: '已加入',
    chooseSize: '选尺码',
    leadKicker: '我们寄出最多的一件',
    back: '返回商店',
    quantity: '数量',
    decrease: '减少数量',
    increase: '增加数量',
    inBag: '购物袋里已有 {count} 件',
    maxNote: '每件商品单笔最多 8 个。',
    shipsNote: '全球寄送，可回收包装。满 $120 免运费。',
    pricesNote: '价格以美元计算。',
    alsoLike: '你或许也会喜欢',
    missing: '这件商品已下架。',
    cartTitle: '购物袋',
    close: '关闭',
    cartEmptyTitle: '购物袋是空的',
    cartEmptyBody: '从精选里挑一件放进来。我们寄往十个国家与地区。',
    continue: '继续选购',
    remove: '移除',
    shipProgress: '再买 {amount} 即可全球免运费。',
    shipUnlocked: '本单已享全球免运费。',
    shipsTo: '寄往',
    subtotal: '小计',
    shipping: '运费',
    free: '免费',
    total: '合计',
    checkout: '去结算',
    arrives: '预计 {days} 个工作日送达。',
    duties: '承运商可能在送达时代收进口关税。',
    checkoutTitle: '结算',
    demoNote: '这是演示。提交订单只会记下一条示例，不会扣款，也不会发货。',
    fullName: '姓名',
    email: '邮箱',
    country: '国家或地区',
    address: '街道地址',
    city: '城市',
    postal: '邮编',
    placeOrder: '提交示例订单 · {total}',
    summary: '订单摘要',
    'err.summary': '请修正标出的字段。',
    'err.name': '请填写收件人姓名。',
    'err.email': '请填写有效邮箱，用于显示在回执上。',
    'err.address': '请填写街道地址。',
    'err.city': '请填写城市。',
    'err.postal': '请填写邮编。',
    confirmKicker: '示例订单',
    confirmTitle: '已记下。',
    confirmBody: '已为 {email} 生成示例回执。没有扣款。',
    confirmFor: '收件人 {name}',
    orderNo: '订单号',
    shipTo: '寄往',
    backShop: '回到商店',
    missingOrder: '这笔演示订单已不在当前页面。',
    editBag: '修改购物袋',
    footerBlurb: 'Atlas House 是一小辑日常器物，给生活在异乡的人。',
    footerShip: '可寄往美国、加拿大、英国、欧盟、澳大利亚、新加坡、日本与韩国。满 $120 免运费。部分地区可能在送达时收取关税。',
    footerReturns: '签收后 30 天内，未使用且包装完好可退货。',
    toastAdded: '已将{name}放入购物袋',
    toastMax: '{name}每单最多 8 件',
    viewBag: '查看购物袋',
  },
};

const I18nContext = createContext(null);

function readLang() {
  try {
    const saved = localStorage.getItem('atlas-house-lang');
    return saved === 'zh' || saved === 'en' ? saved : 'en';
  } catch {
    return 'en';
  }
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readLang);

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem('atlas-house-lang', next);
    } catch {
      /* ignore private-mode storage failures */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let text = dict[lang][key] ?? dict.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([name, replacement]) => {
          text = text.replaceAll(`{${name}}`, String(replacement));
        });
      }
      return text;
    };
    const tx = (field) => {
      if (field && typeof field === 'object') return field[lang] || field.en || '';
      return field ?? '';
    };
    return { lang, setLang, t, tx };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
