import { promises as fs } from 'fs';
import path from 'path';

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'];

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music');

    const files = await fs.readdir(musicDir);

    const audioFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return AUDIO_EXTENSIONS.includes(ext);
      })
      .sort((a, b) => a.localeCompare(b))
      .map(file => `/music/${file}`);

    return Response.json({ playlist: audioFiles });
  } catch (error) {
    console.error('Error reading music directory:', error);
    return Response.json({ playlist: [] }, { status: 500 });
  }
}
