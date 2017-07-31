import React from 'react'

import style from './style.css'

export const Clouds = ({ size, gameSpeed }) =>
    <div
        className={style.container}
        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
    >
        {[0].map(i =>
            <div
                key={i}
                className={style.cloud}
                style={{
                    animationDuration:
                        (gameSpeed ? (15 + i * 3.5) / gameSpeed : 999999) + 's',
                }}
            />
        )}
    </div>
