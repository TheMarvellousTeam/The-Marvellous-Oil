import React from 'react'
import { drawSediment } from './drawSediment'
import type { World as World_type } from '../../type'

const arrayEqual = (a, b) =>
    a.length === b.length && a.every((_, i) => a[i] === b[i])

export const create = draw => {
    const memory = []

    return (...args) => {
        if (!memory.some(x => arrayEqual(x.args, args))) {
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = args[1]

            const ctx = canvas.getContext('2d')
            draw(ctx, ...args)

            memory.unshift({ args, canvas })
            while (memory.length > 10) memory.pop()
        }

        return memory.find(x => arrayEqual(x.args, args)).canvas
    }
}
