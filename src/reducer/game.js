import { set, merge } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    switch (action.type) {
        case 'game:drill:place':
            return state
    }
    return state
}
