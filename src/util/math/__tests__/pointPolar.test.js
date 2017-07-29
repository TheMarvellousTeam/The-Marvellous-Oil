import { fromPoint, toPoint } from '../pointPolar'
import { distance } from '../point'

describe('pointPolar', () => {
    it('toPoint fromPoint should be identity', () => {
        const a = { x: 12, y: -15, z: 0 }

        const a_ = toPoint(fromPoint(a))

        expect(distance(a, a_) < 0.000001).toBe(true)
    })
})
