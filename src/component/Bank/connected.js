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
        inFlow: state.game.bank.inflow,
        outFlow: state.game.bank.outflow,
        bank: state.game.bank.money,
        value: state.game.bank.valueOil,
        change: state.game.bank.deltaOil,
    }
}

export const Bank = connect(mapStateToProps)(Component)
