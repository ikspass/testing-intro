const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  describe('возвращает весь массив', () => {
    test.each([
      ["'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", 'all'],
      ['undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]', undefined],
      ['пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', ''],
    ])('%s', (testName, categoryValue) => {
      expect(filterByCategory(products, categoryValue)).toEqual(products)
    })
  })
  
  describe('при поиске по категории', () => {
    test.each([
      ["'electronics' возвращает товары с ID [1, 2]", "electronics", [1, 2]],
      ["'books' возвращает товары с ID [3, 6]", "books", [3, 6]],
      ["'home' возвращает товары с ID [4, 5]", "home", [4 ,5]],
    ])('%s', (testName, categoryValue, expectedIds) => {
      const expectedProducts = products.filter(({id}) => expectedIds.includes(id));
      expect(filterByCategory(products, categoryValue)).toEqual(expectedProducts);
    })
  })

  describe('при поиске по несуществующей категории', () => {
    test.each([
      ['clothes', "'clothes' возвращает пустой массив"],
      ['toys', "'toys' возвращает пустой массив"],
      ['sports', "'sports' возвращает пустой массив"],
    ])('%s', (invalidCategory, testName) => {
      expect(filterByCategory(products, invalidCategory)).toStrictEqual([]);
    })
  })
});
