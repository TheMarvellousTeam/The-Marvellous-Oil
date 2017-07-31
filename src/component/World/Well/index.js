import React from 'react'
import { toPoint } from '../../../util/math/pointPolar'
import { drillClasses } from '../../../asset/data/drillClasses'
import type { PointPolar } from '../../../util/math/pointPolar'
import type { Well as Well_type } from '../../../type'

import style from './style.css'

const getStyle = drillClass =>
    `type${1 + (drillClasses.findIndex(x => x === drillClass) || 0)}`

export type Props = {
    well: Well_type,
    size: number,
    gameSpeed: number,
    day: number,
    onClickEntity: () => void,
}

export const Well = ({ size, well, gameSpeed, day, onClickEntity }: Props) => {
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
                        onClick={e => onClickEntity(e, 'drillBase')}
                        className={
                            style.drillStructure +
                            ' ' +
                            style[getStyle(well.drill.drillClass)]
                        }
                        style={{
                            animationDuration: `${d / 2}s`,
                        }}
                    />
                </div>}

            {well.drill &&
                <div
                    className={style.drillHeadWrapper}
                    onClick={e => onClickEntity(e, 'drill')}
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
                        className={
                            style.drillHead +
                            ' ' +
                            style[getStyle(well.drill.drillClass)]
                        }
                        style={{
                            animationDuration: `${d}s`,
                        }}
                    />
                </div>}

            {well.derrick &&
                <div
                    className={style.derrick}
                    onClick={e => onClickEntity(e, 'derrick')}
                    style={{
                        transform:
                            `rotateZ(${theta}rad)` +
                            `translate3d(${size / 2}px,0,0)` +
                            `rotateZ(90deg)` +
                            `scale(${scale * 0.6},${scale * 0.6})`,
                    }}
                >
                    <div
                        className={style.derrickHammer}
                        style={{
                            animationDuration: `${d * 2}s`,
                        }}
                    />
                </div>}

            {(well.derrick || well.drill) &&
                <div
                    className={style.bubbleWrapper}
                    style={{
                        transform:
                            `rotateZ(${theta}rad)` +
                            `translate3d(${size * 0.62}px,0,0)` +
                            `rotateZ(${-theta}rad)`,
                    }}
                >
                    <div
                        key={day}
                        className={
                            style.bubble +
                            ' ' +
                            ((well.drill && style.bubbleDrill) || '') +
                            ' ' +
                            ((well.derick && style.derickDrill) || '')
                        }
                    >
                        {(well.drill &&
                            `${-well.drill.drillClass.drilling_cost}`) ||
                            ((well.derick && `++`) || '')}
                    </div>
                </div>}
        </div>
    )
}
