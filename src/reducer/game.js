import { set, merge } from '../util/redux'

import type { Action, State } from './type'
import type { Drill } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:drill:place':
            let game = state.game

            // create the new drill, on the surface
            const newDrill: Drill = {
                drillClass: action.drillClass,
                position: {
                    theta: action.theta,
                    r: 1,
                },
            }

            // copy the game
            game = {
                ...game,

                // withdraw the cost of the drill
                money: game.money - action.drillClass.placement_cost,

                // copy the world
                worlds: {
                    ...game.world,

                    // add the drill to the world
                    drills: [...game.world.drills, newDrill],
                },
            }

            return { ...state, game }
    }
    return state
}
