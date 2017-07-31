import type { OilPocket } from '../../type'
import type { Point } from '../../util/math/point'
import { toPoint } from '../../util/math/pointPolar'
import { distance } from '../../util/math/point'
import * as param from '../../config/world'

const u = 1 / Math.sqrt(2 * Math.PI)

const gauss = (tau, x) => u / tau * Math.exp(-0.5 * (x * x) / (tau * tau))

const TAU = param.gauss_tau

const A = 1 / gauss(TAU, 0.01)

const noise = Array.from({ length: param.noisePoint_n }).map(() => ({
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
    z: 0,
    a: (Math.random() + 1) * param.noisePoint_force,
}))

//prettier-ignore
export const getSediment = (oilPockets: OilPocket[], at: Point) =>
    Math.min(
        1,
        A *
            (
                oilPockets.reduce(
                    (sum, { position }) =>
                        sum + gauss(TAU, distance(at, toPoint(position))),
                    0
                )
                +
                noise.reduce(
                    (sum, x) => sum + x.a * gauss(TAU, distance(at, x)),
                    0
                )
            )
    )
