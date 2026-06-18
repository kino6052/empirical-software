// src/lib/h.ts
function isSignal(v) {
  return v !== null && typeof v === "object" && "get" in v && "sub" in v;
}
function h(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (typeof value === "boolean") {
      if (value)
        el.setAttribute(key, "");
    } else {
      el.setAttribute(key, value);
    }
  }
  for (const child of children) {
    if (isSignal(child)) {
      const node = document.createTextNode(child.get());
      child.sub((v) => {
        node.textContent = v;
      });
      el.appendChild(node);
    } else if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }
  return el;
}

// src/lib/css.ts
var registered = new Set;
var styleEl = null;
function css(style) {
  if (registered.has(style))
    return;
  registered.add(style);
  if (!styleEl) {
    styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
  }
  styleEl.textContent += style + `
`;
}

// src/lib/components.ts
function Button(text, props = {}) {
  css(`
    .btn {
      display: inline-block;
      padding: 0.6rem 1.4rem;
      background: var(--fg);
      color: var(--bg);
      border: none;
      border-radius: var(--radius);
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.8; }
  `);
  return h("button", { class: "btn", ...props }, [text]);
}
function Link(text, page, props = {}) {
  css(`
    .link {
      color: var(--fg);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `);
  return h("a", { href: "#", class: "link", "data-page": page, ...props }, [text]);
}
function Section(children, props = {}) {
  return h("section", { class: "section", ...props }, children);
}
function Container(children, props = {}) {
  return h("div", { class: "container", ...props }, children);
}
function Card(children, props = {}) {
  css(`
    .card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--space);
    }
  `);
  return h("div", { class: "card", ...props }, children);
}
function Heading(level, text, props = {}) {
  return h(`h${level}`, props, [text]);
}
function Text(content, props = {}) {
  css(`
    .text {
      color: var(--muted);
      margin-bottom: var(--space);
    }
  `);
  return h("p", { class: "text", ...props }, [content]);
}
function Nav(links) {
  css(`
    .nav {
      display: flex;
      gap: 1rem;
      padding: var(--space);
      border-bottom: 1px solid var(--border);
      max-width: var(--max-w);
      width: 100%;
      margin: 0 auto;
    }
    .nav a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    .nav a:hover, .nav a.active {
      color: var(--fg);
    }
  `);
  return h("nav", { class: "nav" }, links.map((link) => Link(link.text, link.page)));
}
function Badge(emoji, label) {
  css(`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }
    .badge-emoji { font-size: 1.3rem; }
    .badge-label { font-weight: 600; font-size: 0.95rem; }
  `);
  return h("span", { class: "badge" }, [
    h("span", { class: "badge-emoji" }, [emoji]),
    h("span", { class: "badge-label" }, [label])
  ]);
}
function Divider() {
  css(`
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: calc(var(--space) * 1.5) 0;
    }
  `);
  return h("hr", { class: "divider" });
}
function Input(props = {}) {
  css(`
    .input {
      flex: 1;
      padding: 0.6rem 0.8rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
    }
    .input:focus {
      border-color: var(--fg);
    }
  `);
  return h("input", { class: "input", ...props });
}
function Grid(children) {
  css(`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space);
      margin-top: var(--space);
    }
  `);
  return h("div", { class: "grid" }, children);
}

// src/lib/router.ts
var queryParamStrategy = {
  read() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "home";
  },
  write(page, params) {
    const url = new URL(window.location.href);
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
  listen(cb) {
    window.addEventListener("popstate", cb);
  }
};
function createRouter(strategy = queryParamStrategy) {
  let listener = null;
  return {
    current() {
      return strategy.read();
    },
    navigate(page, params) {
      strategy.write(page, params);
      listener?.(page);
    },
    onRoute(cb) {
      listener = cb;
    },
    start() {
      strategy.listen(() => {
        listener?.(strategy.read());
      });
      listener?.(strategy.read());
    }
  };
}

// src/pages/home.ts
function HomePage(navigate) {
  css(`
    .hero {
      padding: calc(var(--space) * 3) 0;
    }
    .hero h1 {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: var(--space);
    }
    .hero .text {
      font-size: 1.15rem;
      color: var(--muted);
      max-width: 560px;
    }
    .hero .btn {
      margin-top: calc(var(--space) * 1.5);
    }
  `);
  return Section([
    Container([
      h("div", { class: "hero" }, [
        Heading(1, "Empirical Software"),
        Text("We build software that keeps delivering — sprint after sprint, year after year."),
        Text("No mire. No slowdown. Just sustained velocity."),
        Button("See how →", {
          onclick: () => navigate("services")
        })
      ])
    ])
  ]);
}

// src/pages/services.ts
var services = [
  { emoji: "\uD83C\uDFD7️", title: "Architecture Review", desc: "Strip unnecessary complexity. Keep what's load-bearing." },
  { emoji: "⚡", title: "Velocity Recovery", desc: "Diagnose why your sprints are slowing down — and fix the root cause." },
  { emoji: "\uD83D\uDD2C", title: "Codebase Audit", desc: "Find the reifications, the ceremony, the ghosts. Replace them with ground truth." },
  { emoji: "\uD83D\uDE80", title: "Greenfield Build", desc: "Start lean. Stay lean. Ship continuously from day one." },
  { emoji: "\uD83E\uDDE9", title: "Team Enablement", desc: "Teach your team to see complexity before it calcifies." },
  { emoji: "\uD83D\uDEE0️", title: "Legacy Rescue", desc: "Untangle the mire without a rewrite. Incremental, empirical, verifiable." }
];
function ServicesPage() {
  return Section([
    Container([
      Heading(1, "Services"),
      Text("We solve one problem: keeping software soft."),
      Grid(services.map((s) => Card([
        Badge(s.emoji, s.title),
        Text(s.desc)
      ])))
    ])
  ]);
}

// src/pages/about.ts
function AboutPage() {
  css(`
    .principles {
      display: flex;
      flex-direction: column;
      gap: calc(var(--space) * 1.5);
    }
  `);
  return Section([
    Container([
      Heading(1, "Philosophy"),
      Text("Every line of code is a bet on the future. We only make bets that pay off under change."),
      Divider(),
      h("div", { class: "principles" }, [
        h("div", { class: "principle" }, [
          Heading(3, "\uD83C\uDFAF Ground everything in what can be seen"),
          Text("If a concept in your system has no perceivable referent — no behavior a user can observe — it is a ghost. We eliminate ghosts.")
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "✂️ Necessary and sufficient"),
          Text("No ceremony. No wrappers-for-wrappers. Every abstraction must pay its rent by reducing the cost of real change.")
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "\uD83D\uDCD0 Softness over rigidity"),
          Text("A small change in the world should require a small change in the code. When it doesn't, the architecture is broken — not the team.")
        ]),
        h("div", { class: "principle" }, [
          Heading(3, "\uD83D\uDD0D Empirical verification"),
          Text("No appeal to authority. No 'best practices' without evidence. Every claim is accompanied by a path to verification.")
        ])
      ])
    ])
  ]);
}

// src/lib/state.ts
function signal(initial) {
  let value = initial;
  const subs = new Set;
  return {
    get: () => value,
    set: (v) => {
      value = v;
      subs.forEach((fn) => fn(v));
    },
    sub: (fn) => {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
}
function derived(deps, fn) {
  const s = signal(fn());
  for (const dep of deps) {
    dep.sub(() => s.set(fn()));
  }
  return s;
}

// src/data/posts.json
var posts_default = [
  {
    slug: "velocity-decay",
    title: "Why Your Sprints Are Getting Slower",
    date: "2025-03-15",
    summary: "It's not technical debt. It's reification — abstractions that have drifted from their empirical anchors and now tax every change.",
    tags: ["velocity", "architecture"],
    content: `Every team starts fast. The first sprint ships in days. The second in a week. By sprint ten, the same team — same people, same skills, same tools — takes three weeks to ship what used to take three days.

The standard diagnosis is 'technical debt.' The standard prescription is 'refactoring.' Both are wrong — not because they are false, but because they are imprecise. They name the symptom and prescribe a ritual without identifying the disease.

The disease is reification. Somewhere between sprint one and sprint ten, the team introduced abstractions that have no perceivable referent in the running software. A CustomerAggregate that is neither customer nor aggregate. A BillingDomain that corresponds to no boundary a user can observe. A UserContext that turns out to be neither user nor context.

Each of these ghosts was introduced with good intentions — 'separation of concerns,' 'clean architecture,' 'domain-driven design.' But intentions do not write software. Behavior does. And behavior is what can be observed.

The fix is not a rewrite. The fix is a discipline: for every concept in the codebase, ask — what can be perceived that corresponds to this? If you cannot answer, you have found a ghost. Remove it. Replace it with the simplest expression of the real behavior it was pretending to represent.

This is not a one-time cleanup. It is a practice. Every sprint, every PR, every design discussion: ground everything in what can be seen.`
  },
  {
    slug: "ceremony-vs-software",
    title: "Ceremony Is Not Software",
    date: "2025-02-28",
    summary: "Page objects, fluent DSLs, and auto-wiring frameworks feel productive. But if you can strip them and the program still works — they were never software.",
    tags: ["testing", "philosophy"],
    content: `Take any behavior you want to verify. Write the verification twice.

Version A: directly, using the underlying tool. page.click, page.fill, expect(page.locator(...)).toBeVisible().

Version B: through whatever wrapper infrastructure you currently use. loginPage.clickLoginButton(), dashboardPage.expectGreeting(...), with all the supporting files in place.

Now change the behavior. Add a captcha to the login flow. Or change the success condition. Or handle a new error state.

If Version A is changed with one edit and Version B requires edits across multiple files — that is the answer. Version B is not soft. The wrappers are not paying their rent. They are taxing every change with bureaucratic processing that produces no behavioral value.

A small utility function is a name for a pattern. A framework is a pattern you cannot escape.

The test is simple. Strip it away. Does the remaining program still do what it needs to do, expressed clearly? If yes, what you stripped was ceremony.

Write necessary and sufficient code. Extract the commonalities that are real software — they earn their place by the cost they save under change. Reject the wrappers that are not real software — they earn nothing, and they tax every change with ceremony that produces no behavior.`
  },
  {
    slug: "necessary-and-sufficient",
    title: "The Necessary and Sufficient Test",
    date: "2025-02-10",
    summary: "A simple function that captures real commonality beats twelve files of declarative machinery. Here's how to tell the difference.",
    tags: ["design", "pragmatism"],
    content: `If your test suite has a hundred tests that all need to log in first, the login flow should not be re-implemented a hundred times. That is just DRY — a real principle, grounded in a real concern about the cost of change.

So a function:

async function logIn(page, { username, password }) {
  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login-button');
  await page.waitForURL('/dashboard');
}

is necessary and sufficient. It captures a real commonality. It is grounded. It is the smallest expression of the real software that needs to exist.

What is not necessary and sufficient is wrapping this function in a LoginPage class, registering that class in a PageRegistry, instantiating it through a PageFactory, exposing its methods through a fluent chain, and adding an IPage interface for the type system to enforce. None of that machinery touches the actual login behavior. All of it is presentation, dressed up as architecture.

Ask, of every helper, every wrapper, every utility:

Is this necessary? Could the program be expressed clearly without it?

Is this sufficient? Does its presence add behavioral value, or only readability?

Can it be stripped? If you removed it tomorrow, would the program still work, and would the remaining expression be clear?

These are not aesthetic questions. They are engineering questions.`
  }
];

// src/pages/blog.ts
function LikeButton() {
  css(`
    .btn-like {
      background: transparent;
      color: var(--muted);
      border: 1px solid var(--border);
      padding: 0.3rem 0.8rem;
      font-size: 0.85rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s;
    }
    .btn-like:hover {
      color: #c44;
      border-color: #c44;
      opacity: 1;
    }
  `);
  const count = signal(0);
  const label = derived([count], () => `♥ ${count.get() || ""}`);
  return h("button", {
    class: "btn btn-like",
    onclick: (e) => {
      e.stopPropagation();
      count.set(count.get() + 1);
    }
  }, [label]);
}
function PostCard(post, navigate) {
  css(`
    .card-link {
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .card-link:hover {
      border-color: var(--fg);
    }
    .card-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.5rem;
    }
  `);
  return Card([
    PostMeta(post.date, post.tags),
    Heading(3, post.title),
    Text(post.summary),
    h("div", { class: "card-footer" }, [LikeButton()])
  ], {
    class: "card card-link",
    onclick: () => navigate("post", { slug: post.slug })
  });
}
function PostMeta(date, tags) {
  css(`
    .post-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .tag {
      background: var(--border);
      padding: 0.1rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.75rem;
    }
    .post-tags {
      display: flex;
      gap: 0.3rem;
    }
  `);
  return h("div", { class: "post-meta" }, [
    h("time", {}, [date]),
    h("span", { class: "post-tags" }, tags.map((t) => h("span", { class: "tag" }, [t])))
  ]);
}
function BlogPage(navigate) {
  css(`
    .blog-list {
      display: flex;
      flex-direction: column;
      gap: var(--space);
      margin-top: var(--space);
    }
  `);
  return Section([
    Container([
      Heading(1, "Blog & Use Cases"),
      Text("Real problems. Real fixes. No fluff."),
      h("div", { class: "blog-list" }, posts_default.map((post) => PostCard(post, navigate)))
    ])
  ]);
}

// src/pages/post.ts
function BackButton(navigate) {
  css(`
    .btn-back {
      background: transparent;
      color: var(--muted);
      padding: 0;
      margin-bottom: calc(var(--space) * 1.5);
      font-size: 0.9rem;
    }
    .btn-back:hover {
      color: var(--fg);
      opacity: 1;
    }
  `);
  return Button("← Back to blog", {
    class: "btn btn-back",
    onclick: () => navigate("blog")
  });
}
function CodeBlock(code) {
  css(`
    .code-block {
      background: #f0f0f0;
      border-radius: var(--radius);
      padding: var(--space);
      overflow-x: auto;
      margin-bottom: var(--space);
      font-family: "SF Mono", "Cascadia Code", "Consolas", monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      white-space: pre-wrap;
    }
  `);
  return h("pre", { class: "code-block" }, [h("code", {}, [code])]);
}
function Article(post) {
  css(`
    .post .text {
      line-height: 1.75;
    }
    .post-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .tag {
      background: var(--border);
      padding: 0.1rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.75rem;
    }
    .post-tags {
      display: flex;
      gap: 0.3rem;
    }
  `);
  const paragraphs = post.content.split(`

`).map((block) => {
    if (block.startsWith("async function") || block.startsWith("  ") || block.startsWith("await")) {
      return CodeBlock(block);
    }
    return Text(block);
  });
  return h("article", { class: "post" }, [
    h("div", { class: "post-meta" }, [
      h("time", {}, [post.date]),
      h("span", { class: "post-tags" }, post.tags.map((t) => h("span", { class: "tag" }, [t])))
    ]),
    Heading(1, post.title),
    ...paragraphs
  ]);
}
function PostPage(navigate) {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const post = posts_default.find((p) => p.slug === slug);
  if (!post) {
    return Section([
      Container([
        Heading(1, "Post not found"),
        BackButton(navigate)
      ])
    ]);
  }
  return Section([
    Container([
      BackButton(navigate),
      Article(post)
    ])
  ]);
}

// src/pages/contact.ts
function ContactForm() {
  css(`
    .contact-form {
      display: flex;
      gap: 0.75rem;
      margin-top: var(--space);
    }
    .status-msg {
      color: #2a7;
      font-size: 0.9rem;
      min-height: 1.4em;
      margin-top: 0.5rem;
    }
  `);
  const email = signal("");
  const sent = signal(false);
  const status = derived([sent], () => sent.get() ? "✓ We'll be in touch." : "");
  const input = Input({
    type: "email",
    placeholder: "your@email.com",
    oninput: (e) => {
      email.set(e.target.value);
      sent.set(false);
    }
  });
  return h("div", {}, [
    h("div", { class: "contact-form" }, [
      input,
      Button("Send →", {
        onclick: () => {
          if (email.get()) {
            sent.set(true);
            input.value = "";
            email.set("");
          }
        }
      })
    ]),
    h("p", { class: "status-msg" }, [status])
  ]);
}
function ContactLinks() {
  css(`
    .contact-alt {
      margin-top: calc(var(--space) * 2);
    }
    .contact-links {
      display: flex;
      gap: 1rem;
    }
    .contact-links a {
      color: var(--fg);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `);
  return h("div", {}, [
    h("div", { class: "contact-alt" }, [
      Text("Or email us directly:"),
      h("div", { class: "contact-links" }, [
        h("a", { href: "mailto:hello@empiricalsoftware.dev" }, ["hello@empiricalsoftware.dev"])
      ])
    ]),
    h("div", { class: "contact-alt" }, [
      Text("Find us on:"),
      h("div", { class: "contact-links" }, [
        h("a", { href: "https://github.com/empirical-software", target: "_blank" }, ["GitHub"]),
        h("a", { href: "https://linkedin.com/company/empirical-software", target: "_blank" }, ["LinkedIn"])
      ])
    ])
  ]);
}
function ContactPage() {
  css(`
    .contact {
      padding: calc(var(--space) * 2) 0;
    }
    .contact .btn {
      font-size: 1.05rem;
      margin-top: var(--space);
    }
  `);
  return Section([
    Container([
      h("div", { class: "contact" }, [
        Heading(1, "Let's talk"),
        Text("No forms. No funnels. Just a conversation about your codebase."),
        ContactForm(),
        ContactLinks()
      ])
    ])
  ]);
}

// src/app.ts
var pages = {
  home: (nav) => HomePage(nav),
  services: () => ServicesPage(),
  about: () => AboutPage(),
  blog: (nav) => BlogPage(nav),
  post: (nav) => PostPage(nav),
  contact: () => ContactPage()
};
function createApp(root) {
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
    { text: "Contact", page: "contact" }
  ]);
  const content = h("main", { class: "main" });
  nav.addEventListener("click", (e) => {
    const target = e.target;
    const page = target.getAttribute("data-page");
    if (page) {
      e.preventDefault();
      router.navigate(page);
    }
  });
  function render(page) {
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

// src/main.ts
var root = document.getElementById("app");
if (root)
  createApp(root);
