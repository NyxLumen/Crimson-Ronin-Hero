import { MediaManifest } from '../types/media';

/**
 * RONIN Phase 2C Verified Media Manifest
 * Contains verified active runtime technical metadata and playback specifications.
 * Updated following Phase 2C asset audit & cleanup.
 */
export const MEDIA_MANIFEST: MediaManifest = {
  projectName: 'RONIN (深紅)',
  version: '0.2.0',
  playbackOrder: ['shot-composite'],
  defaultAudioTrackId: 'track-01',

  shots: [
    {
      id: 'shot-composite',
      shotNumber: 1,
      title: 'Crimson Ronin Master Sequence',
      japaneseTitle: '深紅浪人',
      description: 'Continuous 3-shot cinematic montage (Dolly Approach, Island Vista, Twisted Pine) beneath the crimson sun',
      src: '/media/video.mp4',
      webmSrc: '/media/video.webm',
      originalFilename: 'video.mp4',
      durationSeconds: 24.009,
      dimensions: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      fps: 30.0,
      codecs: {
        video: 'H.264 / AVC (High Profile, yuv420p)',
        audio: 'AAC (Stereo, 44100 Hz)',
      },
      fileSizeBytes: 26919525,
      md5Checksum: '987cc849b558a5b882555f4b53bf0676',
    },
  ],

  audioTracks: [
    {
      id: 'track-01',
      title: 'Crimson Sunset Contemplation',
      artist: 'yorforgerdeeznuts',
      src: '/media/track1.mp3',
      originalFilename: 'track1.mp3',
      durationSeconds: 60.048,
      format: 'MP3 (MPEG audio layer 3)',
      sampleRate: 48000,
      channels: 2,
      bitrateKbps: 192,
      fileSizeBytes: 1462531,
      genre:
        'Traditional Japanese meditative instrumental; shakuhachi with breathy melodies, delicate koto plucks, wind ambience and warm drone',
      md5Checksum: '615606450cffe2981543fb4e7a47ff55',
    },
  ],

  composite: {
    src: '/media/video.mp4',
    webmSrc: '/media/video.webm',
    originalFilename: 'video.mp4',
    durationSeconds: 24.009,
    dimensions: {
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
    },
    fps: 30.0,
    codecs: {
      video: 'H.264 / AVC (High Profile, yuv420p)',
      audio: 'AAC (Stereo, 44100 Hz)',
    },
    webmCodecs: {
      video: 'VP9 Profile 0 (yuv420p, bt709)',
      audio: 'Opus (Stereo, 48000 Hz)',
    },
    fileSizeBytes: 26919525,
    webmFileSizeBytes: 13006694,
    md5Checksum: '987cc849b558a5b882555f4b53bf0676',
    webmMd5Checksum: '2b0694acdceec2e41e814f85aed66094',
  },
};
