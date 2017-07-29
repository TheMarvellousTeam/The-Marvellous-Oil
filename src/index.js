import { createStore, applyMiddleware, compose } from 'redux'
import { defaultState, reduce } from './reducer'

import { init as initUI } from './sideEffect/ui'

let store
{
    const crashReporter = store => next => action => {
        try {
            return next(action)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Caught an exception!', err)
            throw err
        }
    }

    // create redux store
    const middlewares = [crashReporter]
    const enhancers = [
        ...('undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
            : []),
        applyMiddleware(...middlewares),
    ]

    store = createStore(reduce, defaultState, compose(...enhancers))
}

;[initUI].forEach(init => init(store))