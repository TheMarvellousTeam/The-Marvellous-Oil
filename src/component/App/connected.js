import { App as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    page: (state.game && 'game') || null,
})

export const App = connect(mapStateToProps)(Component)
