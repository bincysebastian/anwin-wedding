"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Crop } from "@/lib/content";

type ScratchCardProps = {
  coverSrc: string;
  coverCrop: Crop;
  revealSrc: string;
  cursorSrc: string;
  onReveal?: () => void;
};

/** Canvas resolution is fixed so the card can resize while travelling without losing scratches. */
const CANVAS_W = 784;
const CANVAS_H = 1072;
const BRUSH_RADIUS_CSS = 30;

/**
 * Fills its parent. Text and cursor sizes use container query units so they
 * scale with the card as it grows into the Memories slot.
 */
export function ScratchCard({ coverSrc, coverCrop, revealSrc, cursorSrc, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const scratched = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#364c48";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    const cover = new window.Image();
    cover.onload = () => {
      if (scratched.current) return;
      ctx.drawImage(
        cover,
        (coverCrop.left / 100) * CANVAS_W,
        (coverCrop.top / 100) * CANVAS_H,
        (coverCrop.width / 100) * CANVAS_W,
        (coverCrop.height / 100) * CANVAS_H
      );
    };
    cover.src = coverSrc;
  }, [coverSrc, coverCrop]);

  const toCanvas = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      css: { x: e.clientX - rect.left, y: e.clientY - rect.top },
      canvas: {
        x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
        y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
      },
      scale: CANVAS_W / rect.width,
    };
  };

  const scratchTo = (p: { x: number; y: number }, scale: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    scratched.current = true;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH_RADIUS_CSS * 2 * scale;
    ctx.beginPath();
    const from = last.current ?? p;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    drawing.current = true;
    canvasRef.current?.setPointerCapture(e.pointerId);
    last.current = null;
    const p = toCanvas(e);
    scratchTo(p.canvas, p.scale);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = toCanvas(e);
    setCursor(p.css);
    if (drawing.current) scratchTo(p.canvas, p.scale);
  };

  const onPointerUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (!revealed) onReveal?.();
    setRevealed(true);
  };

  return (
    <div className="@container relative size-full select-none">
      <Image src={revealSrc} alt="Anwin and Bia" fill sizes="400px" className="object-cover" />
      <motion.div
        className="absolute inset-x-0 top-[11.1cqw] text-center font-display leading-[1.333] text-forest lg:top-[21cqw] lg:leading-[1.15]"
        initial={false}
        animate={
          revealed
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 16, filter: "blur(8px)" }
        }
        transition={{ duration: 0.9, delay: revealed ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[9.94cqw] lg:text-[10.4cqw]">January</p>
        <p className="text-[7.9cqw] lg:text-[8.2cqw]">4th, 2027</p>
      </motion.div>

      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="absolute inset-0 size-full cursor-none touch-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => {
              onPointerUp();
              setCursor(null);
            }}
          />
        )}
      </AnimatePresence>

      {!revealed && (
        <motion.img
          src={cursorSrc}
          alt=""
          aria-hidden
          className="pointer-events-none absolute size-[22cqw]"
          style={{ x: "-50%", y: "-50%" }}
          animate={
            cursor
              ? { left: cursor.x, top: cursor.y, scale: 1 }
              : { left: "50%", top: "50%", scale: [1, 1.12, 1] }
          }
          transition={
            cursor
              ? { type: "spring", stiffness: 600, damping: 40, mass: 0.4 }
              : { scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.4 } }
          }
        />
      )}
    </div>
  );
}
