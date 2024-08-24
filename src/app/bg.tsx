"use client";
import { Debug } from "@lib/canvas_debug";
import {
  DOT_SIZE_KEY,
  GRID_ENABLED_KEY,
  REFRESH_RATE_KEY,
  STEP_BY_KEY,
} from "@lib/const";
import { useCallback, useEffect, useRef } from "react";
import { match } from "ts-pattern";

const DEVICE_PIXEL_RATIO =
  typeof devicePixelRatio === "undefined" ? 1 : devicePixelRatio;
const DOT_RADIUS = DEVICE_PIXEL_RATIO * 0.75;
const EFFECT_RADIUS = 75;
const STEP_BY = 30 * DEVICE_PIXEL_RATIO;

const MULTIPLIER_TABLE = [
  [1, 1.25],
  [0.9, 1.1],
  [0.9, 1.45],
  [0.8, 1.1],
  [1, 1.4],
  [1.1, 1.1],
  [1.2, 1.2],
  [0.9, 0.9],
  [1, 1],
];

function drawDot(
  x: number,
  y: number,
  mouseX: number,
  mouseY: number,
  isClicking: boolean,
  dotColor: string,
  dotSize: number,
  ctx: CanvasRenderingContext2D,
) {
  const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
  const effectRadius = EFFECT_RADIUS * (isClicking ? 1.5 : 1);
  const radius =
    dotSize +
    DEVICE_PIXEL_RATIO *
      ((effectRadius - Math.min(distance, effectRadius)) / effectRadius);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = dotColor;
  ctx.fill();
}

export default function Background(_: { children?: never }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const debug_target = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isClicking = useRef(false);
  const showDebug = useRef(Debug.showDebug);
  const stepBy = useRef(STEP_BY);
  const frame = useRef(0);
  const color = useRef("white");
  const dotSize = useRef(DOT_RADIUS);
  const refreshRate = useRef(10);
  const multiplier = useRef([1, 1]);
  const gridEnabled = useRef(true);

  const getClosestDotFn = useCallback((x: number, y: number) => {
    const half = stepBy.current / 2;
    const baseX = Math.floor(x / stepBy.current) * stepBy.current + half;
    const baseY = Math.floor(y / stepBy.current) * stepBy.current + half;
    return [baseX, baseY];
  }, []);
  const getClosestDot = useRef(getClosestDotFn);
  getClosestDot.current = getClosestDotFn;

  const renderMouseRegionFn = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // re-render only the dots around the mouse
      const [baseX, baseY] = getClosestDot.current(
        mouseX.current,
        mouseY.current,
      );
      const effectRadius =
        EFFECT_RADIUS *
        stepBy.current *
        multiplier.current[Number(isClicking.current)];
      const effectRatio = effectRadius / stepBy.current;

      // area should be the size of EFFECT_RADIUS
      const startX = Math.max(0, baseX - effectRatio - stepBy.current);
      const startY = Math.max(0, baseY - effectRatio - stepBy.current);
      const endX = Math.min(canvas.width, baseX + effectRatio + stepBy.current);
      const endY = Math.min(
        canvas.height,
        baseY + effectRatio + stepBy.current,
      );

      ctx.clearRect(startX, startY, endX - startX, endY - startY);

      // draw a red rectangle around the updated area
      if (showDebug.current) {
        ctx.fillStyle = "#FF000022";
        ctx.fillRect(startX, startY, endX - startX, endY - startY);
      }

      const [startX_, startY_] = getClosestDot.current(startX, startY);
      for (let x = startX_; x <= endX; x += stepBy.current) {
        for (let y = startY_; y <= endY; y += stepBy.current) {
          drawDot(
            x,
            y,
            mouseX.current,
            mouseY.current,
            isClicking.current,
            color.current,
            dotSize.current,
            ctx,
          );
        }
      }
    },
    [],
  );
  const renderMouseRegion = useRef(renderMouseRegionFn);
  renderMouseRegion.current = renderMouseRegionFn;

  const update = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      if (frame.current === 0) {
        stepBy.current = Number(
          localStorage.getItem(STEP_BY_KEY) ??
            localStorage.setItem(STEP_BY_KEY, STEP_BY.toString()) ??
            STEP_BY,
        );
        dotSize.current = Number(
          localStorage.getItem(DOT_SIZE_KEY) ??
            localStorage.setItem(DOT_SIZE_KEY, DOT_RADIUS.toString()) ??
            DOT_RADIUS,
        );
        gridEnabled.current =
          localStorage.getItem(GRID_ENABLED_KEY) !== "false";
        refreshRate.current = match(localStorage.getItem(REFRESH_RATE_KEY))
          .with("low", () => 20)
          .with("normal", () => 10)
          .with("high", () => 5)
          .with("realtime", () => 2)
          .otherwise(() => {
            localStorage.setItem(REFRESH_RATE_KEY, "normal");
            return 10;
          });
        color.current = `hsl(${getComputedStyle(document.body).getPropertyValue("--nextui-foreground-500")})`;

        multiplier.current = MULTIPLIER_TABLE[(stepBy.current - 10) / 5];
      }

      if (frame.current % refreshRate.current === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (
          let x = 0 + stepBy.current / 2;
          x < canvas.width;
          x += stepBy.current
        ) {
          for (
            let y = 0 + stepBy.current / 2;
            y < canvas.height;
            y += stepBy.current
          ) {
            drawDot(
              x,
              y,
              mouseX.current,
              mouseY.current,
              isClicking.current,
              color.current,
              dotSize.current,
              ctx,
            );
          }
        }
      } else if (!showDebug.current) {
        renderMouseRegion.current(ctx, canvas);
      }
      if (showDebug.current) {
        renderMouseRegion.current(ctx, canvas);
      }

      frame.current = (frame.current + 1) % 30;
    },
    [],
  );

  const updateRef = useRef(update);
  updateRef.current = update;

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      mouseX.current = event.clientX * devicePixelRatio;
      mouseY.current = event.clientY * devicePixelRatio;
    });
    window.addEventListener("mousedown", () => {
      isClicking.current = true;
    });
    window.addEventListener("mouseup", () => {
      isClicking.current = false;
    });
    window.addEventListener("resize", () => {
      const c = canvas.current;
      if (c == null) return;
      c.width = devicePixelRatio * window.innerWidth;
      c.height = devicePixelRatio * window.innerHeight;
    });
  }, []);

  useEffect(() => {
    const enabled = localStorage.getItem(GRID_ENABLED_KEY);

    if (enabled == null) {
      // @ts-ignore
      const isMobile = navigator.userAgentData?.mobile;
      const isMobileReader =
        !/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      localStorage.setItem(
        GRID_ENABLED_KEY,
        `${!(isMobile ?? isMobileReader)}`,
      );
      console.log("bg set");
      gridEnabled.current = !(isMobile ?? isMobileReader);
    } else if (enabled === "false") {
      gridEnabled.current = false;
    }

    if (debug_target.current == null) return;
    const c = canvas.current;
    if (c == null) return;
    c.width = devicePixelRatio * window.innerWidth;
    c.height = devicePixelRatio * window.innerHeight;
    const ctx = c.getContext("2d");
    const debug = new Debug(debug_target.current, mouseX, mouseY);
    showDebug.current = Debug.showDebug;

    function animate(frame: number) {
      if (ctx == null || canvas.current == null)
        throw new Error("Canvas not initialized");

      debug.render(frame);

      if (!gridEnabled.current) {
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        gridEnabled.current =
          localStorage.getItem(GRID_ENABLED_KEY) !== "false";
      } else updateRef.current(ctx, canvas.current);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="fixed size-full top-0 left-0 pointer-events-none">
      <div
        ref={debug_target}
        className="absolute top-0 left-0 z-[9999] p-4 bg-white dark:bg-black bg-opacity-75 select-none pointer-events-none"
      />
      <canvas
        ref={canvas}
        className="absolute top-0 left-0 size-full pointer-events-none"
      />
    </div>
  );
}
