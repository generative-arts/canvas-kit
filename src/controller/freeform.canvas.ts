import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface FreeFormConfig extends ElementConfig {
  parameters: { coordinates: Coordinate[] }
}

export class FreeFormController {
  public static freeform(
    config: Config,
    freeformConfig: FreeFormConfig,
  ): Config {
    if (freeformConfig.parameters.coordinates.length < 2) {
      // We need at least 2 points for a free form
      return
    }
    ElementController.preProcessing(config, freeformConfig)
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
    ElementController.postProcessing(config, freeformConfig)
    return config
  }
}
