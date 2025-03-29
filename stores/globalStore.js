const quotes = [
    '[object Object]',
    '// TODO: find quote',
    // 'Confident enough to deploy on a Friday.',
    // "“Knock knock” “Race condition” “Who's there?”",
    // 'Hardware eventually fails. Software eventually works.',
    // 'I aspire to be the person my code thinks I am.',
    // "I don't make mistakes, I create unexpected features.",
    'I have once exited Vim without closing the terminal.',
    'Why finish one project when you can start five more?',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    // 'Nothing is as permanent as a temporary solution that works.',
    // "I wrote this in Vim but I'm trying to exit it [E][Q][X]`^[]^x^c^x",
    'Why waste 5 minutes doing something when you can waste a day trying to automate it?',
    'If one programmer can do it in one week, then two programmers can do it in two weeks.',
    // 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    // "Sometimes my greatest skill is making it look like I know what I'm doing. Just kidding please hire me.",
    // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
]

const abouts = [
    {
        title: 'Programmer',
        emoji: '👨‍💻',
        image: '/img/pictures/nodered.jpg',
        label: 'Enjoying Node-RED on a big screen at work',
        text: `
        I\'m a full-stack developer and AI enthusiast.
        <br/><br/>
        At 14, I wrote my first lines of code, hoping to one day create the next big video game and master AI.
        That spark led me down a path where programming became not just a hobby, but my profession.
        <br/><br/>
        Whether it\'s building web applications, training AI models, or learning and experimenting with new technologies,
        I find joy in crafting solutions that are efficient, elegant, and impactful.
        AI, in particular, fascinates me. I\'m always exploring ways to make machines learn, grow, and adapt.
        <br/><br/>
        Whether it\'s a personal IoT device management project, an AI model predicting emotions from multilingual audio,
        or a script that automates coffee making (working on that one), I enjoy creating things that make life more interesting.
    `,
        button: {
            text: 'Check out my resume',
            link: '/resume',
        },
        show: true,
    },
    {
        title: 'Astronomer',
        emoji: '🔭',
        image: '/img/pictures/astronomy.jpg',
        label: 'Setting up my telescope for a stargazing session',
        text: `
        I\'ve always been captivated by the wonders of the universe.
        <br/><br/>
        My love for astronomy began at a young age, reading all sorts of books about our universe, but it truly blossomed during my university years
        when I became a board member (and then president) of the Saint Joseph University Astronomy Club for six incredible years.
        <br/><br/>
        From organizing stargazing nights, campings, events, and festivals, to leading educational talks,
        I had an immense plreasure in sharing the science of the universe with others.
        Even today, I continue to give astronomy talks, hoping to inspire people to look up at the night sky with the same sense of wonder I do.
        <br/><br/>
        There\'s something humbling about understanding our place in the vastness of the universe,
        and it keeps me grounded even when I\'m aiming for the stars.
    `,
        show: true,
    },
    {
        title: 'Gamer',
        emoji: '👾', // 👾 🎮
        image: '/img/pictures/sonic.webp',
        label: 'The open world of Sonic Frontiers',
        text: `
        I\'m a passionate gamer at heart.
        <br/><br/>
        Gaming is not only a way to unwind.
        It\'s a way to explore new worlds and immerse myself in epic stories.
        <br/><br/>
        Whether it\'s racing through the landscape at high speed with Sonic, uncovering hidden treasures in Uncharted,
        exploring immersive universes in Genshin Impact, or judging society in Persona,
        each game with a story is an adventure that excites me, and keeps me coming back for more.
        <br/><br/>
        It\'s a passion that bridges the gap between creativity and technology, reminding me why I fell in love with programming in the first place.
        While I developed a couple of small games, I no longer have the dream to become a game developer now.
        But that sense of creativity still fuels my work every day, back-end or front-end.
    `,
        show: true,
    },
    {
        title: 'Traveler',
        emoji: '✈️',
        image: '/img/pictures/switzerland.jpg',
        label: 'Winterthur, Switzerland, December 2023',
        text: `
        Traveling is my way of escaping the "high entropy" of my country.
        <br/><br/>
        I aim to travel at least once a year, whether to a new country, or one I've already been to a few times.
        <br/>
        Spain, France, Germany, Switzerland, Italy, Croatia, Greece, Cyprus, Jordan, Egypt, Nepal, Japan...
        I\'ve traveled to all these places, and some more than once.
        <br/><br/>
        Switzerland in particular has become a second home to me.
        I\'ve traveled there more than 15 times, and have found no better place to relax and recharge.
        It\'s a place that offers both serenity and adventure, from snow-capped mountains to charming old towns,
        delicious chocolate and cheese, and more.
    `,
        show: true,
    },
    {
        title: 'Brother',
        emoji: '🐱',
        image: '/img/pictures/kitcat.jpg',
        label: "One of Kitcat's last photos",
        text: `
        Growing up, I had the privilege of sharing 16 wonderful years with Kitcat,
        my cat who brought joy, comfort, and a lot of love into my life.
        <br/><br/>
        I adopted him when I was 10, and he grew up alongside me, becoming more than just a pet — he was my brother and my best friend.
        Kitcat was a reminder of love, curiosity, and the simple joys of life.
        <br/><br/>
        He lives on in every memory we shared.
        <br/>
        I'll love you forever, Kitcat. ❤️
    `,
        show: true,
    },
]

const skills = [
    {
        title: 'Back-end',
        color: '#F03020',
        icons: [
            // Languages
            { name: 'Python', icon: 'devicon-plain:python', color: '#FFD538', showVignette: true, showSkills: true },
            { name: 'NodeJs', icon: 'devicon-plain:nodejs', color: '#5FA14D', showVignette: true, showSkills: true },
            { name: 'TypeScript', icon: 'devicon-plain:typescript', color: '#2D79C7', showVignette: true, showSkills: true },
            { name: 'PHP', icon: 'devicon-plain:php', color: '#787CB4', showVignette: true, showSkills: true },
            { name: 'Go', icon: 'fa6-brands:golang', color: '#00AED8', showVignette: true, showSkills: false },
            { name: 'C#', icon: 'simple-icons:csharp', color: '#6E4DDC', showVignette: true, showSkills: false },
            { name: 'Java', icon: 'devicon-plain:java', color: '#F89917', showVignette: true, showSkills: false },
            { name: 'Bash', icon: 'devicon-plain:bash', color: '#45B452', showVignette: true, showSkills: true },
            // Frameworks
            { name: 'Laravel', icon: 'simple-icons:laravel', color: '#FF2D20', showVignette: true, showSkills: true },
            { name: 'Django', icon: 'devicon-plain:django', color: '#44B78B', showVignette: true, showSkills: true },
            { name: 'Flask', icon: 'bx:bxl-flask', color: '#41ACC0', showVignette: true, showSkills: true },
            { name: 'FastAPI', icon: 'devicon-plain:fastapi', color: '#009485', showVignette: true, showSkills: true },
            { name: 'SQLAlchemy', icon: 'devicon-plain:sqlalchemy', color: '#CB2222', showVignette: true, showSkills: true },
            { name: 'Celery', icon: 'simple-icons:celery', color: '#B6DE64', showVignette: true, showSkills: false },
            { name: 'Express', icon: 'simple-icons:express', color: '#6B90A0', showVignette: true, showSkills: false },
            { name: 'Node-RED', icon: 'cib:node-red', color: '#900000', showVignette: true, showSkills: true },
            { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq', color: '#FF6600', showVignette: true, showSkills: true },
        ],
    },
    {
        title: 'Front-end',
        color: '#40C080',
        icons: [
            // Languages
            { name: 'HTML', icon: 'devicon-plain:html5', color: '#E54C21', showVignette: true, showSkills: true },
            { name: 'CSS', icon: 'devicon-plain:css3', color: '#214CE5', showVignette: true, showSkills: true },
            { name: 'SASS / SCSS', icon: 'fa6-brands:sass', color: '#CE679A', showVignette: true, showSkills: true },
            { name: 'JavaScript', icon: 'devicon-plain:javascript', color: '#F0DC4E', showVignette: true, showSkills: true },
            // Frameworks
            { name: 'React', icon: 'simple-icons:react', color: '#017FA5', showVignette: true, showSkills: true },
            { name: 'VueJs', icon: 'simple-icons:vuedotjs', color: '#3FB984', showVignette: true, showSkills: true },
            { name: 'NuxtJs', icon: 'simple-icons:nuxtdotjs', color: '#00DD83', showVignette: true, showSkills: true },
            { name: 'Pinia', icon: 'mdi:vuejs', color: '#FFDA58', showVignette: true, showSkills: false },
            { name: 'Bootstrap', icon: 'devicon-plain:bootstrap', color: '#6F06E3', showVignette: true, showSkills: true },
            { name: 'Tailwind', icon: 'simple-icons:tailwindcss', color: '#35BEF8', showVignette: true, showSkills: true },
        ],
    },
    {
        title: 'Databases',
        color: '#00A0F0',
        icons: [
            // Relational
            { name: 'MySQL', icon: 'devicon-plain:mysql', color: '#007690', showVignette: true, showSkills: true },
            { name: 'MariaDB', icon: 'simple-icons:mariadb', color: '#C1775A', showVignette: true, showSkills: true },
            { name: 'PostgreSQL', icon: 'devicon-plain:postgresql', color: '#2F6792', showVignette: true, showSkills: true },
            { name: 'SQLite', icon: 'devicon-plain:sqlite', color: '#003856', showVignette: true, showSkills: true },
            // NoSQL
            { name: 'MongoDB', icon: 'devicon-plain:mongodb', color: '#006849', showVignette: true, showSkills: true },
            { name: 'Elasticsearch', icon: 'devicon-plain:elasticsearch', color: '#FED203', showVignette: true, showSkills: true },
            { name: 'Redis', icon: 'simple-icons:redis', color: '#FF4235', showVignette: true, showSkills: true },
        ],
    },
    {
        title: 'AI & Data Science',
        color: '#7010F0',
        icons: [
            // AI
            { name: 'PyTorch', icon: 'simple-icons:pytorch', color: '#EE4C2C', showVignette: true, showSkills: true },
            { name: 'TensorFlow', icon: 'simple-icons:tensorflow', color: '#FF8800', showVignette: true, showSkills: true },
            { name: 'Keras', icon: 'devicon-plain:keras', color: '#D10000', showVignette: true, showSkills: true },
            { name: 'Hugging Face', icon: 'simple-icons:huggingface', color: '#FF9E00', showVignette: true, showSkills: true },
            { name: 'Rasa', icon: 'simple-icons:rasa', color: '#5A16EE', showVignette: true, showSkills: true },
            { name: 'LangChain', icon: 'simple-icons:langchain', color: '#1D3C3E', showVignette: true, showSkills: true },
            // Data Science
            { name: 'Pandas', icon: 'devicon-plain:pandas', color: '#E80089', showVignette: true, showSkills: true },
            { name: 'NumPy', icon: 'devicon-plain:numpy', color: '#4C78D0', showVignette: true, showSkills: true },
            { name: 'Scikit-Learn', icon: 'devicon-plain:scikitlearn', color: '#F89A36', showVignette: true, showSkills: true },
            { name: 'Matplotlib', icon: 'devicon-plain:matplotlib', color: '#1F77B4', showVignette: true, showSkills: true },
        ],
    },
    {
        title: 'Cloud, DevOps, & Systems',
        color: '#00C0B0',
        icons: [
            // Cloud
            { name: 'Google Cloud', icon: 'devicon-plain:googlecloud', color: '#4086F4', showVignette: true, showSkills: true },
            { name: 'Netlify', icon: 'devicon-plain:netlify', color: '#00BEBB', showVignette: true, showSkills: true },
            // DevOps
            { name: 'Linux', icon: 'simple-icons:linux', color: '#F5BE04', showVignette: true, showSkills: true },
            { name: 'Docker', icon: 'simple-icons:docker', color: '#1F97EE', showVignette: true, showSkills: true },
            { name: 'Git', icon: 'devicon-plain:git', color: '#F05030', showVignette: true, showSkills: true },
            // Systems
            { name: 'Asterisk', icon: 'simple-icons:asterisk', color: '#F69018', showVignette: true, showSkills: true },
        ],
    },
]

const experience = [
    {
        start: 'Jun 2019',
        end: 'Aug 2019',
        title: 'GWT Web Developer',
        type: 'Internship',
        company: 'Neumann',
        image: '/img/logos/neumann.png',
        link: 'https://neumann.ai',
        color: '#2575A8',
        description: 'Built a Big Data web application on GWT.',
        tasks: [
            {
                title: 'Implify',
                text: [
                    'Developeed a GWT Java application to manipulate and query a MySQL database, respecting the database schema and logic to ensure data integrity while pushing and pulling data.',
                    'Designed and implemented MySQL database schemas, ensuring carefully planned table structures, optimized relationships, and adherence to best practices.',
                    'Built a pretty, responsive, user-friendly interface for seamless queries and interaction with the underlying workflows.',
                ],
                skills: ['GWT', 'Java', 'MySQL', 'CSS'],
            },
        ],
    },
    {
        start: 'Jun 2020',
        end: 'Sep 2020',
        title: 'Drupal Web Developer',
        type: 'Internship',
        company: 'Saint-Joseph University of Beirut',
        image: '/img/logos/usj_square.png',
        link: 'https://usj.edu.lb',
        color: '#212D6A',
        description: 'Worked on a proof-of-concept migration for the university website to Drupal.',
        tasks: [
            {
                text: [
                    "Rebuilt the website's codebase entirely from scratch.",
                    "Designed and implemented a custom Drupal theme, ensuring it adhered to the university's branding guidelines and provided a modern, user-friendly interface.",
                    'Created and tested key functionalities, improving overall usability and design consistency.',
                    "Optimized the website's performance by re-thinking its JavaScript code.",
                    "Optimized the website's administrative and development processess by making use of the content management system.",
                ],
                skills: ['Drupal', 'Twig', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            },
        ],
    },
    {
        start: 'Sep 2020',
        end: 'May 2021',
        title: 'Astronomy Instructor',
        type: 'Part-time',
        company: 'Al-Hayat International School',
        image: '/img/logos/his.png',
        link: 'https://his.edu.lb',
        color: '#F04033',
        description: 'Taught astronomy courses to school students aged 8 to 15.',
        tasks: [
            {
                text: [
                    'Designed and developed comprehensive astronomy programs and courses tailored for two students groups.',
                    'Taught a diverse range of topics, from foundational concepts like the planets to advanced subjects such as alien life and cosmology.',
                    'Tailored teaching materials to suit various age groups and learning levels, progressing from simple to complex topics.',
                    'Facilitated engaging learning experiences through live demonstrations, hands-on activities, and quizzes.',
                    'Guided students in creating and presenting astronomy projects or introducing new topics at the end of each semester.',
                    'Provided personalized guidance to ensure each student had a positive and enriching learning experience.',
                ],
                skills: ['Teaching', 'Astronomy', 'PowerPoint', 'Time Management', 'Communication'],
            },
        ],
    },
    {
        start: 'Sep 2021',
        end: 'Oct 2023',
        title: 'Full-Stack & Data Integration Developer',
        type: 'Full-time',
        company: 'Data Consult',
        image: '/img/logos/dataconsult.webp',
        link: 'https://dcgroup.com',
        color: '#001B71',
        description: 'Developed and maitained containerized web applications, with knowledge in AI and Cisco VoIP integration.',
        tasks: [
            {
                title: 'Synergi',
                text: [
                    'Enhanced an existing call center web application, with a focus on the call recording module.',
                    'Extended the core functionality of the application and redesigned key features to optimize performance and user experience.',
                    'Deployed the application to client servers and provided ongoing maintenance and support.',
                ],
                skills: ['Laravel', 'Node-RED', 'MySQL', 'MongoDB', 'ElasticSearch', 'Docker', 'Asterisk'],
            },
            {
                title: 'Synergi SER',
                text: [
                    'Developed a series of speech emotion recognition AI models for sentiment analysis of multilingual call recordings for Synergi Call Recording.',
                    'Delivered insights through visualizations, including per-speaker emotion charts to track sentiment changes throughout the conversation and a global emotion rating.',
                ],
                skills: ['Python', 'Flask', 'Keras', 'Librosa', 'Node-RED', 'ChartJs', 'Docker'],
            },

            {
                title: 'MindForge',
                text: [
                    'Conceptualized and developed a web application offering easy and flexible tools for data science, data analytics, and machine learning workflows, enabling technical and non-technical users to rapidly build and deploy AI models in collaboration with other users.',
                ],
                skills: ['VueJs', 'Python', 'Flask', 'SQLAlchemy', 'Scikit-Learn', 'Pandas', 'MySQL'],
            },
            {
                title: 'PayLink',
                text: ['Developed a secure payment portal that links banks to the Ministry of Finance, ensuring seamless transactions and data exchanges.'],
                skills: ['NodeJs', 'Express', 'MongoDB', 'Stripe', 'Docker', 'Linux'],
            },
        ],
    },
    {
        start: 'Oct 2023',
        end: 'Feb 2025 ',
        title: 'Senior Full-Stack & AI Engineer',
        type: 'Full-time',
        company: 'Atria Solutions',
        image: '/img/logos/atria.png',
        link: 'https://atriasolutions.com',
        color: '#00E2E0',
        description:
            'I architect, develop, and deploy scalable containerized software solutions, specializing in full-stack development, AI & machine learning, with knowledge in VoIP and cloud technologies.',
        tasks: [
            {
                title: 'AtriPulse Next',
                text: [
                    'Developed a comprehensive call center solution featuring mutli-vendor call recording, live wallboards, analytics, and additional advanced functionalities.',
                ],
                skills: ['VueJs', 'Laravel', 'NodeJs', 'PHP', 'MySQL', 'MongoDB', 'ElasticSearch', 'Redis', 'Docker', 'Asterisk', 'RabbitMQ'],
            },
            {
                title: 'AtriPulse Next Call Intelligence',
                text: [
                    'Designed and implemented an AI-powered module for AtriPulse Call Recording capable of multilingual audio transcription, translation, summarization, per-speaker per-sentence sentiment analysis, keyword extraction, and other advanced language processing tasks.',
                ],
                skills: ['VueJs', 'Python', 'Hugging Face', 'Flask', 'SQLAlchemy', 'SQLite', 'Docker'],
            },
            {
                title: 'AtriPulse',
                text: [
                    'Provided technical support, deployment, maintenance, and bug fixes for the AtriPulse call center solution, ensuring smooth operations and functionality.',
                ],
                skills: ['Docker', 'Linux', 'Git', 'NodeJs', 'Node-RED', 'Laravel', 'PHP', 'Asterisk'],
            },
            {
                title: 'AtriBot Chatbots',
                text: [
                    'Created and deployed AI-powered NLP chatbots equipped with webchat and administrative interfaces, custom-built as per client needs and requirements, integrated with other systems, and deployed to client servers.',
                ],
                skills: ['VueJs', 'Python', 'Rasa', 'MySQL', 'Docker'],
            },
            {
                title: 'MindForge',
                text: ['Improved this AI-builder web application that I developed at Data Consult.', 'Depolyed the application to client servers.'],
                skills: ['VueJs', 'Python', 'Flask', 'SQLAlchemy', 'Scikit-Learn', 'Pandas', 'MySQL'],
            },
            {
                title: 'Miscellaneous Projects',
                text: ['Developed and delivered smaller-scale projects and applications to meet specific client or organizational needs.'],
                skills: ['Python', 'NodeJs', 'Django', 'Flask', 'MySQL', 'MongoDB', 'Docker'],
            },
            {
                title: 'Planning & Innovation',
                text: [
                    'Actively participated in discussions and brainstorming sessions to generate innovative ideas for potential projects and solutions.',
                    'Collaborated with cross-functional teams to define requirements, explore case studies, and design software and hardware architectures.',
                    'Wrote technical documentation and provided presentations to present project ideas and concepts to clients and stakeholders.',
                ],
                skills: ['Ideation & Problem-Solving', 'Requirements Analysis', 'System Design', 'Strategic Planning', 'Collaboration', 'Communication'],
            },
            {
                title: 'Internship Mentorship',
                text: [
                    'Mentored interns by defining their project scopes, setting clear objectives, and providing continuous guidance and constructive feedback.',
                ],
                skills: ['Mentorship', 'Project Planning', 'Performance Feedback', 'Communication'],
            },
            {
                title: 'Career Development & Certifications',
                text: [
                    'Worked on my career development by learning new skills, expanding my knowledge, and participating in professional development programs.',
                ],
                skills: ['Learning', 'AI', 'DevOps', 'Cloud'],
            },
        ],
    },
    {
        start: 'Feb 2025',
        end: 'Present',
        title: 'AI Engineer',
        type: 'Full-time',
        company: 'Innovum',
        image: '/img/logos/innovum.png',
        link: 'https://innovum.co',
        color: '#21ADB2',
        description: '',
        tasks: [
            {
                title: 'Payload',
                text: [
                    "Worked on an AI & Big Data map visualization platform that aggregates and analyzes data about a country's infrastructure, natural features, traffic & vehicles, etc. from multiple sources.",
                    "The platform uses clustering AI models to recommend optimal locations for the deployment of new infrastructure and services, balancing profitability and risk according to each region's environment.",
                ],
                skills: ['React', 'Python', 'Django', 'Scikit-Learn', 'GeoPandas', 'DeckGL', 'Amazon S3'],
            },
            {
                title: 'Dory',
                text: [
                    'Dory Audio: Designed and implemented an AI-powered module for multilingual audio transcription and diarization.',
                    'Dory Timeline: Designed and implemented an LLM-powered module that extracts and organizes key events, people, and locations from documents into structured timelines.',
                ],
                skills: ['Python', 'Hugging Face', 'LangChain', 'FastAPI', 'Celery', 'Docker'],
            },
        ],
    },
]

const education = [
    {
        start: 2001,
        end: 2016,
        title: 'Life Sciences Baccalaureate',
        institution: 'Sainte Famille Fanar',
        image: '/img/logos/CSFF.png',
        link: 'https://csff.edu.lb',
        color: '#6cc0e5',
        icon: 'ph:book',
    },
    {
        start: 2016,
        end: 2021,
        title: 'Software & Telecommunication Engineering',
        institution: 'Saint Joseph University of Beirut',
        image: '/img/logos/USJ.png',
        link: 'https://usj.edu.lb',
        color: '#fb4f4f',
        icon: 'ph:gear',
    },
    {
        start: 2021,
        end: 2023,
        title: "Master's Degree in Artificial Intelligence",
        institution: 'Saint Joseph University of Beirut',
        image: '/img/logos/USJ.png',
        link: 'https://usj.edu.lb',
        color: '#fbc93d',
        icon: 'ph:lightbulb',
    },
]

const languages = [
    {
        language: 'English',
        flag: 'openmoji:flag-united-states',
        reading: 0.95,
        speaking: 0.85,
        writing: 0.91,
        listening: 0.89,
        proficiency: 'Full professional',
    },
    {
        language: 'French',
        flag: 'openmoji:flag-france',
        reading: 0.99,
        speaking: 0.9,
        writing: 0.88,
        listening: 0.98,
        proficiency: 'Full professional',
    },
    {
        language: 'Lebanese Arabic',
        flag: 'openmoji:flag-lebanon',
        reading: 0.65,
        speaking: 0.75,
        writing: 0.55,
        listening: 0.8,
        proficiency: 'Professional working',
    },
    {
        language: 'Standard Arabic',
        flag: 'openmoji:flag-saudi-arabia',
        reading: 0.65,
        speaking: 0.3,
        writing: 0.35,
        listening: 0.45,
        proficiency: 'Limited working',
    },
    {
        language: 'German',
        flag: 'openmoji:flag-germany',
        reading: 0.2,
        speaking: 0.08,
        writing: 0.14,
        listening: 0.1,
        proficiency: 'Elementary',
    },
]

const socials = [
    { name: 'Linkedin', icon: 'mdi:linkedin', color: '#0A66C2', link: 'https://linkedin.com/in/chris-rahme', show: true },
    { name: 'GitHub', icon: 'mdi:github', color: '#9942FF', link: 'https://github.com/ChrisRahme', show: true },
    { name: 'Stack Overflow', icon: 'mdi:stack-overflow', color: '#F7A664', link: 'https://stackoverflow.com/users/8978116', show: true },
    { name: 'Instagram', icon: 'mdi:instagram', color: '#D300C5', link: 'https://www.instagram.com/chris.rahme.1998', show: false },
    { name: 'YouTube', icon: 'mdi:youtube', color: '#FF0000', link: 'https://youtube.com/@chris-rahme', show: true },
]

export const useGlobalStore = defineStore('globalStore', {
    state: function () {
        return {
            quotes,
            abouts,
            experience,
            education,
            skills,
            languages,
            socials,
        }
    },
    actions: {
        async asyncTest() {
            const infos = await $fetch('https://api.nuxt.com/modules/pinia')

            this.name = infos.name
            this.description = infos.description
        },
    },
})
