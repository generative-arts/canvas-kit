export class MathController {
  public static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
