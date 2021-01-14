/* eslint-disable id-length */
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { CircleController } from './controller/circle.controller'
import { OutputController } from './controller/output.controller'
import { Config } from './types/Config.type'
import * as path from 'path'

async function run() {
  let config: Config = {
    width: 1000,
    height: 1000,
    colors: ['#ababab'],
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'white')
  config = CircleController.circle(config, {
    color: '#bebebe',
    x: 100,
    y: 100,
    r: 30,
  })
  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'canvaskit.png'),
  )
}

run()
