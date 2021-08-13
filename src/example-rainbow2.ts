/* eslint-disable id-length */
import * as path from 'path'
import { SUNSET } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { BezierController } from './controller/bezier.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { ColorController } from './controller/utils/color.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'

async function run() {
  const colors = ColorController.randomAlpha(
    ColorController.allHexToRgb(SUNSET),
  )
  colors.unshift(colors[0])
  colors.unshift(colors[0])
  colors.push(colors[colors.length - 1])
  colors.push(colors[colors.length - 1])
  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const slices = 1000

  const width = 2 * config.width

  for (let i = 0; i < slices; i++) {
    const xCenter = (i * width) / slices - config.width / 2
    const bezierBalanceX = config.width / 10
    const bezierBalanceY = config.height / 8

    BezierController.bezier(config, {
      parameters: {
        start: {
          x: xCenter,
          y: config.height / 2,
        },
        end: {
          x: xCenter + 100 + MathController.random(0, 100),
          y: MathController.random(0, config.height / 10),
        },
        bezier1: {
          x:
            xCenter - bezierBalanceX - MathController.random(0, bezierBalanceX),
          y: 2 * bezierBalanceY,
        },
        bezier2: {
          x: xCenter + bezierBalanceX / 100,
          y: bezierBalanceY,
        },
      },
      color: {
        stroke:
          config.colors[Math.round(i * (1 / (slices / config.colors.length)))],
      },
      closePath: false,
      element: Element.BEZIER,
    })
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'rainbow2.png'),
  )
}

run()
