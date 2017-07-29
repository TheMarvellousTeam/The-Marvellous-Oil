import { length } from './point'
import type { Point } from './point'

export type PointPolar = {
    r: number,
    theta: number,
}

export const toPoint = (a: PointPolar): Point => ({
    x: Math.cos(a.theta) * a.r,
    y: Math.sin(a.theta) * a.r,
    z: 0,
})

export const fromPoint = (a: Point): PointPolar => {
    const r = length(a)

    return { theta: Math.atan2(a.y, a.x), r }
}
