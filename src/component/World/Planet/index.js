import React from 'react'
import { drawWorld } from './drawWorld'
import type { World as World_type } from '../../type'
import type { PointPolar } from '../../util/math/pointPolar'

import style from './style.css'

export type Props = {
    world: World_type,
    size: number,
}

export class Planet extends React.Component {
    props: Props

    _canvas: HTMLCanvasElement | null = null

    _timeout: number | null = null

    draw = () => {
        if ('undefined' !== typeof cancelAnimationFrame)
            cancelAnimationFrame(this._timeout)

        if (!this._canvas) return

        this._canvas.width = this.props.size
        this._canvas.height = this.props.size
        const ctx = this._canvas.getContext('2d')

        drawWorld(ctx, this.props.world, this.props.size)
    }

    componentWillUnmount() {
        if ('undefined' !== typeof cancelAnimationFrame)
            cancelAnimationFrame(this._timeout)
    }

    render() {
        if (!this._canvas && 'undefined' !== typeof requestAnimationFrame)
            this._timeout = requestAnimationFrame(this.draw)
        else this.draw()

        return <canvas ref={canvas => (this._canvas = canvas)} />
    }
}
