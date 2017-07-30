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

export type DerrickClass = {
    name: string,

    inflow: number,

    placement_cost: number,
    pumping_cost: number,
}

// describe the drill state
export type Drill = {
    isDrilling: boolean,
    drillClass: DrillClass,
}

export type Sample = {
    r: number,
    type: number,
}

// describe a drilled well
export type Well = {
    // depth of the well
    bottom: PolarPosition,
    // current drill,
    drill: Drill | null,
    // current derrick,
    derrick: Derrick | null,
    // each place where the drill stopped, revealing a piece of the heatmap
    samples: Sample[],
}

export type Derrick = {
    // index to the pomped oil pocket
    oilPocket: number,
    derrickClass: DerrickClass,
}

export type OilPocket = {
    position: PolarPosition,
    radius: number,
    oil: number,
}

// describe the world
export type World = {
    wells: Well[],

    oilPockets: OilPocket[],
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
