import { Game as Component } from './fit'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    game: state.game,
})

const mapDispatchToProps = {}

export const Game = connect(mapStateToProps, mapDispatchToProps)(Component)
