import { getSediment } from '../../../service/game/getSediment'
import type { OilPocket } from '../../../type'

export const draw = (
    ctx: CanvasRenderingContext2D,
    oilPockets: OilPocket[],
    size: number
) => {
    const getS = getSediment.bind(null, oilPockets, size)

    ctx.save()

    // prettier-ignore
    for (let x = size; x--; )
    for (let y = size; y--; ) {
        const wx = x / size * 2 - 1
        const wy = y / size * 2 - 1

        if (wx * wx + wy * wy < 1) {
            const s = getS({ x: wx, y: wy, z: 0 })

            ctx.fillStyle = `hsl(${s},80%,50%)`

            ctx.rect(x, y, 1, 1)
        }
    }

    ctx.restore()
}
