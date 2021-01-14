import { Config } from '../types/Config.type'

export class BackgroundController {
  public static fill(config: Config, color: string): Config {
    config.ctx.fillStyle = color
    config.ctx.rect(0, 0, config.width, config.height)
    config.ctx.fill('evenodd')
    return config
  }

  public static gradient(
    config: Config,
    colorFrom: string,
    colorTo: string,
  ): Config {
    const gradient = config.ctx.createLinearGradient(
      0,
      0,
      config.width,
      config.height,
    )
    gradient.addColorStop(0, colorFrom)
    gradient.addColorStop(1, colorTo)
    config.ctx.fillStyle = gradient
    config.ctx.fillRect(0, 0, config.width, config.height)
    return config
  }
}
