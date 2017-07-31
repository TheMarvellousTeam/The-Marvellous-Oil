import { Game as Component } from './placeDrillState'
import { connect } from 'react-redux'

import { placeDrill, stopDrill } from '../../action/game'

const mapStateToProps = state => ({
    game: state.game,
    gameSpeed: state.game.loop.gameSpeed,
})

const mapDispatchToProps = {
    placeDrill,
    stopDrill,
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(Component)
