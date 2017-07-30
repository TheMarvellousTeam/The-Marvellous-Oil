import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Bank } from '../index'

storiesOf('Bank', module).add('default', () =>
    <Bank bank={900} inFlow={10} outFlow={10} />
)
