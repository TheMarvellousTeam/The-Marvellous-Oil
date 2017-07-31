import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { GameSpeedSlider } from '../index'

storiesOf('GameSpeedSlider', module)
    .add('0', () =>
        <GameSpeedSlider gameSpeed={0} setGameSpeed={action('setGameSpeed')} />
    )
    .add('1', () =>
        <GameSpeedSlider gameSpeed={1} setGameSpeed={action('setGameSpeed')} />
    )
    .add('5', () =>
        <GameSpeedSlider gameSpeed={5} setGameSpeed={action('setGameSpeed')} />
    )
