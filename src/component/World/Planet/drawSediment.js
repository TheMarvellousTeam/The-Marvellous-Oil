import { getSediment } from '../../../service/game/getSediment'
import type { OilPocket } from '../../../type'

const PATCHES = [0.3, 0.5, 0.6, 0.8, 0.9]

const generateSedimentPatch = (oilPockets, size) => {
    const s = Math.ceil(size)

    const getS = getSediment.bind(null, oilPockets)

    const layers = PATCHES.map(() => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = s
        return canvas
    })

    const imageData = layers.map(canvas =>
        canvas.getContext('2d').getImageData(0, 0, s, s)
    )

    const o = { x: 0, y: 0, z: 0 }

    // prettier-ignore
    for (let x = s; x--; )
    for (let y = s; y--; ) {
        o.x = (x + 0.5) / s * 2 - 1
        o.y = (y + 0.5) / s * 2 - 1

        if (o.x * o.x + o.y * o.y < 1.01) {
            const v = getS(o)

            let k = 0
            while (PATCHES[k + 1] && PATCHES[k] < v) k++

            const u = (y * s + x) * 4

            imageData[k].data[u + 0] = 255
            imageData[k].data[u + 1] = 255
            imageData[k].data[u + 2] = 255
            imageData[k].data[u + 3] = 255

            if ( k > 0 ){
                imageData[k-1].data[u + 0] = 255
                imageData[k-1].data[u + 1] = 255
                imageData[k-1].data[u + 2] = 255
                imageData[k-1].data[u + 3] = 255
            }
        }
    }

    layers.forEach((canvas, i) => {
        canvas.getContext('2d').putImageData(imageData[i], 0, 0)
    })

    return layers
}

export const drawSediment = (
    ctx: CanvasRenderingContext2D,
    oilPockets: OilPocket[],
    size: number
) => {
    const upscale = 2

    const buffer = document.createElement('canvas')
    buffer.width = buffer.height = size
    const bufferCtx = buffer.getContext('2d')

    ctx.save()

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()

    ctx.globalCompositeOperation = 'destination-over'

    generateSedimentPatch(oilPockets, size / upscale)
        .reverse()
        .slice(0, -1)
        .forEach((patch, i) => {
            bufferCtx.globalCompositeOperation = 'source-over'
            bufferCtx.filter = `blur(${4}px)`
            bufferCtx.drawImage(patch, 0, 0, size, size)

            bufferCtx.globalCompositeOperation = 'source-in'
            bufferCtx.filter = ''
            bufferCtx.beginPath()
            bufferCtx.rect(0, 0, size, size)
            bufferCtx.fillStyle = `hsl(${i * 34 + 45},68%,60%)`
            bufferCtx.fill()

            ctx.drawImage(buffer, 0, 0)
        })

    ctx.beginPath()
    ctx.rect(0, 0, size, size)
    ctx.fillStyle = `hsl(${PATCHES.length * 34 + 45},68%,60%)`
    ctx.fill()

    ctx.restore()
}
