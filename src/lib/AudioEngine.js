const AudioEngine = {
  audioContext: null,
  oscillators: [],
  gainNodes: [],
  noiseNode: null,
  variationInterval: null,

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  stop() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        /* already stopped */
      }
    });
    this.oscillators = [];
    this.gainNodes = [];
    if (this.noiseNode) {
      try {
        this.noiseNode.disconnect();
      } catch {
        /* already disconnected */
      }
      this.noiseNode = null;
    }
    if (this.variationInterval) {
      clearInterval(this.variationInterval);
      this.variationInterval = null;
    }
  },

  addVariation(type) {
    this.variationInterval = setInterval(() => {
      if (this.gainNodes.length > 0) {
        this.gainNodes.forEach((gain) => {
          const currentGain = gain.gain.value;
          const variation = currentGain * (0.85 + Math.random() * 0.3);
          gain.gain.setValueAtTime(currentGain, this.audioContext.currentTime);
          gain.gain.linearRampToValueAtTime(variation, this.audioContext.currentTime + 3);
          gain.gain.linearRampToValueAtTime(currentGain, this.audioContext.currentTime + 6);
        });

        if (type === 'binaural' && this.oscillators.length >= 2) {
          const freqShift = -0.5 + Math.random() * 1;
          this.oscillators.forEach((osc) => {
            const currentFreq = osc.frequency.value;
            osc.frequency.setValueAtTime(currentFreq, this.audioContext.currentTime);
            osc.frequency.linearRampToValueAtTime(
              currentFreq + freqShift,
              this.audioContext.currentTime + 3,
            );
            osc.frequency.linearRampToValueAtTime(currentFreq, this.audioContext.currentTime + 6);
          });
        }
      }
    }, 45000);
  },

  createBinauralBeat(baseFreq, beatFreq, volume = 0.2) {
    this.init();
    this.stop();

    const leftOsc = this.audioContext.createOscillator();
    const rightOsc = this.audioContext.createOscillator();
    const leftGain = this.audioContext.createGain();
    const rightGain = this.audioContext.createGain();
    const merger = this.audioContext.createChannelMerger(2);
    const masterGain = this.audioContext.createGain();

    leftOsc.frequency.value = baseFreq;
    rightOsc.frequency.value = baseFreq + beatFreq;
    leftGain.gain.value = volume;
    rightGain.gain.value = volume;
    masterGain.gain.value = 1;

    leftOsc.connect(leftGain);
    rightOsc.connect(rightGain);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(masterGain);
    masterGain.connect(this.audioContext.destination);

    leftOsc.start();
    rightOsc.start();

    this.oscillators.push(leftOsc, rightOsc);
    this.gainNodes.push(leftGain, rightGain, masterGain);
    this.addVariation('binaural');
  },

  _createNoise(generator, volume) {
    this.init();
    this.stop();

    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    generator(output, bufferSize);

    const source = this.audioContext.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    source.start();

    this.noiseNode = source;
    this.gainNodes.push(gainNode);
    this.addVariation('noise');
  },

  createWhiteNoise(volume = 0.1) {
    this._createNoise((output, size) => {
      for (let i = 0; i < size; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    }, volume);
  },

  createBrownNoise(volume = 0.15) {
    this._createNoise((output, size) => {
      let lastOut = 0.0;
      for (let i = 0; i < size; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }, volume);
  },

  createPinkNoise(volume = 0.12) {
    this._createNoise((output, size) => {
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < size; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }, volume);
  },

  createMeditationTone(volume = 0.15) {
    this.init();
    this.stop();

    const frequencies = [432, 528, 639];
    const gains = [volume * 0.6, volume * 0.8, volume * 0.4];

    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = gains[i];

      gain.gain.setValueAtTime(0, this.audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(gains[i], this.audioContext.currentTime + 2);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();

      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });

    this.addVariation('meditation');
  },
};

export default AudioEngine;
