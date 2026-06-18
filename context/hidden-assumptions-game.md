---
title: GROW
subtitle: What a Seedling Teaches About the Assumptions You Never Knew You Had
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; coding; learning; philosophy / epistemology;
---

<a href="https://codesandbox.io/p/sandbox/plant-99cjrl">CodeSandbox with the game.</a>

## THE PROBLEM OF THE UNASKED QUESTION

You stand before a seedling in a plain pot. You water it. It dies.

You read a pamphlet about watering. You water differently. It lives.

This is not a story about plants. It is a story about _questions you did not know existed_.

Every beginner gardener faces a gap. But the gap is not in their knowledge of facts. The gap is in their _menu of possible actions_. They perform an action — watering, moving, feeding — without realizing that the action itself has hidden branches. They assume that "watering" is one thing. In reality, it is a tree of choices: how much, how often, from above or below, with what kind of soil, at what time of day.

The plant dies not because the gardener is stupid. The plant dies because the gardener never knew there was a choice to make.

Let us examine two kinds of blindness. Then we will see how a small simulation game called GROW engineers a cure.

---

## TWO KINDS OF BLINDNESS

**The first kind:** You see an effect. You do not see its cause. The leaf droops. Where is the moisture? Below the surface, invisible. You guess. Sometimes you guess wrong. This is the familiar blindness of hidden information. You solve it by measuring — a finger in the soil, a moisture meter.

**The second kind:** You do not even know that a question exists. You have never heard that "bottom-watering" is a distinct technique. To you, "watering" is a single, undifferentiated act. The possibility of choosing _how_ to water never enters your mind. This is the blindness of _hidden questions_.

The first blindness is a locked box. You find the key. The second blindness is a smooth wall with no door — not because the door is locked, but because you never thought to look for a door.

Most learning games address the first blindness. They hide a number. You hunt for clues. You find the number. You win. This is satisfying, but it misses something essential.

GROW — a small plant‑tending simulation — addresses the second blindness. It hides _assumptions_. And it forces you to discover those assumptions through failure.

---

## THE ASSUMPTION AS A DEFAULT ACTION

Every action you take sits on a foundation of unexamined assumptions.

You water the plant. What assumptions are you making? That watering is a single operation. That the method of delivery does not change the outcome. That roots are passive pipes waiting to be filled, not active structures that grow toward moisture.

These assumptions are not written in any manual. They live in your fingers. They live in the shape of the button you press.

GROW makes these assumptions visible by encoding each one as a _default action_. When you have not read the guide on watering method, the game gives you one watering button. Behind that button, it performs a specific hidden operation: surface watering. The plant's roots stay shallow. Eventually the plant collapses.

You see the collapse. You do not see the chain of assumptions that led to it. The game does not say, "You made an error." It says: **"You never read this guide. That assumption stayed invisible — so you never got to choose."**

That is a different kind of feedback. It does not judge your decision. It points to a question you never knew you could ask.

---

## THE MOMENT A LEVER APPEARS

Here is the mechanical heart of the thing.

After you read the guide, the watering button _changes_. A menu appears. Four options. Bottom. Surface. Mist. Daily splash.

You now have a choice where before there was only an automatic reflex.

The guide gave you a mental model — "bottom‑watering builds deep roots." But the mental model is not the prize. The prize is the _lever_. The interface has grown a new branch. What was a single action is now a decision tree.

The game does not say, "Congratulations, you have learned a fact." It says, "You have transformed an invisible assumption into a visible choice."

This is not cognitive psychology. This is _interaction design as epistemology_. The model lives in the world, not just in your head. It lives in the buttons you can press.

---

## WHY STORING FACTS IS NOT ENOUGH

Consider the difference between a recipe and a stove.

A recipe tells you: "Brown the meat on high heat before adding liquid." You can memorize this sentence. You still do not know _why_ browning matters, or what happens if you skip it, or whether "high heat" means the same on every stove.

A stove gives you knobs. You turn one. The meat sizzles or burns. You learn by doing, by choosing, by observing the consequence of each setting.

Most educational software acts like a recipe. It presents a model. Then it tests your ability to repeat the model. This is _storage_, not learning. You can store a fact without it ever changing what you do.

GROW acts like a stove. It hides the knobs until you have earned the right to see them. Then it gives you the knobs and says: "Now choose. The plant will tell you if you chose well."

The model (the text you read) matters only because it unlocks the knob. Without the knob, the model is just decoration.

---

## THE PERSISTENCE OF EXCAVATED QUESTIONS

Here is the second insight.

When the plant dies, the game tells you exactly which unread guide contained the assumption you did not know you had. You read it. The assumption becomes visible. And — this is critical — _it stays visible forever_.

You carry your excavated questions across every new seedling. The game resets the plant. It does not reset you. You remain a person who now knows that "watering" contains hidden branches.

This models a deep truth about real expertise. Once you see that a leaning stem means "reaching for light, not weakness," you cannot unsee it. The assumption that leaning was a defect collapses. A new action — rotating the pot — becomes obvious. You do not have to remember a fact. You simply _see_ a possibility that was invisible before.

The expert is not someone with more models in their head. The expert is someone who has _demolished more false assumptions_ about what is possible. Their world contains more levers.

---

## A METHOD FOR DESIGNING SUCH MACHINES

If you wanted to build a learning tool that works this way, you could follow a simple pattern:

**For every hidden assumption a novice makes, define a default action that embodies that assumption. Then hide the alternative actions behind a text that names the assumption. When the text is read, replace the default action with a visible choice.**

Let us test this pattern in other domains.

**Cooking.** Novice assumption: "Browning meat is just something you do." Default action: brown always. Hidden alternatives: not browning, browning at different intensities, browning in batches. A guide explains the Maillard reaction and why moisture inhibits browning. After reading, the cooking interface now asks: "Browning level: None / Light / Medium / Dark."

**Programming debugging.** Novice assumption: "I run the program and look at the output." Default action: run the whole program. Hidden alternatives: breakpoints, stepping line by line, inspecting variables. A guide explains how execution traces reveal state changes. After reading, the debugger now offers: "Run mode: Full / Step / Break on condition."

**Medical diagnosis.** Novice assumption: "The symptom tells me the cause." Default action: treat the most visible symptom. Hidden alternative: consider that the symptom is downstream of a different system. A guide explains referred pain or atypical presentations. After reading, the diagnostic checklist adds a new column: "Could this be something else?"

The pattern is not complicated. It is _engineering the epistemology of action_ — building tools that grow as the user grows.

---

## THE SEEDLING AS A TEACHER

The seedling in GROW does not lecture. It does not quiz. It simply lives or dies based on choices you did not know you were making.

When it dies, it tells you: "You never read this guide. That assumption stayed invisible. So you never got to choose."

That is not a punishment. That is a _blueprint for reconstruction_.

Read the guide. Start a new seedling. The same pot. The same windowsill. But now the watering button has four branches. Now the light adjustment includes a rotation step. Now you see what was always possible but never accessible.

The plant lives or dies again. But this time, when it dies, it dies because you made a _choice_ — not because you were acting inside a prison you could not see.

---

## THE UNKNOWN QUESTION IS THE REAL ENEMY

We began with a gap. The gap is made of assumptions you do not know you have. It looks like common sense. It feels like "the way things are done."

GROW is a small machine for finding the cracks in that surface. It does not give you a map. It gives you a _method_: fail, notice that failure points to an unread guide, read it, watch a new choice appear, act, repeat.

Every time a new choice appears, you have learned something. Not a fact. Not a model. A _new question_ that you did not know you could ask.

That is what real learning feels like. Not the accumulation of answers. The discovery that there were questions you had never even formulated.

Now tend your seedling. And when it dies — as it will — do not ask only "What did I do wrong?" Ask also: "What did I not know I was assuming?"

That question is the beginning of genuine competence.
