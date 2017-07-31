import React from 'react'

import { World } from '../World'
import { GameSpeedSlider } from '../GameSpeedSlider/connected'
import { DrillShelf } from '../DrillShelf/connected'
import { Bank } from '../Bank/connected'

import style from './style.css'

import type { Game as Game_type } from '../../reducer/type'

export type Props = {
    game: Game_type,
    width: number,
    height: number,
    gameSpeed: number,
    ghostDrill: *,

    onStartPlaceDrill: () => void,
    onPointerClick: () => void,
    onPointerMove: () => void,
}

export const Game = ({
    game,
    width,
    height,
    gameSpeed,
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
            gameSpeed={gameSpeed}
            day={game.day}
            ghostDrill={ghostDrill}
            onPointerMove={onPointerMove}
            onPointerClick={onPointerClick}
        />

        <div className={style.drillShelf}>
            <DrillShelf selectDrill={onStartPlaceDrill} />
        </div>

        <div className={style.bank}>
            <Bank />
        </div>

        <div className={style.gameSpeedSlider}>
            <GameSpeedSlider />
        </div>
    </div>
