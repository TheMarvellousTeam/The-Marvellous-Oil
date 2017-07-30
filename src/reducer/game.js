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

            // update drills
            const drills = world.drills
                .map(drill => {
                    totalCost += drill.drillClass.drilling_cost

                    if (1 - drill.position.r >= drill.drillClass.max_depth)
                        return null

                    return {
                        ...drill,
                        position: {
                            ...drill.position,
                            r: Math.max(
                                1 - drill.drillClass.max_depth,
                                drill.position.r - drill.drillClass.velocity
                            ),
                        },
                    }
                })
                .filter(Boolean)

            // TODO update well,
            // match well with their drill with the angle theta
            // ( because there is no id, and I guess the angle is unique enought )

            return {
                ...state,
                game: {
                    ...state.game,
                    world: {
                        ...world,

                        drills,
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

            const newDrill: Drill = {
                drillClass: drillClass,
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
                money: game.money - drillClass.drilling_cost,

                // copy the world
                world: {
                    ...game.world,

                    // add the drill to the world
                    drills: [...game.world.drills, newDrill],
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
