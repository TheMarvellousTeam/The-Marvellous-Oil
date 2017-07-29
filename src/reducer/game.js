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
                if ( d.isDrilling ) {
                    d.position.r += d.drillClass.velocity
                    if ( d.position.r > d.drillClass.max_depth ) {
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
                if ( !d.isDrilling && d.position.r == d.drillClass.max_depth ) {
                    const newWell: Well = {
                        bottom: {
                            theta: d.position.theta,
                            r: d.position.r
                        }
                    }
                    updated_wells = [ ...updated_wells, newWell ]
                    return false
                } else {
                    return true
                }
            })

            game = {
                ...game,

                money: game.money - total_cost,

                worlds:{
                    ...game.world,
                    drills: updated_drills,
                    derricks: updated_derricks,
                    wells: updated_wells
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
