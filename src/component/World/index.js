import React from 'react'
import { toPoint, fromPoint } from '../../util/math/pointPolar'
import { scal } from '../../util/math/point'
import { Planet } from './Planet'
import { WildLife } from './WildLife/loop'
import type { World as World_type } from '../../type'
import type { PointPolar } from '../../util/math/pointPolar'

import style from './style.css'

const getPointer = (width, height, size, event): PointPolar => {
    const m = (event.touches && event.touches[0]) || event

    return fromPoint(
        scal(
            {
                x: m.clientX - width / 2,
                y: m.clientY - height / 2,
                z: 0,
            },
            1 / size
        )
    )
}

export type Props = {
    world: World_type,
    width: number,
    height: number,
    gameSpeed: number,

    onPointerMove: (pointer: PointPolar) => void,
    onPointerClick: (
        pointer: PointPolar,
        entity:
            | {
                  type: 'derrick',
                  index: number,
              }
            | {
                  type: 'drill',
                  index: number,
              }
            | null
    ) => void,
}

export const World = ({
    world,
    width,
    height,
    gameSpeed,

    onPointerMove,
    onPointerClick,
}: Props) => {
    const size = Math.min(width, height) * 0.7
    const planet_size = size * 1.2

    return (
        <div
            className={style.container}
            onClick={e =>
                onPointerClick(getPointer(width, height, size, e), null)}
            onMouseMove={e => onPointerMove(getPointer(width, height, size, e))}
            onTouchMove={e => onPointerMove(getPointer(width, height, size, e))}
        >
            <div
                className={style.center}
                style={{
                    transform: `translate3d(${width / 2}px,${height / 2}px,0)`,
                }}
            >
                <Sky size={size * 2.2} />

                <Clouds size={size * 1.5} gameSpeed={gameSpeed} />

                <div
                    className={style.planet}
                    style={{
                        width: planet_size,
                        height: planet_size,
                        top: -planet_size / 2,
                        left: -planet_size / 2,
                    }}
                >
                    <Planet size={planet_size} world={world} />
                </div>

                <div className={style.wildLife}>
                    <WildLife size={size} gameSpeed={gameSpeed} />
                </div>

                {world.wells.map((well, i) => {
                    let position = {
                        theta: well.bottom.theta,
                        r: 1,
                    }
                    return (
                        <Well
                            key={well.bottom.theta}
                            size={size}
                            position={position}
                        />
                    )
                })}

                {world.wells.map((well, i) => {
                    if (well.drill)
                        return (
                            <Drill
                                key={well.bottom.theta}
                                position={well.bottom}
                                size={size}
                                onClick={e =>
                                    onPointerClick(
                                        getPointer(width, height, size, e),
                                        {
                                            type: 'drill',
                                            index: i,
                                        }
                                    )}
                            />
                        )
                })}
            </div>
        </div>
    )
}

const Clouds = ({ size, gameSpeed }) =>
    <div
        className={style.clouds}
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
    >
        {[0, 1, 2, 3].map(i =>
            <div
                key={i}
                className={style.cloud}
                style={{
                    animationDuration:
                        (gameSpeed ? (15 + i * 3.5) / gameSpeed : 999999) + 's',
                }}
            />
        )}
    </div>

const Sky = ({ size }) =>
    <div
        className={style.sky}
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
    />

const transform = (position: PointPolar, size: number) => {
    const u = scal(toPoint(position), size)
    return `translate3d(${u.x}px,${u.y}px,${0}) rotateZ(${position.theta}rad)`
}

const Well = ({ size, position, onClick }) =>
    <div
        onClick={onClick}
        className={style.well}
        style={{ transform: transform(position, size / 2) }}
    />

const Drill = ({ size, position, onClick }) =>
    <div
        onClick={onClick}
        className={style.drill}
        style={{ transform: transform(position, size / 2) }}
    />
