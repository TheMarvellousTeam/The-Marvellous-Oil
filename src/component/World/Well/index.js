import React from 'react'
import { toPoint } from '../../../util/math/pointPolar'
import type { PointPolar } from '../../../util/math/pointPolar'
import type { Well as Well_type } from '../../../type'

import style from './style.css'

export type Props = {
    well: Well_type,
    size: number,
    gameSpeed: number,
}

export const Well = ({ size, well, gameSpeed }: Props) => {
    const scale = 0.12 + size * 0.0007

    const theta = well.bottom.theta

    const d = gameSpeed ? 1 / gameSpeed : 999999

    return (
        <div className={style.container}>
            {well.drill &&
                <div
                    className={style.drillStructureWrapper}
                    style={{
                        transform:
                            `rotateZ(${theta}rad)` +
                            `translate3d(${size / 2}px,${2 * scale}px,0)` +
                            `rotateZ(90deg)` +
                            `scale(${scale},${scale})`,
                    }}
                >
                    <div
                        className={style.drillStructure + ' ' + style.type1}
                        style={{
                            animationDuration: `${d / 2}s`,
                        }}
                    />
                </div>}

            {well.drill &&
                <div
                    className={style.drillHeadWrapper}
                    style={{
                        transitionDuration: `${d * 0.8}s`,
                        transform:
                            `rotateZ(${theta}rad)` +
                            `translate3d(${well.bottom.r * size / 2}px,0,0)` +
                            `rotateZ(90deg)` +
                            `scale(${scale * 0.74},${scale * 0.74})`,
                    }}
                >
                    <div
                        className={style.drillHead + ' ' + style.type1}
                        style={{
                            animationDuration: `${d}s`,
                        }}
                    />
                </div>}
        </div>
    )
}
