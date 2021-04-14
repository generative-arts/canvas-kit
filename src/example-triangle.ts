/* eslint-disable id-length */
import * as path from 'path'
import { CLOUDS, SUNSET } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import {
  FreeFormConfig,
  FreeFormController,
} from './controller/freeform.canvas'
import { OutputController } from './controller/output.controller'
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

  const slices = 50
  const iterations = 1000
  const baseSize = config.width / slices
  const coordinates: Coordinate[] = []

  for (let column = 0; column < slices; column++) {
    for (let row = 0; row < slices; row++) {
      coordinates.push({
        x: column * baseSize,
        y: row * baseSize,
      })
    }
  }

  let direction = 1

  for (let i = 0; i < iterations; i++) {
    const size = MathController.random(1, 2)
    const start = coordinates[MathController.random(0, coordinates.length - 1)]
    const middle: Coordinate = {
      x: start.x + baseSize * size * direction,
      y: start.y,
    }
    const end: Coordinate = {
      x: start.x,
      y: start.y + baseSize * size * direction,
    }
    const freeFormConfig: FreeFormConfig = {
      element: Element.FREEFORM,
      color: {
        fill: config.colors[i % config.colors.length],
      },
      parameters: {
        coordinates: [start, middle, end],
      },
    }
    FreeFormController.freeform(config, freeFormConfig)
    direction *= -1
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'triangle.png'),
  )
}

run()
