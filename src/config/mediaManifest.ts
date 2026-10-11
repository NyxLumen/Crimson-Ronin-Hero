import { MediaManifest } from '../types/media';

/**
 * RONIN Phase 0 Verified Media Manifest
 * Contains exact technical metadata, discovered filenames, and playback specifications.
 */
export const MEDIA_MANIFEST: MediaManifest = {
  projectName: 'RONIN (深紅)',
  version: '0.1.0',
  playbackOrder: ['shot-01', 'shot-02', 'shot-03'],
  defaultAudioTrackId: 'track-01',

  shots: [
    {
      id: 'shot-01',
      shotNumber: 1,
      title: 'Cinematic Approach',
      japaneseTitle: '接近',
      description: 'Cinematic dolly-zoom approach toward the ronin beneath the crimson sun',
      src: '/media/ronin-shot-01-dolly-zoom_1080p_20261011131841.mp4',
      originalFilename: 'ronin-shot-01-dolly-zoom_1080p_20261011131841.mp4',
      posterSrc: '/posters/shot-01-poster.jpg',
      conceptSrc: '/posters/ronin-concept.png',
      durationSeconds: 8.0,
      dimensions: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      fps: 24.0,
      codecs: {
        video: 'H.264 / AVC (High Profile, yuv420p)',
        audio: 'AAC (Stereo, 48000 Hz)',
      },
      fileSizeBytes: 5769375,
      md5Checksum: '4f727c1d5936c6d1e2f5cbeb3370fcd6',
    },
    {
      id: 'shot-02',
      shotNumber: 2,
      title: 'Overhead Island Vista',
      japaneseTitle: '俯瞰',
      description: 'Overhead view of the island with rippling crimson water and ronin silhouette',
      src: '/media/Animating_still_water_and_tree_20261011132055.mp4',
      originalFilename: 'Animating_still_water_and_tree_20261011132055.mp4',
      posterSrc: '/posters/shot-02-poster.jpg',
      conceptSrc: '/posters/shot-02-concept.jpg',
      durationSeconds: 8.0,
      dimensions: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      fps: 24.0,
      codecs: {
        video: 'H.264 / AVC (High Profile, yuv420p)',
        audio: 'AAC (Stereo, 48000 Hz)',
      },
      fileSizeBytes: 5714006,
      md5Checksum: '4df0276de5d4bd71292846abce9801e0',
    },
    {
      id: 'shot-03',
      shotNumber: 3,
      title: 'Twisted Pine Silhouette',
      japaneseTitle: '松樹',
      description: 'Eye-level close-up of the twisted pine tree foliage in the wind against the red sun',
      src: '/media/Wind_moving_pine_tree_foliage_20261011133255.mp4',
      originalFilename: 'Wind_moving_pine_tree_foliage_20261011133255.mp4',
      posterSrc: '/posters/shot-03-poster.jpg',
      durationSeconds: 8.0,
      dimensions: {
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
      },
      fps: 24.0,
      codecs: {
        video: 'H.264 / AVC (High Profile, yuv420p)',
        audio: 'AAC (Stereo, 48000 Hz)',
      },
      fileSizeBytes: 4250761,
      md5Checksum: '3a9c2ba567887f65ca9d92b5cb8b1c9d',
    },
  ],

  audioTracks: [
    {
      id: 'track-01',
      title: 'Crimden Sunset Contemplation',
      artist: 'yorforgerdeeznuts',
      src: '/media/track1.mp3',
      originalFilename: 'Crimden Sunset Contemplation - usesuno.com.mp3',
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
    {
      id: 'track-02',
      title: 'Crimden Sunset Contemplation (Variation 2)',
      artist: 'yorforgerdeeznuts',
      src: '/media/track2.mp3',
      originalFilename: 'Crimden Sunset Contemplation - usesuno.com(1).mp3',
      durationSeconds: 60.048,
      format: 'MP3 (MPEG audio layer 3)',
      sampleRate: 48000,
      channels: 2,
      bitrateKbps: 192,
      fileSizeBytes: 1461424,
      genre:
        'Traditional Japanese music, free-time slow meditation; shakuhachi with breath pauses, delicate koto plucks, ambient drone',
      md5Checksum: '41acdf2f7181fdeeedbc27cbeed264d6',
    },
  ],

  composite: {
    src: '/media/video.mp4',
    originalFilename: 'lv_0_20261011135254.mp4',
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
    fileSizeBytes: 27015789,
    md5Checksum: 'f7640728e8366aed19cf36f096c5fdd3',
  },
};
