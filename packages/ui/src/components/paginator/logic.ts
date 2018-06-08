/* https://gist.github.com/kottenator/9d936eb3e4e3c3e02598 */

function pagination(current, last, { delta = 2, dotsPattern = '...' }) {
  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []
  let l
  range.push(1)

  if (last <= 1) {
    return range
  }

  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < last && i > 1) {
      range.push(i)
    }
  }
  range.push(last)

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push(dotsPattern)
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export default pagination
