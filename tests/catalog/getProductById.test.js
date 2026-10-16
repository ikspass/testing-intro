const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  // test.todo('ID 1 возвращает products[0]');
  // test.todo('ID 4 возвращает products[3]');
  // test.todo('ID 6 возвращает products[5]');
  describe('при поиске оп валидному ID', () => {
    test.each([1, 4, 6])('ID %i возвращает соответствующий объект продукта', (id) => {
      const expectedProduct = products.find(p => p.id === id);
      expect(getProductById(products, id)).toBe(expectedProduct);
    })
  })

  // test.todo('ID 0 возвращает null');
  // test.todo('ID 999 возвращает null');
  // test.todo('ID -1 возвращает null');
  // test.todo("строковый ID '1' возвращает null");
  // test.todo('ID undefined возвращает null');
  // test.todo('ID NaN возвращает null');
  describe('при поиске по невалидному или отсутствующему ID', () => {
    test.each([
      [0, 'ID 0 возвращает null'],
      [999, 'ID 999 возвращает null'],
      [-1, 'ID -1 возвращает null'],
      ['1', "строковый ID '1' возвращает null"],
      [undefined, 'ID undefined возвращает null'],
      [NaN, 'ID NaN возвращает null'],
    ])('%s', (invalidId, testName) => {
      expect(getProductById(products, invalidId)).toBeNull();
    })
  })
});
