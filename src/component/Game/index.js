import React from 'react'

import { World } from '../World'

import style from './style.css'

export const Game = ({ game, width, height }) =>
    <div className={style.container}>
        <World world={game.world} width={width} height={height} />
    </div>
