import React from 'react'
import useSpeechToText from 'react-hook-speech-to-text';

export default function SpeechToText() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    return (
        <>
        <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
            <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {/* //idhr apka mic wala log ayega, aur isRecording true hoga toh stopSpeechToText chalega, nhi toh ////startSpeechToText */}
                    Click
            </button>
        </>
    )
}
