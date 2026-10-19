const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  describe('при поиске оп валидному ID', () => {
    test.each([
      ["ID 1 возвращает products[0]", 1, 0],
      ["ID 4 возвращает products[3]", 4, 3],
      ["ID 6 возвращает products[5]", 6, 5],
    ])('%s', (testName, id, expectedId) => {
      expect(getProductById(products, id)).toBe(products[expectedId]);
    })
  })

  describe('при поиске по невалидному или отсутствующему ID', () => {
    test.each([
      ['ID 0 возвращает null', 0],
      ['ID 999 возвращает null', 999],
      ['ID -1 возвращает null', -1],
      ["строковый ID '1' возвращает null", '1'],
      ['ID undefined возвращает null', undefined],
      ['ID NaN возвращает null', NaN],
    ])('%s', (testName, invalidId) => {
      expect(getProductById(products, invalidId)).toBeNull();
    })
  })
});
