---
title: Software Is Made of Ideas, Not Matter
subtitle: Why the failures of software are philosophical failures, and why physical intuitions reliably mislead us when we apply them to code.
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; philosophy; code / metaphysics;
---

## The Category Error at the Foundation

When a bridge collapses, we look for physical causes. Metal fatigue. Resonance frequency. A load that exceeded a structural limit. The investigation proceeds by examining matter — its composition, its arrangement, the forces acting upon it. The failure is in the physical world, and the physical world yields evidence.

When a software system collapses — becomes unmaintainable, incomprehensible, impossible to extend — we instinctively perform the same investigation. We look for structural causes. Wrong layers. Excessive coupling. Misaligned boundaries. We use the language of physical engineering: architecture, foundations, load-bearing, brittleness. We speak as though the failure is in an arrangement of matter that we can inspect and rearrange.

This is a category error. Software is not matter. It has never been matter. The failure of a software system is not a physical failure. It is a _philosophical_ failure — a failure in the realm of ideas — and it cannot be diagnosed or corrected by the methods appropriate to physical systems.

---

## The Written Form, the Executed Form, and the Idea Itself

Here is a distinction that the field has consistently failed to make, and whose absence is the source of persistent confusion.

Software has three modes of existence, and they are not the same thing.

The _written form_ of software — source code stored on disk — is a physical object. It consists of sequences of bytes arranged in files, occupying storage, subject to the same physical laws as any other stored signal. You can measure it, copy it, corrupt it with a magnet. It has a physical correlate in the world.

The _executed form_ of software — a running process — is also a physical object. It consists of electrical states in transistors, signals propagating through circuits, heat dissipating into a chassis. It too is measurable, physical, subject to physical constraints. A running program consumes watts. It occupies memory addresses. It can be halted by cutting power.

Neither of these is the software.

The software — the idea that the written form records and the executed form instantiates — exists in a third place entirely: in minds. It is the meaning of the code, the intent behind the structure, the logic that the execution is supposed to carry out. This is not a mystical claim. It is an observation about category. The idea of a sorting algorithm is not identical to its source file and not identical to its running process. The source file and the running process are physical manifestations — carriers — of something that is not itself physical. When you delete the source file, the idea does not cease to exist. When you halt the process, the algorithm has not been destroyed.

This third thing — the idea — is what software engineering is actually about. And ideas do not obey the logic of physical things.

---

## The Logic Ideas Follow

Physical systems have properties that make certain kinds of engineering possible. Matter is conserved. Forces obey equations. Structures have measurable tolerances. When you understand the physical laws governing a system, you can predict its behavior and engineer for its failure modes.

Ideas have none of these properties. An idea is not conserved when copied — copying a concept does not halve it. An idea does not have a measurable load tolerance — it can bear interpretations and extensions in ways that are not quantifiable in advance. An idea can be subtly wrong in a way that is entirely invisible until a specific application exposes the flaw. Two ideas can appear compatible and produce a contradiction only in combination with a third. An idea can mean different things to different minds holding what appear to be identical written representations.

These are not bugs in the nature of ideas. They are features — properties that make ideas extraordinarily powerful and extraordinarily difficult to engineer with. A physical material either holds a load or it does not. An abstraction can hold an indefinite range of applications and then fail catastrophically at the next one, with no prior warning signal.

The failure modes of physical systems and the failure modes of idea systems are therefore entirely different in character. Physical failures announce themselves through deformation, heat, noise, visible change. Idea failures are silent. They accumulate as invisible inconsistencies, unstated assumptions, concepts that have drifted from the percepts they were supposed to track — until the system reaches a point where the ideas can no longer support the weight of the problem, and the whole structure becomes incomprehensible without anything visibly breaking.

---

## The Diseases Ideas Carry

Philosophy — the discipline that has been working with ideas as its primary material for two and a half millennia — has a detailed taxonomy of the ways idea systems go wrong. These are not abstract academic concerns. They are precisely the failure modes that software systems exhibit.

Reification: treating an abstraction as though it were a concrete thing with independent existence. Philosophy identified this disease in its debates over universals; software exhibits it in every Repository, every Domain, every Service that exists because the pattern requires it rather than because observable behavior demands it.

Equivocation: using the same term to mean different things in different contexts, without noticing the shift. Philosophy encountered this in debates over the meaning of "being" and "substance"; software encounters it every time a concept that means one thing in the business domain is silently reinterpreted to mean something else in the data layer.

Underdetermination: a theory that is consistent with the available evidence but not uniquely supported by it — a concept that could mean several things and has not been pinned down to one. Philosophy met this in the problem of induction; software meets it in every interface that is underspecified, every function whose name gestures at behavior without committing to it.

Infinite regress: an explanation that requires the same kind of explanation as the thing it was meant to explain. Philosophy found this in attempts to ground knowledge in other knowledge; software finds it in frameworks that manage complexity by introducing complexity.

These are not metaphors. They are the same diseases, appearing in a new medium. Software is a young discipline working with very old material — ideas — and it has not yet learned the lessons that philosophy accumulated, often painfully, over centuries of making exactly these mistakes.

---

## Why This Makes Software Uniquely Difficult

A bridge builder does not need to worry that gravity will change its meaning halfway through construction. A software developer does. The abstractions that organize a codebase are ideas, and ideas are revisable, reinterpretable, and subject to drift in the minds of the people working with them. Two developers who agree on a design at the start of a project are holding ideas in their heads. Those ideas are not identical — they cannot be, because ideas exist in minds and every mind is different. Over time, under the pressure of new requirements and new team members and shifting understanding, the ideas diverge further. The codebase, which was always an attempt to record a shared idea, becomes a record of several incompatible ideas written in the same notation.

This is not a failure of communication. It is the normal behavior of ideas. Ideas mutate. They combine. They develop implications their originators did not intend. A physical structure, once built, stays built unless force is applied to it. An idea structure, once adopted, begins changing immediately, because it exists in minds that are always in motion.

The only tool that has ever worked against this property of ideas is the same tool philosophy developed for the same purpose: rigorous grounding. Pin the idea to something it cannot drift away from. Require that every concept be traceable to something that can be pointed at, measured, observed in the running software. An idea that is anchored to a perceivable fact cannot drift as far as an idea that is anchored only to another idea.

This is not a new insight. Berkeley made it in the eighteenth century. Peirce made it in the nineteenth. The logical empiricists made it in the twentieth. The insight keeps being made and keeps being forgotten, because the alternative — letting ideas float free, explaining them with analogies and defending them with appeals to pattern and principle — is so much more comfortable than the discipline of demanding, for every abstraction, the perceivable fact it is ultimately about.

Software is a new medium for an old problem. The problem is the management of ideas. The solution is the same as it has always been: know what you are talking about, and know how you know it.
