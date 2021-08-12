/* eslint-disable id-length */
import { MathController } from './controller/utils/math.controller'
import * as path from 'path'
import { CAMUNDA, DAFTPUNK, SUNSET } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { CircleController } from './controller/circle.controller'
import { OutputController } from './controller/output.controller'
import { ColorController } from './controller/utils/color.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'
import { Coordinate } from './types/Coordinate.type'

async function run() {
  const colors = ColorController.randomAlpha(
    ColorController.allHexToRgb([...CAMUNDA, ...SUNSET, ...DAFTPUNK]),
  )

  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, '#0c0c0c')

  // params

  const likelihoodToShow = 100

  const lineWidth = 3
  const radiusDifference = lineWidth + 3
  let circleSectionDifference = 5

  let maxAngleDifference = 30

  const center: Coordinate = {
    x: config.height / 2,
    y: config.width / 2,
  }

  // overall index
  let index = 0

  // loop over radius
  for (
    let radius = 10;
    radius < config.width + 0.2 * config.width;
    radius += radiusDifference
  ) {
    // update base parameters depending on index
    maxAngleDifference = maxAngleDifferenceByRadius(radius)
    circleSectionDifference = circleSectionDifferenceByRadius(radius)

    // loop over circles per radius
    let currentAngleStart = MathController.random(0, 360)
    let currentAngle = MathController.random(0, maxAngleDifference)
    let currentAngleEnd = currentAngleStart + currentAngle
    let angleSum = currentAngle
    while (angleSum < 360) {
      const shouldDraw =
        likelihoodToShow === 100 ||
        MathController.random(0, 100) <= likelihoodToShow

      if (shouldDraw) {
        config = CircleController.circle(config, {
          color: {
            stroke:
              config.colors[MathController.random(0, config.colors.length - 1)],
          },
          element: Element.CIRCLE,
          closePath: false,
          lineWidth,
          parameters: {
            center,
            r: radius,
            angle: {
              startDegree: currentAngleStart,
              endDegree: currentAngleEnd,
            },
          },
        })
      }

      // new angle calculation
      const differenceToFull = 360 - angleSum
      if (differenceToFull < maxAngleDifference + circleSectionDifference) {
        currentAngle = differenceToFull - circleSectionDifference
      } else {
        currentAngle = MathController.random(0, maxAngleDifference)
      }
      currentAngleStart = currentAngleEnd + circleSectionDifference
      currentAngleEnd = currentAngleStart + currentAngle
      angleSum += circleSectionDifference + currentAngle
    }
    index++
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'magic-circle.png'),
  )
}

function maxAngleDifferenceByRadius(radius: number): number {
  if (radius < 100) {
    return 90
  } else if (radius < 300) {
    return 60
  } else if (radius < 600) {
    return 45
  } else if (radius < 900) {
    return 30
  }
  return 20
}

function circleSectionDifferenceByRadius(radius: number): number {
  const perimeter = 2 * Math.PI * radius
  return (5 / perimeter) * 360
}

run()
