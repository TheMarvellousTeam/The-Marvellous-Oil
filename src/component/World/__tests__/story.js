import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { World } from '../index'
import { drillClasses } from '../../../asset/data/drillClasses'

const world = {
    wells: [
        {
            bottom: {
                theta: Math.PI * 1.3,
                r: 0.9,
            },
            drill: {
                isDrilling: true,
                drillClass: drillClasses[0],
            },
            derrick: null,
            samples: [],
        },
        {
            bottom: {
                theta: Math.PI * 2.6,
                r: 0.9,
            },
            drill: {
                isDrilling: true,
                drillClass: drillClasses[0],
            },
            derrick: null,
            samples: [],
        },
    ],
    oilPockets: [],
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
