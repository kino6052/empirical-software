export interface RouteStrategy {
  read(): string;
  write(page: string, params?: Record<string, string>): void;
  listen(cb: () => void): void;
}

const queryParamStrategy: RouteStrategy = {
  read() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "home";
  },
  write(page: string, params?: Record<string, string>) {
    const url = new URL(window.location.href);
    // Clear all existing params
    for (const key of [...url.searchParams.keys()]) {
      url.searchParams.delete(key);
    }
    if (page !== "home") {
      url.searchParams.set("page", page);
    }
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
      }
    }
    window.history.pushState({}, "", url.toString());
  },
  listen(cb: () => void) {
    window.addEventListener("popstate", cb);
  },
};

export type PageRenderer = () => HTMLElement;

export interface Router {
  current(): string;
  navigate(page: string, params?: Record<string, string>): void;
  onRoute(cb: (page: string) => void): void;
  start(): void;
}

export function createRouter(strategy: RouteStrategy = queryParamStrategy): Router {
  let listener: ((page: string) => void) | null = null;

  return {
    current() {
      return strategy.read();
    },
    navigate(page: string, params?: Record<string, string>) {
      strategy.write(page, params);
      listener?.(page);
    },
    onRoute(cb: (page: string) => void) {
      listener = cb;
    },
    start() {
      strategy.listen(() => {
        listener?.(strategy.read());
      });
      listener?.(strategy.read());
    },
  };
}
