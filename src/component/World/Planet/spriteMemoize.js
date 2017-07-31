import React from 'react'
import { drawSediment } from './drawSediment'
import type { World as World_type } from '../../type'

const arrayEqual = (a, b) =>
    a.length === b.length && a.every((_, i) => a[i] === b[i])

const argsEqual = (a, b) => a[1] === b[1]

export const create = draw => {
    const memory = []

    return (...args) => {
        if (!memory.some(x => argsEqual(x.args, args))) {
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = args[1]

            const ctx = canvas.getContext('2d')
            draw(ctx, ...args)

            memory.unshift({ args, canvas })
            while (memory.length > 10) memory.pop()
        }

        return memory.find(x => argsEqual(x.args, args)).canvas
    }
}
