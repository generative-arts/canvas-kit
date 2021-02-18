import { Element } from '../enums/Element.enum'

export interface ElementConfig {
  color: {
    stroke?: string
    fill: string
  }
  rotate?: number
  parameters: any
  element: Element
}
