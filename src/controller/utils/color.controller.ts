import { MathController } from './math.controller'

export class ColorController {
  public static random(opacity?: string): string {
    const opac = opacity ? opacity : `0.${MathController.random(0, 10)}`
    const color = `rgba(${MathController.random(
      0,
      256,
    )}, ${MathController.random(0, 256)}, ${MathController.random(
      0,
      256,
    )}, ${opac}`
    return color
  }
}
