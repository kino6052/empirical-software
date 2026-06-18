import { h } from "./lib/h";
import { css } from "./lib/css";
import { Nav } from "./lib/components";
import { createRouter } from "./lib/router";
import { HomePage } from "./pages/home";
import { ServicesPage } from "./pages/services";
import { AboutPage } from "./pages/about";
import { BlogPage } from "./pages/blog";
import { PostPage } from "./pages/post";
import { ContactPage } from "./pages/contact";

type Navigate = (page: string, params?: Record<string, string>) => void;

const pages: Record<string, (navigate: Navigate) => HTMLElement> = {
  home: (nav) => HomePage(nav),
  services: () => ServicesPage(),
  about: () => AboutPage(),
  blog: (nav) => BlogPage(nav),
  post: (nav) => PostPage(nav),
  contact: () => ContactPage(),
};

export function createApp(root: HTMLElement) {
  css(`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main {
      flex: 1;
      max-width: var(--max-w);
      width: 100%;
      margin: 0 auto;
      padding: calc(var(--space) * 2) var(--space);
    }
  `);

  const router = createRouter();

  const nav = Nav([
    { text: "Home", page: "home" },
    { text: "Services", page: "services" },
    { text: "About", page: "about" },
    { text: "Blog", page: "blog" },
    { text: "Contact", page: "contact" },
  ]);

  const content = h("main", { class: "main" });

  nav.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const page = target.getAttribute("data-page");
    if (page) {
      e.preventDefault();
      router.navigate(page);
    }
  });

  function render(page: string) {
    const renderPage = pages[page] || pages["home"];
    content.innerHTML = "";
    content.appendChild(renderPage((p, params) => router.navigate(p, params)));

    const activePage = page === "post" ? "blog" : page;
    nav.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-page") === activePage);
    });
  }

  router.onRoute(render);

  root.appendChild(h("div", { class: "app" }, [nav, content]));

  router.start();
}
