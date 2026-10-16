const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  describe('возвращает весь массив', () => {
    // test.todo("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]");
    // test.todo("undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]");
    // test.todo("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]");
    test.each([
      ["'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", 'all'],
      ['undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]', undefined],
      ['пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', ''],
    ])('%s', (testName, categoryValue) => {
      expect(filterByCategory(products, categoryValue)).toEqual(products)
    })
  })
  
  // test.todo("'electronics' возвращает товары с ID [1, 2]");
  // test.todo("'books' возвращает товары с ID [3, 6]");
  // test.todo("'home' возвращает товары с ID [4, 5]");
  describe('при поиске по категории', () => {
    test.each([
      ["'electronics' возвращает товары с ID [1, 2]", "electronics"],
      ["'books' возвращает товары с ID [3, 6]", "books"],
      ["'home' возвращает товары с ID [4, 5]", "home"],
    ])('%s', (categoryValue, testName) => {
      const expectedProducts = products.filter(p => p.category === categoryValue);
      expect(filterByCategory(products, categoryValue)).toEqual(expectedProducts);
    })
  })

  // test.todo("'clothes' возвращает пустой массив");
  // test.todo("'toys' возвращает пустой массив");
  // test.todo("'sports' возвращает пустой массив");
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
