"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/lib/types";
import { isVideo, previewImage, youtubeEmbedUrl } from "@/lib/media";

export function ProductGallery({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(items[0]);
  const activeEmbed = isVideo(active) ? youtubeEmbedUrl(active.url) : null;
  return (
    <div>
      <div className="gallery-main image-frame tech-shadow">
        {activeEmbed ? (
          <iframe className="image-cover" src={activeEmbed} title={active.alt || "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <Image className="image-cover" src={active.url} alt={active.alt} width={1000} height={760} priority />
        )}
      </div>
      <div className="gallery-thumbs">
        {items.slice(0, 6).map((item) => (
          <button className="gallery-thumb card-hover" key={item.url} onClick={() => setActive(item)} aria-label={`Show ${item.alt}`}>
            <Image className="image-cover" src={previewImage(item)} alt="" width={300} height={300} />
            {isVideo(item) && <span className="thumb-play">▶</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
