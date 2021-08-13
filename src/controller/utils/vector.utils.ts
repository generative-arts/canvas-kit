/* eslint-disable id-length */
import { Coordinate } from '../../types/Coordinate.type'
import { DistanceController } from './distance.controller'

export class VectorUtils {
  public static lineWithLengthBetweenTwoPoints(
    start: Coordinate,
    end: Coordinate,
    length: number,
  ): { start: Coordinate; end: Coordinate } {
    const distanceBetweenCoordinates = DistanceController.distance(start, end)
    const factor = length / distanceBetweenCoordinates

    const calculatedEnd: Coordinate = {
      x: start.x + factor * (end.x - Math.abs(start.x)),
      y: start.y + factor * (end.y - Math.abs(start.y)),
    }
    return { start, end: calculatedEnd }
  }
}
