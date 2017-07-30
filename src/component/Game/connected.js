import { Game as Component } from './placeDrillState'
import { connect } from 'react-redux'

import { placeDrill } from '../../action/game'

const mapStateToProps = state => ({
    game: state.game,
})

const mapDispatchToProps = {
    placeDrill,
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(Component)
