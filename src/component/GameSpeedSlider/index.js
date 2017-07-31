import React from 'react'

import style from './style.css'

export type Props = {
    gameSpeed: number,
    setGameSpeed: (s: number) => void,
}

const VALUES = [0, 0.2, 1, 2, 5]

const getIndex = gameSpeed =>
    VALUES.reduce((j, x, i) => (x <= gameSpeed ? i : j), 0)

const getNextValue = (gameSpeed, dir) =>
    VALUES[Math.max(0, Math.min(VALUES.length - 1, getIndex(gameSpeed) + dir))]

export const GameSpeedSlider = ({ gameSpeed, setGameSpeed }: Props) =>
    <div className={style.container}>
        <div className={style.label}>
            {`gameSpeed: ${gameSpeed}`}
        </div>

        <input
            type="range"
            className={style.input}
            value={getIndex(gameSpeed)}
            step={1}
            min={0}
            max={VALUES.length - 1}
            onChange={e => setGameSpeed(VALUES[+e.target.value])}
        />

        <div className={style.arrows}>
            <button
                className={style.arrowSlower}
                onClick={() => setGameSpeed(getNextValue(gameSpeed, -1))}
            >
                {'<'}
            </button>
            <button
                className={style.arrowFaster}
                onClick={() => setGameSpeed(getNextValue(gameSpeed, 1))}
            >
                {'>'}
            </button>
        </div>
    </div>
