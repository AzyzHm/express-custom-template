import { BadRequestException } from '../exceptions/http-exceptions';

/**
 * Express 5 types req.params values as `string | string[]` (repeated params
 * produce an array). Route params we use as single identifiers should always
 * be a single string — this guards that assumption instead of casting it away.
 */
export function getRouteParam(value: string | string[] | undefined, paramName: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new BadRequestException(`Invalid or missing route parameter: ${paramName}`);
  }
  return value;
}
