import React from 'react'

import { Game as SimpleGame } from './fit'
import { connect } from 'react-redux'
import * as param from '../../config/game'

const n = param.n_drill_spot

const roundTheta = x => Math.round(x / (Math.PI * 2) * n) / n * Math.PI * 2

export class Game extends React.Component {
    state = { drillClassIndex: 0, ghostDrill: null }

    onPointerMove = point => {
        if (!this.state.ghostDrill) return

        this.setState({
            ghostDrill: {
                ...this.state.ghostDrill,
                theta: roundTheta(point.theta),
            },
        })
    }

    onPointerClick = (point, item) => {
        if (item) {
            if (item.type == 'drill') {
                this.props.stopDrill(item.i)
            }
        } else {
            if (!this.state.ghostDrill) return
            this.props.placeDrill(
                roundTheta(point.theta),
                this.state.drillClassIndex
            )

            this.setState({ ghostDrill: null })
        }
    }

    onStartPlaceDrill = drillClassIndex => {
        const { drillClass } = this.props.game.technologies.available[0]

        const ghostDrill = {
            drillClass,
            theta: 0,
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
