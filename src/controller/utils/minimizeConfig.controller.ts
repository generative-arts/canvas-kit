/* eslint-disable id-length */
import { Element } from '../../enums/Element.enum'
import { ElementConfig } from '../../types/ElementConfig.type'

export class MinimizeConfigController {
  private minimizedConfig: any[][] = []

  constructor(inputConfig?: any[][]) {
    if (inputConfig) {
      this.minimizedConfig = inputConfig
    }
  }

  public add(elementConfig: ElementConfig) {
    switch (elementConfig.element) {
      case Element.RECTANGLE:
        this.minimizedConfig.push([
          elementConfig.element,
          elementConfig.parameters.start.x,
          elementConfig.parameters.start.y,
          elementConfig.rotate,
        ])
        break
    }
  }

  public get(): any[][] {
    return this.minimizedConfig
  }

  public getElementConfigs(): ElementConfig[] {
    const elementConfigs: ElementConfig[] = this.minimizedConfig.map(
      (minConfig) => {
        switch (minConfig[0] as Element) {
          case Element.RECTANGLE:
            return {
              color: {},
              element: minConfig[0],
              rotate: Number(minConfig[3]),
              parameters: {
                start: {
                  x: minConfig[1],
                  y: minConfig[2],
                },
              },
            }
          default:
            throw new Error(`Element ${minConfig[0]} not supported`)
        }
      },
    )
    return elementConfigs
  }
}
