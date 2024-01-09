const errorsList = {
  '23505': {
    status: 400,
  },
  'Validation error': {
    status: 400,
  },
  'JsonWebTokenError': {
    status: 401,
  },
  'InvalidValueInteger': {
    status: 400,
    name: 'Invalid integer',
    message: 'Value must be an integer',
    regexp: /invalid input syntax for type integer: "([^"]+)"/
  },
  'undefinedValueError': {
    status: 400,
    name: 'Undefined value error',
    message: 'Passed value is undefined',
    regexp: /WHERE parameter "([^"]+)" has invalid "undefined" value/
  },
  'nullValueError': {
    status: 400,
    name: 'Null value error',
    message: 'Passed value is null',
    regexp: /notNull Violation: ([^"]+) cannot be null/
  },
  'SequelizeForeignKeyConstraintError': {
    status: 400,
    name: 'Foreign key error',
    message: 'Invalid foreign key'
  }
}

export default errorsList
