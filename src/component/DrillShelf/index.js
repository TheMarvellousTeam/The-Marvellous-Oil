import React from 'react'
import { drillClasses } from '../../asset/data/drillClasses'

import style from './style.css'

import type { DrillClass } from '../../type'

const getStyle = drillClass =>
    `type${1 + (drillClasses.findIndex(x => x === drillClass) || 0)}`

export type Props = {
    drills: DrillClass[],

    availables: boolean[],

    unlockDrill: (drillIndex: number) => void,

    selectDrill: (drillIndex: number) => void,
}

const Drill = ({ drillClass, unlock, select, locked }) =>
    <div className={style.item} onClick={locked ? unlock : select}>
        <div
            className={
                style.icon +
                ' ' +
                style[getStyle(drillClass)] +
                ' ' +
                (locked ? style.locked : '')
            }
        />

        {locked &&
            <div className={style.priceTag}>
                {'$' + drillClass.unlock_cost}
            </div>}
    </div>

export const DrillShelf = ({
    drills,
    availables,
    unlockDrill,
    selectDrill,
}: Props) =>
    <div className={style.container}>
        {drills.map((drillClass, i) =>
            <Drill
                drillClass={drillClass}
                key={i}
                unlock={() => unlockDrill(i)}
                select={() => selectDrill(i)}
                locked={!availables[i]}
            />
        )}
    </div>
