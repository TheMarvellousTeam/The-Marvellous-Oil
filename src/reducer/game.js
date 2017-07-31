import { set, merge } from '../util/redux'
import { toPoint } from '../util/math/pointPolar'
import { distance } from '../util/math/point'

import type { Action, State } from './type'
import type { Drill, Well } from '../type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic': {
            let totalCost = 0
            let totalEarned = 0

            // fix cost
            totalCost += 1

            let world = state.game.world
            let oils = [...world.oilPockets]

            // update well
            const wells = world.wells.map((well: Well) => {
                let updatedWell = {
                    ...well,
                }

                let drill = well.drill
                // drilling case
                if (drill && drill.isDrilling) {
                    // drilling cost
                    totalCost += drill.drillClass.drilling_cost
                    // drills
                    updatedWell.bottom.r = Math.max(
                        1 - drill.drillClass.max_depth,
                        well.bottom.r - drill.drillClass.velocity
                    )

                    oils.forEach((oil, i) => {
                        const po = toPoint(oil.position)
                        const pw = toPoint(updatedWell.bottom)

                        //TODO check connection to oil
                        console.log('oil ' + i + ' d:' + distance(po, pw))
                        if (distance(po, pw) < oil.radius) {
                            updatedWell.derrick = {
                                oilPocket: i,
                                derrickClass: drill.drillClass.derrickClass,
                            }
                            updatedWell.drill = null
                        }
                    })

                    // if depth == max_depth delete drill
                    if (
                        updatedWell.bottom.r ==
                        1 - drill.drillClass.max_depth
                    ) {
                        //TODO add sample
                        updatedWell.drill = null
                    }
                }

                let derrick = updatedWell.derrick
                if (derrick) {
                    totalCost += derrick.pumping_cost

                    const wannaPump = derrick.derrickClass.inflow
                    let pumped =
                        wannaPump <= oils[derrick.oilPocket].oil
                            ? wannaPump
                            : oils[derrick.oilPocket].oil
                    console.log('pumping: ' + pumped)
                    oils[derrick.oilPocket].oil -= pumped
                    //TODO earn money
                }

                return updatedWell
            })

            return {
                ...state,
                game: {
                    ...state.game,
                    world: {
                        ...world,
                        wells: wells,
                        oilPockets: oils,
                    },
                    money: state.game.money - totalCost + totalEarned,
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
                bottom: {
                    theta: action.theta,
                    r: 1,
                },
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
