import { GameSpeedSlider as Component } from './index'
import { connect } from 'react-redux'
import { setGameSpeed } from '../../action/index'

const mapStateToProps = state => ({
    gameSpeed: state.game.loop.gameSpeed,
})

const mapDispatchToProps = { setGameSpeed }

export const GameSpeedSlider = connect(mapStateToProps, mapDispatchToProps)(
    Component
)
