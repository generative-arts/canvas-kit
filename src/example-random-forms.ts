/* eslint-disable id-length */
import * as path from 'path'
import { CLOUDS } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { CircleController } from './controller/circle.controller'
import {
  FreeFormConfig,
  FreeFormController,
} from './controller/freeform.canvas'
import { OutputController } from './controller/output.controller'
import { RectangleController } from './controller/rectangle.controller'
import { ColorController } from './controller/utils/color.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'
import { Coordinate } from './types/Coordinate.type'

async function run() {
  const colors = ColorController.randomAlpha(
    ColorController.allHexToRgb(CLOUDS),
  )
  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const grid = 40

  const width = config.width / grid
  const height = config.height / grid

  let colorIndex = 0

  for (let row = 0; row < grid; row++) {
    colorIndex = MathController.random(0, 10)
    for (let column = 0; column < grid; column++) {
      const elementIndex = MathController.random(0, 2)
      switch (elementIndex) {
        case 0:
          randomLine(row, column, width, height, config, colorIndex)
          break
        case 1:
          randomCircle(row, column, width, height, config, colorIndex)
          break
        case 2:
          randomRectangle(row, column, width, height, config, colorIndex)
          break
      }
      colorIndex++
    }
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'random-forms.png'),
  )
}

function randomRectangle(
  row: number,
  column: number,
  width: number,
  height: number,
  config: Config,
  colorIndex: number,
) {
  const percentage = MathController.random(30, 90)
  const rectWidth = (percentage / 100) * width
  const rectHeight = (percentage / 100) * height
  const x = (width - rectWidth) / 2
  const y = (height - rectHeight) / 2
  RectangleController.rectangle(config, {
    color: {
      stroke: config.colors[colorIndex % config.colors.length],
    },
    element: Element.RECTANGLE,
    parameters: {
      start: {
        x: column * width + x,
        y: row * height + y,
      },
      width: rectWidth,
      height: rectHeight,
    },
    rotate: MathController.random(0, 180),
  })
}

function randomCircle(
  row: number,
  column: number,
  width: number,
  height: number,
  config: Config,
  colorIndex: number,
) {
  const maxRadius = Math.min(width, height) / 2
  CircleController.circle(config, {
    parameters: {
      center: {
        x: column * width + width / 2,
        y: row * height + height / 2,
      },
      r: MathController.random(maxRadius / 10, maxRadius - maxRadius / 10),
    },
    color: {
      fill: config.colors[colorIndex % config.colors.length],
    },
    element: Element.CIRCLE,
  })
}

function randomLine(
  row: number,
  column: number,
  width: number,
  height: number,
  config: Config,
  colorIndex: number,
) {
  const start: Coordinate = {
    x: column * width + MathController.random(0, width),
    y: row * height,
  }
  const end: Coordinate = {
    x: column * width + MathController.random(0, width),
    y: row * height + height,
  }
  const freeFormConfig: FreeFormConfig = {
    color: {
      stroke: config.colors[colorIndex % config.colors.length],
    },
    parameters: {
      coordinates: [start, end],
    },
    element: Element.FREEFORM,
  }
  FreeFormController.freeform(config, freeFormConfig)
}

run()
