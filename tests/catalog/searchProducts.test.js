const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  // test.todo("'Наушники' возвращает товар с ID 1");
  // test.todo("'Чистый код' возвращает товар с ID 6");
  // test.todo("'Настольная лампа' возвращает товар с ID 4");
  // test.todo("'javascript' возвращает товар с ID 3");
  // test.todo("'ЧЕХОЛ' возвращает товар с ID 5");
  // test.todo("'наушники' возвращает товар с ID 1");
  describe('поиск по названию', () => {
    test.each([
      'Наушники',
      'Чистый код',
      'Настольная лампа',
      'javascript',
      'ЧЕХОЛ',
      'наушники']
    )('наименование вохвращает соответствующий продукт', (searchValue => {
      const expectedProducts = products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
      expect(searchProducts(products, searchValue)).toEqual(expectedProducts)
    }))
  })

  // test.todo("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  // test.todo("строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]");
  // test.todo("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]");
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
