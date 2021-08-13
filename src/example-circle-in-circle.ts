/* eslint-disable id-length */
import * as path from 'path'
import { CAMUNDA, DAFTPUNK, SUNSET } from './constants/Colors.constants'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { CircleConfig, CircleController } from './controller/circle.controller'
import { OutputController } from './controller/output.controller'
import { CircleUtils } from './controller/utils/circle.utils'
import { ColorController } from './controller/utils/color.controller'
import { MathController } from './controller/utils/math.controller'
import { VectorUtils } from './controller/utils/vector.utils'
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

  const radiusBigCircle = 200
  const centerX = config.height / 2
  const centerY = config.width / 2
  const numberOfInnerCircles = 100

  // big circle

  const bigCircleConfig: CircleConfig = {
    color: {
      stroke: 'white',
    },
    element: Element.CIRCLE,
    closePath: false,
    lineWidth: 2,
    parameters: {
      center: {
        x: centerX,
        y: centerY,
      },
      r: radiusBigCircle,
    },
  }

  config = CircleController.circle(config, bigCircleConfig)

  // inner circles
  for (let i = 0; i < numberOfInnerCircles; i++) {
    const smallCircleConfig = generateSmallCircleConfig(
      centerX,
      centerY,
      radiusBigCircle,
      colors,
    )
    config = CircleController.circle(config, smallCircleConfig)
  }

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'circle-in-circle.png'),
  )
}

function generateSmallCircleConfig(
  centerX: number,
  centerY: number,
  radiusBigCircle: number,
  colors?: string[],
): CircleConfig {
  const randomRadiusSmallCircle = MathController.random(
    10,
    radiusBigCircle * 0.8,
  )
  const center: Coordinate = {
    x: centerX,
    y: centerY,
  }
  const randomDegree = MathController.random(0, 360)
  const bigCircleCoordinate = CircleUtils.pointOnCircleOutlineByAngle(
    center,
    radiusBigCircle,
    randomDegree,
  )
  const lineCoordinates = VectorUtils.lineWithLengthBetweenTwoPoints(
    bigCircleCoordinate,
    center,
    randomRadiusSmallCircle,
  )
  const smallCircleCenter: Coordinate = lineCoordinates.end

  const smallCircleConfig: CircleConfig = {
    color: {
      stroke: colors
        ? colors[MathController.random(0, colors.length - 1)]
        : 'white',
    },
    element: Element.CIRCLE,
    closePath: false,
    lineWidth: 2,
    parameters: {
      center: smallCircleCenter,
      r: randomRadiusSmallCircle,
    },
  }
  return smallCircleConfig
}

run()
