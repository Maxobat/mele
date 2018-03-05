
beforeEach(() => {
    jest.dontMock('path')
    jest.dontMock('fs')
    jest.dontMock('./mockApp/context.js')
    jest.resetModules()
})

describe('getContext', () => {
    test('returns object from context file that exports object', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockApp/context.js',
        }))

        jest.mock('fs', () => ({
            existsSync: () => true,
        }))

        jest.mock('../test/mockApp/context.js', () => ({
            authed: true,
        }))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockApp/context.js')).toMatchObject({
            authed: true,
        })
    })

    test('returns function from context file that exports function', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockApp/context.js',
        }))

        jest.mock('fs', () => ({
            existsSync: () => true,
        }))

        jest.mock('../test/mockApp/context.js', () => () => ({authed: true}))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockApp/context.js')).toEqual(expect.any(Function))
    })

    test('returns empty object when context file does not exist', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockApp/c',
        }))

        jest.mock('fs', () => ({
            existsSync: () => false,
        }))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockApp/context.js')).toMatchObject({})
    })
})
