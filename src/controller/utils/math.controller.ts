export interface ValueOnRangeConfig {
  inputMax: number
  outputMax: number
  value: number
}

export class MathController {
  public static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  public static round(value: number): number {
    return Math.round(value * 10) / 10
  }

  public static valueOnRange(config: ValueOnRangeConfig): number {
    const value =
      config.value > config.inputMax ? config.inputMax : config.value
    const percentage = value / config.inputMax
    return Math.round(percentage * config.outputMax)
  }
}
