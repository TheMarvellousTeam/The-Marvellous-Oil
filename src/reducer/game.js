import { set, merge } from '../util/redux'

import type { Action, State } from './type'
import type { Drill } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic': {
            let game = state.game
            let updated_drills = game.world.drills
            let total_cost = 0
            updated_drills.forEach((d: Drill) => {
                if ( d.isDrilling ) {
                    d.position.r += d.drillClass.velocity
                    total_cost += d.drillClass.drilling_cost
                }
            })
            game = {
                ...game,

                money: game.money - total_cost,

                worlds:{
                    ...game.world,
                    drills: updated_drills
                }
            }
            return {...state, game}
        }
        case 'game:drill:place': {
            let game = state.game

            // create the new drill, on the surface
            const newDrill: Drill = {
                drillClass: action.drillClass,
                isDrilling: true,
                position: {
                    theta: action.theta,
                    r: 1,
                },
            }

            // copy the game
            game = {
                ...game,

                // withdraw the cost of the drill
                money: game.money - action.drillClass.drilling_cost,

                // copy the world
                worlds: {
                    ...game.world,

                    // add the drill to the world
                    drills: [...game.world.drills, newDrill],
                },
            }

            return { ...state, game }
        }
    }
    return state
}
