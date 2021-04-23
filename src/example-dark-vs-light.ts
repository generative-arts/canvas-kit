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
      '0,245,212',
      '0,187,249',
      '254,228,64',
      '241, 91, 181',
      '155,93,229',
    ],
    dimensions: {
      width: 1000,
      height: 1000,
    },
    config: [],
    elements: {
      userTask: 6,
      serviceTask: 7,
    },
  }

  const columnTotal =
    templateConfig.elements.userTask + templateConfig.elements.serviceTask

  const proportionServiceTask =
    columnTotal / templateConfig.elements.serviceTask
  const propportionUserTask = columnTotal / templateConfig.elements.userTask

  for (
    let iteration = 0;
    iteration < templateConfig.elements.serviceTask;
    iteration++
  ) {
    let darkVsLightTemplate = new DarkVsLightTemplate(templateConfig)
    templateConfig.config = darkVsLightTemplate.addIteration(
      iteration,
      'servicetask',
      proportionServiceTask,
    )
  }

  for (
    let iteration = 0;
    iteration < templateConfig.elements.userTask;
    iteration++
  ) {
    let darkVsLightTemplate = new DarkVsLightTemplate(templateConfig)
    templateConfig.config = darkVsLightTemplate.addIteration(
      iteration,
      'usertask',
      propportionUserTask,
    )
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
