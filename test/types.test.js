beforeEach(() => {
    jest.dontMock('path')
    jest.dontMock('fs')
    jest.resetModules()
})

describe('generateDefinitionFromDir', () => {
    test('returns string schema from the type files in a directory', async () => {
        const path = require('path')
        const { generateDefinitionFromDir } = require('../src/types')
        const ret = await generateDefinitionFromDir(path.resolve('test/mockApp/types'))

        expect(ret).toMatch(/type Query/)
        expect(ret).toMatch(/episodes: \[Episode\]/)
        expect(ret).toMatch(/type Episode/)
        expect(ret).toMatch(/name: String/)
    })
})
