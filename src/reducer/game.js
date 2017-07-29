import { set, merge } from '../util/redux'

import type { Action, State } from './type'
import type { Drill } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic': {
            let game = state.game
            let total_cost = 0
            let updated_derricks = game.world.derricks || []
            let updated_drills = game.world.drills || []
            let updated_wells = game.world.wells || []

            updated_drills.forEach((d: Drill) => {
                if (d.isDrilling) {
                    d.position.r += d.drillClass.velocity
                    if (d.position.r > d.drillClass.max_depth) {
                        d.position.r = d.drillClass.max_depth
                        d.isDrilling = false
                    }
                    total_cost += d.drillClass.drilling_cost
                }
            })
            updated_drills.filter((d: Drill) => {
                // if touching oilPocket
                //      return false and create derrick
                // else if ( !d.isDrilling && d.position.r== d.drillClass.max_depth )
                //
                if (!d.isDrilling && d.position.r == d.drillClass.max_depth) {
                    const newWell: Well = {
                        bottom: {
                            theta: d.position.theta,
                            r: d.position.r,
                        },
                    }
                    updated_wells = [...updated_wells, newWell]
                    return false
                } else {
                    return true
                }
            })

            game = {
                ...game,

                money: game.money - total_cost,

                worlds: {
                    ...game.world,
                    drills: updated_drills,
                    derricks: updated_derricks,
                    wells: updated_wells,
                },
            }
            return { ...state, game }
        }
        case 'game:drill:place': {
            let game = state.game

            const { drillClass } = state.game.technologies.available.filter(
                x => x.type === 'drill'
            )[action.drillClassIndex]
        }

        case 'game:drill:unlock': {
            let game = state.game

            let i = 0
            let k = action.drillClassIndex
            state.game.technologies.available.forEach((x, j) => {
                i = k === 0 ? j : i
                k = x.type == 'drill' ? k - 1 : k
            })

            return set(state, ['game', 'technologies', 'unlocked', i], true)
        }
    }
    return state
}
