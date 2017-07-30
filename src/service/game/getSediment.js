import type { OilPocket } from '../../type'
import type { Point } from '../../util/math/point'
import { toPoint } from '../../util/math/pointPolar'
import { distance } from '../../util/math/point'

const u = 1 / Math.sqrt(2 * Math.PI)

const gauss = (tau, x) => u / tau * Math.exp(-0.5 * (x * x) / (tau * tau))

const TAU = 0.2

const A = 1 / gauss(TAU, 0.01)

export const getSediment = (oilPockets: OilPocket[], size: number, at: Point) =>
    Math.min(
        1,
        A *
            oilPockets.reduce(
                (sum, { position }) =>
                    sum + gauss(TAU, distance(at, toPoint(position))),
                0
            )
    )
