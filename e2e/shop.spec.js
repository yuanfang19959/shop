import { expect, test } from '@playwright/test';

function article(page, name) {
  return page.locator('article').filter({ hasText: name });
}

test('首页用英文展示全部商品', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Objects for a life abroad.' })).toBeVisible();
  await expect(page.getByText('13 pieces')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bag, 0 items' })).toBeVisible();
  await expect(page.getByText('Complimentary worldwide shipping on orders over $120')).toBeVisible();
});

test('可以按关键词、分类和价格筛选', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('searchbox', { name: 'Search the shop' }).fill('床品');
  await expect(page.getByRole('heading', { name: /床品/ })).toBeVisible();
  await expect(page.getByText('1 piece')).toBeVisible();
  await expect(article(page, 'Chalk Linen Bedding')).toBeVisible();

  await page.getByRole('searchbox', { name: 'Search the shop' }).fill('zzzz-not-a-product');
  await expect(page.getByRole('heading', { name: 'No pieces match.' })).toBeVisible();
  await page.locator('.empty').getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByText('13 pieces')).toBeVisible();

  await page.getByRole('button', { name: 'Apparel', exact: true }).click();
  await expect(article(page, 'Chestnut Ankle Boots')).toBeVisible();
  await expect(article(page, 'Chalk Linen Bedding')).toHaveCount(0);

  await page.getByRole('button', { name: 'All', exact: true }).click();
  await page.getByLabel('Price').selectOption('under50');
  await expect(article(page, 'Trail Flask')).toBeVisible();
  await expect(article(page, 'Arc Floor Lamp')).toHaveCount(0);

  await page.getByLabel('Price').selectOption('all');
  await page.getByLabel('Sort').selectOption('priceDesc');
  await expect(page.locator('.card .name').first()).toHaveText('Chestnut Ankle Boots');
});

test('购物袋按国家和满额规则计算运费，刷新后仍在', async ({ page }) => {
  await page.goto('/');

  await article(page, 'Estate Olive Oil').getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Bag, 1 items' }).click();

  const bag = page.getByRole('dialog', { name: 'Your bag' });
  await expect(bag.getByText('Add $92 more for free worldwide shipping.')).toBeVisible();
  await expect(bag.getByRole('button', { name: /Checkout/ })).toContainText('$36');

  await bag.getByLabel('Ship to').selectOption('AU');
  await expect(bag.getByRole('button', { name: /Checkout/ })).toContainText('$46');

  await bag.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(bag.getByText('Free worldwide shipping on this order.')).toBeVisible();
  await expect(bag.getByRole('button', { name: /Checkout/ })).toContainText('$56');

  await page.reload();
  await expect(page.getByRole('button', { name: 'Bag, 2 items' })).toBeVisible();
});

test('同一商品超过 8 件时提示上限', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Chalk Linen Bedding', exact: true }).click();

  const increase = page.getByRole('button', { name: 'Increase quantity' });
  for (let i = 0; i < 7; i += 1) await increase.click();

  await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Add to bag', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('limited to 8 per order');
});

test('踝靴先选尺码再加入购物袋', async ({ page }) => {
  await page.goto('/');
  await article(page, 'Chestnut Ankle Boots').getByRole('button', { name: 'Choose size' }).click();

  await expect(page.getByRole('heading', { name: 'Chestnut Ankle Boots' })).toBeVisible();
  await page.getByRole('button', { name: '39', exact: true }).click();
  await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
  await page.getByRole('button', { name: /Bag, 1 item/ }).click();

  const bag = page.getByRole('dialog', { name: 'Your bag' });
  await expect(bag.getByText('Size 39')).toBeVisible();
  await expect(bag.getByText('Chestnut Ankle Boots')).toBeVisible();
});

test('结算会拦住空表单，通过后生成示例订单', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
  await page.getByRole('button', { name: 'Bag, 1 items' }).click();
  await page.getByRole('button', { name: /Checkout/ }).click();

  await page.getByRole('button', { name: /Place sample order/ }).click();
  await expect(page.getByRole('alert')).toHaveText('Please fix the highlighted fields.');
  await expect(page.locator('#checkout-name')).toBeFocused();

  await page.getByLabel('Full name').fill('Ada Lovelace');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Street address').fill('1 Market Street');
  await page.getByLabel('City').fill('San Francisco');
  await page.getByLabel('Postal code').fill('94105');
  await page.getByRole('button', { name: /Place sample order/ }).click();

  await expect(page.getByRole('heading', { name: 'Noted.' })).toBeVisible();
  await expect(page.getByText('A sample receipt for ada@example.com. Nothing was charged.')).toBeVisible();
  await expect(page.getByText(/AH-\d{6}/)).toBeVisible();

  await page.getByRole('button', { name: 'Back to the shop' }).click();
  await expect(page.getByRole('button', { name: 'Bag, 0 items' })).toBeVisible();
});

test('语言切换会保留到刷新之后', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '切换到中文' }).click();
  await expect(page.getByRole('heading', { name: '给海外生活的器物。' })).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: '给海外生活的器物。' })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.getByRole('heading', { name: 'Objects for a life abroad.' })).toBeVisible();
});

test.describe('手机宽度', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('展开搜索，并从底部条打开购物袋', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open search' }).click();
    await page.getByRole('searchbox', { name: 'Search the shop' }).fill('flask');
    await expect(page.getByRole('heading', { name: /flask/ })).toBeVisible();

    await article(page, 'Trail Flask').getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByRole('button', { name: /^Bag \d/ }).click();
    await expect(page.getByRole('dialog', { name: 'Your bag' })).toContainText('Trail Flask');
  });
});
