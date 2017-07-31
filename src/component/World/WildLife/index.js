import React from 'react'
import { toPoint } from '../../../util/math/pointPolar'
import type { PointPolar } from '../../../util/math/pointPolar'

import style from './style.css'

export type Props = {
    world: World_type,
    size: number,
}

export const WildLife = ({ size, entities }) =>
    <div className={style.container}>
        {entities.map((entity, i) => {
            const { theta, type, v, tint } = entity

            const k = Math.abs((theta + Math.PI * 2) * 10 % 1 - 0.5) * 2

            const s = size / 2 + size * 0.02 * k * Math.abs(v) / 0.007

            const scale =
                0.1 + size * 0.0007 * (0.8 + 0.4 * (tint * 37 % 17) / 17)

            return (
                <div
                    key={i}
                    className={style[type]}
                    style={{
                        filter:
                            `hue-rotate(${-tint * 40}deg)` +
                            ` saturate(${90 + tint * 10}%)`,
                        transform:
                            `rotateZ(${theta}rad)` +
                            ` translate3d(${s}px,0,0)` +
                            ` rotateZ(${90 + (k - 0.5) * 26}deg)` +
                            ` scale(${(v > 0 ? -1 : 1) * scale},${scale})`,
                    }}
                />
            )
        })}
    </div>
