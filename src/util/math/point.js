export type Point = {
    x: number,
    y: number,
    z: number,
}

export const scalar = (a: Point, b: Point): number =>
    a.x * b.x + a.y * b.y + a.z * b.z

export const sub = (a: Point, b: Point): Point => ({
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
})

export const add = (a: Point, b: Point): Point => ({
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
})

export const cross = (a: Point, b: Point): Point => ({
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
})

export const scal = (a: Point, l: number): Point => ({
    x: a.x * l,
    y: a.y * l,
    z: a.z * l,
})

export const distance = (a: Point, b: Point): number => length(sub(a, b))

export const addScal = (a: Point, v: Point, l: number): Point => ({
    x: a.x + v.x * l,
    y: a.y + v.y * l,
    z: a.z + v.z * l,
})

export const lerp = (a: Point, b: Point, k: number): Point => ({
    x: a.x * k + b.x * (1 - k),
    y: a.y * k + b.y * (1 - k),
    z: a.z * k + b.z * (1 - k),
})

export const length = (a: Point): number => Math.sqrt(scalar(a, a))

export const normalize = (a: Point): Point => scal(a, 1 / (length(a) || 1))
