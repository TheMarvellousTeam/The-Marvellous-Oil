import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from '../component/App'


export const init = (store => {
    const render = () =>
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('app')
        )

    if (document.getElementById('app')) {
        render()
    } else {
        window.addEventListener('load', render)
    }
}
