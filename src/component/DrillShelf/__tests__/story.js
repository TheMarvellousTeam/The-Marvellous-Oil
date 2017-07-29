import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DrillShelf } from '../index'
import { drillClasses } from '../../../asset/data/drillClasses'

storiesOf('DrillShelf', module).add('default', () =>
    <DrillShelf
        drills={drillClasses}
        availables={drillClasses.map((_, i) => i % 2 == 0)}
        selectDrill={action('selectDrill')}
        unlockDrill={action('unlockDrill')}
    />
)
