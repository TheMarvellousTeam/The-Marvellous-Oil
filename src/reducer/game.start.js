import { set, merge } from '../util/redux'
import { create as createWorld } from '../service/game/forgeWorld'
import { drillClasses } from '../asset/data/drillClasses'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    if (action.type === 'game:start')
        return set(state, ['game'], {
            world: createWorld(3, 0.1),
            money: 1000,
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
            loop: { nextTic: 0, gameSpeed: 0.5 },
        })

    return state
}
