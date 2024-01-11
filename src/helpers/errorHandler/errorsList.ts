const errorsList = {
  '23505': {
    status: 400,
  },
  'Validation error': {
    status: 400,
  },
  JsonWebTokenError: {
    status: 401,
  },
  'noPermissionsError': {
    status: 403,
    name: 'Permissions error',
    message: 'You dont have permissions to make this request'
  },
  InvalidValueInteger: {
    status: 400,
    name: 'Invalid integer',
    message: 'Value must be an integer',
    regexp: /invalid input syntax for type integer: "([^"]+)"/,
  },
  undefinedValueError: {
    status: 400,
    name: 'Undefined value error',
    message: 'Passed value is undefined',
    regexp: /WHERE parameter "([^"]+)" has invalid "undefined" value/,
  },
  nullValueError: {
    status: 400,
    name: 'Null value error',
    message: 'Passed value is null',
    regexp: /notNull Violation: ([^"]+) cannot be null/,
  },
  SequelizeForeignKeyConstraintError: {
    status: 400,
    name: 'Foreign key error',
    message: 'Invalid foreign key',
  },
  undefinedPropertyError: {
    status: 400,
    name: 'Cannot read properties of null',
    message: 'Cannot read properties of null',
    regexp: /Cannot read properties of null \(reading '[\w\s]+'+\)/,
  },
}

export default errorsList
