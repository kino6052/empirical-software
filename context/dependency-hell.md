---
title: Dependency Hell of Modern Development
subtitle: Why do we have so many dependencies?
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / dependency;
---

Why do we have so many dependencies? Are they truly necessary?

I argue they are not.

But first, let’s look at the opposite view honestly.

The other side says: Dependencies are essential. They save thousands of hours. You don’t want to write your own date parser, HTTP client, or UI framework. Security updates come from the package maintainer, not from your own buggy code. If everyone wrote everything from scratch, we would never finish any project. The real hell is not dependencies — it’s rewriting what already works.

That is a strong argument. It is true for many cases.

Yet look closer. The opposite view assumes every dependency is well‑maintained, secure, and lightweight. That is rarely true. You pull one library. It pulls ten more. One of them has a security vulnerability. Another breaks on a minor Node update. You spend hours fixing version conflicts. That is not saving time. That is trading a small problem for a bigger one.

The big offenders are libraries like React, Lodash, Moment.js. You rarely need the whole thing. You need one function or one pattern. But you pull the entire tree. The opposite view says “tree shaking will save you.” It does not. It only removes unused exports, not the transitive dependencies that still get downloaded, audited, and updated.

Why can’t we use prepackaged bundles? We can. Many libraries offer standalone bundles with no external dependencies. But we ignore them. We prefer import \_ from 'lodash' over copying a single debounce function. That is a choice, not a necessity.

Now consider the strongest counter‑counter argument: Most of our code does not actually share many libraries across different parts of the app. You can verify this. Run a dependency graph tool. You will see duplicated helpers, overlapping versions, and entire packages used for one utility. The opposite view assumes deep reuse. The data shows shallow, wasteful inclusion.

So what is the strongest position?

Dependencies are necessary for large, complex problems — database drivers, encryption, rendering engines. But for the vast majority of everyday code, dependencies are a habit, not a need. The real hell comes from the tacit agreement to install first and ask questions never.

The strongest path forward is this:

1. Start with zero dependencies for the first hour of a project. See how far you get.
2. Verify shared usage — before you add a library, check if you actually need more than one function.
3. Prefer prepackaged bundles that ship no further dependencies.
4. Write ten lines of your own code when it is stable and simple.

Yes, sometimes you need React. Sometimes you need a heavy tool. But most of the time, you don’t. That is not idealism. That is just counting.

Both sides agree on one thing: unmanaged dependencies hurt. The difference is that one side accepts it as the cost of modern development. The other side — the stronger one — says we can do better. Not by avoiding all dependencies, but by treating each one as an expense, not a default.
