---
title: "AI Agents, Me, and My Feelings"
date: "2025-07-18"
featured: true
description: "A personal take on the power and perils of using AI agents in software development, exploring how to strike a balance between productivity and preserving one's skills."
---

I have been using AI-based editors for a couple of years. At my previous job, I used GitHub Copilot, and more recently, since November 2024, I have been using Cursor. The field of AI is evolving so rapidly that it's challenging to form a consistent opinion about it. This post outlines some of my feelings on the subject.

AI agents are powerful and useful, but they also present certain dangers. If you let an AI agent write most of your code, you risk creating a codebase that you won't remember in the long run. Worse yet, if you don't ask the agent to document its work, you could end up with a mess that is difficult to reason about. Personally, I remember all the code I've written and thought about deeply. While an agent can significantly reduce development time by doing the heavy lifting, I find that because I didn't exert the mental effort myself, I don't remember the details as minutely as when I write the code from scratch.

However, not using AI agents or some form of AI assistance is not an option either, as it would likely lead to a significant drop in productivity and longer shipping times. So, what should we do?

I can already foresee a significant problem for people who use AI for more than 80% of their work: muscle atrophy. It would be just like the fate of humans in the movie *Wall-E*.

![wall-e-humans](https://m.media-amazon.com/images/M/MV5BZDQ5MzBmODItZDZjMC00Mjk3LThiYTUtOTc5NzkzNTU3NmNiXkEyXkFqcGc@._V1_QL75_UX820_.jpg)

They became totally atrophied and unable to walk because they didn't use their muscles anymore. Who is to guarantee that the same fate doesn't await us if we stop using our brains?

This is the biggest conflict I have. While there are dangers in using AI extensively, there is also a loss in not using it. Personally, I want AI to become like Jarvis, doing the heavy lifting for monotonous tasks that don't spark creativity. At the same time, it should be dependable and correct most of the time, giving me the time and scope to be creative and tackle the hard bits.

The question is: how can we achieve this with current tooling?

-   **AI-Powered Research**: By using tools like ChatGPT and Google AI Studio for deep research, one can accumulate a wealth of information and learn it thoroughly. This would have taken much more time in the pre-AI era. Go deep with this research so you can spot when an agent f**ks up, because you will have the theory to back your judgment. Also, one should always download the research as Markdown or PDF files and maintain a local knowledge repository, even backing it up to Git.

-   **Code Implementation**: Think about the implementation in great detail and write some code and tests. Get the AI to write the boilerplate exactly to your liking, and then you can write the non-trivial bits. If you're getting an AI to write functions or other pieces of code, have it write tests to validate what it wrote, so that it’s covered for any future refactoring.

-   **Vigilant Review**: Never blindly trust the code an AI has written. Even if it looks good on the surface, go deep into the implementation and refactor where needed. No model, however strong, is equally capable in all languages and frameworks.

-   **Continuous Learning**: While AI shortens the time for writing features and bug fixes, use that free time to learn more and go deeper. If you want job security, in-depth knowledge of the business logic is your only protection.

-   **Intelligent Tooling**: Use AI as an elaborate linter, code reviewer, and security analyst. It is seriously great at that. It can also be helpful with performance work, given the extensive training and exposure it has that you might not have.

I firmly believe that people with a strong foundational knowledge of languages and stacks, extensive experience building things, and a good grip on AI—knowing how much and when to use it—will smoke many inexperienced and inefficient developers. Your biggest threat is not AI, but good developers armed with the superpower of AI.

The next 12-24 months will be critical as many companies integrate AI agents into their main workflows.

> Anything that can be automated by AI agents will be automated by AI agents.

