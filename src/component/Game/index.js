import React from 'react'

import { World } from '../World'
import { DrillShelf } from '../DrillShelf/connected'

import style from './style.css'

import type { Game as Game_type } from '../../reducer/type'

export type Props = {
    game: Game_type,
    width: number,
    height: number,
    ghostDrill: *,

    onStartPlaceDrill: () => void,
    onPointerClick: () => void,
    onPointerMove: () => void,
}

export const Game = ({
    game,
    width,
    height,
    ghostDrill,

    onPointerClick,
    onPointerMove,
    onStartPlaceDrill,
}: Props) =>
    <div className={style.container}>
        <World
            world={game.world}
            width={width}
            height={height}
            ghostDrill={ghostDrill}
            onPointerMove={onPointerMove}
            onPointerClick={onPointerClick}
        />

        <div className={style.drillShelf}>
            <DrillShelf selectDrill={onStartPlaceDrill} />
        </div>
    </div>
