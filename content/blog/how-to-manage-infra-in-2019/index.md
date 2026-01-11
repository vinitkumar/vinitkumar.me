---
layout: post
title: How To Manage Infra in 2019
date: 2019-04-05 12:49 +0530
tags: tech infra cloud devops
--- 

Infrastructure is one of the most hotly discussed topics in Software development these days. There are so many tools,
so much to learn that very few people actually know what to do and what the best practices are. Everyone wants
to jump on the microservice bandwagon. However, it's not as easy as it seems. I've meditated quite a bit on this
and have come up with these points that I think are good tips to follow: - Use standard, stable and well documented platform. - Use multi-zone DB to embrace for regional failures and quick failovers. - Have DB backups scheduled to a different cloud service securely (for e.g., s3 in case the db is hosted on GCE/GKE)
- Test the restore and snapshots. Maintain automatic backups.
- Backup Database, put apps and services on maintenance while doing major upgrades/migrations. - The Config should definitely be version controlled and tags are maintained. (follow semantic versioning) - Performance, security and stability of the cluster are the corner stones to live by. - While evaluating any new service or library, refer to the above and ask yourself if it is going to make it better.
- Tradeoffs, if any, need to be documented and made very clear.
- Maintain better dev/prod parity. Ideally, the apps should satisfy all the principles of 12 factor apps. Refer to https://12factor.net
- Test new tech and plugins in local → staging → production. Push code to production only when there are no known bugs or issues.
