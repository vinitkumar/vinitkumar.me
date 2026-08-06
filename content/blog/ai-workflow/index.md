---
title: "A Deliberate Workflow for AI-Assisted Development"
date: "2025-05-07"
featured: true
description: "How I use AI for planning, research, and review without surrendering the judgment that makes me a better programmer."
---

I started using GitHub Copilot at work a few years ago. Since then, I have also worked with Claude, ChatGPT, and Cursor. These tools can accelerate software development, but speed alone does not make the work better.

Agent mode gives me mixed feelings. Delegating an entire problem can produce a large amount of plausible code before I have understood the design. Used carelessly, that convenience weakens the reasoning and programming skills I want to preserve.

I would rather use AI as a pair programmer and research assistant than as an unsupervised code generator. When it does generate code, that code must meet the same tests, benchmarks, and standards as anything I write myself.

My workflow now looks like this:

1. **Think before prompting.** I read the problem, identify the constraints, and draft my own plan.
2. **Compare approaches.** I ask the AI to analyze the same problem, then compare its plan with mine. I borrow useful ideas without treating its answer as authoritative.
3. **Build through a tight feedback loop.** I implement the plan in small steps, preferably test-first, and verify each step before moving on.
4. **Use AI as a reviewer.** Once the code works, I ask the AI to challenge the design, find edge cases, and suggest simpler alternatives.
5. **Review every generated artifact.** Code and documentation remain my responsibility, regardless of who—or what—produced the first draft.
6. **Put the work through human review and QA.** A pull request, peer review, and product testing remain essential.

The goal is not to avoid AI. It is to use AI where it has leverage while keeping judgment, understanding, and accountability firmly with the engineer.
