import { DrillShelf as Component } from './index'
import { connect } from 'react-redux'
import { unlockDrill } from '../../action/game'

const mapStateToProps = state => {
    const drills = state.game.technologies.available
        .map((x, i) => ({
            ...x,
            unlocked: state.game.technologies.unlocked[i],
        }))
        .filter(x => x.type === 'drill')

    return {
        drills: drills.map(x => x.drillClass),
        availables: drills.map(x => x.unlocked),
    }
}

const mapDispatchToProps = { unlockDrill }

export const DrillShelf = connect(mapStateToProps, mapDispatchToProps)(
    Component
)
