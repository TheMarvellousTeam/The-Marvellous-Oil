import React from 'react'

import { World } from '../World'
import { DrillShelf } from '../DrillShelf/connected'

import style from './style.css'

import type { Game as Game_type } from '../../reducer/type'

export type Props = {
    game: Game_type,
    width: number,
    height: number,
}

export const Game = ({ game, width, height }: Props) =>
    <div className={style.container}>
        <World world={game.world} width={width} height={height} />

        <div className={style.drillShelf}>
            <DrillShelf />
        </div>
    </div>
