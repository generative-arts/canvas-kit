/* eslint-disable id-length */
import { Coordinate } from '../../types/Coordinate.type'

export class CircleUtils {
  // calculates a point on the outline of a circle based on
  // center, radius and degree
  public static pointOnCircleOutlineByAngle(
    center: Coordinate,
    radius: number,
    degree: number,
  ): Coordinate {
    const coordinate: Coordinate = {
      x: center.x + radius * Math.sin(degree),
      y: center.y + radius * Math.cos(degree),
    }
    return coordinate
  }

  // calculates angle in degrees to get a length on cicrle outline
  public static angleForLengthOnPerimeterByRadius(radius: number): number {
    const perimeter = 2 * Math.PI * radius
    return (5 / perimeter) * 360
  }
}
