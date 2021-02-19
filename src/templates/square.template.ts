/* eslint-disable id-length */
import { DistanceController } from '../controller/utils/distance.controller'
import { MathController } from '../controller/utils/math.controller'
import { MinimizeConfigController } from '../controller/utils/minimizeConfig.controller'
import { Element } from '../enums/Element.enum'
import { Config } from '../types/Config.type'
import { Coordinate } from '../types/Coordinate.type'
import { ElementConfig } from '../types/ElementConfig.type'
import { TemplateConfig } from '../types/TemplateConfig.type'

export class SquareTemplate {
  private minimizeConfigController: MinimizeConfigController
  private config: Config
  private magnetPoints: Coordinate[] = []

  private columns: number
  private rows: number
  private distance: number
  private width: number
  private height: number

  constructor(private templateConfig: TemplateConfig) {
    this.minimizeConfigController = new MinimizeConfigController(
      templateConfig.config,
    )
    this.config = {
      width: templateConfig.dimensions.width,
      height: templateConfig.dimensions.height,
      colors: templateConfig.colors,
    }
    this.columns = templateConfig.elements.tasks * 10

    this.rows = this.columns
    this.distance = this.config.width / this.columns / 2

    this.width =
      (this.config.width - (this.columns + 1) * this.distance) / this.columns
    this.height =
      (this.config.height - (this.rows + 1) * this.distance) / this.rows
  }

  public addTaskIteration(taskIndex: number): any[][] {
    for (
      let row = taskIndex;
      row < this.rows;
      row += this.templateConfig.elements.tasks
    ) {
      for (let column = 0; column < this.columns; column++) {
        const xPrecise = column * this.width + (column + 1) * this.distance
        const yPrecise = row * this.height + (row + 1) * this.distance

        const x = MathController.round(xPrecise)
        const y = MathController.round(yPrecise)

        const elementConfig: ElementConfig = {
          element: Element.RECTANGLE,
          parameters: {
            start: {
              x,
              y,
            },
            width: this.width,
            height: this.height,
          },
          color: {},
          rotate:
            this.templateConfig.elements.exclusiveGateways > 0
              ? MathController.random(
                  0,
                  MathController.valueOnRange({
                    value: this.templateConfig.elements.exclusiveGateways,
                    inputMax: 10,
                    outputMax: 90,
                  }),
                )
              : undefined,
        }

        this.minimizeConfigController.add(elementConfig)
      }
    }
    return this.minimizeConfigController.get()
  }

  public getElementConfigs(): ElementConfig[] {
    const elementConfigsFromMin = this.minimizeConfigController.getElementConfigs()
    this.setupMagnetPoints()

    const elementConfigs = elementConfigsFromMin.map((elementConfig) => {
      const updatedElementConfig: ElementConfig = elementConfig
      updatedElementConfig.parameters.width = this.width
      updatedElementConfig.parameters.height = this.height
      const color = this.getColorsForElement(updatedElementConfig)
      updatedElementConfig.color = color
      return updatedElementConfig
    })

    return elementConfigs
  }

  private getColorsForElement(
    elementConfig: ElementConfig,
  ): { stroke: string; fill: string } {
    const distances: number[] =
      this.magnetPoints && this.magnetPoints.length > 0
        ? this.magnetPoints.map((point) =>
            DistanceController.distance(
              {
                x: elementConfig.parameters.start.x,
                y: elementConfig.parameters.start.y,
              },
              point,
            ),
          )
        : [0]
    const min = Math.min(...distances)
    const strokeColor = this.config.colors[
      MathController.random(0, 15) % this.config.colors.length
    ]
    const fillColor = this.config.colors[
      MathController.random(0, 15) % this.config.colors.length
    ]
    const stroke =
      min < 1
        ? `rgba(${strokeColor},${1 - min})`
        : `rgba(${strokeColor},${1 / min})`
    const fill =
      min < 1 ? `rgba(${fillColor},${1 - min})` : `rgba(${fillColor},0.${min})`
    return { stroke, fill }
  }

  private setupMagnetPoints() {
    for (
      let index = 0;
      index < this.templateConfig.elements.endEvents;
      index++
    ) {
      this.magnetPoints.push({
        x: MathController.random(
          this.config.width / 10,
          this.config.width - this.config.width / 10,
        ),
        y: MathController.random(
          this.config.height / 10,
          this.config.height - this.config.height / 10,
        ),
      })
    }
  }
}
