import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_PHOTOS_ACCESS_KEY
})

const getUrlForCoffeeStores = (latLong, limit, query ) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}${ query ? `&query=${query}` : '' }&categories=13032&limit=${limit}`
}

const getPhotosOfCoffeeStores = async() => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40
  })

  const unsplashPhotos = photos.response.results
  return unsplashPhotos.map((result) => result.urls['small'])
}

// const sanJoseLatLongCoords = '37.338207%2C-121.886330'
const sfLatLongCoords = '37.780079%2C-122.420174'
// const abbottsfordLatLongCoords = '49.063040%2C-122.251350'

export const fetchCoffeeStores = async (latLong = sfLatLongCoords, limit = 9) => {
  const photos = await getPhotosOfCoffeeStores()

  const fourSquareApiUrl = getUrlForCoffeeStores(
    latLong, 
    limit, 
    'coffee')

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_DATA_KEY
    }
  }

  const response = await fetch(fourSquareApiUrl, options)
  const data = await response.json()
  // console.log('lib/coffee-stores data after calling fourSquareApiUrl:')
  // console.log(data)
  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      country: result.location.country,
      cross_street: result.location.cross_street || null,
      locality: result.location.locality,
      region: result.location.region,
      imgUrl: photos.length > 0 ?  photos[index] : null
    }
  })
}