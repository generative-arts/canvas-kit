/* eslint-disable id-length */
import { RectangleController } from './controller/rectangle.controller'
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { MathController } from './controller/utils/math.controller'
import { Config } from './types/Config.type'

async function run() {
  const rgbColors = [
    '247,37,133',
    '114,9,183',
    '58,12,163',
    '72,149,239',
    '76,201,240',
  ]
  const colors = rgbColors.map(
    (rgb) => `rgba(${rgb},0.${MathController.random(1, 9)})`,
  )
  let config: Config = {
    width: 1000,
    height: 1000,
    // colors: ['#C3E0E5', '#274472', '#5885AF', '#41729F'],
    // colors: ['#4C5270', '#F652A0', '#36EEE0', '#BCECE0'],
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const tasks = 10
  const gateways = 5

  const columns = tasks * 10

  // const columns = 20
  const rows = columns
  const distance = config.width / columns / 2

  const width = (config.width - (columns + 1) * distance) / columns
  const height = (config.height - (rows + 1) * distance) / rows

  let index = 0

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let x = column * width + (column + 1) * distance
      let y = row * height + (row + 1) * distance
      RectangleController.rectangle(config, {
        start: {
          x,
          y,
        },
        width,
        height,
        strokeColor:
          config.colors[MathController.random(0, 15) % config.colors.length],
        fillColor:
          config.colors[MathController.random(0, 15) % config.colors.length],
        rotate:
          gateways > 0
            ? MathController.random(0, gateways * 5) % 90
            : undefined,
      })
      index++
    }
  }

  console.log(`index: ${index}`)

  // RectangleController.rectangle(config, {
  //   start: {
  //     x: 500,
  //     y: 500,
  //   },
  //   width: 20,
  //   height: 10,
  //   strokeColor: 'black',
  // })

  // RectangleController.rectangle(config, {
  //   start: {
  //     x: 500,
  //     y: 500,
  //   },
  //   width: 20,
  //   height: 10,
  //   strokeColor: 'red',
  //   rotate: 90,
  // })

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'rectangle.png'),
  )
}

run()
