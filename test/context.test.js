
beforeEach(() => {
    jest.dontMock('path')
    jest.dontMock('fs')
    jest.dontMock('./mockModules/context.js')
    jest.resetModules()
})

describe('getContext', () => {
    test('returns object from context file that exports object', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockModules/context.js',
        }))

        jest.mock('fs', () => ({
            existsSync: () => true,
        }))

        jest.mock('../test/mockModules/context.js', () => ({
            authed: true,
        }))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockModules/context.js')).toMatchObject({
            authed: true,
        })
    })

    test('returns function from context file that exports function', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockModules/context.js',
        }))

        jest.mock('fs', () => ({
            existsSync: () => true,
        }))

        jest.mock('../test/mockModules/context.js', () => () => ({authed: true}))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockModules/context.js')).toEqual(expect.any(Function))
    })

    test('returns empty object when context file does not exist', () => {
        jest.mock('path', () => ({
            resolve: () => '../test/mockModules/c',
        }))

        jest.mock('fs', () => ({
            existsSync: () => false,
        }))

        const { getContext } = require('../src/context')

        expect(getContext('../test/mockModules/context.js')).toMatchObject({})
    })
})
