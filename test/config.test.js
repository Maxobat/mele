
beforeEach(() => {
    jest.dontMock('fs')
    jest.resetModules()
})

describe('getConfig', () => {
    const InvalidConfigError = require('../src/error/InvalidConfigError')

    test('returns config when valid config file exists', () => {
        jest.mock('fs', () => ({
            existsSync: () => true,
            readFileSync: () => `
                {
                    "port": 4000
                }
            `,
        }))

        const { getConfig } = require('../src/config')

        const ret = getConfig()

        expect(ret).toHaveProperty('port')
        expect(ret).toHaveProperty('dev')
    })

    test('throws when tries to parse invalid config', () => {
        jest.mock('fs', () => ({
            existsSync: () => true,
            readFileSync: () => `{"dev": "not valid JSON"`,
        }))

        const { getConfig } = require('../src/config')

        expect(() => {
            getConfig()
        }).toThrow(InvalidConfigError)
    })

    test('returns default config when no config file', () => {
        jest.mock('fs', () => ({
            existsSync: () => false,
            readFileSync: () => '',
        }))

        const { getConfig, getDefaultConfig } = require('../src/config')

        expect(getConfig()).toMatchObject(getDefaultConfig())
    })
})

describe('getUnknownKeyMessage', () => {
    const { getUnknownKeyMessage } = require('../src/config')

    test('returns unknown message with passed key', () => {
        expect(getUnknownKeyMessage('aKey')).toBe('aKey is not a valid config value.')
    })
})

describe('validateConfig', () => {
    const { validateConfig } = require('../src/config')
    
    test('returns valid when passed valid config', () => {
        expect(validateConfig({dev: true})).toMatchObject({
            valid: true,
            unknownKeys: [],
            messages: [],
        })
    })

    test('returns invalid when passed config with unknown key', () => {
        expect(validateConfig({ idk: true })).toMatchObject({
            valid: false,
            unknownKeys: ['idk'],
            messages: ['idk is not a valid config value.'],
        })
    })

    test('returns invalid when passed config with multiple unknown keys', () => {
        expect(validateConfig({ idk: true, iadk: 'unknown', port: 5000 })).toMatchObject({
            valid: false,
            unknownKeys: ['idk', 'iadk'],
            messages: ['idk is not a valid config value.', 'iadk is not a valid config value.'],
        })
    })
})
