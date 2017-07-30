import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { World } from '../index'
import { drillClasses } from '../../../asset/data/drillClasses'

const world = {
    wells: [],
    drills: [
        {
            position: {
                theta: Math.PI * 1.3,
                r: 0.9,
            },
            drillClass: drillClasses[0],
        },
        {
            position: {
                theta: Math.PI * 2.6,
                r: 0.6,
            },
            drillClass: drillClasses[0],
        },
    ],
    derricks: [],
    oilPockets: Array.from({ length: 6 }).map((_, i, arr) => ({
        position: {
            theta: Math.PI * 2 * i / arr.length,
            r: i / arr.length,
        },
        radius: 0.1,
        oil: 40,
    })),
}

storiesOf('World', module).add('default', () =>
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <World
            width={600}
            height={500}
            world={world}
            onPointerMove={action('onPointerMove')}
            onPointerClick={action('onPointerClick')}
        />
    </div>
)
