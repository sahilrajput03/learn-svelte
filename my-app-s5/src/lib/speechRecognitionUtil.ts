export function getVoices() {
    // Note: We need to do this otherwise we get empty array in voices
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }

        window.speechSynthesis.addEventListener('voiceschanged', () => {
            voices = window.speechSynthesis.getVoices();
            resolve(voices);
        });
    });
}