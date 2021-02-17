/* eslint-disable id-length */
import * as path from 'path'
import { Coordinate } from 'types/Coordinate.type'
import { BackgroundController } from './controller/background.controller'
import { BezierController } from './controller/bezier.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
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

  const iterations = 100
  const smallBezierIterations = 300

  // const startY = MathController.random(0, config.height)
  // const endY = MathController.random(0, config.height)

  for (let i = 0; i < iterations; i++) {
    // BezierController.bezier(config, {
    //   start: {
    //     x: 0,
    //     y: MathController.random(0, config.height),
    //   },
    //   end: {
    //     x: config.width,
    //     y: MathController.random(0, config.height),
    //   },
    //   bezier1: {
    //     x: config.width / 4,
    //     y: MathController.random(0, config.height),
    //   },
    //   bezier2: {
    //     x: 3 * (config.width / 4),
    //     y: MathController.random(0, config.height),
    //   },
    //   strokeColor: config.colors[i % config.colors.length],
    // })
    // BezierController.bezier(config, {
    //   start: {
    //     x: 0,
    //     y: startY,
    //   },
    //   end: {
    //     x: config.width,
    //     y: endY,
    //   },
    //   bezier1: {
    //     x: config.width / 4,
    //     y: MathController.random(0, config.height),
    //   },
    //   bezier2: {
    //     x: 3 * (config.width / 4),
    //     y: MathController.random(0, config.height),
    //   },
    //   strokeColor: config.colors[i % config.colors.length],
    // })
    // const startY = MathController.random(0, config.height)
    // const endY = MathController.random(0, config.height)

    // const start: Coordinate = {
    //   x: MathController.random(
    //     MathController.random(0, config.width / 2),
    //     config.width / 2,
    //   ),
    //   y: MathController.random(0, config.height),
    // }
    // const end: Coordinate = {
    //   x: MathController.random(
    //     MathController.random(config.width / 2, config.width),
    //     config.width,
    //   ),
    //   y: MathController.random(0, config.height),
    // }

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
      strokeColor: config.colors[i % config.colors.length],
    })
  }
}

run()
