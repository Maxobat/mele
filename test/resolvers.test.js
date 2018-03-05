beforeEach(() => {
    jest.dontMock('path')
    jest.dontMock('fs')
    jest.resetModules()
})

describe('generateResolversFromDir', () => {
    test('returns object with given directory resolver files as keys', () => {
        const path = require('path')
        // const { generateResolversFromDir } = require('../src/resolvers')
        // const ret = generateResolversFromDir(path.resolve('test/mockApp/resolvers'))

        console.log(
            require('require-dir')(path.resolve('test/mockApp/resolvers'))
        )

        // expect(ret).toHaveProperty('Query')
        // expect(ret).toHaveProperty('Episode')
    })
})
