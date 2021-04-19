const defaultUrl = process.env.VUE_APP_API_URL
const prefiks = process.env.VUE_APP_PREFIKS


const throwErrors = (err) => {
  const errObj = err.response

  if (errObj.data.error[0].message) 
    return {
      errorMessage: errObj.data.error[0].message,
      status: errObj.status
    }
  else
    return {
      errorMessage: errObj.data.error,
      status: errObj.status
    }
}

export {
  throwErrors,
  defaultUrl,
  prefiks
}