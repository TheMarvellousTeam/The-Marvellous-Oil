import { tic } from '../action/game'

export const init = store => {
    let timeout = null

    const update = () => {
        clearTimeout(timeout)

        const state = store.getState()

        if (state.game && state.game.state == 'playing') {
            setTimeout(
                () => store.dispatch(tic()),
                Math.max(state.game.loop.nextTic - Date.now(), 0)
            )
        }
    }

    store.subscribe(update)
}
