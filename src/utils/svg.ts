/**
 * Get path data for a rounded rectangle. Allows for different radius on each corner.
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @param  {Number} tlr Top left corner radius
 * @param  {Number} trr Top right corner radius
 * @param  {Number} brr Bottom right corner radius
 * @param  {Number} blr Bottom left corner radius
 * @return {String}     Rounded rectangle SVG path data
 */

export const getRoundedRectPath = (
  w: number,
  h: number,
  tlr: number,
  trr: number,
  brr: number,
  blr: number,
  x = 0,
  y = 0
) => {
  return (
    `M ${x} ${y + tlr} A ${tlr} ${tlr} 0 0 1 ${tlr + y} ${y}` +
    ` L ${w - trr + x} ${y}` +
    ` A ${trr} ${trr} 0 0 1 ${w + x} ${trr + y} L ${w + x} ${h - brr + y} A ${brr} ${brr} 0 0 1 ${w - brr + x} ${
      h + y
    } L ${blr + x} ${h + y} A ${blr} ${blr} 0 0 1 ${x} ${h - blr + y} Z`
  );
};

// https://gist.github.com/danielpquinn/dd966af424030d47e476
