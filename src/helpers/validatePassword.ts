const validatePassword = (password: string) => {
  const pattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%@&? "]).*$/
  const regex = new RegExp(pattern)
  return regex.test(password)
}

export default validatePassword
