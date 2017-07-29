import React from 'react'

import style from './style.css'

import type { DrillClass } from '../../type'

export type Props = {
    drills: DrillClass[],

    availables: boolean[],

    unlockDrill: (drillIndex: number) => void,

    selectDrill: (drillIndex: number) => void,
}

const Drill = ({ name, unlock, select, locked }) =>
    <div className={style.item} onClick={locked ? unlock : select}>
        <div className={style.label}>
            {name}
        </div>
        {locked ? '[locked]' : ''}
    </div>

export const DrillShelf = ({
    drills,
    availables,
    unlockDrill,
    selectDrill,
}: Props) =>
    <div className={style.container}>
        {drills.map((drill, i) =>
            <Drill
                {...drill}
                key={i}
                unlock={() => unlockDrill(i)}
                select={() => selectDrill(i)}
                locked={!availables[i]}
            />
        )}
    </div>
