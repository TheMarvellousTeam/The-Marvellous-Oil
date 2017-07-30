import React from 'react'
import { Motion, spring } from 'react-motion'

import style from './style.css'

import type { DrillClass } from '../../type'

export type Props = {
    bank: number,
    outFlow: number,
    inFlow: number,
}

export const Bank = ({ bank, outFlow, inFlow }: Props) =>
    <div className={style.container}>
        <Motion
            defaultStyle={{ bank: 0 }}
            style={{ bank: spring(bank, { stiffness: 50, damping: 10 }) }}
        >
            {v => {
                const d = Math.min(1, Math.abs(v.bank - bank) / 10)
                const u = Math.abs(0.5 - v.bank / 10 % 1) * 2
                const s = 1 + u * d

                return (
                    <div
                        className={style.container}
                        style={{ transform: `scale(${s},${s})` }}
                    >
                        {Math.round(v.bank)}
                    </div>
                )
            }}
        </Motion>

        <div className={style.detail}>
            <div className={style.outFlow}>
                {-outFlow}
            </div>
            <div className={style.inFlow}>
                {inFlow}
            </div>
        </div>
    </div>
