function D(e){return e!==null&&typeof e==="object"&&"get"in e&&"sub"in e}function r(e,t={},n=[]){let a=document.createElement(e);for(let[s,l]of Object.entries(t))if(s.startsWith("on")&&typeof l==="function")a.addEventListener(s.slice(2).toLowerCase(),l);else if(typeof l==="boolean"){if(l)a.setAttribute(s,"")}else a.setAttribute(s,l);for(let s of n)if(D(s)){let l=document.createTextNode(s.get());s.sub((u)=>{l.textContent=u}),a.appendChild(l)}else if(typeof s==="string")a.appendChild(document.createTextNode(s));else a.appendChild(s);return a}var x=new Set,v=null;function o(e){if(x.has(e))return;if(x.add(e),!v)v=document.createElement("style"),document.head.appendChild(v);v.textContent+=e+`
`}function g(e,t={}){return o(`
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
  `),r("button",{class:"btn",...t},[e])}function G(e,t,n={}){return o(`
    .link {
      color: var(--fg);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  `),r("a",{href:"#",class:"link","data-page":t,...n},[e])}function d(e,t={}){return r("section",{class:"section",...t},e)}function p(e,t={}){return r("div",{class:"container",...t},e)}function b(e,t={}){return o(`
    .card {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--space);
    }
  `),r("div",{class:"card",...t},e)}function c(e,t,n={}){return r(`h${e}`,n,[t])}function i(e,t={}){return o(`
    .text {
      color: var(--muted);
      margin-bottom: var(--space);
    }
  `),r("p",{class:"text",...t},[e])}function T(e){return o(`
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
  `),r("nav",{class:"nav"},e.map((t)=>G(t.text,t.page)))}function k(e,t){return o(`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }
    .badge-emoji { font-size: 1.3rem; }
    .badge-label { font-weight: 600; font-size: 0.95rem; }
  `),r("span",{class:"badge"},[r("span",{class:"badge-emoji"},[e]),r("span",{class:"badge-label"},[t])])}function E(){return o(`
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: calc(var(--space) * 1.5) 0;
    }
  `),r("hr",{class:"divider"})}function L(e={}){return o(`
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
  `),r("input",{class:"input",...e})}function P(e){return o(`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space);
      margin-top: var(--space);
    }
  `),r("div",{class:"grid"},e)}var U={read(){return new URLSearchParams(window.location.search).get("page")||"home"},write(e,t){let n=new URL(window.location.href);for(let a of[...n.searchParams.keys()])n.searchParams.delete(a);if(e!=="home")n.searchParams.set("page",e);if(t)for(let[a,s]of Object.entries(t))n.searchParams.set(a,s);window.history.pushState({},"",n.toString())},listen(e){window.addEventListener("popstate",e)}};function S(e=U){let t=null;return{current(){return e.read()},navigate(n,a){e.write(n,a),t?.(n)},onRoute(n){t=n},start(){e.listen(()=>{t?.(e.read())}),t?.(e.read())}}}function C(e){return o(`
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
  `),d([p([r("div",{class:"hero"},[c(1,"Empirical Software"),i("We build software that keeps delivering — sprint after sprint, year after year."),i("No mire. No slowdown. Just sustained velocity."),g("See how →",{onclick:()=>e("services")})])])])}var V=[{emoji:"\uD83C\uDFD7️",title:"Architecture Review",desc:"Strip unnecessary complexity. Keep what's load-bearing."},{emoji:"⚡",title:"Velocity Recovery",desc:"Diagnose why your sprints are slowing down — and fix the root cause."},{emoji:"\uD83D\uDD2C",title:"Codebase Audit",desc:"Find the reifications, the ceremony, the ghosts. Replace them with ground truth."},{emoji:"\uD83D\uDE80",title:"Greenfield Build",desc:"Start lean. Stay lean. Ship continuously from day one."},{emoji:"\uD83E\uDDE9",title:"Team Enablement",desc:"Teach your team to see complexity before it calcifies."},{emoji:"\uD83D\uDEE0️",title:"Legacy Rescue",desc:"Untangle the mire without a rewrite. Incremental, empirical, verifiable."}];function H(){return d([p([c(1,"Services"),i("We solve one problem: keeping software soft."),P(V.map((e)=>b([k(e.emoji,e.title),i(e.desc)])))])])}function R(){return o(`
    .principles {
      display: flex;
      flex-direction: column;
      gap: calc(var(--space) * 1.5);
    }
  `),d([p([c(1,"Philosophy"),i("Every line of code is a bet on the future. We only make bets that pay off under change."),E(),r("div",{class:"principles"},[r("div",{class:"principle"},[c(3,"\uD83C\uDFAF Ground everything in what can be seen"),i("If a concept in your system has no perceivable referent — no behavior a user can observe — it is a ghost. We eliminate ghosts.")]),r("div",{class:"principle"},[c(3,"✂️ Necessary and sufficient"),i("No ceremony. No wrappers-for-wrappers. Every abstraction must pay its rent by reducing the cost of real change.")]),r("div",{class:"principle"},[c(3,"\uD83D\uDCD0 Softness over rigidity"),i("A small change in the world should require a small change in the code. When it doesn't, the architecture is broken — not the team.")]),r("div",{class:"principle"},[c(3,"\uD83D\uDD0D Empirical verification"),i("No appeal to authority. No 'best practices' without evidence. Every claim is accompanied by a path to verification.")])])])])}function m(e){let t=e,n=new Set;return{get:()=>t,set:(a)=>{t=a,n.forEach((s)=>s(a))},sub:(a)=>{return n.add(a),()=>n.delete(a)}}}function y(e,t){let n=m(t());for(let a of e)a.sub(()=>n.set(t()));return n}var w=[{slug:"velocity-decay",title:"Why Your Sprints Are Getting Slower",date:"2025-03-15",summary:"It's not technical debt. It's reification — abstractions that have drifted from their empirical anchors and now tax every change.",tags:["velocity","architecture"],content:`Every team starts fast. The first sprint ships in days. The second in a week. By sprint ten, the same team — same people, same skills, same tools — takes three weeks to ship what used to take three days.

The standard diagnosis is 'technical debt.' The standard prescription is 'refactoring.' Both are wrong — not because they are false, but because they are imprecise. They name the symptom and prescribe a ritual without identifying the disease.

The disease is reification. Somewhere between sprint one and sprint ten, the team introduced abstractions that have no perceivable referent in the running software. A CustomerAggregate that is neither customer nor aggregate. A BillingDomain that corresponds to no boundary a user can observe. A UserContext that turns out to be neither user nor context.

Each of these ghosts was introduced with good intentions — 'separation of concerns,' 'clean architecture,' 'domain-driven design.' But intentions do not write software. Behavior does. And behavior is what can be observed.

The fix is not a rewrite. The fix is a discipline: for every concept in the codebase, ask — what can be perceived that corresponds to this? If you cannot answer, you have found a ghost. Remove it. Replace it with the simplest expression of the real behavior it was pretending to represent.

This is not a one-time cleanup. It is a practice. Every sprint, every PR, every design discussion: ground everything in what can be seen.`},{slug:"ceremony-vs-software",title:"Ceremony Is Not Software",date:"2025-02-28",summary:"Page objects, fluent DSLs, and auto-wiring frameworks feel productive. But if you can strip them and the program still works — they were never software.",tags:["testing","philosophy"],content:`Take any behavior you want to verify. Write the verification twice.

Version A: directly, using the underlying tool. page.click, page.fill, expect(page.locator(...)).toBeVisible().

Version B: through whatever wrapper infrastructure you currently use. loginPage.clickLoginButton(), dashboardPage.expectGreeting(...), with all the supporting files in place.

Now change the behavior. Add a captcha to the login flow. Or change the success condition. Or handle a new error state.

If Version A is changed with one edit and Version B requires edits across multiple files — that is the answer. Version B is not soft. The wrappers are not paying their rent. They are taxing every change with bureaucratic processing that produces no behavioral value.

A small utility function is a name for a pattern. A framework is a pattern you cannot escape.

The test is simple. Strip it away. Does the remaining program still do what it needs to do, expressed clearly? If yes, what you stripped was ceremony.

Write necessary and sufficient code. Extract the commonalities that are real software — they earn their place by the cost they save under change. Reject the wrappers that are not real software — they earn nothing, and they tax every change with ceremony that produces no behavior.`},{slug:"necessary-and-sufficient",title:"The Necessary and Sufficient Test",date:"2025-02-10",summary:"A simple function that captures real commonality beats twelve files of declarative machinery. Here's how to tell the difference.",tags:["design","pragmatism"],content:`If your test suite has a hundred tests that all need to log in first, the login flow should not be re-implemented a hundred times. That is just DRY — a real principle, grounded in a real concern about the cost of change.

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

These are not aesthetic questions. They are engineering questions.`}];function F(){o(`
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
  `);let e=m(0),t=y([e],()=>`♥ ${e.get()||""}`);return r("button",{class:"btn btn-like",onclick:(n)=>{n.stopPropagation(),e.set(e.get()+1)}},[t])}function O(e,t){return o(`
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
  `),b([J(e.date,e.tags),c(3,e.title),i(e.summary),r("div",{class:"card-footer"},[F()])],{class:"card card-link",onclick:()=>t("post",{slug:e.slug})})}function J(e,t){return o(`
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
  `),r("div",{class:"post-meta"},[r("time",{},[e]),r("span",{class:"post-tags"},t.map((n)=>r("span",{class:"tag"},[n])))])}function M(e){return o(`
    .blog-list {
      display: flex;
      flex-direction: column;
      gap: var(--space);
      margin-top: var(--space);
    }
  `),d([p([c(1,"Blog & Use Cases"),i("Real problems. Real fixes. No fluff."),r("div",{class:"blog-list"},w.map((t)=>O(t,e)))])])}function A(e){return o(`
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
  `),g("← Back to blog",{class:"btn btn-back",onclick:()=>e("blog")})}function Y(e){return o(`
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
  `),r("pre",{class:"code-block"},[r("code",{},[e])])}function _(e){o(`
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
  `);let t=e.content.split(`

`).map((n)=>{if(n.startsWith("async function")||n.startsWith("  ")||n.startsWith("await"))return Y(n);return i(n)});return r("article",{class:"post"},[r("div",{class:"post-meta"},[r("time",{},[e.date]),r("span",{class:"post-tags"},e.tags.map((n)=>r("span",{class:"tag"},[n])))]),c(1,e.title),...t])}function B(e){let t=new URLSearchParams(window.location.search).get("slug"),n=w.find((a)=>a.slug===t);if(!n)return d([p([c(1,"Post not found"),A(e)])]);return d([p([A(e),_(n)])])}function $(){o(`
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
  `);let e=m(""),t=m(!1),n=y([t],()=>t.get()?"✓ We'll be in touch.":""),a=L({type:"email",placeholder:"your@email.com",oninput:(s)=>{e.set(s.target.value),t.set(!1)}});return r("div",{},[r("div",{class:"contact-form"},[a,g("Send →",{onclick:()=>{if(e.get())t.set(!0),a.value="",e.set("")}})]),r("p",{class:"status-msg"},[n])])}function K(){return o(`
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
  `),r("div",{},[r("div",{class:"contact-alt"},[i("Or email us directly:"),r("div",{class:"contact-links"},[r("a",{href:"mailto:hello@empiricalsoftware.dev"},["hello@empiricalsoftware.dev"])])]),r("div",{class:"contact-alt"},[i("Find us on:"),r("div",{class:"contact-links"},[r("a",{href:"https://github.com/empirical-software",target:"_blank"},["GitHub"]),r("a",{href:"https://linkedin.com/company/empirical-software",target:"_blank"},["LinkedIn"])])])])}function I(){return o(`
    .contact {
      padding: calc(var(--space) * 2) 0;
    }
    .contact .btn {
      font-size: 1.05rem;
      margin-top: var(--space);
    }
  `),d([p([r("div",{class:"contact"},[c(1,"Let's talk"),i("No forms. No funnels. Just a conversation about your codebase."),$(),K()])])])}var N={home:(e)=>C(e),services:()=>H(),about:()=>R(),blog:(e)=>M(e),post:(e)=>B(e),contact:()=>I()};function j(e){o(`
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
  `);let t=S(),n=T([{text:"Home",page:"home"},{text:"Services",page:"services"},{text:"About",page:"about"},{text:"Blog",page:"blog"},{text:"Contact",page:"contact"}]),a=r("main",{class:"main"});n.addEventListener("click",(l)=>{let f=l.target.getAttribute("data-page");if(f)l.preventDefault(),t.navigate(f)});function s(l){let u=N[l]||N.home;a.innerHTML="",a.appendChild(u((h,W)=>t.navigate(h,W)));let f=l==="post"?"blog":l;n.querySelectorAll("a").forEach((h)=>{h.classList.toggle("active",h.getAttribute("data-page")===f)})}t.onRoute(s),e.appendChild(r("div",{class:"app"},[n,a])),t.start()}var z=document.getElementById("app");if(z)j(z);
