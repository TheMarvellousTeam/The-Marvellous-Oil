import type { DrillClass } from '../../type'
import { derrickClasses } from './derrickClasses'

export const drillClasses: DrillClass[] = [
    {
        name: 'Wooden Drill',

        velocity: 0.04,
        max_depth: 0.45,
        sample_radius: 0.02,

        placement_cost: 100,
        drilling_cost: 10,

        derrickClass: derrickClasses[0],
    },
    {
        name: 'Iron Drill',

        velocity: 0.04,
        max_depth: 0.6,
        sample_radius: 0.04,

        placement_cost: 200,
        drilling_cost: 20,

        derrickClass: derrickClasses[1],
    },
    {
        name: 'Golden Drill',

        velocity: 0.08,
        max_depth: 0.6,
        sample_radius: 0.06,

        placement_cost: 300,
        drilling_cost: 30,

        derrickClass: derrickClasses[2],
    },
    {
        name: 'Drill Bril6c',

        velocity: 0.02,
        max_depth: 0.9,
        sample_radius: 0.06,

        placement_cost: 500,
        drilling_cost: 50,

        derrickClass: derrickClasses[3],
    },
]
