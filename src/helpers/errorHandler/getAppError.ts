import errorsList from './errorsList'

const getAppError = (e: any) => {
  const name = e?.name ?? e?.type ?? e?.errors?.[0]?.type
  const message = e?.message ?? e?.errors?.[0]?.message
  let appError = errorsList[name]
  console.log('name', name)
  if (!appError) {
    for (const key in errorsList) {
      const errObj = errorsList[key]
      const regexp = errObj?.regexp
      if(regexp) {
        if (regexp.test(message)) {
          appError = errObj
        }
      }
    }
  }
  // console.log('appErro2r', appError)
  return {...appError, message}
}

export default getAppError
