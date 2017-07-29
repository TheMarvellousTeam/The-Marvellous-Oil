////////////////
//// math ////
////////////////
export type PolarPosition = {
    // float in rad
    theta: number,

    // float in [0,1],
    // where 0 is the center of the world
    // and 1 is the surface
    r: number,
}

////////////////
//// drills ////
////////////////

// describe the drill properties
export type DrillClass = {
    name: string,

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
    isDrilling: boolean,
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

    derricks: Derrick[],

    wells: Well[],

    oilPockets: {
        position: PolarPosition,
        radius: number,
        oil: number,
    }[],
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
