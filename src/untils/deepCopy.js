export default function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let air
  if (obj instanceof Array) {
    air = []
  } else {
    air = {}
  }
  for (const item in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, item)) {
      air[item] = deepCopy(obj[item])
    }
  }
  return air
}
