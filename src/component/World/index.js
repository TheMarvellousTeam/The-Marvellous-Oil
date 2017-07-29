import React from 'react'
import { toPoint } from '../../util/math/pointPolar'
import { scal } from '../../util/math/point'
import type { World as World_type } from '../../type'
import type { PointPolar } from '../../util/math/pointPolar'

import style from './style.css'

export type Props = {
    world: World_type,
    width: number,
    height: number,

    onPointerMove: (pointer: PointPolar) => void,
    onClickEntity: (type: 'derrick' | 'drill', index: number) => void,
}

export const World = ({
    world,
    width,
    height,

    onPointerMove,
    onClickEntity,
}: Props) => {
    const size = Math.min(width, height) * 0.9

    return (
        <div className={style.container}>
            <div
                className={style.center}
                style={{
                    transform: `translate3d(${width / 2}px,${height / 2}px,0)`,
                }}
            >
                <Planet size={size} />

                {world.drills.map((drill, i) =>
                    <Drill
                        {...drill}
                        size={size}
                        onClick={() => onClickEntity('drill', i)}
                    />
                )}
            </div>
        </div>
    )
}

const Planet = ({ size }) =>
    <div
        className={style.planet}
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
    />

const transform = (position: PointPolar, size: number) => {
    const u = scal(toPoint(position), size)
    return `translate3d(${u.x}px,${u.y}px,${0}) rotateZ(${position.theta}rad)`
}

const Drill = ({ size, position, onClick }) =>
    <div
        onClick={onClick}
        className={style.drill}
        style={{ transform: transform(position, size / 2) }}
    />
