"use client";

import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/data/videos";
import { PauseIcon, PlayIcon } from "./icons";

/** Solo un clip suena a la vez. */
const activos = new Set<HTMLVideoElement>();

export function VideoClip({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    activos.add(video);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    io.observe(video);
    return () => {
      io.disconnect();
      activos.delete(video);
    };
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      activos.forEach((v) => v !== video && v.pause());
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-carbon"
      style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
    >
      <video
        ref={ref}
        className="size-full object-cover"
        src={clip.src}
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pausar" : "Reproducir"}: ${clip.titulo}`}
        className="group absolute inset-0 grid place-items-center"
      >
        <span
          className={`grid size-14 place-items-center rounded-full bg-esmeralda text-carbon transition-[opacity,transform] duration-200 ease-out-strong group-active:scale-[0.97] ${
            playing ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"
          }`}
        >
          {playing ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
        </span>
      </button>
    </div>
  );
}
