export interface Signal<T> {
  get(): T;
  set(v: T): void;
  sub(fn: (v: T) => void): () => void;
}

export function signal<T>(initial: T): Signal<T> {
  let value = initial;
  const subs = new Set<(v: T) => void>();
  return {
    get: () => value,
    set: (v: T) => { value = v; subs.forEach((fn) => fn(v)); },
    sub: (fn: (v: T) => void) => { subs.add(fn); return () => subs.delete(fn); },
  };
}

export function derived<T>(deps: Signal<unknown>[], fn: () => T): Signal<T> {
  const s = signal(fn());
  for (const dep of deps) {
    dep.sub(() => s.set(fn()));
  }
  return s;
}
