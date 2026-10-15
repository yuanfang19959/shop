const detail = (enLabel, zhLabel, enValue, zhValue) => ({
  label: { en: enLabel, zh: zhLabel },
  value: { en: enValue, zh: zhValue },
});

export const CATEGORIES = ['All', 'Home', 'Kitchen', 'Apparel', 'Travel', 'Wellness'];

export const products = [
  {
    id: 'linen',
    name: { en: 'Chalk Linen Bedding', zh: '粉笔白亚麻床品' },
    category: 'Home',
    price: 148,
    featured: 0,
    badge: { en: 'House favorite', zh: '店内最爱' },
    tone: 'sand',
    image: '/products/linen-throw.jpg',
    blurb: {
      en: 'A washed linen duvet in chalk white — the piece we pack most often.',
      zh: '粉笔白水洗亚麻被套，是我们寄出最多的一件。',
    },
    story: {
      en: 'Garment-washed so it is soft on the first night. It suits a spare room in a new city.',
      zh: '成衣水洗，第一晚就软。适合在新城市里布置一间安静的卧室。',
    },
    details: [
      detail('Material', '材质', 'European flax linen', '欧洲亚麻'),
      detail('Origin', '产地', 'Lithuania', '立陶宛'),
      detail('Packed weight', '包装重量', '1.6 kg', '1.6 千克'),
    ],
    tags: ['linen', 'bed', 'duvet', 'bedding', 'home', '床品', '被套', '亚麻', '床'],
  },
  {
    id: 'cups',
    name: { en: 'Speckled Stoneware Set', zh: '斑点粗陶杯组' },
    category: 'Kitchen',
    price: 78,
    featured: 1,
    tone: 'clay',
    image: '/products/cups.jpg',
    blurb: {
      en: 'A large speckled vessel with smaller cups for tea or coffee.',
      zh: '一只斑点大杯，配几只小杯，喝茶或咖啡都行。',
    },
    story: {
      en: 'The foot is left slightly sandy so the cups stay put on a tray.',
      zh: '杯足保留了一点砂质，放在托盘上不容易滑。',
    },
    details: [
      detail('Material', '材质', 'Speckled stoneware', '斑点粗陶'),
      detail('Origin', '产地', 'Portugal', '葡萄牙'),
      detail('Packed weight', '包装重量', '1.3 kg', '1.3 千克'),
    ],
    tags: ['cup', 'ceramic', 'stoneware', 'coffee', 'tea', '杯子', '陶瓷', '粗陶', '咖啡', '茶'],
  },
  {
    id: 'wrap',
    name: { en: 'Fringe Knit Wrap', zh: '流苏针织披肩' },
    category: 'Apparel',
    price: 118,
    featured: 2,
    tone: 'sand',
    image: '/products/wrap.jpg',
    blurb: {
      en: 'An open-knit wrap in undyed cotton, light enough for a cool evening.',
      zh: '未染色棉线的镂空披肩，凉晚上搭一件就够。',
    },
    story: {
      en: 'One size. It folds into a tote and does not mind a suitcase.',
      zh: '均码。能折进袋子，也经得起行李箱。',
    },
    details: [
      detail('Material', '材质', 'Undyed cotton', '未染色棉'),
      detail('Origin', '产地', 'Peru', '秘鲁'),
      detail('Packed weight', '包装重量', '0.4 kg', '0.4 千克'),
    ],
    tags: ['wrap', 'knit', 'shawl', 'cotton', '披肩', '针织', '流苏', '棉'],
  },
  {
    id: 'flask',
    name: { en: 'Trail Flask', zh: '森林绿旅行壶' },
    category: 'Travel',
    price: 42,
    featured: 3,
    tone: 'pine',
    image: '/products/flask.jpg',
    blurb: {
      en: '600 ml, matte forest green, and quiet inside a commute bag.',
      zh: '600 毫升，雾面森林绿，放进通勤包里不吵。',
    },
    story: {
      en: 'Double-wall steel. Hot drinks stay hot through a morning; cold drinks last the afternoon.',
      zh: '双层钢胆。热饮能撑过一个上午，冷饮能撑过一个下午。',
    },
    details: [
      detail('Material', '材质', 'Double-wall stainless steel', '双层不锈钢'),
      detail('Capacity', '容量', '600 ml', '600 毫升'),
      detail('Packed weight', '包装重量', '0.4 kg', '0.4 千克'),
    ],
    tags: ['flask', 'bottle', 'water', 'coffee', 'commute', '水壶', '保温杯', '水瓶', '通勤'],
  },
  {
    id: 'lamp',
    name: { en: 'Arc Floor Lamp', zh: '弧形落地灯' },
    category: 'Home',
    price: 186,
    featured: 4,
    tone: 'ink',
    image: '/products/arc-lamp.jpg',
    blurb: {
      en: 'A graphite arc for a reading chair, with a shade that aims the light.',
      zh: '石墨色弧形落地灯，灯罩可以把光对准阅读的位置。',
    },
    story: {
      en: 'The joint holds its angle. A warm LED bulb is included in the box.',
      zh: '关节能停在你调的角度。包装里附一颗暖光 LED 灯泡。',
    },
    details: [
      detail('Material', '材质', 'Powder-coated steel', '喷粉钢'),
      detail('Origin', '产地', 'Denmark', '丹麦'),
      detail('Packed weight', '包装重量', '4.2 kg', '4.2 千克'),
    ],
    tags: ['lamp', 'light', 'floor', 'reading', '落地灯', '灯', '阅读', '照明'],
  },
  {
    id: 'sunglasses',
    name: { en: 'Round Metal Sunglasses', zh: '圆框金属墨镜' },
    category: 'Apparel',
    price: 148,
    compareAt: 186,
    featured: 5,
    tone: 'sand',
    image: '/products/sunglasses.jpg',
    blurb: {
      en: 'Thin gold-tone metal and grey-green lenses.',
      zh: '细金边金属框，灰绿镜片。',
    },
    story: {
      en: 'A light frame that packs flat in its case. Medium fit.',
      zh: '镜框很轻，可以放进镜盒。中号脸型。',
    },
    details: [
      detail('Material', '材质', 'Metal frame, tinted lenses', '金属框、染色镜片'),
      detail('Origin', '产地', 'Italy', '意大利'),
      detail('Packed weight', '包装重量', '0.2 kg', '0.2 千克'),
    ],
    tags: ['sunglasses', 'sun', 'glasses', '墨镜', '太阳镜', '眼镜'],
  },
  {
    id: 'boots',
    name: { en: 'Chestnut Ankle Boots', zh: '栗棕踝靴' },
    category: 'Apparel',
    price: 188,
    featured: 6,
    badge: { en: 'New', zh: '新品' },
    tone: 'clay',
    image: '/products/boots.jpg',
    options: {
      label: { en: 'Size', zh: '尺码' },
      values: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    },
    blurb: {
      en: 'Leather ankle boots with a low heel for walking a city.',
      zh: '皮面踝靴，低跟，适合在城里走路。',
    },
    story: {
      en: 'A round toe and a leather sole that softens after a few wears.',
      zh: '圆头，皮底，穿几次会软下来。',
    },
    details: [
      detail('Material', '材质', 'Leather', '皮革'),
      detail('Origin', '产地', 'Portugal', '葡萄牙'),
      detail('Packed weight', '包装重量', '1.1 kg', '1.1 千克'),
    ],
    tags: ['boots', 'shoes', 'leather', 'ankle', '靴子', '皮鞋', '踝靴', '鞋'],
  },
  {
    id: 'olive',
    name: { en: 'Estate Olive Oil', zh: '庄园橄榄油' },
    category: 'Kitchen',
    price: 28,
    featured: 7,
    tone: 'clay',
    image: '/products/olive.jpg',
    blurb: {
      en: 'A glass cruet of early-harvest oil for finishing, not frying.',
      zh: '玻璃油壶装的早收橄榄油，用来浇在成品上，不适合油炸。',
    },
    story: {
      en: 'Pressed in Andalusia. The cork pour is meant to stay on the table.',
      zh: '安达卢西亚压榨。软木塞倒口，可以直接摆上餐桌。',
    },
    details: [
      detail('Material', '材质', 'Extra virgin olive oil, glass', '特级初榨橄榄油、玻璃'),
      detail('Origin', '产地', 'Spain', '西班牙'),
      detail('Packed weight', '包装重量', '0.8 kg', '0.8 千克'),
    ],
    tags: ['olive', 'oil', 'cooking', 'kitchen', '橄榄油', '厨房', '食用油'],
  },
  {
    id: 'plates',
    name: { en: 'Glazed Dinner Plates', zh: '釉面餐盘' },
    category: 'Kitchen',
    price: 64,
    featured: 8,
    tone: 'sand',
    image: '/products/plates.jpg',
    blurb: {
      en: 'Four pale blue plates with an uneven, handmade rim.',
      zh: '四只淡蓝餐盘，盘沿有手工的不规则。',
    },
    story: {
      en: 'Dishwasher safe, and easy to mix with plain white bowls.',
      zh: '可进洗碗机，和白碗搭在一起也合适。',
    },
    details: [
      detail('Material', '材质', 'Glazed stoneware', '釉面粗陶'),
      detail('Origin', '产地', 'Japan', '日本'),
      detail('Includes', '包含', '4 dinner plates', '餐盘 4 只'),
    ],
    tags: ['plate', 'dinner', 'ceramic', 'bowl', '餐盘', '盘子', '陶瓷', '碗'],
  },
  {
    id: 'vases',
    name: { en: 'Bottle Vase Trio', zh: '瓶形花器三件' },
    category: 'Home',
    price: 92,
    featured: 9,
    tone: 'sand',
    image: '/products/vases.jpg',
    blurb: {
      en: 'Three speckled bottle vases, short enough for a table.',
      zh: '三只斑点瓶形花器，高度适合餐桌。',
    },
    story: {
      en: 'Use them for a single stem, or leave them empty. Heights vary slightly.',
      zh: '插一支花，或者空着摆。三只高度略有差别。',
    },
    details: [
      detail('Material', '材质', 'Speckled stoneware', '斑点粗陶'),
      detail('Origin', '产地', 'South Korea', '韩国'),
      detail('Packed weight', '包装重量', '1.5 kg', '1.5 千克'),
    ],
    tags: ['vase', 'ceramic', 'flowers', 'home', '花瓶', '花器', '陶瓷', '家居'],
  },
  {
    id: 'journal',
    name: { en: 'Travel Notebook', zh: '旅行笔记本' },
    category: 'Travel',
    price: 36,
    featured: 10,
    tone: 'ink',
    image: '/products/journal.jpg',
    blurb: {
      en: 'A compact hardcover for lists, addresses, and the odd sketch.',
      zh: '小开本精装，用来记清单、地址，或者随手画两笔。',
    },
    story: {
      en: '160 plain pages. The cover is firm enough to write on your knee.',
      zh: '160 页素纸。封面够硬，放在膝头也能写。',
    },
    details: [
      detail('Material', '材质', 'Hardcover, plain paper', '精装封面、素纸'),
      detail('Pages', '页数', '160', '160'),
      detail('Packed weight', '包装重量', '0.3 kg', '0.3 千克'),
    ],
    tags: ['notebook', 'journal', 'writing', 'travel', 'gift', '笔记本', '书写', '旅行', '礼物'],
  },
  {
    id: 'tea',
    name: { en: 'Loose Tea Sampler', zh: '散茶小样' },
    category: 'Kitchen',
    price: 26,
    featured: 11,
    tone: 'pine',
    image: '/products/tea.jpg',
    blurb: {
      en: 'Eight teas in one box, from chamomile to a dark black.',
      zh: '一盒八种散茶，从洋甘菊到红茶。',
    },
    story: {
      en: 'Whole leaves and herbs, portioned for about a week of pots.',
      zh: '叶片和花草小样，大约够泡一周。',
    },
    details: [
      detail('Material', '材质', 'Loose leaf tea and herbs', '散装茶叶与花草'),
      detail('Origin', '产地', 'Several gardens', '多个产区'),
      detail('Packed weight', '包装重量', '0.3 kg', '0.3 千克'),
    ],
    tags: ['tea', 'sampler', 'herbs', 'kitchen', '茶', '茶叶', '洋甘菊', '红茶', '厨房'],
  },
  {
    id: 'candle',
    name: { en: 'Evening Candle', zh: '夜色蜡烛' },
    category: 'Wellness',
    price: 34,
    compareAt: 42,
    featured: 12,
    tone: 'clay',
    image: '/products/candle.jpg',
    blurb: {
      en: 'Soy wax in clear glass, a cotton wick, and a quiet scent.',
      zh: '透明玻璃杯里的大豆蜡，棉芯，香气很淡。',
    },
    story: {
      en: 'About 45 hours of burn. Wash the glass and keep it when the wax is gone.',
      zh: '大约可燃烧 45 小时。蜡燃尽后，玻璃杯洗干净可以留下。',
    },
    details: [
      detail('Material', '材质', 'Soy wax, cotton wick, glass', '大豆蜡、棉芯、玻璃'),
      detail('Burn time', '燃烧时间', 'About 45 hours', '约 45 小时'),
      detail('Origin', '产地', 'United States', '美国'),
    ],
    tags: ['candle', 'scent', 'home', 'evening', '蜡烛', '香薰', '大豆蜡'],
  },
];

export function getProduct(id) {
  return products.find((product) => product.id === id) || null;
}

export function selectProducts(list, { query, category, price, sort, lang }) {
  const needle = query.trim().toLowerCase();
  const filtered = list.filter((product) => {
    if (category !== 'All' && product.category !== category) return false;
    if (price === 'under50' && product.price >= 50) return false;
    if (price === 'mid' && (product.price < 50 || product.price > 120)) return false;
    if (price === 'over120' && product.price <= 120) return false;
    if (!needle) return true;
    const haystack = [
      product.name.en,
      product.name.zh,
      product.blurb.en,
      product.blurb.zh,
      product.story.en,
      product.story.zh,
      product.category,
      ...product.tags,
    ]
      .join('\n')
      .toLowerCase();
    return haystack.includes(needle);
  });

  const collator = new Intl.Collator(lang === 'zh' ? 'zh-Hans' : 'en');
  return filtered.slice().sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price || a.featured - b.featured;
    if (sort === 'priceDesc') return b.price - a.price || a.featured - b.featured;
    if (sort === 'name') return collator.compare(a.name[lang], b.name[lang]);
    return a.featured - b.featured;
  });
}

export function relatedProducts(product, list) {
  const same = list.filter((item) => item.id !== product.id && item.category === product.category);
  const rest = list.filter((item) => item.id !== product.id && item.category !== product.category);
  return [...same, ...rest].slice(0, 4);
}
