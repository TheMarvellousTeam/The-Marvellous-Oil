import { drawSediment } from './drawSediment'
import { create as createSpriteMemoize } from './spriteMemoize'
import type { World as World_type } from '../../type'

const getSedimentImage = createSpriteMemoize(drawSediment)

export const drawWorld = (
    ctx: CanvasRenderingContext2D,
    world: World_type,
    size: number
) => {
    // draw the planet core
    ctx.drawImage(getSedimentImage(world.oilPockets, size), 0, 0)

    // draw the mask
    ctx.save()

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2)
    ctx.clip()

    ctx.fillStyle = '#73421a'
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}
