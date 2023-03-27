"""
Source:
https://jxxcarlson.medium.com/creating-audio-files-with-python-55cba61bfe73
"""
import numpy as np
import wavio

# Parameters
rate = 44100  # samples per second
T = 1  # sample duration (seconds)
freqs = (
    list(range(10, 50, 1))
    + list(range(50, 100, 5))
    + list(range(100, 1000, 10))
    + list(range(1000, 5000, 100))
    + list(range(5000, 10000, 250))
    + list(range(10000, 20500, 500))
)
for freq in freqs:
    f = float(freq)  # sound frequency (Hz)# Compute waveform samples
    t = np.linspace(0, T, T * rate, endpoint=False)
    x = np.sin(2 * np.pi * f * t)  # Write the samples to a file
    wavio.write(f"public/sounds/{freq}Hz.wav", x, rate, sampwidth=3)
