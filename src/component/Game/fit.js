import React from 'react'
import { Game as SimpleGame } from './index'

export class Game extends React.Component {
    state = { width: 400, height: 400 }

    resize = () => {
        if ('undefined' !== typeof window)
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            })
    }

    componentDidMount() {
        this.resize()

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.resize)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.resize)
        }
    }

    render() {
        return <SimpleGame {...this.props} {...this.state} />
    }
}
