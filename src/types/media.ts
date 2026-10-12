/**
 * Media playback and metadata contracts for RONIN
 */

export interface VideoDimensions {
  readonly width: number;
  readonly height: number;
  readonly aspectRatio: string;
}

export interface VideoCodecs {
  readonly video: string;
  readonly audio: string;
}

export interface VideoShot {
  readonly id: string;
  readonly shotNumber: number;
  readonly title: string;
  readonly japaneseTitle: string;
  readonly description: string;
  readonly src: string;
  readonly webmSrc?: string;
  readonly originalFilename: string;
  readonly posterSrc?: string;
  readonly conceptSrc?: string;
  readonly durationSeconds: number;
  readonly dimensions: VideoDimensions;
  readonly fps: number;
  readonly codecs: VideoCodecs;
  readonly fileSizeBytes: number;
  readonly md5Checksum: string;
}

export interface AudioTrack {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly src: string;
  readonly originalFilename: string;
  readonly durationSeconds: number;
  readonly format: string;
  readonly sampleRate: number;
  readonly channels: number;
  readonly bitrateKbps: number;
  readonly fileSizeBytes: number;
  readonly genre: string;
  readonly md5Checksum: string;
}

export interface CompositeVideo {
  readonly src: string;
  readonly webmSrc?: string;
  readonly originalFilename: string;
  readonly durationSeconds: number;
  readonly dimensions: VideoDimensions;
  readonly fps: number;
  readonly codecs: VideoCodecs;
  readonly webmCodecs?: VideoCodecs;
  readonly fileSizeBytes: number;
  readonly webmFileSizeBytes?: number;
  readonly md5Checksum: string;
  readonly webmMd5Checksum?: string;
}

export interface MediaManifest {
  readonly projectName: string;
  readonly version: string;
  readonly playbackOrder: readonly string[];
  readonly shots: readonly VideoShot[];
  readonly audioTracks: readonly AudioTrack[];
  readonly composite: CompositeVideo;
  readonly defaultAudioTrackId: string;
}
