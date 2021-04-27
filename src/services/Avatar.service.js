const fallBackSrc = "https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
const bigFallBackSrc = "https://cdn.vuetifyjs.com/images/cards/mountain.jpg"

const serverUrl = (url) => process.env.VUE_APP_API_URL + url

const imageExists = (image_url) => {
  let http = new XMLHttpRequest()
  http.open('GET', image_url, false)
  http.send()

  return http.status != 404
}

const createAvatarUrl = ({ userAvatar, bigImage = false }) => {
  const newUrl = serverUrl(userAvatar)
  if (bigImage) 
    return userAvatar ? ( imageExists(newUrl) ? newUrl : bigFallBackSrc ) : bigFallBackSrc
  return userAvatar ? ( imageExists(newUrl) ? newUrl : fallBackSrc ) : fallBackSrc
}

export default createAvatarUrl

