export type MouseEventHandler = (e: MouseEvent) => void;

export type VoiceT = {
    name: string;
    lang: string;
    localService: string;
    default: boolean;
    voiceURI: string;
};