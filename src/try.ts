/* eslint-disable id-length */
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { TriangleController } from './controller/triangle.controller'
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

  let colour
  let colour2

  for (let j = 0; j <= 1000; j += 100) {
    for (let i = 0; i <= 1000; i += 200) {
      if (j % 200 === 0) {
        colour = 'black'
      } else {
        colour = 'pink'
      }

      TriangleController.triangle(config, {
        color: {
          fill: colour,
          stroke: 'black',
        },
        parameters: {
          start: { x: i, y: j },
          length: 200,
        },
        element: Element.TRIANGLE,
      })
    }
  }

  /*
  let colour
  let colour2

  for (let i = 0; i <= 1000; i += 50) {
    for (let j = 0; j <= 1000; j += 100) {
      if (i % 100 === 0) {
        colour = 'yellow'
        colour2 = 'pink'
      } else {
        colour = 'pink'
        colour2 = 'green'
      }
      RectangleController.rectangle(config, {
        start: { x: i + j, y: i },
        end: { x: 100, y: 100 },
        fillColor: colour2,
        strokeColor: 'black',
      })
      RectangleController.rectangle(config, {
        start: { x: i, y: i + j },
        end: { x: 100, y: 100 },
        fillColor: 'black',
        strokeColor: colour2,
      })
    }
  } */
  /* BezierController.bezier(config, {
      start: { x: 0, y: 1000 },
      bezier1: { x: 0, y: 700 },
      bezier2: { x: 0, y: 500 },
      end: { x: 500, y: 500 },
      color: 'yellow', 
    }) */

  /*
  const columnCount = 1000
  const rowCount = 1000

  const rectWidth = config.width / columnCount
  const rectHeight = config.height / rowCount

 for (let row = 2; row < rowCount - 500; row++) {
    for (let column = 2; column < columnCount- 500; column++) {
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
  } */

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'canvaskit.png'),
  )
}

run()
