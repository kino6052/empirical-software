---
title: Decoupling Code from Nesting
subtitle: Why nesting is not an architectural concern
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture;
---

Is having a large function or file bad architecture? Is decomposition into many small functions always better? Can we answer these questions unequivocally?

In my opinion — yes. Absolutely. I will argue why.

But before getting to the answer itself, we first need to understand what exactly people mean when they talk about “clean structure.”

Modern programming culture strongly associates quality with decomposition.

Large functions are considered suspicious. Deeply nested logic is considered dangerous. Splitting code into many files and many helpers is often treated almost as a moral virtue.

But something strange happens when we examine these claims carefully.

Most of the time, decomposition changes absolutely nothing about the actual behavior of the program.

The execution graph remains identical.

The dependencies remain identical.

The data flow remains identical.

Only the _presentation_ changes.

This is extremely important.

Because architecture is not about presentation.

Architecture is about whether software remains soft under change.

A good architecture allows modification without causing cascading damage throughout the system. A bad architecture creates rigidity and coupling.

Now we can ask the real question:

Does visual nesting determine softness?

I would argue — only in a very limited sense.

And to understand why, let us consider a simple example.

```typescript
// separate-function
export const test = (param) => {
  console.log(param);
  console.warn("check");

  console.error("test");
};

const one = () => {
  return {
    name: test("Hello, World!"),
  };
};
```

Normally, we perceive this as two separate units:

- one function declaration,
- one call site.

The editor reinforces this perception.

The function occupies physical space above. The call occupies physical space below. Our brain interprets them as separated conceptual objects.

But this separation is not inherent to the code itself.

It is only one possible visualization.

I built a VSCode extension to demonstrate this.

The extension reads special comments like:

```typescript
// separate-function
```

and changes how the editor presents the source code.

Instead of showing the helper function separately, the editor can visually inline it directly into the call site:

```typescript
const one = () => {
  return {
    name: ((param) => {
      console.log(param);
      console.warn("check");

      console.error("test");
    })("Hello, World!"),
  };
};
```

The source code itself never changes.

The file on disk remains identical.

Only the representation changes.

And the reverse is also possible.

A deeply nested implementation can be visually collapsed into symbolic calls, hiding internal details and making the surrounding logic appear simpler.

In other words:

- functions can appear local while living elsewhere,
- or appear external while physically existing nearby.

The editor becomes capable of projecting different organizational realities over identical code.

This changes the discussion completely.

Because once representation becomes virtualized, nesting stops being an intrinsic property of architecture.

It becomes a cognitive tool.

### The Hidden Assumption

Modern programming languages accidentally fuse two separate concerns:

- execution structure,
- perceptual structure.

But they are not the same thing.

A nested function affects lexical scope. That is real semantics.

But whether we _visually perceive_ it as nested is not semantics. That is editor behavior.

Similarly:

- code folding,
- minimaps,
- “Go to Definition,”
- inline type hints,
- syntax highlighting,
- call hierarchies,

already manipulate our perception of code without changing the program itself.

My extension simply pushes this principle further.

It allows decomposition itself to become partially virtual.

### The Important Consequence

This creates a serious philosophical problem for many programming dogmas.

Consider the common claim:

> “Large functions are bad architecture.”

But what exactly does “large” mean?

Large on disk?

Large visually?

Large cognitively?

A function may occupy 300 lines physically while only exposing 20 relevant lines through projection and collapsing.

Another function may occupy 20 lines physically while requiring jumps across 15 files to mentally reconstruct its behavior.

Which one is truly more complex?

The answer is no longer obvious.

Because complexity is partly a property of representation.

And once tooling can manipulate representation independently from execution, arguments based purely on visual decomposition lose their universality.

### The Real Role of Decomposition

This does not mean decomposition is useless.

Far from it.

Decomposition still matters when it changes actual coupling:

- reducing dependency surfaces,
- isolating side effects,
- separating domains,
- improving testability,
- controlling state propagation.

Those are architectural concerns because they affect how software behaves under change.

But splitting logic merely to satisfy visual aesthetics is different.

That is not architecture.

That is navigation.

And navigation can be virtualized.

### A Useful Analogy

A city can be represented in many ways:

- subway map,
- road map,
- terrain map,
- population density map,
- political district map.

None of these maps _is_ the city.

They are cognitive projections optimized for different tasks.

Code organization is similar.

Folders, files, nesting, and decomposition are often just maps over an execution graph.

Different developers prefer different maps because they optimize different forms of cognition.

But the underlying program may remain unchanged.

The mistake is confusing the map for the terrain.

### The Philosophical Conclusion

The logic becomes simple:

- If representation can be manipulated independently from execution,
- and changing representation does not alter the behavior of the system,
- and multiple representations can coexist simultaneously,
- then representation itself is not architecture.

Nesting passes this test.

File structure passes this test.

Visual decomposition passes this test.

They are not the software itself.

They are lenses through which humans perceive software.

Good architecture concerns resistance to change.

Presentation concerns resistance to perception.

These are related problems.

But they are not the same problem.
