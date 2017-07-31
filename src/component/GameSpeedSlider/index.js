import React from 'react'

import style from './style.css'

export type Props = {
    gameSpeed: number,
    setGameSpeed: (s: number) => void,
}

const VALUES = [0, 1, 2, 5]

export const GameSpeedSlider = ({ gameSpeed, setGameSpeed }: Props) =>
    <div className={style.container}>
        <div className={style.label}>
            {gameSpeed}
        </div>

        <input
            type="range"
            className={style.input}
            value={VALUES.reduce((j, x, i) => (x <= gameSpeed ? i : j), 0)}
            step={1}
            min={0}
            max={VALUES.length - 1}
            onChange={e => setGameSpeed(VALUES[+e.target.value])}
        />
    </div>
