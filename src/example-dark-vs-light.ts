/* eslint-disable id-length */
import * as path from 'path'
import { OutputController } from './controller/output.controller'
import { TemplateController } from './controller/template.controller'
import { JsonExportController } from './controller/utils/jsonexport.controller'
import { Template } from './enums/Template.enum'
import { DarkVsLightTemplate } from './templates/dark-vs-light.template'
import { TemplateConfig } from './types/TemplateConfig.type'

async function run() {
  const templateConfig: TemplateConfig = {
    name: Template.ELLIPSE,
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
      userTask: 5,
      serviceTask: 5,
    },
  }

  const columnTotal = Math.min(
    15,
    templateConfig.elements.userTask + templateConfig.elements.serviceTask,
  )

  for (let column = 0; column < columnTotal; column++) {
    let darkVsLightTemplate = new DarkVsLightTemplate(templateConfig)
    templateConfig.config = darkVsLightTemplate.addIteration(
      column,
      'servicetask',
    )
    darkVsLightTemplate = new DarkVsLightTemplate(templateConfig)
    templateConfig.config = darkVsLightTemplate.addIteration(column, 'usertask')
  }

  const darkVsLightTemplate = new DarkVsLightTemplate(templateConfig)
  const elementConfigs = darkVsLightTemplate.getElementConfigs()

  const config = TemplateController.generateArt(templateConfig, elementConfigs)

  await JsonExportController.save(
    path.resolve(__dirname, '..', 'output', 'dark-vs-light-min2.json'),
    JSON.stringify(templateConfig.config),
  )

  await OutputController.save(
    config,
    path.resolve(__dirname, '..', 'output', 'dark-vs-light.png'),
  )
}

run()
