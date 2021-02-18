/* eslint-disable id-length */
import * as path from 'path'
import { Coordinate } from 'types/Coordinate.type'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { RectangleController } from './controller/rectangle.controller'
import { JsonExportController } from './controller/utils/jsonexport.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'
import { ElementConfig } from './types/ElementConfig.type'

async function run() {
  const rgbColors = [
    '247,37,133',
    '114,9,183',
    '58,12,163',
    '72,149,239',
    '76,201,240',
  ]
  // const colors = rgbColors.map(
  //   (rgb) => `rgba(${rgb},0.${MathController.random(1, 9)})`,
  // )
  let config: Config = {
    width: 1000,
    height: 1000,
    // colors: ['#C3E0E5', '#274472', '#5885AF', '#41729F'],
    // colors: ['#4C5270', '#F652A0', '#36EEE0', '#BCECE0'],
    colors: rgbColors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const elementConfigs: ElementConfig[] = []

  const tasks = 9
  const gateways = 5

  const columns = tasks * 10

  // const columns = 20
  const rows = columns
  const distance = config.width / columns / 2

  const width = (config.width - (columns + 1) * distance) / columns
  const height = (config.height - (rows + 1) * distance) / rows

  const magnetPoints: Coordinate[] = []

  for (let index = 0; index < 9; index++) {
    magnetPoints.push({
      x: MathController.random(
        config.width / 10,
        config.width - config.width / 10,
      ),
      y: MathController.random(
        config.height / 10,
        config.height - config.height / 10,
      ),
    })
  }

  let index = 0

  for (let task = 0; task < tasks; task++) {
    for (let row = task; row < rows; row += tasks) {
      for (let column = 0; column < columns; column++) {
        // const x = Math.round(column * width + (column + 1) * distance * 10) / 10
        // const y = Math.round(row * height + (row + 1) * distance * 10) / 10

        const x = column * width + (column + 1) * distance
        const y = row * height + (row + 1) * distance

        // const distances: number[] = magnetPoints.map((point) =>
        //   getDistance({ x, y }, point),
        // )
        // const min = Math.min(...distances)
        // const strokeColor =
        //   config.colors[MathController.random(0, 15) % config.colors.length]
        // const fillColor =
        //   config.colors[MathController.random(0, 15) % config.colors.length]
        // const stroke =
        //   min < 1
        //     ? `rgba(${strokeColor},${1 - min})`
        //     : `rgba(${strokeColor},${1 / min})`
        // const fill =
        //   min < 1
        //     ? `rgba(${fillColor},${1 - min})`
        //     : `rgba(${fillColor},0.${min})`

        const elementConfig: ElementConfig = {
          element: Element.RECTANGLE,
          parameters: {
            start: {
              x,
              y,
            },
            width,
            height,
          },
          color: {},
          rotate:
            gateways > 0
              ? MathController.random(0, gateways * 5) % 90
              : undefined,
        }

        elementConfigs.push(elementConfig)

        index++
      }
    }
  }
  await JsonExportController.save(
    path.resolve(__dirname, '..', 'output', 'rectangle.json'),
    JSON.stringify(elementConfigs),
  )

  for (const elementConfig of elementConfigs) {
    switch (elementConfig.element) {
      case Element.RECTANGLE:
        RectangleController.rectangle(
          config,
          addColorToRectangleConfig(config, magnetPoints, elementConfig),
        )
        break
    }
  }

  console.log(`index: ${index}`)

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'rectangle.png'),
  )
}

function getDistance(first: Coordinate, second: Coordinate): number {
  return Math.sqrt(
    Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2),
  )
}

function addColorToRectangleConfig(
  config: Config,
  magnetPoints: Coordinate[],
  elementConfig: ElementConfig,
): ElementConfig {
  const distances: number[] = magnetPoints.map((point) =>
    getDistance(
      {
        x: elementConfig.parameters.start.x,
        y: elementConfig.parameters.start.y,
      },
      point,
    ),
  )
  const min = Math.min(...distances)
  const strokeColor =
    config.colors[MathController.random(0, 15) % config.colors.length]
  const fillColor =
    config.colors[MathController.random(0, 15) % config.colors.length]
  const stroke =
    min < 1
      ? `rgba(${strokeColor},${1 - min})`
      : `rgba(${strokeColor},${1 / min})`
  const fill =
    min < 1 ? `rgba(${fillColor},${1 - min})` : `rgba(${fillColor},0.${min})`
  const elementConfigWithColors: ElementConfig = elementConfig
  elementConfigWithColors.color.stroke = stroke
  elementConfigWithColors.color.fill = fill
  return elementConfigWithColors
}

run()
