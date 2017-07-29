import type { Action as Action_Game } from './game'

type Action_GameSpeed_Set = {
    type: 'game:gameSpeed:set',
    gameSpeed: number,
}
export const setGameSpeed = (gameSpeed: number): Action_GameSpeed_Set => ({
    type: 'game:gameSpeed:set',
    gameSpeed,
})

export type Action = Action_Game | Action_GameSpeed_Set
