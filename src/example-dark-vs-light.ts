/* eslint-disable id-length */
import { BezierController } from 'controller/bezier.controller'
import { EllipseController } from './controller/ellipse.controller'
import { totalmem } from 'os'
import * as path from 'path'
import { BackgroundController } from './controller/background.controller'
import { CanvasController } from './controller/canvas.controller'
import { OutputController } from './controller/output.controller'
import { RectangleController } from './controller/rectangle.controller'
import { MathController } from './controller/utils/math.controller'
import { Element } from './enums/Element.enum'
import { Config } from './types/Config.type'

async function run() {
  let config: Config = {
    width: 1080,
    height: 1080,
    // colors: ['#C3E0E5', '#274472', '#5885AF', '#41729F'],
    // colors: ['#0F0506','#32373B','#323C48','#42494D','#E2E2DF','#FFFFFF','#DBE0E6','#F5F5F4', ],
    colors: ['#7209b7', '#3a0ca3', '#266478', '#f72585', '#4895ef', '#4cc9f0'],
  }
  const lightTaks = 77
  const darkTask = 70

  config = CanvasController.init(config)
  if (lightTaks > darkTask) {
    config = BackgroundController.fill(config, 'black') //'#8797AB'
  } else {
    config = BackgroundController.fill(config, 'white')
  }

  const total = lightTaks + darkTask
  const lightElements = lightTaks / total
  const darkElements = darkTask / total

  const columnCountDark = config.width * darkElements
  //const rowCountDark = config.height * darkElements;
  console.log(columnCountDark)

  const columnCountLight = config.width * lightElements
  //const rowCountLight = config.height * lightElements;
  console.log(columnCountLight)

  //Bild mit hellen Farben und Formen

  /*  for(let col = 0; col < columnCountLight; col ++){
        RectangleController.rectangle(config, {
            element: Element.RECTANGLE,
            color: {
                stroke: config.colors[MathController.random(2,3)],
              //fill:
               // config.colors[MathController.random(2, 3)],
            },
            parameters: {
              start: { x: col, y: MathController.random(0,1000) },
              width: 100,
              height: 100,
            },
          })
      }*/

  for (let col = 0; col < columnCountLight; col++) {
    EllipseController.ellipse(config, {
      color: { stroke: config.colors[MathController.random(3, 5)] },
      parameters: {
        coordinate: { x: col, y: MathController.random(0, config.height) },
        radiusX: MathController.random(150, 300),
        radiusY: 100,
      },
      rotate: MathController.random(0, config.width / 4),
      element: Element.ELLIPSE,
    })
  }

  for (
    let col = columnCountLight;
    col < columnCountLight + columnCountDark;
    col++
  ) {
    EllipseController.ellipse(config, {
      strokeColor: config.colors[MathController.random(0, 2)],
      coordinate: { x: col, y: MathController.random(0, config.height) },
      radiusX: MathController.random(150, 300),
      radiusY: 100,
      rotation: MathController.random(col, config.width / 4),
    })
  }
  /*
  //for(let row = 0; row < 1000; row += 4){
    for(let col = columnCountLight; col < columnCountDark+ columnCountLight; col ++){
      RectangleController.rectangle(config, {
          element: Element.RECTANGLE,
          color: {
              stroke: config.colors[MathController.random(0,1)],
            
          },
          parameters: {
            start: { x: col, y: MathController.random(0,1000)  },
            width: 100,
            height: 100,
          },
        })
    }
//} */

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'dark-vs-light.png'),
  )
}

run()
