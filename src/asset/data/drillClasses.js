import type { DrillClass } from '../../type'
import { derrickClasses } from './derrickClasses'

export const drillClasses: DrillClass[] = [
    {
        name: 'Wooden Drill',

        velocity: 0.04,
        max_depth: 0.5,
        sample_radius: 0.03,

        unlock_cost: 50,
        placement_cost: 50,
        drilling_cost: 5,

        derrickClass: derrickClasses[0],
    },
    {
        name: 'Iron Drill',

        velocity: 0.03,
        max_depth: 0.6,
        sample_radius: 0.045,

        unlock_cost: 100,
        placement_cost: 100,
        drilling_cost: 5,

        derrickClass: derrickClasses[1],
    },
    {
        name: 'Golden Drill',

        velocity: 0.04,
        max_depth: 0.6,
        sample_radius: 0.035,

        unlock_cost: 300,
        placement_cost: 300,
        drilling_cost: 25,

        derrickClass: derrickClasses[2],
    },
    {
        name: 'Drill Bril6c',

        velocity: 0.02,
        max_depth: 0.7,
        sample_radius: 0.07,

        unlock_cost: 500,
        placement_cost: 500,
        drilling_cost: 50,

        derrickClass: derrickClasses[3],
    },
]
