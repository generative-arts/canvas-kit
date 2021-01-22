/* eslint-disable id-length */
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import {
  EllipseConfig,
  EllipseController,
} from './controller/ellipse.controller'
import { OutputController } from './controller/output.controller'
import { JsonExportController } from './controller/utils/jsonexport.controller'
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

  const iterations = 10000
  const rotation = (2 * Math.PI) / 3

  const generationConfig: EllipseConfig[] = []

  for (let i = 0; i < iterations; i++) {
    const ellipseConfig = {
      coordinate: {
        x: MathController.random(0, config.width),
        y: MathController.random(0, config.height),
      },
      radiusX: MathController.random(1, 100),
      radiusY: MathController.random(1, 100),
      rotation,
      fillColor: config.colors[i % config.colors.length],
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
