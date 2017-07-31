import type { DrillClass } from '../../type'
import { derrickClasses } from './derrickClasses'

export const drillClasses: DrillClass[] = [
    {
        name: 'drill de merde',

        velocity: 0.04,
        max_depth: 0.5,

        placement_cost: 100,
        drilling_cost: 10,

        derrickClass: derrickClasses[0],
    },
    {
        name: 'drill de con',

        velocity: 0.04,
        max_depth: 0.6,

        placement_cost: 200,
        drilling_cost: 20,

        derrickClass: derrickClasses[1],
    },
    {
        name: 'drill de luxe',

        velocity: 0.14,
        max_depth: 0.6,

        placement_cost: 300,
        drilling_cost: 30,

        derrickClass: derrickClasses[2],
    },
    {
        name: 'drill brill 6 c',

        velocity: 0.04,
        max_depth: 0.9,

        placement_cost: 500,
        drilling_cost: 50,

        derrickClass: derrickClasses[3],
    },
]
