/* eslint-disable id-length */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable require-unicode-regexp */
import { RGB } from '../../types/Color.type'
import { MathController } from './math.controller'

export class ColorController {
  public static random(opacity: string = '1'): string {
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

  public static hexToRgb(hex: string): RGB {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const newHex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  public static allHexToRgb(hexColors: string[]): RGB[] {
    return hexColors.map((hex) => ColorController.hexToRgb(hex))
  }

  public static randomAlpha(rgbs: RGB[]): string[] {
    const rgbStrings: string[] = rgbs.map((rgb) => {
      const newRgb = rgb
      newRgb.a = MathController.random(1, 9)
      return `rgba(${newRgb.r},${newRgb.g},${newRgb.b},0.${newRgb.a})`
    })
    return rgbStrings
  }

  public static iterateOverRgbSpectrum(rgb: RGB): RGB {
    const newRgb = rgb
    if (newRgb.r < 255 && newRgb.g === 0 && newRgb.b === 0) {
      newRgb.r++
      return rgb
    }
    if (newRgb.r === 255 && newRgb.g < 255 && newRgb.b === 0) {
      newRgb.g++
      return newRgb
    }
    if (newRgb.r === 255 && newRgb.g === 255 && newRgb.b < 255) {
      newRgb.b++
      return newRgb
    }
    if (newRgb.g === 255 && newRgb.b === 255 && newRgb.r > 0) {
      newRgb.r--
      return newRgb
    }
    if (newRgb.r === 0 && newRgb.g > 0 && newRgb.b === 255) {
      newRgb.g--
      return newRgb
    }
    if (newRgb.r === 0 && newRgb.g === 0 && newRgb.b > 0) {
      newRgb.b--
      return newRgb
    }
    return { r: 0, g: 0, b: 0 }
  }
}
