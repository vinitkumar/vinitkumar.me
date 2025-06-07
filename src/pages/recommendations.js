import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const recommendations = [
  {
    "firstName": "Jochem",
    "lastName": "Klingeler",
    "Company": "KidsKonnect",
    "jobTitle": "Back End Developer",
    "text": "Vinit and I worked mostly on improving our salesfunnel functionality, where he did both front-end and back-end. There I have seen him work in both React and Laravel, while he also did Python at Social-Schools. This shows Vinits versatility and drive to dive into sometimes unfamiliar territory. I found Vinit to be quite social, not afraid to ask and have smalltalk outside of work related questions.",
    "creationDate": "12/02/24",
    "status": "VISIBLE"
  },
  {
    "firstName": "Eric",
    "lastName": "de Haan",
    "Company": "",
    "jobTitle": "Back-end Developer",
    "text": "I had the pleasure of working with Vinit during his time at our company. Although we worked on different projects, his passion and adaptability is seen by anyone. He's a skilled cross-platform engineer with a curiosity for new technologies. I remember his quick dive into Go-lang as one example of how he picked up challenges. He has a great technical mind and consistently demonstrates that. He would be an asset to any team looking for someone who has the technical expertise and the drive to innovate. He gets the work done.",
    "creationDate": "10/10/24",
    "status": "VISIBLE"
  },
  {
    "firstName": "Anand",
    "lastName": "Sabale",
    "Company": "SageOne Investment Managers LLP",
    "jobTitle": "Chief Quant Strategist",
    "text": "Vinit excels in Python, Django, and SQL database technologies, consistently delivering high-quality solutions. His technical acumen, particularly in full-stack development, has been instrumental in streamlining our project workflows. Vinit's problem-solving skills and ability to optimize complex systems have significantly enhanced our project's efficiency. His dedication to continuous learning and adaptability make him an invaluable asset to any technical team.",
    "creationDate": "10/08/24",
    "status": "VISIBLE"
  },
  {
    "firstName": "Ruben",
    "lastName": "Stolk",
    "Company": "Capptions",
    "jobTitle": "Founder and CTO",
    "text": "Vinit is a dedicated, hardworking individual who is always willing to roll up his sleeves and get things done. Over the years, I've had the pleasure of watching him grow and excel in various areas, and I would highly recommend him as a reliable and loyal team member.",
    "creationDate": "10/02/24, 06:48 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Jeroen",
    "lastName": "Stolp",
    "Company": "KidsKonnect",
    "jobTitle": "DevOps Eco-System Engineer",
    "text": "I'd hire Vinit if I'm looking for a solid team player to maintain my Django/Python apps! During my time collaborating on various projects with him, he's proven to be an invaluable dev who is easy to reach and communicate with.  There were no issues whatsoever when we worked asynchronously or in different time zones. He has also demonstrated his ability to quickly learn new techniques and work with a variety of tools, developing full-stack solutions (Database/PHP/Node/React).",
    "creationDate": "10/02/24, 12:35 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Jos",
    "lastName": "van Velzen",
    "Company": "KidsKonnect",
    "jobTitle": "Software Architect",
    "text": "I recommend Vinit for his loyalty and dedication. He brings solid experience in Python and Django and is always eager to expand his knowledge and take on new challenges. Vinit is a reliable team member who consistently contributes positively to the team. With the right guidance, I’m confident he will continue to grow as a developer.",
    "creationDate": "10/02/24, 11:45 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Joost",
    "lastName": "Mundi",
    "Company": "KidsKonnect",
    "jobTitle": "Customer Support Specialist",
    "text": "Vinit is a great coder, with a lot of knowledge in Django/Python. When having issues with the CMS, you can always depend on Vinit on finding and solving the issue. He has taught me many things over the years about the backend and is very patient when passing on his skills.",
    "creationDate": "09/30/24, 04:36 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Cengiz",
    "lastName": "Karadeniz",
    "Company": "KidsKonnect",
    "jobTitle": "Quality Engineer",
    "text": "Working with Vinit has been really nice. He's super smart in tech stuff, and I've learned a lot from him. Vinit is not just really good at tech things; he's also patient and positive, which makes our team better. He's great at handling tough problems calmly and thinking ahead. Besides his tech skills, Vinit is a good team player who makes our work environment positive. It's cool to work with someone who's not only good at programming but also encourages us to keep learning and working together. Working with Vinit has been a really good experience.",
    "creationDate": "11/10/23, 04:39 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Yuri",
    "lastName": "Ramalho Rech",
    "Company": "KidsKonnect",
    "jobTitle": "Software Engineer",
    "text": "Working with Vinit has been a pleasure. He is so professional and has a brilliant mind, capable of solving the most complicated problems. He is dynamic and always keeps in mind the big picture in everything he does. He has excellent leadership skills. I've been learning a lot from him and I hope to keep collaborating with him for a long time.",
    "creationDate": "10/31/23, 07:43 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Bert",
    "lastName": "van 't Land",
    "Company": "Schoolfruit.nl",
    "jobTitle": "Interim-management",
    "text": "I worked together with Vinit for almost eight years. We started as a small startup. We didn't have much clients and we were still pretty green behind the ears. But now eight years later we offer a grown up communication platform to 50% of the primary schools in the Netherlands. Vinit played an important roll in this achievement.   Vinit is a dedicated developer. He can work autonomously and is dedicated to solve the problem. He is also very reliable and easy work with.   If you are looking for a reliable and professional person for your team than i would definitely recommend Vinit.",
    "creationDate": "01/31/23, 03:08 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Florian",
    "lastName": "Delizy",
    "Company": "FiduciaEdge Technologies Co., Ltd.",
    "jobTitle": "Director of Research Development",
    "text": "I have been working with Vinit on django CMS for a while. Vinit had been instrumental in pushing for PR reviews &merges, debugging through some quite tricky situations, and generally shown great expertise in django, github CI, release processes, and generally web application development.",
    "creationDate": "12/02/22, 07:45 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Fabian",
    "lastName": "Braun",
    "Company": "django CMS Association",
    "jobTitle": "Django CMS Fellow",
    "text": "It's a pleasure to work with Vinit! He's a key contributor to the open source project django CMS.   When working together he always went the extra mile to find and implement the best solution for the community. He's extremely knowledgable in Python, Django, and, of course, django CMS.   I appreciate his ability to abstract issues, find the underlying structures, develop general solutions that not only fix the issue but contribute to making the overall platform more powerful.",
    "creationDate": "10/17/22, 01:43 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Nicolai",
    "lastName": "Ridani",
    "Company": "DigitalService",
    "jobTitle": "Growth Manager",
    "text": "Vinit has been a core member of the django CMS open source community for many years. His contribution plays an important role in the success of django CMS, one of the leading open source content management systems in the Django ecosystem. Thanks to his expertise and team spirit, he is highly appreciated by many members. In addition to reviewing PRs, Vinit also regularly participates in the Tech Committee and is involved in strategic decisions. We consider ourselves fortunate to have Vinit as part of our community and look forward to many more years of collaboration.",
    "creationDate": "10/17/22, 11:47 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Mark",
    "lastName": "Walker",
    "Company": "ISM Fantasy Games",
    "jobTitle": "Senior Software Developer",
    "text": "Vinit is a key member of the core django-cms team, helping to review PRs from other contributors as well as implementing features & fixes to help our projects progress. Vinit is also an asset on our Slack network, helping out with support requests to solve problems or point people in the right direction if that's more appropriate.",
    "creationDate": "09/28/22, 01:11 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Madhavi",
    "lastName": "Solanki",
    "Company": "Cyphertree Technologies Pvt Ltd",
    "jobTitle": "Founder",
    "text": "Vinit has been a great mentor to the Cyphertree tech team. His approach has helped to solve complex tech problems. He simplifies the problem and breaks it down for the team to understand the importance of progressive development. We at the Cyphertree team truly appreciate his hard work and guidance throughout the project and looking forward to keeping working with Vinit. All the best.",
    "creationDate": "06/22/21, 11:55 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Riyaz",
    "lastName": "Kagzi",
    "Company": "Taghash",
    "jobTitle": "Senior Software Engineer",
    "text": "Vinit is a really talented engineer with an extensive experience in the field. He is a self-motivated individual, and an awesome mentor who's always there to help you out. We've only worked together for a few months (as of writing) but his ideas and approach has already influenced me and impacted the way I approach things (considering we've only been communicating remotely, that's even better!)  When it comes to building software, his approach is very logical and pragmatic, and his solutions are really well-built!  I’m glad to have an opportunity to interact with him and I wish our paths cross again in the future.",
    "creationDate": "02/11/21, 05:52 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Shubham",
    "lastName": "Pathak",
    "Company": "ProMobi Technologies",
    "jobTitle": "Lead Security",
    "text": "Vinit is an inspirational and motivated person who has extensive experience in software development and DevOps practices. He has excellent knowledge of different operating systems and languages.   Vinit performs complex tasks in a dedicated manner and has the integrity to help others. Sometimes even a causal chat helps you learn something new from him.",
    "creationDate": "09/10/19, 07:31 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Anit",
    "lastName": "Rai",
    "Company": "Prosperix",
    "jobTitle": "System Architect | Coder",
    "text": "Vinit has a very pragmatic approach towards offering solutions. Where most architects try to tackle the Goliath on day one, Vinit prefers to solve the core piece of the puzzle and eventually architect upon it. This has led him to build some of the robust systems in Social Schools which are scalable even after years.",
    "creationDate": "08/21/19, 12:06 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Anay",
    "lastName": "Kamat",
    "Company": "Equal Experts",
    "jobTitle": "Lead Software Consultant",
    "text": "Vinit is hands-on on Python and other Agile concepts like Continuous Integration and Continuous Delivery. He has been a great team member to work with and quite comfortable to work remotely as well.",
    "creationDate": "01/24/19, 02:46 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Swapnil",
    "lastName": "Narkhede",
    "Company": "CARIAD",
    "jobTitle": "Senior Software Engineer",
    "text": "Vinit Kumar is a very talented and passionate programmer, who knows how thing needs to be done. He is an expert in python development. He is a good team member, self-motivated, very sound in technical knowledge. He is a good mentor and always keen to learn new things.",
    "creationDate": "12/21/18, 04:35 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Rutvij",
    "lastName": "Pandya",
    "Company": "Pattern®",
    "jobTitle": "Principal Software Engineer",
    "text": "Vinit is the one with all qualities you look for - A great team player, self-motivated, a very patient mentor, dedicated, logically very sound with abilities to solve problems, learns new things and shares with the team. He has it all! He can be the 'go-to' man in the team.  I’m glad to have an opportunity to interact with him and I wish our paths cross again in the future.",
    "creationDate": "12/17/18, 04:43 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Saurabh",
    "lastName": "Bajaj",
    "Company": "Harman Connected Services Corp India Pvt Ltd",
    "jobTitle": "Architect (iOS)",
    "text": "I and Vinit work for different companies but from the same location. Vinit has been guiding me for few months and I have seen a tremendous change in my software development skills. Vinit is someone who likes to have a detailed plan before jumping to the development state. His approach towards software development and debugging issues is excellent. He asks right questions in a right way thus leading us to the point which he wants to convey. Whenever Vinit recommends anything, he supports it with a detailed explanation and also explains why it is the best. He is a gem to my learning curve :)",
    "creationDate": "06/18/18, 07:46 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Edwin",
    "lastName": "Janssen",
    "Company": "KidsKonnect",
    "jobTitle": "Senior Product Owner",
    "text": "Vinit his qualties do not stop at being a very good programmer. His mentality is one many people will die for. He breaths programming and is always keen to learn new things.   Vinit is also a great collegue. Working together with him is a privilege. He is always prompt when you need him. And always thinks with you and doesn't hesitate to share his knowledge with you.  Overall working with Vinit is just great.",
    "creationDate": "01/24/18, 08:37 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Shanice Celsa",
    "lastName": "Tan",
    "Company": "GET IN CTRL. Hosting",
    "jobTitle": "Groene Wordpress Hosting Manager",
    "text": "It is with great joy to recommend Vinit Kumar. Vinit is a very skilled web programmer. He has the ability to effectively listen and he highly contributed to the Social Schools websites with his excellent skills in Python and Django. He is available when needed and is extremely prompt. He completes what he tells you he will complete. He also cares about his colleagues, and takes the time to explain and answer questions may you require assistance in programming.  Vinit is an exceptional web programmer and a very pleasant person to work with.",
    "creationDate": "10/20/17, 07:43 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Robert",
    "lastName": "Cooper",
    "Company": "BaseDash",
    "jobTitle": "Full Stack Developer",
    "text": "Vinit has been a mentor for me when it comes to learning best practices related to web development. We've both been contributing to an open source project (one that he started himself) and has been providing me with guidance related to how I should put together pull requests, how issues should be tracked, and a bunch of other tips. When Vinit recommends a certain approach, he does so by explaining the reasoning behind it and why it is likely the \"best\" approach to take. It's been great collaborating with Vinit and I'm sure i'll continue to learn a lot from him.",
    "creationDate": "10/20/17, 07:22 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Parth",
    "lastName": "Desai",
    "Company": "Moonsong Labs",
    "jobTitle": "Principal Software Engineer",
    "text": "Vinit is a great developer, and one of a few who has genuine passion for software development. We joined company at same time, And I've always been impressed with his software development methodologies and sound computer science concepts. He is an asset to our company.",
    "creationDate": "05/04/15, 03:43 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Robert",
    "lastName": "Korteland",
    "Company": "KidsKonnect",
    "jobTitle": "Senior productmanager",
    "text": "Vinit is an incredibly dedicated and friendly person. His passion for software development is admirable and he is very eager to learn more.",
    "creationDate": "01/02/15, 03:41 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Subhojit",
    "lastName": "Paul",
    "Company": "Publicis Sapient",
    "jobTitle": "Senior Associate Technology L2",
    "text": "Vinit is very dynamic. He supports open source technologies. He approaches problems from the base, he plans how to solve the problem before actually getting started to solve it. I liked that he studies about algorithms and stuffs like that. He plays good role in building open source.    He has helped me many times in Python. What I liked about him is he likes to learn new technologies, and insipire/help others.",
    "creationDate": "11/13/14, 04:05 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Angvish",
    "lastName": "Kumar",
    "Company": "Tavisca, a cxLoyalty Technology Platform (Division of JP Morgan Chase & Co.)",
    "jobTitle": "Technical Lead",
    "text": "Vinit has built a strong (and deserved) reputation as someone with vision, diligence and honour – he is someone who gets things done! His focus keeps everything moving smoothly, he makes sure all the deadlines are met, and makes sure that whatever project he is working on meets the highest standards.",
    "creationDate": "11/12/14, 12:21 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Henk-Jan",
    "lastName": "Verkerk",
    "Company": "ADP",
    "jobTitle": "Senior Manager Product Management",
    "text": "I have seen Vinit growing as a professional at Changer. He asks the right questions, has a problem solving mind and works hard. He contributed greatly in the support activities we worked on together, which has led to customer satisfaction.",
    "creationDate": "10/27/14, 09:25 AM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Piper",
    "lastName": "Chester",
    "Company": "Spotify",
    "jobTitle": "Software Engineer",
    "text": "Vinit is fantastic to work with. We've co-developed a couple different open source projects together and he's always been helpful, knowledgeable, friendly, and committed. He's a great partner and I'd recommend him to any team that's looking for a productive and engaged developer.",
    "creationDate": "04/28/14, 03:32 PM",
    "status": "VISIBLE"
  },
  {
    "firstName": "Debjit (Dev)",
    "lastName": "Saha",
    "Company": "HomeAbroad Inc.",
    "jobTitle": "Co-Founder",
    "text": "Vinit is a hard-working software developer, possesses the ability to grasp new technology quickly and apply them to on-going projects. Avid Self-learner and highly motivated.",
    "creationDate": "10/31/13, 03:02 AM",
    "status": "VISIBLE"
  }

];

const ValueComponent = (props) => {
  const data = useStaticQuery(graphql`
    query RecommendationsQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  return (
    <Layout location={props.location} title={title}>
      <Seo title="Recommendations" />
      <div className="recommendations-container">
        <h1 className="heading">What my colleagues say about working with me</h1>
        
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid var(--gray-line)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'var(--accent)'
          }}>TL;DR</h2>
                     <p style={{
             fontSize: '1.1rem',
             lineHeight: '1.6',
             margin: '0',
             color: 'var(--text)'
           }}>
             <strong>Full-stack polyglot</strong> (Python, Django, React, Go, Laravel, DevOps) • <strong>Django CMS core team member</strong> • 
             <strong>Patient mentor</strong> who breaks down complex problems • <strong>Remote collaboration expert</strong> across time zones • 
             <strong>Pragmatic problem-solver</strong> with startup-to-scale experience • <strong>Quality-focused delivery</strong> that gets things done • 
             <strong>Strategic thinker</strong> with proven leadership skills • <strong>Continuous learner</strong> who adapts quickly
           </p>
        </div>
            <div className="recommendations-grid">
              {recommendations.map((rec, index) => (
                <div className="recommendation-card" key={index}>
                  <div className="recommendation-header">
                    <div className="avatar">
                      {rec.firstName[0] + rec.lastName[0]}
                    </div>
                    <div className="info">
                      <h3 className="name">
                        {rec.firstName} {rec.lastName}
                      </h3>
                      <p className="job-title">{rec.jobTitle} at {rec.Company}</p>
                    </div>
                  </div>
                  <p className="recommendation-text">{rec.text}</p>
                  <p className="creation-date">
                    {new Date(rec.creationDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Layout>
    )
}

export default ValueComponent
