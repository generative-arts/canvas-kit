/* eslint-disable id-length */
import { Console } from 'console'
import { MathController } from '../controller/utils/math.controller'
import { MinimizeConfigController } from '../controller/utils/minimizeConfig.controller'
import { Element } from '../enums/Element.enum'
import { Config } from '../types/Config.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { TemplateConfig } from '../types/TemplateConfig.type'

export class DarkVsLightTemplate {
  private minimizeConfigController: MinimizeConfigController
  private config: Config

  private columns: number

  constructor(private templateConfig: TemplateConfig) {
    this.minimizeConfigController = new MinimizeConfigController(
      templateConfig.config,
    )
    this.config = {
      width: templateConfig.dimensions.width,
      height: templateConfig.dimensions.height,
      colors: templateConfig.colors,
    }
    this.columns = templateConfig.dimensions.width
  }

  public addIteration(
    iteration: number,
    type: 'usertask' | 'servicetask',
    proportion: number,
  ): any[][] {
    if (type === 'servicetask') {
      const step = 3

      for (
        let column = iteration;
        column < this.columns / proportion;
        column += step
      ) {
        const x = MathController.valueOnRange({
          inputMax: this.columns,
          outputMax: this.config.width,
          value: column,
        })

        const y = MathController.valueOnRange({
          inputMax: this.columns,
          outputMax: this.config.height,
          value: MathController.random(0, this.columns),
        })

        const elementConfig: ElementConfig = {
          element: Element.ELLIPSE,
          parameters: {
            coordinate: { x, y },
            radiusX: MathController.random(150, 300),
            radiusY: 100,
          },
          color: { stroke: MathController.random(0, 1).toString() },
          rotate: MathController.random(column, this.config.width / 4),
        }

        this.minimizeConfigController.add(elementConfig)
      }
    } else if (type === 'usertask') {
      const step = 3

      for (
        let column = this.columns - this.columns / proportion;
        column < this.columns;
        column += step
      ) {
        const x = MathController.valueOnRange({
          inputMax: this.columns,
          outputMax: this.config.width,
          value: column,
        })

        const y = MathController.valueOnRange({
          inputMax: this.columns,
          outputMax: this.config.height,
          value: MathController.random(0, this.columns),
        })

        const elementConfig: ElementConfig = {
          element: Element.ELLIPSE,
          parameters: {
            coordinate: { x, y },
            radiusX: MathController.random(150, 300),
            radiusY: 100,
          },
          color: { stroke: MathController.random(2, 4).toString() },

          rotate: MathController.random(column, this.config.width / 4),
        }

        this.minimizeConfigController.add(elementConfig)
      }
    }

    return this.minimizeConfigController.get()
  }

  public getElementConfigs(): ElementConfig[] {
    const elementConfigs = this.minimizeConfigController.getElementConfigs()
    const updatedElementConfigs = elementConfigs.map((elementConfig) => {
      const updatedElementConfig = elementConfig
      updatedElementConfig.color.stroke = `rgba(${
        this.templateConfig.colors[Number(elementConfig.color.stroke)]
      },1)`
      return updatedElementConfig
    })
    return updatedElementConfigs
  }
}
