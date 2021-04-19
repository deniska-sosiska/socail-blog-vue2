const defaultUrl = process.env.VUE_APP_API_URL
const prefiks = process.env.VUE_APP_PREFIKS


const throwErrors = (err) => {
  const errObj = err.response

  if (errObj.data.error[0].message) {
    const resError = {
      errorMessage: errObj.data.error[0].message,
      status: errObj.status
    }

    console.warn("Error: ", resError.errorMessage, "| status: ", resError.status)
    return resError
  }

  else {
    const resError = {
      errorMessage: errObj.data.error,
      status: errObj.status
    }

    console.warn("Error: ", resError.errorMessage, "| status: ", resError.status)
    return resError
  }
}

export {
  throwErrors,
  defaultUrl,
  prefiks
}