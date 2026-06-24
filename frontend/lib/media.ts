import type { MediaItem } from "@/lib/types";

// Extract a YouTube video id from any common URL shape (watch, youtu.be, embed, shorts).
export function youtubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function youtubeEmbedUrl(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function youtubeThumbnail(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// True when a media item should be rendered as an embedded video rather than an image.
export function isVideo(item: MediaItem): boolean {
  return item.mediaType === "video" || youtubeId(item.url) !== null;
}

// A usable preview image for any media item (the image itself, or a YouTube thumbnail).
export function previewImage(item: MediaItem): string {
  return youtubeThumbnail(item.url) ?? item.url;
}
