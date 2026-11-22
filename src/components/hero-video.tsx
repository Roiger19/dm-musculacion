"use client";

import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/data/videos";
import { PauseIcon, PlayIcon } from "./icons";

const VIDEO_ID = "hero-video";

/**
 * Video de ambiente del hero. Sin atributo autoPlay: se reproduce solo si el
 * usuario no pidió menos movimiento, no lo pausó y el video está a la vista.
 */
export function HeroVideo({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.dataset.userPaused = "true";
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.dataset.userPaused !== "true") {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      id={VIDEO_ID}
      className="absolute inset-0 size-full object-cover"
      src={clip.src}
      poster={clip.poster}
      width={clip.width}
      height={clip.height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}

/** Control de pausa (WCAG 2.2.2: movimiento automático de más de 5 s). Vive en el header. */
export function HeroVideoToggle() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = document.getElementById(VIDEO_ID) as HTMLVideoElement | null;
    if (!video) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    video.addEventListener("play", on);
    video.addEventListener("pause", off);
    return () => {
      video.removeEventListener("play", on);
      video.removeEventListener("pause", off);
    };
  }, []);

  function toggle() {
    const video = document.getElementById(VIDEO_ID) as HTMLVideoElement | null;
    if (!video) return;
    if (video.paused) {
      video.dataset.userPaused = "false";
      video.play().catch(() => {});
    } else {
      video.dataset.userPaused = "true";
      video.pause();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pausar video de fondo" : "Reproducir video de fondo"}
      className="grid size-11 place-items-center rounded-full border border-blanco/25 text-blanco transition-[color,border-color,transform] duration-150 ease-out-strong hover:border-menta hover:text-menta active:scale-[0.97]"
    >
      {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
    </button>
  );
}
