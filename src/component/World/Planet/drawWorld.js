import { drawSediment } from './drawSediment'
import { create as createSpriteMemoize } from './spriteMemoize'
import {} from '../../../util/math/point'
import { toPoint } from '../../../util/math/pointPolar'

import type { World as World_type } from '../../type'

const getSedimentImage = createSpriteMemoize(drawSediment)

export const drawWorld = (
    ctx: CanvasRenderingContext2D,
    world: World_type,
    size: number
) => {
    // draw the mask
    // ctx.fillStyle = '#73421a'
    // ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    // ctx.fill()

    // prepare clipping mask
    ctx.save()

    ctx.fillStyle = '#1a2d73'

    world.wells.forEach(well => {
        const v = toPoint({ ...well.bottom, r: 1 })

        const w = 2
        const k = well.bottom.r

        ctx.beginPath()
        ctx.moveTo(
            size / 2 + v.y * w + v.x * (size / 2 * k + 7),
            size / 2 - v.x * w + v.y * (size / 2 * k + 7)
        )
        ctx.lineTo(
            size / 2 - v.y * w + v.x * (size / 2 * k + 7),
            size / 2 + v.x * w + v.y * (size / 2 * k + 7)
        )
        ctx.lineTo(
            size / 2 - v.y * w + v.x * size,
            size / 2 + v.x * w + v.y * size
        )
        ctx.lineTo(
            size / 2 + v.y * w + v.x * size,
            size / 2 - v.x * w + v.y * size
        )
        ctx.fill()

        well.samples.forEach(r => {
            ctx.beginPath()
            ctx.arc(
                size / 2 + v.x * size / 2 * r,
                size / 2 + v.y * size / 2 * r,
                10,
                0,
                Math.PI * 2
            )
            ctx.fill()
        })
    })

    // draw the planet core
    ctx.globalCompositeOperation = 'source-in'
    ctx.drawImage(getSedimentImage(world.oilPockets, size), 0, 0)

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#73421a'
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}
