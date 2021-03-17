import { TemplateConfig } from '../types/TemplateConfig.type'
import { Element } from '../enums/Element.enum'
import { Config } from '../types/Config.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { RectangleController } from './rectangle.controller'
import { CanvasController } from './canvas.controller'
import { BackgroundController } from './background.controller'
import { EllipseController } from './ellipse.controller'

export class TemplateController {
  public static generateArt(
    templateConfig: TemplateConfig,
    elementConfigs: ElementConfig[],
  ): Config {
    const config: Config = {
      width: templateConfig.dimensions.width,
      height: templateConfig.dimensions.height,
      colors: templateConfig.colors,
    }

    CanvasController.init(config)
    BackgroundController.fill(config, 'white')

    for (const elementConfig of elementConfigs) {
      switch (elementConfig.element) {
        case Element.RECTANGLE:
          RectangleController.rectangle(config, elementConfig)
          break
        case Element.ELLIPSE:
          EllipseController.ellipse(config, elementConfig)
          break
      }
    }
    return config
  }
}
