type valueToCheckType = 'number' | 'undefined'

const isErrorByRegexp = (value: any, type: valueToCheckType) => {
  const regexpTypes = {
    number: /^\d+$/,
    undefined: /^WHERE parameter "." has invalid "." value$/,
  }
  const regexp = regexpTypes[type]
  return regexp.test(value)
}

export default isErrorByRegexp
