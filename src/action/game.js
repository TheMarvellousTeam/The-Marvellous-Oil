import type { DrillClass } from '../type'

type Action_Game_Tic = {
    type: 'game:tic',
}
export const tic = (): Action_Game_Tic => ({
    type: 'game:tic',
})

type Action_Game_Start = {
    type: 'game:start',
}
export const start = (): Action_Game_Start => ({
    type: 'game:start',
})

type Action_Game_PlaceDrill = {
    type: 'game:drill:place',
    theta: number,
    drillClassIndex: number,
}
export const placeDrill = (
    theta: number,
    drillClassIndex: number
): Action_Game_PlaceDrill => ({
    type: 'game:drill:place',
    theta,
    drillClassIndex,
})

type Action_Game_StopDrill = {
    type: 'game:drill:stop',
    index_well: number,
}
export const stopDrill = (index: number): Action_Game_StopDrill => ({
    type: 'game:drill:stop',
    index_well: index,
})

type Action_Game_UnlockDrill = {
    type: 'game:drill:unlock',
    drillClassIndex: number,
}
export const unlockDrill = (
    drillClassIndex: number
): Action_Game_UnlockDrill => ({
    type: 'game:drill:unlock',
    drillClassIndex,
})

export type Action =
    | Action_Game_PlaceDrill
    | Action_Game_Tic
    | Action_Game_Start
    | Action_Game_UnlockDrill
