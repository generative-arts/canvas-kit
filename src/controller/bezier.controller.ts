/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface BezierConfig extends ElementConfig {
  parameters: {
    start: Coordinate
    bezier1: Coordinate
    bezier2: Coordinate
    end: Coordinate
  }
}

export class BezierController {
  public static bezier(config: Config, bezierConfig: BezierConfig): Config {
    ElementController.preProcessing(config, bezierConfig)
    config.ctx.moveTo(
      bezierConfig.parameters.start.x,
      bezierConfig.parameters.start.y,
    )
    config.ctx.bezierCurveTo(
      bezierConfig.parameters.bezier1.x,
      bezierConfig.parameters.bezier1.y,
      bezierConfig.parameters.bezier2.x,
      bezierConfig.parameters.bezier2.y,
      bezierConfig.parameters.end.x,
      bezierConfig.parameters.end.y,
    )
    ElementController.postProcessing(config, bezierConfig)
    return config
  }

  public static getBezierCoordinate(
    segment: number,
    bezierConfig: BezierConfig,
  ): Coordinate {
    return {
      x:
        Math.pow(1 - segment, 3) * bezierConfig.parameters.start.x +
        3 *
          segment *
          Math.pow(1 - segment, 2) *
          bezierConfig.parameters.bezier1.x +
        3 *
          segment *
          segment *
          (1 - segment) *
          bezierConfig.parameters.bezier2.x +
        segment * segment * segment * bezierConfig.parameters.end.x,
      y:
        Math.pow(1 - segment, 3) * bezierConfig.parameters.start.y +
        3 *
          segment *
          Math.pow(1 - segment, 2) *
          bezierConfig.parameters.bezier1.y +
        3 *
          segment *
          segment *
          (1 - segment) *
          bezierConfig.parameters.bezier2.y +
        segment * segment * segment * bezierConfig.parameters.end.y,
    }
  }
}
