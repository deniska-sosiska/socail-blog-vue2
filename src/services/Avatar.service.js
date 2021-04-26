const fallBackSrc = "https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"

const serverUrl = (url) => process.env.VUE_APP_API_URL + url

const imageExists = (image_url) => {

  let http = new XMLHttpRequest()
  http.open('HEAD', image_url, false)
  http.send()
  
  return http.status != 404
}

const createAvatarUrl = ({ userAvatar }) => {
  const newUrl = serverUrl(userAvatar)
  return userAvatar ? ( imageExists(newUrl) ? newUrl : fallBackSrc ) : fallBackSrc
}

export default createAvatarUrl

