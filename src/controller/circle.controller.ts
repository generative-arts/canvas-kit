/* eslint-disable id-length */
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { ElementController } from './element.controller'

export interface CircleConfig extends ElementConfig {
  parameters: {
    center: Coordinate
    r: number
    angle?: {
      startDegree?: number
      endDegree?: number
    }
    counterClockwise?: boolean
  }
}

export class CircleController {
  public static circle(config: Config, circleConfig: CircleConfig): Config {
    ElementController.preProcessing(config, circleConfig)

    config.ctx.fillStyle = circleConfig.color
    config.ctx.arc(
      circleConfig.parameters.center.x,
      circleConfig.parameters.center.y,
      circleConfig.parameters.r,
      circleConfig.parameters.angle && circleConfig.parameters.angle.startDegree
        ? CircleController.toRadians(circleConfig.parameters.angle.startDegree)
        : 0,
      circleConfig.parameters.angle && circleConfig.parameters.angle.endDegree
        ? CircleController.toRadians(circleConfig.parameters.angle.endDegree)
        : 2 * Math.PI,
      circleConfig.parameters.counterClockwise !== undefined
        ? circleConfig.parameters.counterClockwise
        : false,
    )

    ElementController.postProcessing(config, circleConfig)
    return config
  }

  private static toRadians(degree: number): number {
    return (degree * Math.PI) / 180
  }
}
