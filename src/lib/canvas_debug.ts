import type { MutableRefObject } from "react";

const debug =
  typeof location !== "undefined" &&
  new URLSearchParams(location.search).get("debug");

export class Debug {
  static readonly FRAME_OFFSET = 10;
  static get showDebug() {
    if (debug === false) return process.env.NODE_ENV === "development";
    if (debug === "false") return false;
    return process.env.NODE_ENV === "development" || debug != null;
  }
  private t: [number, number][] = [];
  private min = Number.MAX_SAFE_INTEGER;
  private max = 0;
  private avg_c: number[] = [];
  private stutter = 0;

  private stutter_flag_time = 0;

  public constructor(
    private readonly target: HTMLElement,
    private readonly mouseX: MutableRefObject<number>,
    private readonly mouseY: MutableRefObject<number>,
  ) {
    if (!Debug.showDebug) target.style.display = "none";
  }

  public render(now: number) {
    if (Debug.showDebug) {
      const perf = performance.now();
      this.t.unshift([now, perf]);

      if (this.t.length > Debug.FRAME_OFFSET) {
        const [_, prevFrame] = this.t[1]!;
        const frametime = perf - prevFrame;
        const frameStutter = this.stutter * 3.5 < frametime;
        this.stutter_flag_time = Math.max(
          0,
          frameStutter ? 1000 : this.stutter_flag_time - frametime,
        );
        const stutter_html =
          this.stutter_flag_time > 0
            ? `<div class="flex flex-row w-max items-center justify-center gap-1">
              <div
                class="size-4 rounded-sm"
                style="background-color: red; opacity: ${(this.stutter_flag_time / 10).toFixed(0)}%;"
              ></div>
              <p style="color: red">Stutter detected!</p>
            </div>`
            : "<br>";
        if (!frameStutter) {
          this.stutter =
            (this.stutter * Debug.FRAME_OFFSET + frametime) /
            (Debug.FRAME_OFFSET + 1);
        } else if (this.stutter === 0) this.stutter = frametime;

        const [t0] = this.t.pop()!;
        const fps = (1000 * Debug.FRAME_OFFSET) / (now - t0);
        this.min = Math.min(this.min, fps);
        this.max = Math.max(this.max, fps);
        this.avg_c = [...this.avg_c, fps].slice(-60);

        const avg = this.avg_c.reduce((a, b) => a + b) / this.avg_c.length;
        // biome-ignore format:
        this.target.innerHTML = `<div class="flex flex-col w-48">
          <p>FPS: ${fps.toFixed(0)}</p>
          <p>Max FPS: ${this.max.toFixed(0)}</p>
          <p>Min FPS: ${this.min.toFixed(0)}</p>
          <p>Avg FPS: ${Number(avg.toFixed(2))}</p>
          <p>Frame time: ${Number(frametime.toFixed(2))}ms</p>
          <p>Mouse: ${this.mouseX.current}, ${this.mouseY.current}</p>
          ${stutter_html}
        </div>`;
      }

      if (this.t.length > Debug.FRAME_OFFSET)
        this.t = this.t.slice(0, Debug.FRAME_OFFSET - 1);
    }
  }
}
