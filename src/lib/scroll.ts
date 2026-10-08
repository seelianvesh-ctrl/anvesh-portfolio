/**
 * Shared scroll observer.
 *
 * A single passive listener drives both the header and the chapter rail, so the
 * page keeps one scroll subscription instead of one per component. React state
 * only updates when the value actually changes.
 */
import { useEffect, useState } from "react";

type SectionListener = (id: string) => void;
type ScrollListener = (y: number) => void;

const sectionListeners = new Set<SectionListener>();
const scrollListeners = new Set<ScrollListener>();

let sectionIds: string[] = [];
let activeId = "";
let lastY = -1;
let frame = 0;

function measure() {
  frame = 0;

  const y = window.scrollY;
  if (y !== lastY) {
    lastY = y;
    scrollListeners.forEach((listener) => listener(y));
  }

  if (!sectionIds.length) return;

  const line = window.innerHeight * 0.34;
  let next = sectionIds[0];

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - line <= 0) next = id;
  }

  if (next !== activeId) {
    activeId = next;
    sectionListeners.forEach((listener) => listener(next));
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(measure);
}

/** Begins tracking; returns a disposer. Safe to call more than once. */
export function startScrollTracking(ids: string[]) {
  sectionIds = ids;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };
}

export function subscribeSections(listener: SectionListener) {
  sectionListeners.add(listener);
  return () => {
    sectionListeners.delete(listener);
  };
}

export function subscribeScroll(listener: ScrollListener) {
  scrollListeners.add(listener);
  return () => {
    scrollListeners.delete(listener);
  };
}

/** Id of the section currently under the reading line. */
export function useActiveSection() {
  const [id, setId] = useState(activeId);
  useEffect(() => subscribeSections(setId), []);
  return id;
}

/** Raw scroll offset, for components that react to depth (header, cue, rail). */
export function useScrollY() {
  const [y, setY] = useState(lastY < 0 ? 0 : lastY);
  useEffect(() => subscribeScroll(setY), []);
  return y;
}
