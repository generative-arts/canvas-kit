/* eslint-disable id-length */
import { DistanceController } from '../controller/utils/distance.controller'
import { MathController } from '../controller/utils/math.controller'
import { MinimizeConfigController } from '../controller/utils/minimizeConfig.controller'
import { Element } from '../enums/Element.enum'
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { TemplateConfig } from '../types/TemplateConfig.type'

export class DarkVsLightTemplate {
  private minimizeConfigController: MinimizeConfigController
  private config: Config

  private columns: number
  private rows: number
  private width: number
  private height: number
  private taskTotal: number
  private columnsLight: number
  private columnsDark: number

  private radiusX: number
  private radiusY: number

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
    this.rows = templateConfig.dimensions.height
    this.taskTotal =
      templateConfig.elements.userTask + templateConfig.elements.serviceTask
    this.columnsLight =
      (templateConfig.elements.userTask / this.taskTotal) *
      templateConfig.dimensions.width
    this.columnsDark =
      (templateConfig.elements.serviceTask / this.taskTotal) *
      templateConfig.dimensions.width
  }

  public addUserTaskIteration(taskIndex: number): any[][] {
    for (let column = 0; column < this.columnsLight; column++) {
      const x = column
      const y = MathController.random(0, this.columns)

      const elementConfig: ElementConfig = {
        element: Element.ELLIPSE,
        parameters: {
          coordinate: { x, y },
          radiusX: MathController.random(150, 300),
          radiusY: 100,
        },
        color: { stroke: '0' },
        rotate: MathController.random(column, this.config.width / 4),
      }

      this.minimizeConfigController.add(elementConfig)
    }
    return this.minimizeConfigController.get()
  }

  public addServiceTaskIteration(taskIndex: number): any[][] {
    for (let column = this.columnsLight; column < this.columns; column++) {
      const x = column
      const y = MathController.random(0, this.columns)

      const elementConfig: ElementConfig = {
        element: Element.ELLIPSE,
        parameters: {
          coordinate: { x, y },
          radiusX: MathController.random(150, 300),
          radiusY: 100,
        },
        color: { stroke: '1' },
        rotate: MathController.random(column, this.config.width / 4),
      }

      this.minimizeConfigController.add(elementConfig)
    }
    return this.minimizeConfigController.get()
  }

  // Farbe: 1 oder 0 mitgeben in die minimizeConfig für hell oder dunkel
  public getElementConfigs(): ElementConfig[] {
    const elementConfigsFromMin = this.minimizeConfigController.getElementConfigs()

    const elementConfigs = elementConfigsFromMin.map((elementConfig) => {
      const updatedElementConfig: ElementConfig = elementConfig
      updatedElementConfig.parameters.radiusX = this.radiusX
      updatedElementConfig.parameters.radiusY = this.radiusY
      const color = this.getColorsForElement(updatedElementConfig)
      updatedElementConfig.color = color
      return updatedElementConfig
    })
    return elementConfigs
  }

  private getColorsForElement(
    elementConfig: ElementConfig,
  ): { stroke: string } {
    if (elementConfig[5] === 0) {
      const strokeColor = this.config.colors[
        MathController.random(0, this.config.colors.length / 2 - 1)
      ]
      const stroke = `rgba(${strokeColor})`
      return { stroke }
    } else {
      const strokeColor = this.config.colors[
        MathController.random(
          this.config.colors.length / 2,
          this.config.colors.length,
        )
      ]
      const stroke = `rgba(${strokeColor})`

      return { stroke }
    }
  }
}
