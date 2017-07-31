import { fromPoint, toPoint } from '../../util/math/pointPolar'
import { distance } from '../../util/math/point'
import type { World, PolarPosition } from '../../type'

const plantPoint = (n: number, limit: number = 0): PolarPosition[] => {
    const arr = []

    for (let k = n; k--; )
        for (let u = 10; u--; ) {
            const a = toPoint({
                theta: Math.random() * Math.PI * 2,
                r: Math.random() * 0.2 + 0.4,
            })

            if (arr.every(b => distance(a, b) > limit)) {
                arr.push(a)
                break
            }
        }

    return arr.map(fromPoint)
}

export const create = (n: number): World => ({
    drills: [],

    derricks: [],

    wells: [],

    oilPockets: plantPoint(n, 0.3).map(position => ({
        position,
        radius: 0.05,
        oil: Math.floor(Math.random() * 250 + 100),
    })),
})
