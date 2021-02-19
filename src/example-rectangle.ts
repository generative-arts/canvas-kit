import * as path from 'path'
import { OutputController } from './controller/output.controller'
import { TemplateController } from './controller/template.controller'
import { JsonExportController } from './controller/utils/jsonexport.controller'
import { Template } from './enums/Template.enum'
import { SquareTemplate } from './templates/square.template'
import { TemplateConfig } from './types/TemplateConfig.type'

async function run() {
  const templateConfig: TemplateConfig = {
    name: Template.SQUARE,
    colors: [
      '247,37,133',
      '114,9,183',
      '58,12,163',
      '72,149,239',
      '76,201,240',
    ],
    dimensions: {
      width: 1000,
      height: 1000,
    },
    config: [],
    elements: {
      tasks: 10,
      exclusiveGateways: 5,
      endEvents: 0,
    },
  }

  for (let task = 0; task < templateConfig.elements.tasks; task++) {
    const squareTemplate = new SquareTemplate(templateConfig)
    templateConfig.config = squareTemplate.addTaskIteration(task)
  }

  const squareTemplate = new SquareTemplate(templateConfig)
  const elementConfigs = squareTemplate.getElementConfigs()

  const config = TemplateController.generateArt(templateConfig, elementConfigs)

  await JsonExportController.save(
    path.resolve(__dirname, '..', 'output', 'rectangle-min2.json'),
    JSON.stringify(templateConfig.config),
  )

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'rectangle.png'),
  )
}

run()
