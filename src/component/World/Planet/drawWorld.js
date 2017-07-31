import { drawSediment } from './drawSediment'
import { create as createSpriteMemoize } from './spriteMemoize'
import {} from '../../../util/math/point'
import { imageLoader } from '../../../util/imageLoader'
import { toPoint } from '../../../util/math/pointPolar'
import * as param from '../../../config/game'

import type { World as World_type } from '../../type'

const getSedimentImage = createSpriteMemoize(drawSediment)

const URL_TERRE = require('../../../asset/image/terre.png')
const URL_SURFACE = require('../../../asset/image/surface.png')
;[URL_TERRE, URL_SURFACE].map(imageLoader.load)

const DEBUG =
    typeof location !== 'undefined' && location.search.includes('cheat')

export const drawWorld = (
    ctx: CanvasRenderingContext2D,
    world: World_type,
    size: number
) => {
    const lsize = size
    size = size * 0.85

    // prepare clipping mask
    ctx.save()

    ctx.translate(lsize / 2, lsize / 2)

    ctx.fillStyle = '#1a2d73'

    world.wells.forEach(well => {
        const v = toPoint({ ...well.bottom, r: 1 })

        const w = 2
        const k = well.bottom.r

        ctx.beginPath()
        ctx.moveTo(
            v.y * w + v.x * (size / 2 * k + 7),
            -v.x * w + v.y * (size / 2 * k + 7)
        )
        ctx.lineTo(
            -v.y * w + v.x * (size / 2 * k + 7),
            +v.x * w + v.y * (size / 2 * k + 7)
        )
        ctx.lineTo(-v.y * w + v.x * size, +v.x * w + v.y * size)
        ctx.lineTo(+v.y * w + v.x * size, -v.x * w + v.y * size)
        ctx.fill()

        well.samples.forEach(r => {
            ctx.beginPath()
            ctx.arc(
                v.x * size / 2 * r,
                v.y * size / 2 * r,
                size / 2 * param.drill_hole_radius,
                0,
                Math.PI * 2
            )
            ctx.fill()
        })
    })

    // draw the planet core
    ctx.globalCompositeOperation = DEBUG ? 'source-over' : 'source-in'
    ctx.drawImage(
        getSedimentImage(world.oilPockets, size),
        -size / 2,
        -size / 2,
        size,
        size
    )

    const ksize = size * 0.92
    ctx.globalCompositeOperation = 'destination-over'
    if (imageLoader.syncGet(URL_TERRE))
        ctx.drawImage(
            imageLoader.syncGet(URL_TERRE),
            -ksize / 2,
            -ksize / 2,
            ksize,
            ksize
        )

    const usize = lsize * 0.9
    ctx.globalCompositeOperation = 'destination-over'
    if (imageLoader.syncGet(URL_SURFACE))
        ctx.drawImage(
            imageLoader.syncGet(URL_SURFACE),
            -usize / 2 + usize * 0.02,
            ((1 - 796 / 845) / 2 - 1 / 2) * usize - usize * 0.005,
            usize,
            usize / 845 * 796
        )

    // ctx.fillStyle = '#73421a'
    // ctx.beginPath()
    // ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    // ctx.fill()

    ctx.restore()
}
