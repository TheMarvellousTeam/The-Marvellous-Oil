import { getSediment } from '../../../service/game/getSediment'
import { imageLoader } from '../../../util/imageLoader'
import { toPoint } from '../../../util/math/pointPolar'
import * as param from '../../../config/world'

import type { OilPocket } from '../../../type'

const URL_TEXTURE_GREY = require('../../../asset/image/texturegrise.png')
const URL_TEXTURE_WHITE = require('../../../asset/image/textureblanche.png')
const URL_TEXTURE_YELLOW = require('../../../asset/image/texturejaune.png')
const URL_TEXTURE_GREEN = require('../../../asset/image/textureverte.png')
;[
    URL_TEXTURE_GREY,
    URL_TEXTURE_WHITE,
    URL_TEXTURE_YELLOW,
    URL_TEXTURE_GREEN,
].map(imageLoader.load)

const PATCHES = [...param.sediment_quantum_break, 1]
const PATCHES_TEXTURE_URL = [
    URL_TEXTURE_GREY,
    URL_TEXTURE_WHITE,
    URL_TEXTURE_YELLOW,
    URL_TEXTURE_GREEN,
    URL_TEXTURE_GREY,
    URL_TEXTURE_WHITE,
    URL_TEXTURE_YELLOW,
    URL_TEXTURE_GREEN,
].slice(0, PATCHES.length)

const BLUR = param.sediment_blur
const UPSCALE = 2

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
    const buffer = document.createElement('canvas')
    buffer.width = buffer.height = size
    const bufferCtx = buffer.getContext('2d')

    ctx.save()

    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.clip()

    ctx.globalCompositeOperation = 'destination-over'

    generateSedimentPatch(oilPockets, size / UPSCALE)
        .reverse()
        .slice(0, -1)
        .forEach((patch, i) => {
            bufferCtx.globalCompositeOperation = 'source-over'
            bufferCtx.filter = `blur(${BLUR}px)`
            bufferCtx.drawImage(patch, 0, 0, size, size)

            const texture = imageLoader.syncGet(PATCHES_TEXTURE_URL[i])
            if (texture) {
                bufferCtx.globalCompositeOperation = 'source-in'
                bufferCtx.filter = 'blur(0)'
                bufferCtx.drawImage(texture, 0, 0, size, size)

                ctx.drawImage(buffer, 0, 0)
            }
        })

    // draw bottom layer
    const texture = imageLoader.syncGet(
        PATCHES_TEXTURE_URL[PATCHES_TEXTURE_URL.length - 1]
    )
    if (texture) ctx.drawImage(texture, 0, 0, size, size)

    // draw oilPockets
    ctx.globalCompositeOperation = 'source-over'
    oilPockets.forEach(oilPocket => {
        const o = toPoint(oilPocket.position)
        ctx.fillStyle = '#333'
        ctx.filter = `blur(${BLUR / 3}px)`
        ctx.beginPath()
        ctx.arc(
            o.x * size / 2 + size / 2,
            o.y * size / 2 + size / 2,
            oilPocket.radius * size / 2,
            0,
            Math.PI * 2
        )
        ctx.fill()
    })

    ctx.restore()
}
