import { couple } from '../config'

const title = (e) => `${e.name} · ${couple.bride.name} & ${couple.groom.name}`
const details = (e) =>
  `${e.tagline}. Outfit: ${e.outfit}. Join ${couple.bride.name} & ${couple.groom.name} for our wedding celebrations.`

// 2026-12-19T15:08:00.000Z -> 20261219T150800Z
const toUtcStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function googleCalendarUrl(e) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title(e),
    dates: `${toUtcStamp(e.start)}/${toUtcStamp(e.end)}`,
    details: details(e),
    location: `${e.venueName}, ${e.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

const escapeIcs = (s) => s.replace(/[\;,]/g, (c) => `\\${c}`)

export function icsDataUrl(e) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${couple.bride.name} & ${couple.groom.name}//Wedding//EN`,
    'BEGIN:VEVENT',
    `UID:${e.id}-${toUtcStamp(e.start)}@wedding`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(e.start)}`,
    `DTEND:${toUtcStamp(e.end)}`,
    `SUMMARY:${escapeIcs(title(e))}`,
    `DESCRIPTION:${escapeIcs(details(e))}`,
    `LOCATION:${escapeIcs(`${e.venueName}, ${e.address}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}

export const mapsUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
