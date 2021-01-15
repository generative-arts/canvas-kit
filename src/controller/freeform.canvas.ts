import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'

export interface FreeFormConfig {
  strokeColor?: string
  fillColor?: string
  coordinates: Coordinate[]
}

export class FreeFormController {
  public static freeform(
    config: Config,
    freeformConfig: FreeFormConfig,
  ): Config {
    if (freeformConfig.coordinates.length < 3) {
      // We need at least 3 points for a free form
      return
    }
    config.ctx.beginPath()
    config.ctx.moveTo(
      freeformConfig.coordinates[0].x,
      freeformConfig.coordinates[0].y,
    )
    for (let i = 1; i < freeformConfig.coordinates.length; i++) {
      config.ctx.lineTo(
        freeformConfig.coordinates[i].x,
        freeformConfig.coordinates[i].y,
      )
    }
    config.ctx.closePath()
    if (freeformConfig.fillColor) {
      config.ctx.fillStyle = freeformConfig.fillColor
      config.ctx.fill()
    }
    if (freeformConfig.strokeColor) {
      config.ctx.strokeStyle = freeformConfig.strokeColor
      config.ctx.stroke()
    }
    return config
  }
}
