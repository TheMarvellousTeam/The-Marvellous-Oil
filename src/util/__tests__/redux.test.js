import { set, merge } from '../redux'

describe('set', () => {
    it('should return a new object, with value set', () => {
        const state = {
            a: {
                b: {
                    u: 1,
                    v: 2,
                },
                w: { u: 2 },
            },
        }

        const newState = set(state, ['a', 'b', 'v'], 3)

        expect(newState).toEqual({
            a: {
                b: {
                    u: 1,
                    v: 3,
                },
                w: { u: 2 },
            },
        })

        expect(state).not.toBe(newState)
        expect(state.a).not.toBe(newState.a)
        expect(state.a.b).not.toBe(newState.a.b)
        expect(state.a.w).toBe(newState.a.w)
    })

    it('should return a new array, with value set', () => {
        const state = [{ u: 3 }, 3, 4]

        const newState = set(state, [1], 5)

        expect(newState).toEqual([{ u: 3 }, 5, 4])

        expect(state).not.toBe(newState)
        expect(state[0]).toBe(newState[0])
    })

    it('should init the object when null ( object only )', () => {
        const newState = set(null, ['a', 'b', 'c'], 3)

        expect(newState).toEqual({
            a: {
                b: {
                    c: 3,
                },
            },
        })
    })

    it('should init the object when null ( with array )', () => {
        const newState = set(null, [3, 'c'], 3)

        expect(newState).toEqual([
            undefined,
            undefined,
            undefined,
            {
                c: 3,
            },
        ])
    })
})
describe('merge', () => {
    it('should merge the object', () => {
        const state = {
            a: {
                b: {
                    u: 1,
                    v: 2,
                },
                w: { u: 2 },
            },
        }

        const newState = merge(state, ['a', 'b'], { v: 3 })

        expect(newState).toEqual({
            a: {
                b: {
                    u: 1,
                    v: 3,
                },
                w: { u: 2 },
            },
        })

        expect(state).not.toBe(newState)
        expect(state.a).not.toBe(newState.a)
        expect(state.a.b).not.toBe(newState.a.b)
        expect(state.a.w).toBe(newState.a.w)
    })

    it('should init the object when null', () => {
        const newState = merge(null, ['a', 'b', 'c'], { v: 3 })

        expect(newState).toEqual({
            a: {
                b: {
                    c: { v: 3 },
                },
            },
        })
    })
})
