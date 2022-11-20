const listHelper = require('../utils/list_helpers')

test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1)
})