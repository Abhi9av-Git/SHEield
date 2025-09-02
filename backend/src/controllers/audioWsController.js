const fs = require('fs');
const path = require('path');

// This function handles incoming audio data chunks from the WebSocket
function handleAudioWS(ws) {
    let chunkIndex = 0;
    ws.on('message', (data) => {
        // Save each chunk as a file (you can change this logic as needed)
        console.log('Received audio chunk:', data.length || data.byteLength);
        const filename = `audio_chunk_${Date.now()}_${chunkIndex++}.webm`;
        const filePath = path.join(__dirname, '../../uploads', filename);

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error('Error saving audio chunk:', err);
                ws.send(JSON.stringify({ status: 'error', message: 'Failed to save audio.' }));
            } else {
                console.log('Audio chunk saved successfully:', filename);
                ws.send(JSON.stringify({ status: 'success', filename }));
            }
        });
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
}

module.exports = { handleAudioWS };