import { tic } from '../action/game'

export const init = store => {
    let timeout = null

    const update = () => {
        clearTimeout(timeout)

        const state = store.getState()

        if (
            state.game &&
            state.game.state == 'playing' &&
            state.game.loop.gameSpeed > 0
        ) {
            const ticDuration = 1000 / state.game.loop.gameSpeed

            const delta = Math.max(
                state.game.loop.lastTic + ticDuration - Date.now(),
                0
            )

            timeout = setTimeout(() => store.dispatch(tic()), delta)
        }
    }

    store.subscribe(update)
}
