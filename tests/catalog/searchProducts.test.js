const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  describe('поиск по названию', () => {
    test.each([
      ["'Наушники' возвращает товар с ID 1", 'Наушники', 1],
      ["'Чистый код' возвращает товар с ID 6", 'Чистый код', 6],
      ["'Настольная лампа' возвращает товар с ID 4", 'Настольная лампа', 4],
      ["'javascript' возвращает товар с ID 3", 'javascript', 3],
      ["'ЧЕХОЛ' возвращает товар с ID 5", 'ЧЕХОЛ', 5],
      ["'наушники' возвращает товар с ID 1", 'наушники', 1],
    ])('%s', ((testName, searchValue, expectedId) => {
      const expectedProducts = products.find((p) => p.id === expectedId)
      expect(searchProducts(products, searchValue)).toEqual([expectedProducts])
    }))
  })

  describe('все товары', () => {
    test.each([
      ["пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]", ''],
      ["строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]", ' '],
      ["'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", "\t\n"],
    ])('%s', (testName, searchValue) => {
      expect(searchProducts(products, searchValue)).toEqual(products);
    })
  })
});
