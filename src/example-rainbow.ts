/* eslint-disable id-length */
import { BezierController } from 'controller/bezier.controller'
import * as path from 'path'
import { CLOUDS } from './constants/Colors.constants'
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
import { RGB } from './types/Color.type'
import { Config } from './types/Config.type'
import { Coordinate } from './types/Coordinate.type'

interface OriginAndPoints {
  origin: Coordinate
  points: Coordinate[]
}

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

  const origin: Coordinate = {
    x: config.width / 2,
    y: config.height,
  }

  const grid = 30

  const width = config.width / grid
  const height = config.height / grid

  const rgbMin = 0
  const rgbMax = 255

  let rgb: RGB = {
    r: 41,
    g: 61,
    b: 240,
  }

  let alpha = 0

  const allPoints: OriginAndPoints[] = []

  for (let row = 0; row < grid; row++) {
    for (let column = 0; column < grid; column++) {
      const points: Coordinate[] = []
      drawSmallBezier(
        points,
        { x: row * width, y: column * height },
        width,
        height,
        0.1,
      )
      allPoints.push({
        points,
        origin: {
          x: row * width + width / 2,
          y: column * height + height,
        },
      })
    }
  }

  // bezier points
  // for (let i = 0; i <= 1; i += 0.01) {
  //   const coord = getBezierXY(
  //     i,
  //     {
  //       x: 0,
  //       y: config.height / 2,
  //     },
  //     {
  //       x: config.width / 3,
  //       y: config.height / 3,
  //     },
  //     {
  //       x: (2 * config.width) / 3,
  //       y: (2 * config.height) / 3,
  //     },
  //     {
  //       x: config.width,
  //       y: config.height / 2,
  //     },
  //   )
  //   points.push(coord)
  // }

  // surrounding points
  // for (let left = config.height; left >= 0; left--) {
  //   points.push({ x: 0, y: left })
  // }
  // for (let top = 0; top <= config.width; top++) {
  //   points.push({
  //     x: top,
  //     y: 0,
  //   })
  // }
  // for (let bottom = 0; bottom <= config.width; bottom++) {
  //   points.push({
  //     x: bottom,
  //     y: config.height,
  //   })
  // }
  // for (let right = 0; right <= config.height; right++) {
  //   points.push({
  //     x: config.width,
  //     y: right,
  //   })
  // }

  allPoints.forEach((originWithPoints) => {
    originWithPoints.points.forEach((point) => {
      const freeFormConfig: FreeFormConfig = {
        color: {
          stroke: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`,
        },
        parameters: {
          coordinates: [originWithPoints.origin, point],
        },
        element: Element.FREEFORM,
      }
      // console.log(JSON.stringify(freeFormConfig))
      FreeFormController.freeform(config, freeFormConfig)
      rgb = incrementRgb(rgb)
      alpha = incrementAlpha(alpha)
    })
  })

  // points.forEach((point) => {
  //   const freeFormConfig: FreeFormConfig = {
  //     color: {
  //       stroke: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`,
  //     },
  //     parameters: {
  //       coordinates: [origin, point],
  //     },
  //     element: Element.FREEFORM,
  //   }
  //   // console.log(JSON.stringify(freeFormConfig))
  //   FreeFormController.freeform(config, freeFormConfig)
  //   rgb = incrementRgb(rgb)
  //   alpha = incrementAlpha(alpha)
  // })

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'rainbow.png'),
  )
}

function incrementAlpha(value: number) {
  return 1
  // return (value + 0.01) % 1
}

function incrementRgb(rgb: RGB) {
  // return rgb
  return {
    r: MathController.random(0, 255),
    g: MathController.random(0, 255),
    b: MathController.random(0, 255),
  }
}

function drawSmallBezier(
  points: Coordinate[],
  start: Coordinate,
  width: number,
  height: number,
  step: number,
) {
  for (let i = 0; i <= 1; i += step) {
    const coord = BezierController.getBezierCoordinate(i, {
      parameters: {
        start: {
          x: start.x,
          y: start.y + height / 2,
        },
        bezier1: {
          x: start.x + width / 3,
          y: start.y + height / 3,
        },
        bezier2: {
          x: start.x + (2 * width) / 3,
          y: start.y + (2 * height) / 3,
        },
        end: {
          x: start.x + width,
          y: start.y + height / 2,
        },
      },
      color: {},
      element: Element.BEZIER,
    })
    points.push(coord)
  }
}

run()
