import { Bank as Component } from './index'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const drill_cost = state.game.world.wells.reduce(
        (sum, well) =>
            sum +
            (well.drill && well.drill.isDrilling
                ? well.drill.drillClass.drilling_cost
                : 0),
        0
    )

    return {
        inFlow: 0,
        outFlow: drill_cost,
        bank: state.game.money,
    }
}

export const Bank = connect(mapStateToProps)(Component)
