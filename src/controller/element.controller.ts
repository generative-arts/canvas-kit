import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'

export class ElementController {
  public static preProcessing(config: Config, elementConfig: ElementConfig) {
    ElementController.beginPathIfConfigured(config, elementConfig)
  }

  public static postProcessing(config: Config, elementConfig: ElementConfig) {
    ElementController.closePathIfConfigured(config, elementConfig)
    ElementController.fillIfConfigured(config, elementConfig)
    ElementController.strokeIfConfigured(config, elementConfig)
    ElementController.resetRotationIfConfigured(config, elementConfig)
  }

  public static beginPathIfConfigured(
    config: Config,
    elementConfig: ElementConfig,
  ) {
    config.ctx.beginPath()
  }

  public static closePathIfConfigured(
    config: Config,
    elementConfig: ElementConfig,
  ) {
    if (
      elementConfig.closePath === undefined ||
      elementConfig.closePath === true
    ) {
      config.ctx.closePath()
    }
  }

  public static fillIfConfigured(config: Config, elementConfig: ElementConfig) {
    if (elementConfig.color.fill) {
      config.ctx.fillStyle = elementConfig.color.fill
      config.ctx.fill()
    }
  }

  public static strokeIfConfigured(
    config: Config,
    elementConfig: ElementConfig,
  ) {
    if (elementConfig.color.stroke) {
      config.ctx.lineWidth = elementConfig.lineWidth
        ? elementConfig.lineWidth
        : 1
      config.ctx.strokeStyle = elementConfig.color.stroke
      config.ctx.stroke()
    }
  }

  public static rotateIfConfigured(
    config: Config,
    elementConfig: ElementConfig,
    center: Coordinate,
  ) {
    if (elementConfig.rotate) {
      config.ctx.translate(center.x, center.y)
      config.ctx.rotate((elementConfig.rotate * Math.PI) / 180)
      config.ctx.translate(-1 * center.x, -1 * center.y)
    }
  }

  public static resetRotationIfConfigured(
    config: Config,
    elementConfig: ElementConfig,
  ) {
    if (elementConfig.rotate) {
      config.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
  }
}
