import React from 'react'
import { toPoint } from '../../../util/math/pointPolar'
import { drillClasses } from '../../../asset/data/drillClasses'
import type { PointPolar } from '../../../util/math/pointPolar'

import style from './style.css'

const getStyle = drillClass =>
    `type${1 + (drillClasses.findIndex(x => x === drillClass) || 0)}`

export type Props = {
    size: number,
    ghostDrill: *,
}

export const GhostDrill = ({ size, ghostDrill }: Props) => {
    const scale = 0.12 + size * 0.0007

    const theta = ghostDrill.theta

    return (
        <div className={style.container}>
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
                    className={
                        style.drillStructure +
                        ' ' +
                        style[getStyle(ghostDrill.drillClass)]
                    }
                />
            </div>
        </div>
    )
}
