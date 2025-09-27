"use client";

import React, { useEffect, useRef } from "react";
import type p5 from "p5";

export type P5Instance = p5;

type SketchProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onInit?: (p: P5Instance) => void;
  sketch?: (p: P5Instance) => void;
};

export default function P5Sketch({
  width = 600,
  height = 400,
  className,
  style,
  onInit,
  sketch,
}: SketchProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<P5Instance | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      const mod = await import("p5");
      if (isCancelled) return;

      const P5 = mod.default as unknown as {
        new (sketch: (p: P5Instance) => void, node?: HTMLElement): P5Instance;
      };

      const defaultSketch = (p: P5Instance) => {
        p.setup = () => {
          p.createCanvas(width, height);
        };
        p.draw = () => {
          p.background(240);
          p.noStroke();
          p.fill(0);
          p.circle(width / 2, height / 2, 80);
        };
      };

      const instance = new (P5 as any)(sketch ?? defaultSketch, containerRef.current || undefined);
      p5Ref.current = instance;
      onInit?.(instance);
    }

    load();

    return () => {
      isCancelled = true;
      if (p5Ref.current && typeof (p5Ref.current as any).remove === "function") {
        (p5Ref.current as any).remove();
        p5Ref.current = null;
      }
    };
  }, [width, height, onInit, sketch]);

  return <div ref={containerRef} className={className} style={style} />;
}
