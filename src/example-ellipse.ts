/* eslint-disable id-length */
import * as path from 'path'
import { CLOUDS, SUNSET } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
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

async function run() {
  const colors = ColorController.randomAlpha(
    ColorController.allHexToRgb(SUNSET),
  )
  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')

  const iterations = 1000
  const rotation = (2 * Math.PI) / 3

  const generationConfig: EllipseConfig[] = []

  for (let i = 0; i < iterations; i++) {
    const ellipseConfig: EllipseConfig = {
      parameters: {
        coordinate: {
          x: MathController.random(0, config.width),
          y: MathController.random(0, config.height),
        },
        radiusX: MathController.random(1, 100),
        radiusY: MathController.random(1, 100),
        rotation,
      },
      color: {
        fill: config.colors[i % config.colors.length],
      },
      element: Element.ELLIPSE,
    }
    generationConfig.push(ellipseConfig)
    EllipseController.ellipse(config, ellipseConfig)
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'ellipse.png'),
  )
  await JsonExportController.save(
    path.resolve(__dirname, '..', 'output', 'ellipse.json'),
    JSON.stringify(generationConfig),
  )
}

run()
