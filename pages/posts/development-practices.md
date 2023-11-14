---
title: A Somewhat Sane Guide for Software Development
date: "2020-02-06"
featured: true
---

I have been writing code professionally for around 8 years now. In this period, I have acquired some knowledge and formed some opinions on how software should be written and what practices to follow.

The guide is divided into following sections:

- Git Guidelines
- Backend Development Guidelines
- Frontend Development Guidelines
- DevOps Guidelines


# Git

Mastering version control such as Git is very important. Following are some tips and techniques to get better at using Git.


- Commit early, commit often. There is no shame in committing code that is work in progress. Infact, early commits help spot design issues very early in the development.
- Make a Draft PR as soon as you have a POC(proof of concept) ready and invite one of your peers to review the code. Early feedback helps spot issues, obvious mistakes and even typos early.
- Make atomic commits(meaning the code in the commit is doing one thing). Do not add a diff of 20 files doing all different things. It just make things very noisy and makes hard for reviewer to do their job.
- Avoid doing multiple things and do things in a proper flow.
- Write good commit messages. A good guide is here https://chris.beams.io/posts/git-commit/
- Setup your git properly with correct emails (For eg: your git configuration should be setup to use the work and personal emails depending upon what project you are on.
- **Don't get high on your own supply**. Unless absolutely urgent do not merge your own PRs. Ask a coworker to review the code.
- Always **create** release and tags while doing a production release. No code gets pushed to production without doing this.
- Write good release notes clearly mentioning the fixed bugs and the features built.
- Commit message should contains reference to the github issue.
- Sign git commits using GPG. It helps ensure the authenticity of the person doing the commit. Refer link here. https://help.github.com/en/articles/signing-commits
- Be honest, direct and respectful while reviewing the code. If you think something could be better (give a meaningful & logical explanation supplemented by suitable code and source)
- Try to use a commit message template for consistent commit messages. You can use something like this:


Save the below as a file named `.gitcommitmessage` in your home directory, replace the `Authored-by` and `Signed-off-by` with your email

```git
# build, chore, ci, docs, feat, fix, perf,
# refactor, revert, style, test: subject


# Body


# Any references to tickets, articles etc?
- Github Issue:



Reported-by: team member <teammember@example.com>
Signed-off-by: Vinit Kumar <mail@vinitkumar.me>
```

You this template while commiting like this:

Edit your `~/.gitconfig` file

```git
[commit]
  gpgsign = true
  template = ~/.gitcommitmessage
```

The full template could be invoked using `git commit`. You can always use the `git commit -m "commit message"`.
Just try to prefix the commit with one of these (build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test: subject), so
that the context is clear.

- If something needs more explanation that usual, it is a good idea to write detailed commit message. This is better approach than writing a lot of comment on the code, because comments might
get outdated or changed, but the commit is immutable for that piece of code and the context is unique.


Every developer needs to fork the repo from the upstream into their own user account.


This workflow is based on an important concept. There are two kinds of repos here:

- Upstream Repo (For eg: https://github.com/django/django)
- Developer Repo (For eg: https://github.com/vinitkumar/django)


Some ground rules are:

- Use good branch name prefix such as (feature/feat, bugfix/bug/fix, refactor/chore/cleanup) and then a clear branch name.
- No branch is pushed directly(feature/bugfix/refactor) to the upstream directly.
- Upstream contains only three branches at any time. (develop, staging, master)
- Anything on upstream develop is releasable to testing/develop server and is testable for the team other than the dev
themselves.
- Anything on upstream staging is releasable to staging and is of atleast beta-quality.
- Anything on master is releasable to production.
- The default branch of all projects is develop (on upstream). This means all Pull Requests are made to develop.
- In case any urgent fix(hotfix) needs to be made from staging or master, the branches are made from upstream staging/master and the pull request is made to **master** or **staging** and not to to the develop branch. The fixes are then merged downwards from master -> staging -> develop.
- We follow semantic versioning here so vX.Y.Z (X is Major, Y is Minor, Z is Patch version) only.
- Releases can be created from staging and master. With cleary indicating that if it is a stable release or release candidate.
- Always keep your develop in sync with the upstream develop repo.

Following are some commands for day to day work:

### Steps to keep the fork's develop in sync

```bash
git fetch upstream # fetch upstream and all branches
git checkout develop # checkout local or own develop
git merge upstream/develop # get the changes from the upstream and merge to your local.
git push origin develop # push the code to the develop branch of your fork
```


### Create a bugfix/feature/refactor branch for regular development

```bash
# first sync the develop
git fetch upstream # fetch upstream and all branches
git checkout develop # checkout local or own develop
git merge upstream/develop # get the changes from the upstream and merge to your local.
git push origin develop # push the code to the develop branch of your fork

# then create a branch from develop

git checkout -b feature/get-user-data
...
...
# get work done, commit code
# push the code to your brach
git push origin HEAD
# make pull request to the upstream develop

```

#### Get the code synced into an existing branch

```bash
# after getting the branch synced up like this:
git fetch upstream # fetch upstream and all branches
git checkout develop # checkout local or own develop
git merge upstream/develop # get the changes from the upstream and merge to your local.
git push origin develop # push the code to the develop branch of your fork

git checkout feature/existing-branch
git merge develop # merge conflicts may come, resolve them and then commit
git push origin feature/existing-branch

```


## Hotfix workflow

Get the upstream first

```bash
git fetch upstream # fetch upstream and all branches
# checkout staging/master depending on where the fix needs to be made
git checkout -b hotfix/major-crash-xyz
# implement the fix
# commit the fix
git push origin HEAD
# make a PR to the source branch, so if it is created from staging, it is made to staging or if it is created
# from master it is made to master

```

### Get the hotfix changes to the branches lower down the upstream master or staging

```bash
# after the hotfix is merge to master
# do this:

git fetch upstream
git checkout upstream/staging && git checkout -b staging
git merge upstream/master
git push upstream staging


git checkout develop
git merge upstream/develop
git push origin develop
git merge upstream/staging
git push origin develop

```


```bash
# after the hotfix is merged to staging
# do this:

git fetch upstream
git checkout upstream/staging && git checkout -b staging


git checkout develop
git merge upstream/develop
git push origin develop
git merge upstream/staging
git push origin develop

```

## Benefits

- Doesn't pollute the upstream repo with not needed branches
- Gives the developer enough freedom to commit code in their own fork for anything experimental/not-ready-for-production.
- It is better when more than one dev is committing to a project. It prevents conflicts and gives more clarity.



# Back end Development Guidelines

- Write design docs before doing anything major, invite feedback from peers and debug the idea even before a line of code is written. (https://dave.cheney.net/2019/02/18/talk-then-code, https://medium.com/dropbox-design/how-do-you-design-a-design-doc-d7b2f1fa4a0c)
- Write defensive code. Do not trust user input. Design for failure. The services might go down at the worst time and your system should consider that into account.
- Always use ORM when possible, drop to RAW SQL only when there is a performance issue. Get the RAW SQL audited before putting it live.
- Write terse, clear code that is modular and dry. Do not try to do a lot of things at once.
- Document any gotchas, assumptions, hard coding with as detailed comments as possible. It will help the team save tonnes of time while debugging issues in future.
- Use standard HTTP Status code. Use standard libraries for dealing with HTTP, REST (like DRF, Retrofit). Do not try to reinvent the wheel unless you are 100% sure your implementation is better than these.
- Use stable and popular libraries.
- Focus on performance & security while writing back end code.
- Write DRY, reusable and testable code.
- The most critical parts of the system must be unit tested. If it is not easy to test a part of code it is indicative of code smell and a refactor must be done.
- Write test with code. Use assertions to enforce correct behaviour. Fail early, fail loudly so that we can figure and fix the errors.
- Use tools like newrelic (for performance) and sentry(for error tracking) so that we are aware of the issues before our customers report them. Really helps when there is not a big QA team in place.
- Version the APIs that you produce **very important** since we in a SOA architecture, you can't push an incompatible change that will break other services. If required, they will be done in a separate version (like apiv2/)
- Clear responsibility is enforced within the services. For eg: No two services write to the same table concurrently. This causes deadlocks and is bad for performance.
- Long running processes are delegated to background jobs and are not run on the main thread.
- Timeouts are added to every external services we are interacting with.


## Frontend development guidelines

- Focus on accessibility while building UIs.
- Master SASS and modern CSS. It helps write better structured CSS code.
- Focus on learning build tools such as Webpack/Parcel. It is how CSS and JavaScript bundled these days and mastering them will help you modify their configuration as per your taste.
- Read JavaScript basics at Mozilla Developer Network.
- Reads the docs at reactjs.org and their release notes to learn the latest trends and correct patterns.
- Use `eslint` to lint your code and get rid of most of the silly mistakes and syntax errors.
- Write DRY code(DRY = Do not repeat yourself). If you are copy pasting same logic in two places, better make a function out of it.
- Write reasonable and simple code that is easy to reason about. Keeping things simple is helpful in debugging.
- If the component is very large(more than 200 Lines Of Code) and is doing a lot of things at once, try splitting it into smaller components.
- Separate logic from presentation. The presentation components shoulb be dump and just depend on the data for presentation.
- Try not to write a lot of `if`, `ternary operators` inside the render method. Use a boolean flag for that and keep the logic inside the templating to the minimum.
- Prefer using `PureComponent` instead of `Component` while using Class based components.
- Cleanup eventhandler set in `ComponentDidMount` in `ComponentWillUmount` because not doing so can cause memory leaks.
- Type check the components with PropTypes.
- Write simple components that do one thing and only one thing well. Make it composeable so that it can be reused with ease.
- Think about the stability, popularity and trade-offs while using a new library and if you can justify increasing the bundle-size.


## DevOps

- Use standard, stable and well documented platform.
- Use multi-zone DB to embrace for regional failures and quick failover.
- Have Database scheduled to a different cloud service securely (for example: Use s3 in case the database is hosted on Google Cloud and Vice Versa)
- Test the restore and snapshots. Maintain automatic backups.
- Backup Database, Put apps and services on maintenance while doing major upgrades/migrations.
- The Configuration should definitely be version controlled and tags are maintained. (follow semantic versioning)
- Performance, security and stability of the cluster are the corner stones to live by.
- While evaluating any new service, library refer the above and ask yourself if it is going to make it better or is it going to make it better.
- Trade-offs if any needs to be documented and made very clear.
- Maintain better dev prod parity. Ideally, the apps should checklist all the columns of 12 factor apps. Refer this(https://12factor.net)
- Test new tech, plugins in local -> staging -> production. Push code to production only when there are no known bugs or issues.
