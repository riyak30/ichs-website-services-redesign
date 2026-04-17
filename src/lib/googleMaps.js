const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-js-api'

let googleMapsPromise = null

function getGoogleMapsApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || ''
}

export function hasGoogleMapsApiKey() {
  return Boolean(getGoogleMapsApiKey())
}

export function loadGoogleMapsApi() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps is only available in the browser.'))
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps)
  }

  if (googleMapsPromise) {
    return googleMapsPromise
  }

  const apiKey = getGoogleMapsApiKey()
  if (!apiKey) {
    return Promise.reject(new Error('Missing VITE_GOOGLE_MAPS_API_KEY.'))
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = GOOGLE_MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps)
        return
      }
      reject(new Error('Google Maps loaded without the Maps namespace.'))
    }
    script.onerror = () => reject(new Error('Failed to load Google Maps.'))
    document.head.appendChild(script)
  }).catch((error) => {
    googleMapsPromise = null
    throw error
  })

  return googleMapsPromise
}

export async function geocodeZipCode(zipCode) {
  const maps = await loadGoogleMapsApi()
  const geocoder = new maps.Geocoder()

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      {
        address: zipCode,
        componentRestrictions: { country: 'US' },
      },
      (results, status) => {
        if (status !== 'OK' || !results?.length) {
          reject(new Error('Unable to locate that ZIP code.'))
          return
        }

        const location = results[0].geometry?.location
        if (!location) {
          reject(new Error('That ZIP code did not return map coordinates.'))
          return
        }

        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formattedAddress: results[0].formatted_address || zipCode,
        })
      }
    )
  })
}
