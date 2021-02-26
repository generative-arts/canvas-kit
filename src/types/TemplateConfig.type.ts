import { Template } from '../enums/Template.enum'

export interface TemplateConfig {
  name: Template
  colors: string[]
  dimensions: {
    width: number
    height: number
  }
  config: any[][]
  elements: {
    serviceTask?: number
    userTask?: number
    tasks: number
    exclusiveGateways: number
    endEvents: number
  }
}
