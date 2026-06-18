---
title: JSX – why do we have to pay for the burden of the syntax sugar?
subtitle: why do we have to pay for the burden of the syntax sugar?
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / presentation;
---

Many of us love JSX. It feels intuitive and useful. But there is a big price: complex transformation pipelines that are not native to JavaScript. JSX is not built into the language.

Is this price necessary? Let’s understand.

The most direct alternative is using React’s API directly – createElement or similar. That approach is not terribly scary. It works. But once you are used to JSX, plain createElement looks unappealing and even unreadable. So the immediate answer is: you don’t _have_ to pay the price. You can choose the simpler API.

Now take it one step further. Why do we even keep JSX in our code? Is it the responsibility of our code to handle this kind of presentation? No. You could argue that we can write an IDE plugin. The plugin would render the React API calls as JSX using code lenses. The source code stays clean. The JSX view becomes a presentation layer on top.

That means the price is not necessary. Decoupling presentation from code is actually better from a design standpoint.

React is arguably the most “sinful” thing ever created when it comes to mixing responsibilities. It blends view and business logic. It mixes syntax presentation with code itself. It is a convoluted mess. But we adopted it because it nailed one crucial UI paradigm: composable components. That success does not excuse the rest. It does not have to be like this.

In fact, we should aim for a higher‑level contract than react.createElement. Create your own proxy. Then swap in other view libraries as needed. Keep your views pure. Avoid tying your code to a specific runtime or to hooks.

Next time you work on a hobby project, try the non‑JSX version. Write plain createElement calls. Then use LLMs to help you build a personal plugin that transforms the API into JSX – only when you want to see it.

Challenge yourself. Think in terms of separation of concerns. That is how we make our UIs better.
