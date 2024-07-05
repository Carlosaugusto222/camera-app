const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;

// Substitua com o endereço IP da sua câmera e credenciais RTSP
const cameraIp = '192.168.1.100'; // substitua pelo endereço IP da sua câmera
const rtspUrl = `rtsp://username:password@${cameraIp}/stream`; // ajuste conforme necessário

app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  const ffmpeg = spawn('ffmpeg', [
    '-i', rtspUrl,
    '-f', 'mp4',
    '-vcodec', 'copy',
    '-an',
    '-movflags', 'frag_keyframe+empty_moov',
    'pipe:1'
  ]);

  ffmpeg.stdout.pipe(res);
  ffmpeg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpeg.on('close', (code) => {
    console.log(`FFmpeg process exited with code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
