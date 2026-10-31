"""Synthesize the card's music: a nadaswaram rendition of the pallavi of
Thyagaraja's "Seetha Kalyana Vaibhogame" (public-domain composition).

Mangala vadyam style: nadaswaram lead with gamakas over an ottu drone, thavil
and talam, in raga Kurinji (S R2 G3 M1 P D2 N3, sung from mandra Ni up to Dha)
on D, Khanda Chapu talam (5 counts, 2+3). The melody follows the pallavi as
commonly sung, arranged from memory rather than a published notation. The
reverb tail is wrapped onto the start so the track loops seamlessly.

    python3 scripts/make-music.py out.wav
    afconvert -f m4af -d aac -b 160000 out.wav public/audio/wedding-bgm.m4a   # macOS
    # or: ffmpeg -i out.wav -c:a aac -b:a 160k public/audio/wedding-bgm.m4a
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 176  # matras (counts) per minute
BEAT = 60 / BPM
CYCLE_BEATS = 5  # Khanda Chapu
SA = 146.83  # D3
rng = np.random.default_rng(7)

SCALE = {'S': 0, 'R': 2, 'G': 4, 'M': 5, 'P': 7, 'D': 9, 'N': 11}


def freq(note, base):
    """'G' -> G in base octave, "S'" upper octave, 'N.' lower octave."""
    semis = SCALE[note[0]] + 12 * note.count("'") - 12 * note.count('.')
    return base * 2 ** (semis / 12)


# ---- composition -----------------------------------------------------------
# Each line is two 5-count cycles of (note, counts); '-' is a rest.
ALAP = [
    [('S', 3), ('N.', 1), ('S', 1)],
    [('R', 2), ('G', 3)],
    [('G', 1), ('M', 1), ('G', 1), ('R', 2)],
    [('S', 4), ('-', 1)],
]
# "Seetha kalyana vaibhogame"
SEETHA = [[('S', 1), ('S', 1), ('N.', 1), ('S', 1), ('R', 1)],
          [('G', 1), ('M', .5), ('G', .5), ('R', 1), ('S', 2)]]
SEETHA_2 = [[('S', 1), ('R', 1), ('S', 1), ('N.', .5), ('S', .5), ('R', 1)],
            [('G', 1), ('M', 1), ('P', .5), ('M', .5), ('G', 1), ('R', .5), ('S', .5)]]
# "Rama kalyana vaibhogame"
RAMA = [[('G', 1), ('M', 1), ('P', 1), ('D', .5), ('P', .5), ('M', 1)],
        [('G', 1), ('M', 1), ('G', .5), ('R', .5), ('S', 2)]]
RAMA_2 = [[('G', .5), ('M', .5), ('P', 1), ('D', 1), ('P', 1), ('M', .5), ('P', .5)],
          [('D', 1), ('P', .5), ('M', .5), ('G', 1), ('R', .5), ('S', .5), ('N.', .5), ('S', .5)]]
# Higher answering phrases, in the manner of the anupallavi
HIGH = [[('P', 1), ('P', 1), ('D', 1), ('P', 1), ('M', 1)],
        [('P', 1), ('D', 1), ('P', 1), ('M', .5), ('G', .5), ('R', 1)]]
HIGH_2 = [[('M', 1), ('G', 1), ('M', 1), ('P', 1), ('M', .5), ('G', .5)],
          [('R', 1), ('G', 1), ('R', .5), ('S', .5), ('N.', 1), ('S', 1)]]
ENDING = [[('S', 4), ('-', 1)], [('-', 5)]]

MELODY = (ALAP + SEETHA + SEETHA_2 + RAMA + RAMA_2 + HIGH + HIGH_2
          + SEETHA + SEETHA_2 + RAMA_2 + SEETHA + ENDING)

# Thavil, one char per half-count: B=bass (left stick), c=crack (right-hand
# thimbles), r=soft ghost stroke, '.'=rest. 2+3 feel; the fill closes each
# pair of lines.
THAVIL = 'B.c.B.crc.'
THAVIL_FILL = 'B.crB.crcc'
TALAM_STRONG = (0, 2)  # the two claps of Khanda Chapu
DRUM_CYCLES = range(len(ALAP), len(MELODY) - len(ENDING))
BELL_CYCLES = (0, len(ALAP), len(ALAP) + 12)

N_CYCLES = len(MELODY)
LENGTH = N_CYCLES * CYCLE_BEATS * BEAT
TAIL = 6.0
L = int(LENGTH * SR)
N = int((LENGTH + TAIL) * SR)
T = np.arange(N) / SR


def place(buf, start, sig, pan=0.0, gain=1.0):
    """Mix mono sig into a stereo buffer at time `start` with constant-power pan."""
    i = int(start * SR)
    j = min(N, i + len(sig))
    if j <= i:
        return
    a = (pan + 1) * np.pi / 4
    buf[i:j, 0] += sig[: j - i] * np.cos(a) * gain
    buf[i:j, 1] += sig[: j - i] * np.sin(a) * gain


def smoothstep(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def loop_freq(f):
    """Nudge f so a whole number of cycles fits the loop (drones wrap cleanly)."""
    return round(f * LENGTH) / LENGTH


def reed(phase, harmonics, tilt, formants):
    """Double-reed tone: bright harmonic series shaped by vocal-tract-like formants."""
    out = np.zeros_like(phase)
    for h in range(1, harmonics + 1):
        hz = h * SA * 2  # rough partial position, for formant weighting only
        boost = 1 + sum(g * np.exp(-((hz - fc) / bw) ** 2) for fc, bw, g in formants)
        out += np.sin(h * phase) * boost / h**tilt
    return out


# ---- instruments -----------------------------------------------------------
def nadaswaram_line():
    """Render the whole melody as one legato line so gamakas slide between notes."""
    contour = np.zeros(N)
    amp = np.zeros(N)
    pos = 0.0
    prev = None
    for c, cycle in enumerate(MELODY):
        beats = sum(b for _, b in cycle)
        assert beats == CYCLE_BEATS, f'melody cycle {c} has {beats} beats'
        for note, b in cycle:
            dur = b * BEAT
            i, j = int(pos * SR), int((pos + dur) * SR)
            t = np.arange(j - i) / SR
            if note == '-':
                contour[i:j] = prev or SA * 2
                prev = None
            else:
                f = freq(note, SA * 2)
                seg = np.full(j - i, f)
                if prev and prev != f:  # meend: slide up/down from the previous note
                    g = min(0.11, dur * 0.35)
                    seg = np.where(t < g, prev * (f / prev) ** smoothstep(t / g), f)
                elif prev is None:  # entry from slightly below, typical of nadaswaram
                    seg = f * 2 ** (-0.6 / 12 * (1 - smoothstep(t / 0.08)))
                if dur >= 0.6:  # kampita: oscillating gamaka on held notes
                    depth = 0.012 * smoothstep((t - 0.3) / 0.5)
                    seg = seg * (1 + depth * np.sin(2 * np.pi * 5.6 * t))
                contour[i:j] = seg
                # tonguing: a quick dip at each new note, then a full sustained blow
                env = 0.55 + 0.45 * smoothstep(t / 0.04)
                env *= 1 - 0.1 * np.exp(-t * 3)
                amp[i:j] = env
                prev = f
            pos += dur
    # Smooth the amplitude so rests breathe off rather than click.
    k = int(0.03 * SR)
    amp = np.convolve(amp, np.ones(k) / k, 'same')
    phase = 2 * np.pi * np.cumsum(contour) / SR
    tone = reed(phase, 18, 0.75, [(1100, 500, 1.6), (2600, 700, 1.0)])
    breath = np.convolve(rng.standard_normal(N), np.ones(6) / 6, 'same') * 0.08
    return (tone + breath * tone.std()) * amp


def ottu():
    """Continuous reed drone on Sa with a little Pa, gently 'breathing'."""
    t = T[:L]
    sa = loop_freq(SA)
    pa = loop_freq(SA * 1.5)
    breathe = 1 + 0.12 * np.sin(2 * np.pi * loop_freq(0.11) * t)
    drone = reed(2 * np.pi * sa * t, 14, 0.9, [(900, 600, 0.8)])
    drone += 0.35 * reed(2 * np.pi * pa * t, 10, 1.0, [(900, 600, 0.8)])
    return drone * breathe


def thavil(kind):
    n = int(0.8 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    if kind == 'B':  # left-stick bass: deep boom with falling pitch
        f = 70 + 80 * np.exp(-t * 35)
        s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
        s += noise * np.exp(-t * 200) * 0.3
    else:  # right-hand thimble crack: sharp, ringing shell
        k = np.arange(64) / SR  # band-pass FIR around 2.8 kHz: crisp, not hissy
        bright = np.convolve(noise, np.hanning(64) * np.cos(2 * np.pi * 2800 * k) / 2.5, 'same')
        s = bright * np.exp(-t * 70) * 0.5
        s += 0.8 * np.sin(2 * np.pi * 520 * t) * np.exp(-t * 28)
        s += 0.3 * np.sin(2 * np.pi * 860 * t) * np.exp(-t * 40)
        if kind == 'r':
            s *= 0.35
    return s * np.minimum(1, t / 0.0015)


def talam(strong):
    """Small hand cymbals: inharmonic high partials, a quick 'ching'."""
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    base = 1850
    partials = [(1, 1.0), (1.47, 0.7), (2.09, 0.55), (2.56, 0.4), (3.31, 0.3)]
    s = sum(a * np.sin(2 * np.pi * base * r * t + rng.uniform(0, 6)) for r, a in partials)
    s *= np.exp(-t * (4 if strong else 9))
    return s * np.minimum(1, t / 0.001)


def bell():
    n = int(4 * SR)
    t = np.arange(n) / SR
    base = SA * 8
    partials = [(1, 1.0, 1.2), (2.76, 0.5, 2.0), (5.40, 0.25, 3.5), (8.93, 0.12, 5.0)]
    return sum(a * np.sin(2 * np.pi * base * r * t) * np.exp(-t * d) for r, a, d in partials) * np.minimum(1, t / 0.002)


def reverb(buf, seconds=2.2, mix=0.25):
    n_ir = int(seconds * SR)
    t = np.arange(n_ir) / SR
    out = buf.copy()
    size = 1 << int(np.ceil(np.log2(N + n_ir)))
    for ch in range(2):
        ir = rng.standard_normal(n_ir) * np.exp(-t * 6.9 / seconds)
        ir = np.convolve(ir, np.ones(8) / 8, 'same')  # darken
        ir /= np.sqrt(np.sum(ir**2))
        wet = np.fft.irfft(np.fft.rfft(buf[:, ch], size) * np.fft.rfft(ir, size), size)[:N]
        out[:, ch] = buf[:, ch] * (1 - mix) + wet * mix
    return out


def rms(x):
    return np.sqrt(np.mean(x**2)) or 1.0


# ---- arrangement -----------------------------------------------------------
mix = np.zeros((N, 2))

lead = nadaswaram_line()
place(mix, 0, lead / rms(lead[:L]), pan=0.1, gain=0.30)

drone = ottu()
place(mix, 0, drone / rms(drone), pan=-0.25, gain=0.09)

eighth = BEAT / 2
for c in DRUM_CYCLES:
    pattern = THAVIL_FILL if c % 4 == 3 else THAVIL
    assert len(pattern) == 2 * CYCLE_BEATS
    for i, stroke in enumerate(pattern):
        if stroke == '.':
            continue
        accent = 1.0 if i % 4 == 0 else 0.75
        humanize = rng.normal(0, 0.005)
        place(mix, c * CYCLE_BEATS * BEAT + i * eighth + humanize, thavil(stroke), pan=0.05, gain=0.22 * accent)
    # Talam: ching on every count, stronger on the claps.
    for b in range(CYCLE_BEATS):
        strong = b in TALAM_STRONG
        place(mix, (c * CYCLE_BEATS + b) * BEAT, talam(strong), pan=0.35, gain=0.05 if strong else 0.022)

for c in BELL_CYCLES:
    place(mix, c * CYCLE_BEATS * BEAT, bell(), pan=0.4, gain=0.06)

mix = reverb(mix)

# Wrap everything past the loop point back onto the start for a seamless loop.
track = mix[:L].copy()
track[: N - L] += mix[L:]

# Gentle soft-clip so the loud reed doesn't dominate, then peak at about -1 dBFS.
track = np.tanh(track / np.max(np.abs(track)) * 1.6)
track /= np.max(np.abs(track)) / 0.89

out = sys.argv[1] if len(sys.argv) > 1 else 'out.wav'
with wave.open(out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((track * 32767).astype('<i2').tobytes())
print(f'wrote {out}: {LENGTH:.1f}s')
