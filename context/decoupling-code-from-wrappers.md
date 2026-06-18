---
title: Decoupling Code from Convenience Wrappers
subtitle: Why declarative ceremony is not an architectural concern
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture;
---

I recently spent time inside an autotesting codebase. The technology is unimportant — call it Playwright, call it anything — because that is an implementation detail, and by the lights of this series, implementation details are not the unit of analysis.

What I observed there was striking, and it took me some time to name precisely what was wrong.

The codebase was, by the standards we have developed earlier, _well grounded_. Almost everything in it corresponded to something that could be observed on the screen. Buttons that could be clicked. Inputs that could be filled. Pages that could be navigated to. There was no DDD Aggregate hiding in the corner with no observable referent. There were no Domain Service objects mediating phantom relationships. The selectors pointed at real DOM elements. The assertions checked real visible state.

This is the kind of codebase that passes the perception test: every concept has a perceivable correspondent. The grounding is intact.

And yet the code was suffocating under its own weight.

Why?

The answer is not reification. The disease here is different. And until we can name it, we cannot treat it.

### The Symptom

The codebase was organized around the standard set of patterns one finds in modern testing infrastructure: page objects, helper classes, fixtures, mock orchestrators, assertion DSLs. A typical test read something like:

```typescript
test("user can log in", async ({ loginPage, dashboardPage }) => {
  await loginPage
    .navigate()
    .fillCredentials({ username: "test", password: "test" })
    .clickLoginButton()
    .expectRedirectTo(dashboardPage);

  await dashboardPage.waitForLoad().expectGreeting("Hello, test");
});
```

This is elegant. It reads almost like English. Each method name corresponds to something a human would do in a browser. The grounding is impeccable: every step has a perceivable referent.

The cost of producing this elegance was approximately twelve files of supporting infrastructure: an abstract Page base class, a PageFactory that instantiated pages with the correct dependencies, a mixin system for shared behaviors, a fluent assertion library, a fixture system that wired everything together, a session manager, and a hierarchy of typed selectors.

To change anything — to add a new field to the login form, to handle a new edge case, to make the test more resilient — one had to know which of those twelve files needed editing, in what order, and whose abstractions could not be perturbed without cascading consequences.

The behavior under test was simple. The verification of that behavior was simple. The expression of that simple verification required an immovable temple of declarative machinery.

This was the wrong kind of weight.

### What This Is Not

It is tempting to call this reification, because we have a name for that, and we know how to argue against it.

But it is not reification, and pretending it is would be sloppy.

Reification is the disease of conjuring entities that have no perceivable referent: a `CustomerAggregate`, a `BillingDomain`, a `UserContext` that turns out to be neither user nor context. In a reified system, you cannot answer the question _what does this stand for in the running software?_ — because the answer is _nothing_. The abstraction was born detached.

That is not what was happening here. `loginPage.clickLoginButton()` _does_ stand for something. It stands for the act of clicking the login button, which corresponds to a real DOM element, which produces a real observable effect. The chain of correspondences from the abstraction to the running software is unbroken.

The problem is not that the abstraction has no referent.

The problem is that the abstraction is _itself unnecessary_ — because the thing it refers to was already perfectly nameable without it.

```typescript
await page.click("#login-button");
```

This is not less grounded than `loginPage.clickLoginButton()`. If anything it is more grounded — the reference is direct, with no intermediary class, no inherited behavior, no factory, no fixture. The cost of the ceremony is, in this case, all overhead.

### The Real Diagnosis

This is the same disease we identified in the file structure essay and the nesting essay, appearing in a new form.

There, the claim was: file structure and visual nesting are _presentation concerns_. They are lenses through which humans perceive code. They can be manipulated without changing the program. Therefore they are not architecture.

The page object pattern, the fluent DSL, the assertion library — these are also presentation concerns. They change how the test reads. They do not change what the test does. The execution graph is identical. The observable behavior is identical. The dependencies, when you trace them honestly, are identical.

What has been added is a layer of _how-it-looks-to-the-reader_, mistaken for a layer of _how-it-works_.

Code is made of ideas. Ideas should be soft. Soft means: when the world demands a change, the code yields with proportionate effort. A small change in the world should require a small change in the code.

The ceremony layer breaks this property. A small change in the world — a new field in the login form, say — now requires changes in the page object, possibly the base class, possibly the fixture, possibly the test. The change in the world is small. The change in the code is large. The code is no longer soft. It has been hardened by its own decoration.

### The Side-By-Side Test

Here is a test that anyone can run, and that I think settles the question.

Take any behavior you want to verify. Write the verification twice.

Version A: directly, using the underlying tool. `page.click`, `page.fill`, `expect(page.locator(...)).toBeVisible()`.

Version B: through whatever wrapper infrastructure you currently use. `loginPage.clickLoginButton()`, `dashboardPage.expectGreeting(...)`, with all the supporting files in place.

Now change the behavior. Add a captcha to the login flow. Or change the success condition. Or handle a new error state.

If Version A is changed with one edit and Version B requires edits across multiple files — that is the answer. Version B is not soft. The wrappers are not paying their rent. They are taxing every change with bureaucratic processing that produces no behavioral value.

This is not a thought experiment. It is runnable on any codebase, at any time, by anyone.

The fact that the result is so reliably damning is what makes the ceremony so hard to defend honestly.

### The Legitimate Kernel

I do not want to be misread. There _is_ a legitimate impulse buried inside the ceremony, and it must be preserved.

If your test suite has a hundred tests that all need to log in first, the login flow should not be re-implemented a hundred times. That is just DRY — a real principle, grounded in a real concern about the cost of change. If logging in takes four steps today and five steps tomorrow, you want to edit four lines, not four hundred.

So a function:

```typescript
async function logIn(page, { username, password }) {
  await page.goto("/login");
  await page.fill("#username", username);
  await page.fill("#password", password);
  await page.click("#login-button");
  await page.waitForURL("/dashboard");
}
```

is necessary and sufficient. It captures a real commonality. It is grounded. It is the smallest expression of the real software that needs to exist. The Open/Closed Principle, properly understood, is about exactly this — there is one place where the login flow is defined, and changes to logging-in happen there.

What is _not_ necessary and sufficient is wrapping this function in a `LoginPage` class, registering that class in a `PageRegistry`, instantiating it through a `PageFactory`, exposing its methods through a fluent chain, and adding an `IPage` interface for the type system to enforce. None of that machinery touches the actual login behavior. All of it is presentation, dressed up as architecture.

The test is simple. Strip it away. Does the remaining program still do what it needs to do, expressed clearly? If yes, what you stripped was ceremony.

### Where Declarative Tools Earn Their Keep

This is not an argument against all utility layers. It is a precise argument about _which_ utility layers are justified.

Lodash is justified. `_.groupBy(items, "category")` is a name for a four-line pattern you could write yourself in seconds. The implementation is transparent. There is no machinery — no plugin system, no lifecycle, no dependency graph. The cost of adopting it is approximately zero, and the cost of abandoning it is approximately zero. You can read the source of any function in a minute. It does not impose a worldview on the code that uses it.

Compare this to a dependency-injection framework that auto-discovers test fixtures, wires them through a container, and constructs your test environment via decorators. The implementation is not transparent. The cost of adopting it is the cost of learning its conventions. The cost of abandoning it is the cost of unwinding every place it touches. It imposes a worldview, and that worldview becomes load-bearing.

The principle is: declarative tools earn their keep when they are _simple, transparent, and locally replaceable_. They lose it when they require their own conceptual apparatus to use correctly — when they introduce automagic that has to be understood as such before anything else can be understood.

A small utility function is a name for a pattern.

A framework is a pattern you cannot escape.

### Wrappers Are Subjective

Here is the deepest reason why wrappers should not be confused with architecture.

Two developers can look at the same login function and reasonably disagree about how it should _read_. One prefers `loginPage.clickLoginButton()`. Another prefers `loginAs("user", "pass")`. A third prefers no wrapper at all and writes the steps inline. None of them is wrong. They are expressing different preferences about how the test should narrate itself to a reader.

This is exactly the structure of the file structure debate. Two developers can reasonably disagree about whether a file belongs under `features/auth/login/` or `auth/components/LoginForm/`. None of them is wrong. They are expressing different preferences about how the code should be navigated.

In both cases, the resolution is the same: _make the preference swappable_. Make the presentation layer separable from the code. Allow different readers to see the same code through different lenses, without forcing any of them on the others, and without making any of them load-bearing.

The VSCode extensions described in the earlier essays were not gadgets. They were demonstrations of a principle: that a concern which can be virtualized is, by that fact, not architectural. The same principle applies here. If your wrapper layer can be added or removed without touching the code that does the work, it is a view. If it cannot, then you have welded presentation to substance, and the substance can no longer move freely.

The page object is a view. It should live where views live — outside the load-bearing structure of the program, swappable per reader, strippable on demand.

### The Discipline

Ask, of every helper, every wrapper, every utility:

_Is this necessary?_ Could the program be expressed clearly without it?

_Is this sufficient?_ Does its presence add behavioral value, or only readability?

_Is its necessity reified, or real?_ Is it solving a coordination problem in the running software, or solving a coordination problem only in the writer's mind?

_Can it be stripped?_ If you removed it tomorrow, would the program still work, and would the remaining expression be clear?

These are not aesthetic questions. They are engineering questions. A piece of code that fails them is not lighter or heavier than code that passes them — it is _different in kind_. It is presentation, masquerading as software.

### The Philosophical Conclusion

The logic is the same as in the earlier essays:

- If a layer can be added and removed without changing the program's behavior,
- And the same code can be presented through several such layers,
- And changes to the layer do not constrain changes to the code,
- Then the layer is not architecture.

Page object frameworks pass this test. Fluent assertion DSLs pass this test. Auto-wiring fixture systems pass this test. They are not software. They are ways of looking at software.

Real software is what remains when the ceremony is stripped. Real software is the login function, the click, the assertion against the visible state. Real software is what cannot be removed without losing behavior.

Write necessary and sufficient code. Extract the commonalities that are real software — they earn their place by the cost they save under change. Reject the wrappers that are not real software — they earn nothing, and they tax every change with ceremony that produces no behavior.

Don't mistake non-software concerns for software concerns.

That, in the end, is the whole discipline.

---

## Compiled Wrappers (Expanded)

_When convenience becomes verifiable against ground truth_

[Previous content remains unchanged up to the end of "The Asymmetric Architecture" section, then continues as below.]

---

### DRY, Abstraction, and the View Principle

The compiled-wrapper architecture is not merely about page objects or test utilities. It reveals a general truth about _any_ indirection in code. DRY—"Don't Repeat Yourself"—is fundamentally an instruction to create views over repeated substance. When you extract a function, you are creating a wrapper: the function call expands to a sequence of primitive operations. When you define a constant for a magic number, you are creating a wrapper: the identifier expands to a literal value. When you factor out a shared component in a UI framework, you are creating a wrapper: the component tag expands to a tree of primitives.

In every case, the same two-layer structure appears:

- The **primitive ground truth** – the actual operations that execute.
- The **wrapper layer** – names, functions, components, all of which _project_ a convenient interface over that ground truth.

The compiled-wrapper architecture generalizes this pattern. Any DRY abstraction, any macro, any inline function, any component – if it expands to the same primitive sequence as the canonical version of truth, it is verifiably correct. And if it does not, the build fails.

This is the view principle applied to code organization: _presentation is not architecture_. The fact that you have factored something out is a decision about how the code is presented to human readers and tooling. It does not change what the software _does_. The canonical file captures what the software does. Everything else is a view.

---

### The Separation of Concerns That Matters

A crucial distinction emerges: **behavioral change** versus **architectural change**.

- **Behavioral change** – modifying what the software actually does. A new step in a login flow. A different selector. An additional assertion. These changes belong exclusively in the canonical file. They are the substance.

- **Architectural change** – modifying how the software is organized, without altering what it does. Renaming a wrapper method. Splitting a large wrapper into smaller ones. Changing the naming convention of test helpers. These changes operate only on the derivative layer.

The compiled-wrapper architecture enforces this separation. You cannot accidentally introduce a behavioral change by editing a wrapper – because the wrapper's expansion must match the canonical, and the canonical has not changed. Conversely, you cannot accidentally break the wrapper layer by editing the canonical – because the build will fail until the wrappers are updated to match.

This is the essence of _softness_ in software: the ability to change the substance (behavior) without paying the cost of updating every place that presented that substance. The wrapper layer conforms to the canonical. The canonical does not conform to the wrappers.

Without this separation, every behavioral change incurs a tax on the architectural layer. You change a selector – you must update every test that used the old selector, every page object that referenced it, every fixture that depended on it. That tax is not a property of the behavior. It is a property of the _presentation_ you chose. The compiled-wrapper architecture pays that tax mechanically, or not at all.

---

### Snapshots as Verification, Snapshots as Discovery

Jest snapshots provide an illuminating parallel. When you run a snapshot test, you serialize a value and compare it to a stored reference. Updating snapshots is a conscious act – you run `jest -u` when the change is intentional.

The canonical file in this architecture serves the same role as a master snapshot. It is the stored reference against which all wrapper expansions are compared. When you change the canonical, you are effectively updating the master snapshot. The build will then fail for every wrapper that has not yet been updated to match.

But snapshots also offer a diagnostic capability. Consider a scenario without wrappers: you change a selector in one test file. You run your tests. One snapshot fails – the one you changed. But there are ten other tests that also use that selector, scattered across the codebase, each with its own snapshot. They do not fail because they still have the old selector. You have just introduced a divergence. The software now has inconsistent behavior depending on which test runs. The snapshots did not catch this because each snapshot is isolated.

Now consider the same scenario with the compiled-wrapper architecture. The canonical file contains the selector once. All tests are written as sequences of wrapper calls that expand to the canonical sequence. When you change the selector in the canonical, you change it everywhere. You run the build. All tests pass, because all wrappers expand to the new canonical. The snapshots (if you maintain them) show the change in exactly one place – the canonical – and the verification step ensures that all wrapper expansions match that single source.

The diagnostic insight is this: **if you change something and the effect appears in only one place when it should appear in many, that is a sign that you lacked a proper wrapper.** The absence of abstraction forces you to scatter the same change across multiple files, each with its own risk of omission or inconsistency. The presence of a canonical wrapper – a single source of truth for that piece of behavior – turns a scattered change into a localized one.

Snapshots can be used to _detect_ missing wrappers. Before introducing the compiled-wrapper architecture, you might snapshot the entire test output of your suite. Then you make a behavioral change – say, updating a button's `data-testid`. After the change, you examine which snapshots differ. If more than one snapshot differs, that is expected – the behavior changed in multiple tests. But if _exactly one_ snapshot differs, and you know the change should affect many tests, you have discovered a problem: your tests are not sharing the canonical source of truth for that behavior. The correct fix is to introduce a wrapper (a function, a constant, a page object) that captures that behavior in one place, then rewrite the tests to use it.

---

### Wrappers as Architectural Debt That Pays for Itself

Every wrapper is a bet. The bet is that the convenience it provides – shorter code, better names, IDE support, DRY – outweighs the cost of maintaining the indirection. Many teams lose this bet because the cost of updating wrappers scales with the number of behavioral changes, and behavioral changes are frequent.

The compiled-wrapper architecture changes the terms of the bet. Wrappers no longer incur a per-change cost. The cost is shifted to:

1. **Initial creation** – writing the canonical file and the wrappers that project it.
2. **Mechanical propagation** – updating wrappers when the canonical changes, which can be automated with AI or code generation.
3. **Verification** – the build's equivalence check, which is automatic.

The ongoing cost of _using_ wrappers – writing tests that call them – is zero. The cost of _maintaining_ wrappers is near-zero, because propagation is automated. The cost of _verifying_ correctness is paid by the CI system, not by the developer.

This transforms the economics of abstraction. In traditional codebases, introducing a wrapper is a commitment to future maintenance. In this architecture, introducing a wrapper is a one-time effort that yields permanent convenience, because the canonical file owns the behavior and the wrapper simply follows.

---

### Different Wrappers for Different Concerns

Not all wrappers are equal. The compiled-wrapper architecture distinguishes between:

- **Architectural wrappers** – those that embody a single source of truth for a piece of behavior. The canonical file itself is the ultimate architectural wrapper. Page objects, if they capture _all_ interactions with a particular UI surface, are architectural wrappers. Changing the canonical changes the behavior; updating the wrapper is a mechanical propagation.

- **View wrappers** – those that exist purely for presentation, with no claim to being the single source of truth. A fluent DSL that reorders or renames operations is a view wrapper. A test helper that combines multiple primitives into one named step is a view wrapper. Multiple view wrappers can project the same canonical in different ways.

The architecture permits both, but treats them differently. Architectural wrappers are _canonical_ – they are the truth, and other wrappers must expand to match them. View wrappers are _derivative_ – they must expand to a sequence that matches _some_ architectural wrapper, but they are not required to be the only representation.

In practice, a repository might have:

- One canonical file per logical behavior (`flows/login.ts`)
- One architectural wrapper per UI surface (`pages/LoginPage.ts`) that exactly mirrors the canonical operations
- Multiple view wrappers per test author's taste (`actions/logIn.ts`, `steps/iLogIn.ts`, `dsl/login.perform()`)

All view wrappers are verified against the architectural wrapper, which is itself verified against the canonical. The build enforces a chain of equivalence.

---

### Snapshot-Verified Wrappers

The verification step can be implemented using the same snapshot machinery developers already understand. For each wrapper method, you can snapshot its expansion to primitives. The snapshot becomes the stored expectation. On every build, the current expansion is compared to the snapshot.

When the canonical changes, the snapshots for affected wrappers will fail. The developer (or AI) then updates the snapshots to match the new canonical. This is exactly the same workflow as `jest -u`, but applied to wrapper definitions rather than test outputs.

The advantage of snapshot-based verification is that it composes with existing tooling. You do not need a special-purpose compiler. You need:

- A convention for mapping wrapper expansions to canonical fragments
- A snapshot test that runs the expansion and compares it to the stored canonical
- A commit hook that fails if snapshots do not match

This is lightweight enough to implement in any project that already uses Jest or similar snapshot frameworks.

---

### Two Truths, Verified

The original objection to wrappers stood: they tax every change. The compiled-wrapper architecture removes that tax by making wrappers _derivative_ and _verifiable_. The canonical owns the behavior. The wrappers follow. The build enforces.

DRY, abstraction, factoring – all are views over the same primitive ground truth. They are not architectural in the sense of changing what the software does. They are architectural only in the sense of organizing how we _see_ what the software does. That is a legitimate concern – readability, maintainability, tooling support – but it is a separate concern from behavior.

The compiled-wrapper architecture gives you both. The substance changes freely. The presentation adjusts automatically or verifiably. The build tells you when they have drifted apart.

That is softness: the ability to change what the software does without being punished for how you chose to write it down.

_[Original conclusion follows.]_
