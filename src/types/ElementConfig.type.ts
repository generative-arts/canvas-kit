import { Element } from '../enums/Element.enum'

export interface ElementConfig {
  color: {
    stroke?: string
    fill?: string
  }
  lineWidth?: number
  rotate?: number
  closePath?: boolean
  parameters: any
  element: Element
}
