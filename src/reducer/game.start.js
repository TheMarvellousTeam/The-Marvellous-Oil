import { set, merge } from '../util/redux'
import { create as createWorld } from '../service/game/forgeWorld'
import { drillClasses } from '../asset/data/drillClasses'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    if (action.type === 'game:start')
        return set(state, ['game'], {
            world: createWorld(3),
            bank: {
                money: 1000,
                inflow: 0,
                outflow: 0,
                deltaOil: 0,
                valueOil: 10,
            },
            day: 0,
            state: 'playing',
            technologies: {
                available: [
                    ...drillClasses.map(drillClass => ({
                        type: 'drill',
                        drillClass,
                    })),
                ],
                unlocked: [],
            },
            loop: { lastTic: 0, gameSpeed: 1 },
        })

    return state
}
