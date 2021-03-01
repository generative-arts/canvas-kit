/* eslint-disable id-length */
import * as path from 'path'
import { CLOUDS } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { BezierController } from './controller/bezier.controller'
import { CanvasController } from './controller/canvas.controller'
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

  const iterations = 100
  const smallBezierIterations = 300

  for (let i = 0; i < iterations; i++) {
    const start: Coordinate = {
      x: 0,
      y: (config.height / iterations) * i,
    }

    const end: Coordinate = {
      x: config.width,
      y: config.height - (config.height / iterations) * i,
    }

    smallBezier(config, start, end, smallBezierIterations)

    const start2: Coordinate = {
      x: (config.width / iterations) * i,
      y: 0,
    }

    const end2: Coordinate = {
      x: config.width - (config.width / iterations) * i,
      y: config.height,
    }

    smallBezier(config, start2, end2, smallBezierIterations)
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'bezier.png'),
  )
}

function smallBezier(
  config: Config,
  start: Coordinate,
  end: Coordinate,
  iterations: number,
) {
  for (let i = 0; i < iterations; i++) {
    BezierController.bezier(config, {
      parameters: {
        start,
        end,
        bezier1: {
          x: config.width / 4,
          y: MathController.random(0, config.height),
        },
        bezier2: {
          x: 3 * (config.width / 4),
          y: MathController.random(0, config.height),
        },
      },
      color: {
        stroke: config.colors[i % config.colors.length],
      },
      element: Element.BEZIER,
    })
  }
}

run()
