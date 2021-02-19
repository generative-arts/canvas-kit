/* eslint-disable id-length */
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { RectangleController } from './controller/rectangle.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'

async function run() {
  let config: Config = {
    width: 1000,
    height: 1000,
    // colors: ['#C3E0E5', '#274472', '#5885AF', '#41729F'],
    colors: ['#4C5270', '#F652A0', '#36EEE0', '#BCECE0'],
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const columnCount = 1000
  const rowCount = 1000

  const rectWidth = config.width / columnCount
  const rectHeight = config.height / rowCount

  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      RectangleController.rectangle(config, {
        element: Element.RECTANGLE,
        color: {
          fill:
            config.colors[MathController.random(0, config.colors.length - 1)],
        },
        parameters: {
          start: { x: column * rectWidth, y: row * rectHeight },
          width: column * rectWidth + rectWidth,
          height: row * rectHeight + rectHeight,
        },
      })
    }
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'canvaskit.png'),
  )
}

run()
