import React from 'react'

import style from './style.css'

export type Props = {
    bank: number,
    outFlow: number,
    inFlow: number,
}

export const Bank = ({ bank, outFlow, inFlow }: Props) =>
    <div className={style.container}>
        <div className={style.bank}>
            {bank}
        </div>

        <div className={style.detail}>
            <div className={style.inFlow}>
                {inFlow}
            </div>
            <div className={style.outFlow}>
                {-outFlow}
            </div>
        </div>
    </div>
