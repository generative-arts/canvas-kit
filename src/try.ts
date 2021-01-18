/* eslint-disable id-length */
import { RectangleController } from './controller/rectangle.controller'
import { MathController } from './controller/utils/math.controller'
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { Config } from './types/Config.type'
import { BezierController } from 'controller/bezier.controller'
import { FreeFormController } from 'controller/freeform.canvas'

async function run() {
  let config: Config = {
    width: 1000,
    height: 1000,
    // colors: ['#C3E0E5', '#274472', '#5885AF', '#41729F'],
    colors: ['#4C5270', '#F652A0', '#36EEE0', '#BCECE0'],
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'black')

  const columnCount = 1000
  const rowCount = 1000

  for (let i = 0; i < 1000; i += 50) {
    RectangleController.rectangle(config, {
      start: { x: i, y: i },
      end: { x: 100, y: 100 },
      fillColor: 'black',
      strokeColor: 'white',
    })
  }

  BezierController.bezier(config, {
    start: { x: 0, y: 0 },
    bezier1: { x: 100, y: 0 },
    bezier2: { x: 200, y: 100 },
    end: { x: 400, y: 200 },
    color: 'white',
  })

  /*
  const rectWidth = config.width / columnCount
  const rectHeight = config.height / rowCount

 for (let row = 2; row < rowCount - 500; row++) {
    for (let column = 2; column < columnCount- 500; column++) {
      RectangleController.rectangle(config, {
        fillColor:
          config.colors[MathController.random(0, config.colors.length - 1)],
        start: { x: column * rectWidth, y: row * rectHeight },
        end: {
          x: column * rectWidth + rectWidth,
          y: row * rectHeight + rectHeight,
        },
      })
    }
  } */

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'canvaskit.png'),
  )
}

run()
