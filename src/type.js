////////////////
//// math ////
////////////////
export type PolarPosition = {
    theta: number,
    r: number,
}

////////////////
//// drills ////
////////////////

// describe the drill properties
export type DrillClass = {
    velocity: number,
    max_depth: number,

    //// costs //////
    // initial cost
    placement_cost: number,

    // per day
    drilling_cost: number,
}

// describe the drill state
export type Drill = {
    position: PolarPosition,
    drillClass: DrillClass,
}

// describe a drilled well
export type Well = {
    // position of the bottom
    // ( position on surface can be deduced with theta )
    bottom: PolarPosition,
}

export type Derrick = {
    theta: number,

    // index to the pomped oil pocket
    oilPocket: number,
}

// describe the world
export type World = {
    drills: Drill[],
    oilPoket: {
        position: PolarPosition,
        radius: number,
        oil: number,
    },
}

//////////////////////
//// technologies ////
//////////////////////

export type Technology_Unlock_DrillClass = {
    type: 'drill',
    drillClass: DrillClass,
    cost: number,
}
export type Technology = Technology_Unlock_DrillClass
