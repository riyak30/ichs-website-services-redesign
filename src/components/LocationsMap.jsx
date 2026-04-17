import { useEffect, useMemo, useRef, useState } from 'react'
import { hasGoogleMapsApiKey, loadGoogleMapsApi } from '../lib/googleMaps.js'

function getMarkerIcon(active) {
  const fill = active ? '#026E70' : '#871139'
  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 49C20 49 5 32.9 5 20.4C5 11.6 11.7 5 20 5S35 11.6 35 20.4C35 32.9 20 49 20 49Z" fill="${fill}" stroke="rgba(255,255,255,0.92)" stroke-width="2"/>
        <circle cx="20" cy="20" r="6.5" fill="white"/>
      </svg>
    `)}`,
    scaledSize: new window.google.maps.Size(active ? 34 : 30, active ? 46 : 40),
    anchor: new window.google.maps.Point(active ? 17 : 15, active ? 44 : 38),
  }
}

export default function LocationsMap({ locations, selectedLocationId, onSelectLocation }) {
  const mapElementRef = useRef(null)
  const mapRef = useRef(null)
  const infoWindowRef = useRef(null)
  const markersRef = useRef(new Map())
  const [mapError, setMapError] = useState('')

  const mappableLocations = useMemo(
    () => locations.filter(location => location.coordinates),
    [locations]
  )

  useEffect(() => {
    let cancelled = false

    loadGoogleMapsApi()
      .then((maps) => {
        if (cancelled || !mapElementRef.current) return

        if (!mapRef.current) {
          mapRef.current = new maps.Map(mapElementRef.current, {
            center: { lat: 47.6038, lng: -122.3126 },
            zoom: 10,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            gestureHandling: 'greedy',
          })
          infoWindowRef.current = new maps.InfoWindow()
        }

        const map = mapRef.current
        const infoWindow = infoWindowRef.current
        const markerIds = new Set()
        const bounds = new maps.LatLngBounds()

        mappableLocations.forEach((location) => {
          markerIds.add(location.id)
          const position = location.coordinates
          let marker = markersRef.current.get(location.id)

          if (!marker) {
            marker = new maps.Marker({
              map,
              position,
              title: location.name,
            })
            marker.addListener('click', () => {
              onSelectLocation(location.id)
              infoWindow.setContent(`
                <div style="font-family: Source Sans 3, sans-serif; min-width: 190px; padding: 4px 2px;">
                  <div style="font-family: Montserrat, sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #16343c;">${location.name}</div>
                  <div style="font-size: 12px; color: #5a6b70; line-height: 1.45;">${location.address}</div>
                </div>
              `)
              infoWindow.open({ map, anchor: marker })
            })
            markersRef.current.set(location.id, marker)
          }

          marker.setPosition(position)
          marker.setTitle(location.name)
          marker.setIcon(getMarkerIcon(location.id === selectedLocationId))
          marker.setMap(map)
          bounds.extend(position)
        })

        markersRef.current.forEach((marker, id) => {
          if (!markerIds.has(id)) {
            marker.setMap(null)
            markersRef.current.delete(id)
          }
        })

        setMapError('')

        if (!selectedLocationId && !bounds.isEmpty()) {
          map.fitBounds(bounds, 48)
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setMapError(error.message || 'Unable to load the map right now.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [mappableLocations, onSelectLocation, selectedLocationId])

  useEffect(() => {
    if (!window.google?.maps || !mapRef.current || !selectedLocationId) return

    const marker = markersRef.current.get(selectedLocationId)
    if (!marker) return
    const selectedLocation = mappableLocations.find(location => location.id === selectedLocationId)

    mapRef.current.panTo(marker.getPosition())
    mapRef.current.setZoom(Math.max(mapRef.current.getZoom() || 0, 11))
    if (selectedLocation && infoWindowRef.current) {
      infoWindowRef.current.setContent(`
        <div style="font-family: Source Sans 3, sans-serif; min-width: 190px; padding: 4px 2px;">
          <div style="font-family: Montserrat, sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #16343c;">${selectedLocation.name}</div>
          <div style="font-size: 12px; color: #5a6b70; line-height: 1.45;">${selectedLocation.address}</div>
        </div>
      `)
      infoWindowRef.current.open({ map: mapRef.current, anchor: marker })
    }
  }, [mappableLocations, selectedLocationId])

  const fallbackMessage = hasGoogleMapsApiKey()
    ? mapError
    : 'Add VITE_GOOGLE_MAPS_API_KEY to enable the live Google map and nationwide ZIP lookup.'

  return (
    <div
      style={{
        width: '100%',
        height: 340,
        borderRadius: 18,
        overflow: 'hidden',
        background: '#d9e8ec',
        position: 'relative',
      }}
    >
      <div ref={mapElementRef} style={{ width: '100%', height: '100%' }} />
      {fallbackMessage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            padding: 24,
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(217,232,236,0.92) 0%, rgba(206,223,227,0.95) 100%)',
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
              Live Map Unavailable
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
              {fallbackMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
