export const audioPlay = async (urlAudio: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const response = await fetch(urlAudio);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = 5.0;

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.onended = () => {
        resolve();
      };

      source.start(0);
    } catch (error) {
      reject(error);
    }
  });
};
