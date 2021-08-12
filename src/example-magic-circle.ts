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
    ColorController.allHexToRgb(CAMUNDA),
  )

  let config: Config = {
    width: 1000,
    height: 1000,
    colors,
  }
  config = CanvasController.init(config)
  config = BackgroundController.fill(config, 'black')

  const lineWidth = 3
  const radiusDifference = lineWidth + 3
  const circleSectionDifference = 5

  const maxAngleDifference = 60

  const center: Coordinate = {
    x: config.height / 2,
    y: config.width / 2,
  }

  // loop over radius
  for (
    let radius = 10;
    radius < config.width + 0.2 * config.width;
    radius += radiusDifference
  ) {
    // loop over circles per radius
    let currentAngleStart = MathController.random(0, 360)
    let currentAngle = MathController.random(0, maxAngleDifference)
    let currentAngleEnd = currentAngleStart + currentAngle
    let angleSum = currentAngle
    while (angleSum < 360) {
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
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'magic-circle.png'),
  )
}

run()
