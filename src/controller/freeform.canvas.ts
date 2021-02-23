import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'

export interface FreeFormConfig extends ElementConfig {
  parameters: { coordinates: Coordinate[] }
}

export class FreeFormController {
  public static freeform(
    config: Config,
    freeformConfig: FreeFormConfig,
  ): Config {
    if (freeformConfig.parameters.coordinates.length < 3) {
      // We need at least 3 points for a free form
      return
    }
    config.ctx.beginPath()
    config.ctx.moveTo(
      freeformConfig.parameters.coordinates[0].x,
      freeformConfig.parameters.coordinates[0].y,
    )
    for (let i = 1; i < freeformConfig.parameters.coordinates.length; i++) {
      config.ctx.lineTo(
        freeformConfig.parameters.coordinates[i].x,
        freeformConfig.parameters.coordinates[i].y,
      )
    }
    if (freeformConfig.color.fill) {
      config.ctx.fillStyle = freeformConfig.color.fill
      config.ctx.fill()
    }
    if (freeformConfig.color.stroke) {
      config.ctx.strokeStyle = freeformConfig.color.stroke
      config.ctx.stroke()
    }
    config.ctx.closePath()
    return config
  }
}
