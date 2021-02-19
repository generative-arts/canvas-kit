import { Coordinate } from '../../types/Coordinate.type'

export class DistanceController {
  public static distance(first: Coordinate, second: Coordinate) {
    return Math.sqrt(
      Math.pow(second.x - first.x, 2) + Math.pow(second.y - first.y, 2),
    )
  }
}
