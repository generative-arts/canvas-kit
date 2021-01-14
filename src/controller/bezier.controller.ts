import { Config } from '../types/Config.type'

export interface BezierConfig {
  color: string
  startX: number
  startY: number
  x1: number
  y1: number
  x2: number
  y2: number
  endX: number
  endY: number
}

export class BezierController {
  public static bezier(config: Config, bezierConfig: BezierConfig): Config {
    config.ctx.beginPath()
    config.ctx.fillStyle = bezierConfig.color
    config.ctx.moveTo(bezierConfig.startX, bezierConfig.startY)
    config.ctx.bezierCurveTo(
      bezierConfig.x1,
      bezierConfig.y1,
      bezierConfig.x2,
      bezierConfig.y2,
      bezierConfig.endX,
      bezierConfig.endY,
    )
    config.ctx.fill()
    config.ctx.closePath()
    return config
  }
}
