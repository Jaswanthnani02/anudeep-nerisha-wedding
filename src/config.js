// Everything personal about the card lives here. Replace the sample content
// with your own names, dates, venues and photos.

export const couple = {
  bride: { name: 'Anudeep', fullName: 'Anudeep Ravi', parents: '' },
  groom: { name: 'Nerisha', fullName: 'Nerisha Rani', parents: '' },
  // Shown in Telugu script above the names; set to '' to hide.
  teluguTitle: 'శుభ వివాహం',
  hashtag: '#AnudeepWedsNerisha',
}

export const wedding = {
  // Muhurtam start, used by the countdown. Include the UTC offset.
  date: '2026-12-19T09:08:00-06:00',
  dateLabel: 'Saturday, 19 December 2026',
  cityLabel: 'Austin, Texas',
}

// The opening blessing, as on a traditional Telugu subhalekha.
export const blessings = {
  invocation: 'శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు',
  transliteration: 'Srirastu · Subhamastu · Avighnamastu',
  meaning: 'May there be prosperity, may all be auspicious, may there be no obstacles',
  venkateswara: 'ఓం నమో వేంకటేశాయ',
  venkateswaraLatin: 'Om Namo Venkatesaya',
  // Change to your family deity (kula daivam) if you like.
  deities: 'With the divine blessings of Lord Ganesha and Sri Venkateswara Swamy',
}

export const invitation = {
  blessing: 'శ్రీ గణేశాయ నమః',
  intro:
    'With the blessings of our elders and the grace of the Almighty, our families joyfully invite you to celebrate the wedding of',
  closing:
    'Your presence and blessings will make our celebrations complete. We look forward to celebrating with you.',
}

// Each event becomes a tab with calendar and map links.
// `start`/`end` must include a UTC offset so calendar links are correct.
export const events = [
  {
    id: 'haldi',
    name: 'Haldi',
    telugu: 'పసుపు',
    tagline: 'A morning of turmeric, laughter and blessings',
    dateLabel: 'Thursday, 17 December 2026',
    timeLabel: '10:00 AM – 1:00 PM',
    start: '2026-12-17T10:00:00-06:00',
    end: '2026-12-17T13:00:00-06:00',
    venueName: 'The Reddy Residence',
    address: '1200 Sample Lane, Austin, TX 78701',
    outfit: 'Shades of yellow',
    accent: '#e8a317',
  },
  {
    id: 'sangeeth',
    name: 'Sangeeth',
    telugu: 'సంగీత్',
    tagline: 'An evening of music, dance and celebration',
    dateLabel: 'Friday, 18 December 2026',
    timeLabel: '6:30 PM – 11:00 PM',
    start: '2026-12-18T18:30:00-06:00',
    end: '2026-12-18T23:00:00-06:00',
    venueName: 'Lakeside Pavilion',
    address: '45 Example Drive, Austin, TX 78702',
    outfit: 'Indo-western glam',
    accent: '#a4161a',
  },
  {
    id: 'muhurtam',
    name: 'Muhurtam',
    telugu: 'ముహూర్తం',
    tagline: 'The sacred moment two families become one',
    dateLabel: 'Saturday, 19 December 2026',
    timeLabel: 'Muhurtam at 9:08 AM',
    start: '2026-12-19T09:08:00-06:00',
    end: '2026-12-19T13:00:00-06:00',
    venueName: 'The Grand Hall',
    address: '900 Celebration Blvd, Austin, TX 78703',
    outfit: 'Indian traditional',
    accent: '#6b0f1a',
  },
]

// Rituals shown in the Traditions section.
export const traditions = [
  { name: 'Pelli Kuthuru & Pelli Koduku', telugu: 'పెళ్లి కూతురు', text: 'The bride and groom are bathed in turmeric and blessed by the women of the family, marking the start of the wedding rituals.' },
  { name: 'Kashi Yatra', telugu: 'కాశీ యాత్ర', text: 'The groom playfully sets off for a life of study and renunciation, until the bride\'s brother persuades him to stay and marry.' },
  { name: 'Jeelakarra Bellam', telugu: 'జీలకర్ర బెల్లం', text: 'At the auspicious muhurtam, the couple place a paste of cumin and jaggery on each other\'s heads, a bond that is meant to be inseparable.' },
  { name: 'Mangalya Dharana', telugu: 'మాంగల్య ధారణ', text: 'The groom ties the sacred mangalsutra around the bride\'s neck with three knots, as the guests shower akshintalu.' },
  { name: 'Talambralu', telugu: 'తలంబ్రాలు', text: 'The couple pour turmeric-coloured rice over each other, a joyful and often competitive ritual wishing prosperity.' },
  { name: 'Saptapadi', telugu: 'సప్తపది', text: 'Seven steps around the sacred fire, each one a vow for the life the couple will share together.' },
]

// Photos for the Moments strip. `src` is the strip image, `full` the larger
// version opened when a guest taps it. Keep w/h equal to the image's real
// pixel size so each card keeps its shape. Regenerate the web copies from the
// originals in photos/ with: python3 scripts/prepare-photos.py
export const photos = [
  { src: 'img/moments/photo-1.jpg', full: 'img/moments/photo-1-full.jpg', w: 1100, h: 825, alt: 'The couple laughing together outside on a bright day' },
  { src: 'img/moments/photo-2.jpg', full: 'img/moments/photo-2-full.jpg', w: 800, h: 1067, alt: 'The couple smiling at each other by turquoise water under a blue sky', position: '50% 60%' },
  { src: 'img/moments/photo-3.jpg', full: 'img/moments/photo-3-full.jpg', w: 1100, h: 825, alt: 'The couple beside a Ganesha statue in front of a temple at night' },
  { src: 'img/moments/photo-4.jpg', full: 'img/moments/photo-4-full.jpg', w: 800, h: 1067, alt: 'The couple looking at a phone together in front of a temple gopuram', position: '50% 65%' },
]

export const rsvp = {
  deadlineLabel: 'Kindly respond by 15 November 2026',
  maxGuests: 6,
  // Where RSVPs are sent. Create a free form at https://formspree.io, then
  // paste its endpoint here, e.g. 'https://formspree.io/f/abcdwxyz'.
  // Responses arrive by email and in the Formspree dashboard.
  endpoint: null,
}

// Looping background music, started when the guest opens the invitation.
// The default is an original nadaswaram rendition of "Seetha Kalyana Vaibhogame"
// made by scripts/make-music.py. Swap in your own file (mp3/m4a in public/audio), or set
// to null to turn music off.
export const music = 'audio/wedding-bgm.m4a'
