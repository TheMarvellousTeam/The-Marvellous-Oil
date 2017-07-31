import type { DrillClass } from '../../type'
import { derrickClasses } from './derrickClasses'

export const drillClasses: DrillClass[] = [
    {
        name: 'drill de merde',

        velocity: 0.04,
        max_depth: 0.5,

        placement_cost: 10,
        drilling_cost: 1,

        derrickClass: derrickClasses[0],
    },
    {
        name: 'drill de con',

        velocity: 0.04,
        max_depth: 0.6,

        placement_cost: 20,
        drilling_cost: 1,

        derrickClass: derrickClasses[1],
    },
    {
        name: 'drill de luxe',

        velocity: 0.14,
        max_depth: 0.6,

        placement_cost: 30,
        drilling_cost: 5,

        derrickClass: derrickClasses[2],
    },
    {
        name: 'drill brill 6 c',

        velocity: 0.04,
        max_depth: 0.9,

        placement_cost: 38,
        drilling_cost: 8,

        derrickClass: derrickClasses[3],
    },
]
