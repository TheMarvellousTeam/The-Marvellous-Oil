import { getSediment } from '../../../service/game/getSediment'
import type { OilPocket } from '../../../type'

export const drawSediment = (
    ctx: CanvasRenderingContext2D,
    oilPockets: OilPocket[],
    size: number
) => {
    const getS = getSediment.bind(null, oilPockets, size)

    ctx.save()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()

    // prettier-ignore
    for (let x = size; x--; )
    for (let y = size; y--; ) {
        const wx = x / size * 2 - 1
        const wy = y / size * 2 - 1

        if (wx * wx + wy * wy < 1.01) {
            const s = getS({ x: wx, y: wy, z: 0 })

            ctx.fillStyle = `hsl(${s*180},80%,50%)`

            ctx.beginPath()
            ctx.rect(x, y, 1, 1)
            ctx.fill()
        }
    }

    ctx.restore()
}
