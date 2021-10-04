/* eslint-disable id-length */
import * as path from 'path'
import {
  CAMUNDA,
  CLOUDS,
  NICE_COLORS,
  SUNSET,
} from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { BezierController } from './controller/bezier.controller'

import {
  EllipseConfig,
  EllipseController,
} from './controller/ellipse.controller'
import { OutputController } from './controller/output.controller'
import { ColorController } from './controller/utils/color.controller'
import { JsonExportController } from './controller/utils/jsonexport.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'
import { SSL_OP_SINGLE_ECDH_USE } from 'constants'

async function run() {
  const color = [
    '9AF5B1',
    '01791F',
    '01BAEF',
    '0284A2',
    'F8F4A6',
    'E08E45',
    'FFA9E7',
    '940C72',
    '875079',
  ]

  const colors = ColorController.randomAlpha(ColorController.allHexToRgb(color))

  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const middlePointBigCircleX = config.width / 2
  const middlePointBigCircleY = config.height / 2
  const radiusBigCircle = config.height / 4
  const iterations = 800
  const slices = 2000

  const generationConfig: EllipseConfig[] = []

  const bigCircleConfig: EllipseConfig = {
    parameters: {
      coordinate: {
        x: middlePointBigCircleX,
        y: middlePointBigCircleY,
      },
      radiusX: radiusBigCircle,
      radiusY: radiusBigCircle,
    },
    color: {
      stroke: config.colors[0],
    },
    element: Element.ELLIPSE,
  }
  generationConfig.push(bigCircleConfig)
  EllipseController.ellipse(config, bigCircleConfig)

  for (let i = 0; i < iterations; i++) {
    const winkel = MathController.random(0, 360)

    const Xmax = radiusBigCircle * Math.sin(winkel) + middlePointBigCircleX
    const Ymax = radiusBigCircle * Math.cos(winkel) + middlePointBigCircleY

    const radiusSmallCircle = MathController.random(0, 240)

    const ellipseConfig: EllipseConfig = {
      parameters: {
        coordinate: {
          x:
            Xmax +
            (radiusSmallCircle / radiusBigCircle) *
              (middlePointBigCircleX - Xmax),
          y:
            Ymax +
            (radiusSmallCircle / radiusBigCircle) *
              (middlePointBigCircleY - Ymax),
        },
        radiusX: radiusSmallCircle,
        radiusY: radiusSmallCircle,
      },
      color: {
        stroke: config.colors[MathController.random(4, 8)],
      },
      element: Element.ELLIPSE,
    }
    generationConfig.push(ellipseConfig)
    EllipseController.ellipse(config, ellipseConfig)
  }

  for (let i = 0; i < slices; i++) {
    const winkel = MathController.random(0, 360)

    const Xmax = radiusBigCircle * Math.sin(winkel) + middlePointBigCircleX
    const Ymax = radiusBigCircle * Math.cos(winkel) + middlePointBigCircleY

    const radiusSmallCircle = MathController.random(0, 240)

    const ellipseConfig: EllipseConfig = {
      parameters: {
        coordinate: {
          x:
            Xmax +
            (radiusSmallCircle / radiusBigCircle) *
              (middlePointBigCircleX - Xmax) *
              -1,
          y:
            Ymax +
            (radiusSmallCircle / radiusBigCircle) *
              (middlePointBigCircleX - Ymax) *
              -1,
        },
        radiusX: radiusSmallCircle,
        radiusY: radiusSmallCircle,
      },
      color: {
        stroke: config.colors[MathController.random(0, 6)],
      },
      element: Element.ELLIPSE,
    }
    generationConfig.push(ellipseConfig)
    EllipseController.ellipse(config, ellipseConfig)
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'circle.png'),
  )
  await JsonExportController.save(
    path.resolve(__dirname, '..', 'output', 'circle.json'),
    JSON.stringify(generationConfig),
  )
}

run()
