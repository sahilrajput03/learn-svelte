export const speak = (text) => {
    console.log('speaking now..')
    // const text = 'This is text to speech example by Sahil.';
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Set language
    speech.rate = 1; // Adjust speed (0.1 to 10)
    speech.pitch = 1; // Adjust pitch (0 to 2)
    speech.volume = 1; // Adjust volume (0 to 1)

    window.speechSynthesis.speak(speech);
};

export const getTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return timeString
}
