import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'

export interface BezierConfig {
  color: string
  start: Coordinate
  bezier1: Coordinate
  bezier2: Coordinate
  end: Coordinate
}

export class BezierController {
  public static bezier(config: Config, bezierConfig: BezierConfig): Config {
    config.ctx.beginPath()
    config.ctx.fillStyle = bezierConfig.color
    config.ctx.moveTo(bezierConfig.start.x, bezierConfig.start.y)
    config.ctx.bezierCurveTo(
      bezierConfig.bezier1.x,
      bezierConfig.bezier1.y,
      bezierConfig.bezier2.x,
      bezierConfig.bezier2.y,
      bezierConfig.end.x,
      bezierConfig.end.y,
    )
    config.ctx.fill()
    config.ctx.closePath()
    return config
  }
}
