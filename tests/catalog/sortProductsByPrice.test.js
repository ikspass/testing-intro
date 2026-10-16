const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  // test.todo("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]");
  // test.todo('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]');
  describe('сортировка по убыванию', () => {
    test.each([
      ["все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", 'asc'],
      ["все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", undefined],
    ])('%s', (testName, sortValue) => {
      const expectedProducts = products.sort((first, second) => first.price - second.price)
      expect(sortProductsByPrice(products, sortValue)).toEqual(expectedProducts);
    })
  })
  
  // test.todo("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]");
  // test.todo("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]");
  // test.todo("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]");
  // test.todo("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]");
  test.each([
    ["товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", [1, 3, 4], 'asc', [3, 4, 1]],
    ["товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", [3, 1, 4], 'desc', [1, 4, 3]],
    ["товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", [5, 2, 6], 'desc', [2, 5, 6]],
    ["все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", [1, 2, 3, 4, 5, 6], 'desc', [1, 2, 4, 5, 6, 3]],
  ])('%s', (testName, startIds, sortValue, expectedIds) => {
    const startProducts = startIds.map(startId => products.find(({id}) => id === startId))
    const expectedProducts = expectedIds.map(expectedId => products.find(({id}) => id === expectedId))
    expect(sortProductsByPrice(startProducts, sortValue)).toEqual(expectedProducts)
  })

  // test.todo("'asc' не меняет исходный массив [1, 3, 4]");
  // test.todo("'desc' не меняет исходный массив [1, 3, 4]");
  describe('сортировка не изменяет исходный массив', () => {
    test.each(['asc', 'desc', ''])('asc и desc не меняет исходный массив [1, 3, 4]', (sortValue) => {
      const initialProducts = products.filter(({id}) => [1, 3, 4].includes(id));
      const originalState = [...initialProducts];
      sortProductsByPrice(initialProducts, sortValue);
      expect(initialProducts).toEqual(originalState);
    })
  })
  // test.todo('направление по умолчанию не меняет исходный массив всех товаров');
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const originalState = [...products];
    sortProductsByPrice(products);
    expect(products).toEqual(originalState);
  })
});
