import React from 'react'

import { Game as SimpleGame } from './fit'
import { connect } from 'react-redux'

export class Game extends React.Component {
    state = { drillClassIndex: 0, ghostDrill: null }

    onPointerMove = point => {
        if (!this.state.ghostDrill) return

        this.setState({
            ghostDrill: {
                ...this.state.ghostDrill,
                position: { ...point, r: 0 },
            },
        })
    }

    onPointerClick = (point, item) => {
        if (item) {
            if (item.type == 'drill') {
                this.props.stopDrill(item.index)
            }
        } else {
            if (!this.state.ghostDrill) return
            this.props.placeDrill(point.theta, this.state.drillClassIndex)

            this.setState({ ghostDrill: null })
        }
    }

    onStartPlaceDrill = drillClassIndex => {
        const { drillClass } = this.props.game.technologies.available[0]

        const ghostDrill = {
            drillClass,
            position: {
                theta: 0,
                r: 1,
            },
        }

        this.setState({ drillClassIndex, ghostDrill })
    }

    render() {
        return (
            <SimpleGame
                {...this.props}
                ghostDrill={this.state.ghostDrill}
                onPointerMove={this.onPointerMove}
                onPointerClick={this.onPointerClick}
                onStartPlaceDrill={this.onStartPlaceDrill}
            />
        )
    }
}
