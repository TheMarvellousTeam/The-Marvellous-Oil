import { set, merge } from '../util/redux'

import type { Action, State } from './type'
import type { Drill, Well } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic': {
            let totalCost = 0

            // fix cost
            totalCost += 1

            let world = state.game.world

            // update well
            const wells = world.wells.map((well: Well) => {
                let drill = well.drill
                let updatedWell = {
                    ...well,
                }

                // drilling case
                if (drill && drill.isDrilling) {
                    // drilling cost
                    totalCost += drill.drillClass.drilling_cost
                    // drills
                    updatedWell.bottom = Math.max(
                        1 - drill.drillClass.max_depth,
                        well.bottom - drill.drillClass.velocity
                    )
                    // if depth == max_depth delete drill
                    //TODO add sample
                    if (updatedWell.bottom == 1 - drill.drillClass.max_depth) {
                        updatedWell.drill = null
                    }
                }
                // TODO pumping case

                return updatedWell
            })

            return {
                ...state,
                game: {
                    ...state.game,
                    world: {
                        ...world,
                        wells,
                    },
                    money: state.game.money - totalCost,
                    day: state.game.day + 1 / 48,
                },
            }
        }

        case 'game:drill:place': {
            let game = state.game

            const { drillClass } = state.game.technologies.available.filter(
                x => x.type === 'drill'
            )[action.drillClassIndex]

            const newWell: Well = {
                theta: action.theta,
                bottom: 1,
                drill: {
                    drillClass: drillClass,
                    isDrilling: true,
                },
                derrick: null,
                samples: [],
            }

            // copy the game
            game = {
                ...game,

                // withdraw the cost of the drill
                money: game.money - drillClass.placement_cost,

                // copy the world
                world: {
                    ...game.world,

                    // add the drill to the world
                    wells: [...game.world.wells, newWell],
                },
            }

            return { ...state, game }
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
