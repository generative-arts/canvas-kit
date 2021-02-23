/* eslint-disable id-length */
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import {
  FreeFormConfig,
  FreeFormController,
} from './controller/freeform.canvas'
import { OutputController } from './controller/output.controller'
import { DistanceController } from './controller/utils/distance.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'
import { Coordinate } from './types/Coordinate.type'

interface CoordinateWithDistance {
  coordinate: Coordinate
  distance: number
}

async function run() {
  //   const rgbColors = [
  //     '247,37,133',
  //     '114,9,183',
  //     '58,12,163',
  //     '72,149,239',
  //     '76,201,240',
  //   ]
  //   const colors = rgbColors.map(
  //     (rgb) => `rgba(${rgb},0.${MathController.random(1, 9)})`,
  //   )
  const colors = [
    '#FF1F00',
    '#FF3800',
    '#FF4700',
    '#FF5400',
    '#FF6100',
    '#FF7000',
    '#FF7D00',
    '#FF8B00',
  ]
  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  //   config = BackgroundController.fill(config, 'white')
  config = BackgroundController.fill(config, '#FF1F00')
  //   config = BackgroundController.fill(
  //     config,
  //     config.colors[MathController.random(0, config.colors.length - 1)],
  //   )

  const matrix = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ]

  const coordinates: Coordinate[] = []

  const grid = 10
  const pointsPerGrid = 3

  const gridWidth = config.width / grid
  const gridHeight = config.height / grid

  const maxPoints = 100

  matrix.forEach((item) => {
    for (let row = 0; row < grid; row++) {
      for (let column = 0; column < grid; column++) {
        for (let k = 0; k < pointsPerGrid; k++) {
          coordinates.push({
            x:
              MathController.random(
                row * gridWidth,
                row * gridWidth + gridWidth,
              ) +
              item[0] * config.width,
            y:
              MathController.random(
                column * gridHeight,
                column * gridHeight + gridHeight,
              ) +
              item[1] * config.height,
          })
        }
      }
    }

    // for (let i = 0; i < maxPoints; i++) {
    //   coordinates.push({
    //     x: MathController.random(0, config.width) + item[0] * config.width,
    //     y: MathController.random(0, config.height) + item[1] * config.height,
    //   })
    // }
  })

  let colorIndex = 0

  coordinates.forEach((start) => {
    const surroundingMatrix = [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]
    surroundingMatrix.forEach((smItem) => {
      const coordinatesWithDistance = coordinates
        .filter((coordinate) => {
          const xStart = smItem[0] * config.width + start.x
          const yStart = smItem[1] * config.height + start.y
          return (
            coordinate.x > Math.min(start.x, xStart) &&
            coordinate.x < Math.max(start.x, xStart) &&
            coordinate.y > Math.min(start.y, yStart) &&
            coordinate.y < Math.max(start.y, yStart)
          )
        })
        .map((coordinate) => {
          const distance = DistanceController.distance(start, coordinate)
          return {
            coordinate,
            distance,
          }
        })
      const sortedCoordinates = coordinatesWithDistance.sort(
        (first, second) => {
          return first.distance - second.distance
        },
      )

      let index = 0
      for (let round = 0; round < 1; round++) {
        if (sortedCoordinates[index] && sortedCoordinates[index + 1]) {
          const freeFormConfig: FreeFormConfig = {
            color: {
              fill: config.colors[colorIndex % config.colors.length],
            },
            parameters: {
              coordinates: [
                start,
                sortedCoordinates[index].coordinate,
                sortedCoordinates[index + 1].coordinate,
              ],
            },
            element: Element.FREEFORM,
          }
          FreeFormController.freeform(config, freeFormConfig)
        }
        index += 2
        colorIndex++
      }
    })
  })

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'freeform.png'),
  )
}

run()
