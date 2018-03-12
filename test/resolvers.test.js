beforeEach(() => {
    jest.dontMock('path')
    jest.dontMock('fs')
    jest.resetModules()
})

describe('generateResolversFromDir', () => {
    test('returns object with given directory resolver files as keys', () => {
        const path = require('path')
        const { generateResolversFromDir } = require('../src/resolvers')
        const ret = generateResolversFromDir(path.resolve('test/mockApp/resolvers'))

        expect(ret).toHaveProperty('Query')
        expect(ret).toHaveProperty('Episode')
    })

    test('returns object with given directory resolver files as keys even when non JS file exists in directory', () => {
        const path = require('path')
        const { generateResolversFromDir } = require('../src/resolvers')
        const ret = generateResolversFromDir(path.resolve('test/mockApp/multi-file-type-resolvers'))

        expect(ret).toHaveProperty('Query')
    })

    test('throws when given directory does not exist', () => {
        const path = require('path')
        const { generateResolversFromDir } = require('../src/resolvers')
        const MissingDirectoryError = require('../src/error/MissingDirectoryError')
        const ret = () => generateResolversFromDir(path.resolve('test/mockApp/does-not-exist'))

        expect(ret).toThrow(MissingDirectoryError)
    })
})
