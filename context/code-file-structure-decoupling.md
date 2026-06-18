---
title: Decoupling Code from File Structure
subtitle: Why file structure is not an architectural decision
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture;
---

Is file structure an architectural concern? Is one file structure better than another? Can we answer these questions unequivocally?

In my opinion — yes. Absolutely. I will argue why.

But before I get to the "why," I want to consider the opposite case. A case so extreme that it has become an architectural framework. I am talking about FSD — Feature Sliced Development.

FSD is an architectural framework that believes the point of architecture is where you put your files. Features should be grouped together. Other things should be grouped by layers. The main argument is that this helps maintain large projects.

But this framework has shown serious scalability problems. It struggles to reconcile certain decisions without being overly opinionated.

Let’s step back.

First, we need to define what architecture really is. Architecture is what makes software _soft_. That means when something changes, we can change that part quickly and softly, without affecting the entire codebase. Good architecture makes this possible. Bad architecture makes it impossible.

Now, does good file structure make this possible?

I would argue — only in a very limited sense.

In practice, we often navigate code without thinking about where files live. We use search. We use IDE context menus. We jump to definitions. The physical location of a file becomes almost invisible.

If files are grouped well, it might be easier to perform bulk actions on them. Or to find related files. But those tasks can be done even if files are not grouped well.

To develop this thought further, I built a VSCode extension.

The extension allows you to organize files in any structure you want. You can even have several parallel structures — all without affecting the code itself. The code remains completely unchanged. The file structure becomes a separate, optional view.

Let me show you how it works.

### How the Extension Works

The extension reads special comments in your source files. These comments define tags.

For example:

```typescript
// tags: user/profile; user/settings
function updateProfile() {
  // ...
}
```

Here, the `updateProfile` function belongs to two tag paths: `user/profile` and `user/settings`.

The extension scans your workspace. It looks for these tags. Then it builds a tree view based _only_ on the tags. The actual file locations on disk do not matter.

Here is a simplified version of the core logic:

```typescript
// Simplified parser
async function parseWorkspace() {
  const files = await vscode.workspace.findFiles("**/*");
  const tagMap = new Map<string, Set<string>>();

  for (const file of files) {
    const text = await openAndRead(file);
    const matches = text.matchAll(/\/\/\s*tags:\s*(.*?)(?:\r?\n|$)/g);

    for (const match of matches) {
      const tags = match[1].split(";").map((t) => t.trim());
      for (const tag of tags) {
        const fullTag = tag.replace(/\//g, "/");
        if (!tagMap.has(fullTag)) {
          tagMap.set(fullTag, new Set());
        }
        tagMap.get(fullTag)!.add(file.fsPath);
      }
    }
  }

  return tagMap;
}
```

Once the tag map is built, the extension builds a tree. The root nodes are the top-level tags. Inside each tag, you see either sub-tags or the actual files.

The key point is this: **the files remain where they are**. They can be in a flat folder. They can be grouped by type. They can be scattered anywhere. The extension ignores the disk structure entirely.

### Why This Matters

If file structure can be completely separated from code, then it is not an architectural concern. Architecture is about how code responds to change. File structure is just a presentation layer.

You can move a file from one folder to another. The extension still shows it under the correct tags. You can change the tags. The file location stays the same.

They are decoupled.

### The Philosophical Conclusion

The logic is simple:

- If a concern can be shown to be isolated from code,
- And changes to code do not affect it,
- And changes to it do not affect code,
- Then that concern is not architectural.

File structure passes this test. The VSCode extension proves it. Code can live in a flat structure and still be organized in multiple ways through tags.

Therefore, frameworks like FSD — which treat file structure as a primary architectural decision — are philosophically invalid. They confuse presentation with structure. They make promises about maintainability that are not tied to the actual softness of the code.

Good architecture is about how code behaves under change. Not about where you put the files.
