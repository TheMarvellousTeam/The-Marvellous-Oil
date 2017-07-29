import React from 'react'

import { Game } from '../Game/connected'

import style from './style.css'

export const App = ({ page }) =>
    <div className={style.container}>
        {page === 'game' && <Game />}
    </div>
