---
title: Sprints Should Have Names
subtitle: Agile as it was meant
date: 2025-02-21
layout: post.html # reference to a layout file
tags: all; code / architecture; philosophy; code / metaphysics;
---

## The Reification of Process

Every idea that escapes its empirical anchor becomes a ritual. This is not a metaphor — it is a predictable transformation with identifiable stages. First, a practice is developed in response to a concrete problem. Then the practice is named and formalized. Then the name is adopted without the practice. Then the formalization is enforced without the problem it was meant to solve ever being examined. Finally, the ritual is defended not by its results but by its own internal logic: we do it this way because this is the way it is done.

Agile has completed this transformation in most organizations that claim to use it. What began as a serious attempt to build feedback into the software development process has become, in the majority of companies practicing it, a calendar of ceremonies layered on top of JIRA. The ceremonies are performed. The feedback is not obtained. The gap between the two is not noticed, because the ritual has replaced the purpose so completely that the purpose is no longer visible.

This is precisely what happens to ungrounded ideas. And Agile, as practiced, is one of the most thoroughgoing examples the software industry has produced.

---

## The Original Insight Was Correct

Before diagnosing the failure, the success deserves acknowledgment: the original insight behind iterative development is genuinely sound. Software development is an activity conducted under uncertainty. Requirements are not fully known at the start. Understanding deepens through building. Feedback from working software changes what needs to be built. A process that builds in structured opportunities to incorporate this feedback — short cycles, working increments, regular demonstration — is better matched to the actual nature of software work than a process that demands full specification upfront and delivers results months later.

This is not a controversial claim. It is the application of the feedback principle — the same principle identified earlier as the primary determinant of scalability — to the project management layer. Short cycles with working demonstrations are fast feedback. Long cycles with documentation milestones are slow feedback. Fast feedback is better, for the same reasons it is better in code.

The insight is correct. The execution is religious.

---

## What the Religion Looks Like

In every organization where Agile has become ritual, the same symptoms appear.

Tasks are described as implementations of abstractions. _Implement integration with PaymentProvider. Refactor AuthService. Update UserRepository._ These are not tasks. They are operations on reifications. They describe work in terms of internal concepts that have no correspondent in anything the user of the software will ever observe. A developer receiving such a task cannot answer the most basic question — _what will be different, visibly, when this is done?_ — because the task is not described at anything close to a perceptual level. It is described at the level of the architecture's self-image.

Backend developers become the hardest-working people in the room while producing nothing a user can see. This is presented as a sign of seriousness — as evidence that important, load-bearing work is being done beneath the surface. It is not. It is a symptom that the reification layer has grown so thick that the connection between internal work and observable output has been severed. If a developer cannot, at the end of a sprint, demonstrate what they built by pointing at a screen, the work has disconnected from its empirical anchor. This is not diligence. It is the organizational expression of a codebase that has become unscalable.

Sprint names are numbers. Sprint 47. Sprint 48. Sprint 49. Nobody remembers what happened in Sprint 47. Nobody is expected to. The sprint is not understood as a unit of achievement with its own identity; it is understood as a time box, a container for tickets, a period that ends when the calendar says it ends and begins again immediately. There is no artifact. There is no celebration. There is no memory. The team moves forward by forgetting, which means it cannot learn, which means it will make the same mistakes in Sprint 48 that it made in Sprint 47, with no mechanism to recognize the repetition.

---

## What Grounded Agile Looks Like

The fix is the same as the fix for ungrounded software: trace everything to what can be perceived.

**Tasks must describe observable changes.** Not _implement integration with ABSTRACTION.INC_ but: _add a link to ABSTRACTION.INC documentation on the settings page._ Not _refactor the AuthService_ but: _the login form should show a specific error message when the account is locked, currently it shows nothing._ The task is grounded when a person looking at the running software can verify, without access to the source code, whether the task is complete. If verification requires reading the code, the task is described at the wrong level.

The first step of any task, when the work ahead is unclear, is always groundable: _find the documentation. Read the relevant section. Write down what the integration requires._ This is perceivable output. A document exists or it does not. The next step derives from it. Unblocking is always possible when work is described at the level of what can be done and verified right now.

**Each sprint must be oriented around a demonstration.** Not a status update. Not a list of completed tickets. A demonstration — something that can be shown on a screen to a person who does not know how the software works, and understood by them as a change in what the software does. This constraint is not arbitrary. It is the application of the fundamental requirement — that software must be runnable in full at every stage, with complex dependencies substituted by simpler ones — to the project management layer.

If the software being built is at the skateboard stage, the demo shows the skateboard: the synchronous, in-memory version of the feature, running on a single machine, demonstrating the user-visible behavior without any of the production infrastructure. This is not a prototype. It is the correct increment. The production infrastructure is a swap-in that replaces the simple implementation behind a stable interface. If the interface is stable, the swap is safe, and the demo next sprint shows the real implementation.

If the work to be done in a sprint cannot produce a demo — if there is genuinely nothing visible to show — the software is already unscalable. The inability to produce a demo is diagnostic: it means that the codebase has no path from internal changes to observable output that can be traversed in the length of a sprint. This is a scalability failure, not a project management failure. The correct response is not to hold the demo anyway and show a slide deck. It is to treat the blocked sprint as the signal it is: the software cannot be changed fast enough to satisfy the feedback requirement. Go back. Make it scalable. The first demo shows how easy it is to swap implementations.

**Sprints must have names.** Not numbers. Names that carry meaning — that identify what was built, what was learned, what was celebrated. _The Full Payment sprint._ _The sprint where we finally got the payment flow working._ Names that the team can use to locate themselves in their own history. Teams that name their sprints treat each cycle as an event worth remembering. Teams that number their sprints treat each cycle as interchangeable time, and time that is interchangeable cannot be learned from.

The artifact of each sprint should be the demo recording. A team should be able to watch Sprint The Full Payment eighteen months later and see what they built, in what state, with what quality. This is not nostalgia. It is a record of progress against which current work can be measured. It is the project management equivalent of version control: a history that makes change visible and learning possible.

---

## The Falsifiable Claim

This is the claim, stated precisely enough to be refuted:

_Given a software project that satisfies the grounding requirement — that the application can run in full on a single machine at every stage of development, with all external dependencies substituted by synchronous in-memory implementations — it is always possible to produce a visible, demonstrable increment for any sprint, including the first._

If this is true, then the inability to demo is never a feature-of-the-work. It is always a symptom of unscalable software. And the correct response to a blocked sprint is never to adjust the project management process. It is to fix the software.

**What would falsify it:** Produce a software project that satisfies the grounding requirement — demonstrably runnable on a single machine with substituted dependencies — where a team could not, for a specific sprint, produce any visible increment to show to a client, even at the skateboard level of fidelity. If the requirement was understood, the software was genuinely grounded, and the demo was still impossible, the claim is false.

Note what does not falsify it: a demo being hard to produce, or requiring deliberate simplification of scope. The claim is not that grounded software makes sprints easy. It is that grounded software makes them _possible_. Difficulty and impossibility are different things. A sprint that is hard to demo may reflect genuine complexity in the problem. A sprint that cannot demo at all reflects a structural failure in the software.

---

## Why This Matters Beyond Process

Process religions are not harmless. They consume time, generate bureaucracy, and produce the appearance of structure without the substance. But the deeper cost of ungrounded Agile is that it confirms the false belief that project management is separable from software quality.

It is not. The speed at which a team can iterate, demonstrate, and incorporate feedback is a direct function of the software's scalability. A team working on unscalable software will produce ungrounded Agile as a consequence — not because they have adopted the wrong methodology, but because their software has made it impossible to demonstrate weekly increments of visible behavior. JIRA and sprint ceremonies fill the void left by the absence of demos.

Fix the software, and the process fixes itself. The ceremony becomes real because the artifact is real. The demo is possible because the software is grounded. The sprint earns a name because something happened in it that is worth remembering.

That is Agile. What most teams practice is the ritual performed in its absence.
