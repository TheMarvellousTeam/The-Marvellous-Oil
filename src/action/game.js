import type { DrillClass } from '../type'

type Action_Game_Tic = {
    type: 'game:tic',
}
export const tic = (): Action_Game_Tic => ({
    type: 'game:tic',
})

type Action_Game_PlaceDrill = {
    type: 'game:drill:place',
    theta: number,
    drillClass: DrillClass,
}
export const placeDrill = (
    theta: number,
    drillClass: DrillClass
): Action_Game_PlaceDrill => ({
    type: 'game:drill:place',
    theta,
    drillClass,
})

export type Action = Action_Game_PlaceDrill | Action_Game_Tic
