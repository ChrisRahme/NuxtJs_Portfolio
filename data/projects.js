export const projects = [
    {
        name: 'Tappy Raven',
        description: `
            A fast-paced, Flappy Bird-inspired mobile game where you guide a raven through obstacles to achieve
            the highest score while trying to collect as many gems as possible.
            <br>
            Took one day to develop it, and a week to upload it on the Google Play Store.
        `,
        summary: 'A Flappy Bird-style mobile game featuring a gem-collecting raven',
        images: ['/img/projects/tappy-raven.webp'],
        links: [
            { icon: 'mdi:web', link: 'https://play.google.com/store/apps/details?id=com.ChraGames.TappyRaven' },
            { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/TappyRaven' },
        ],
        skills: ['Unity', 'C#'],
        tags: ['Gaming'],
        year: 2020,
    },
    {
        name: 'Smart WiFi Locks',
        description: `
            A smart lock system featuring an intuitive administrative platform, advanced user
            permission management, and customizable scheduling capabilities, designed to streamline access control
            and enhance security.
            <br>
            Built with a multidisciplinary team of engineers as part of a university project.
        `,
        summary: 'A smart lock access control system with scheduling and user permissions',
        images: ['/img/projects/smart-lock.jpg'],
        links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/WiFi_Locks' }],
        skills: ['Python', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'MQTT', 'Arduino', 'Raspberry Pi'],
        tags: ['Full-Stack', 'IoT'],
        year: 2021,
    },
    {
        name: 'NLP AI Chatbot',
        description: `
            An NLP customer service chatbot powered by Rasa, equipped with a web chat widget, mobile application,
            Slack integration, and admin interface. The chatbot helps customers of an Internet Service Provider to
            troubleshoot their internet connection issues, and understands English, French, Arabic, and Armenian.
            <br>
            Built by myself as part of my engineering final year project.
        `,
        summary: 'A multilingual AI chatbot for ISP customer support and services, with mobile and web apps',
        images: ['/img/projects/nlp-chatbot.png'],
        links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/FYP-Chatbot' }],
        skills: ['Python', 'Rasa', 'MySQL', 'Kotlin', 'HTML', 'CSS', 'JavaScript', 'Docker', 'Kubernetes', 'Helm'],
        tags: ['AI', 'Full-Stack'],
        year: 2022,
    },
    {
        name: 'VueJS Personal Website',
        description: `
            The first iteration of my personal website, built to learn VueJS and how to deploy static websites.
            Explore who I am, my resume, and my projects.
        `,
        summary: 'My first personal website created to learn VueJS and static deployment',
        images: ['/img/projects/vuejs-website.png'],
        links: [
            { icon: 'mdi:web', link: 'https://chrisrahme-v1.netlify.app' },
            { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/VueJs_Portfolio' },
        ],
        skills: ['VueJs', 'Netlify'],
        tags: ['Front-End'],
        year: 2022,
    },
    {
        name: 'AI Speech Emotion Recognition',
        description: `
            An ensemble of speech emotion recognition AI models created to analyze multilingual speech.
            The model provides insights through visualizations, such as emotion charts per-speaker per-second to
            track sentiment changes throughout conversations.
            <br>
            Built by myself for my master's thesis and integrated into Synergi SER for Data Consult.
        `,
        summary: 'Multilingual speech emotion recognition ML model with visual analytics',
        images: ['/img/projects/speech-emotion-recognition.jpg'],
        links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/Speech_Emotion_Recognition' }],
        skills: ['Python', 'Flask', 'Keras', 'Scikit-Learn', 'Librosa'],
        tags: ['AI', 'Full-Stack'],
        year: 2023,
    },
    {
        name: 'Solar Smart Home',
        description: `
            A smart home energy management system that integrates Deye solar inverter data with EweLink-compatible IoT
            devices to optimize energy usage and automate actions on IoT devices based on user-defined rules related to
            solar panels and electricity usage, inverter and batteries, IoT devices, and weather.
            Also provides live dashboards, historical analytics, rule and scene creation, and manual commands.
        `,
        summary: 'A smart home management system integrating solar inverters and IoT devices',
        images: ['/img/projects/solar-iot.jpg'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['Python', 'NodeJs', 'Flask', 'SQLAlchemy', 'Express', 'VueJs', 'MySQL', 'MongoDB', 'RabbitMQ', 'MySQL', 'Docker'],
        tags: ['IoT', 'Full-Stack', 'Smart Home', 'Energy'],
        year: 2023,
    },
    {
        name: 'AI Forge',
        description: `
            A web application designed to offer easy-to-use and flexible tools for data science, analytics, and
            machine learning workflows for both technical and non-technical users to quickly build AI models.
            <br>
            Built as a successor to MindForge from Data Consult as a personal project.
        `,
        summary: 'A web platform to facilitate data science, analytics, and machine learning workflows',
        images: ['/img/projects/ai-forge.png'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['VueJs', 'Python', 'Flask', 'SQLAlchemy', 'Scikit-Learn', 'Pandas', 'MySQL'],
        tags: ['AI', 'Data Science', 'Full-Stack'],
        year: 2024,
    },
    {
        name: 'NewsFinder',
        description: `
            An LLM search engine web application that uses RAG techniques to search offline documents for relevant
            news articles, and extends the search online when needed.
        `,
        summary: 'A RAG-powered LLM search engine for news across local and online sources',
        images: ['/img/projects/newsfinder.png'],
        links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/NewsFinder' }],
        skills: ['VueJs', 'Python', 'Flask', 'LangChain', 'Chroma'],
        tags: ['AI', 'Full-Stack', 'LLM'],
        year: 2024,
    },
    {
        name: 'NuxtJS Personal Website',
        description: `
            The second version of my personal website, built from the ground up with NuxtJs this time.
            It's where you are now!
            <br>
            Discover more about me, my professional journey, and the projects I've been working on.
        `,
        summary: 'The second version of my personal website (you are here!), built with NuxtJS',
        images: ['/img/projects/nuxtjs-website.png'],
        links: [
            { icon: 'mdi:web', link: 'https://chrisrahme.netlify.app' },
            { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/NuxtJs_Portfolio' },
        ],
        skills: ['NuxtJs', 'Netlify'],
        tags: ['Front-End'],
        year: 2025,
    },
    {
        name: 'GPT-Me',
        description: `
            An AI clone of yourself, built by fine-tuning GPT-2, that learns how you speak and interact with different
            people based on your text conversations (e.g. exported WhatsApp chats), and can reply to new messages as if
            they were from you.
        `,
        summary: 'An LLM fine-tuned on your WhatsApp data to emulate how you talk and respond to different people',
        images: ['/img/projects/gpt-me.jpg'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['Python', 'PyTorch', 'Hugging Face'],
        tags: ['AI', 'LLM'],
        year: 2025,
    },
    {
        name: 'Live Car Stats',
        description: `
            A Raspberry Pi-powered OBD-II car telemetry system that captures real-time vehicle metrics such as RPM,
            speed, fuel consumption, etc. The data is saved, processed, and visualized live through customizable,
            dynamic charts for analysis and trend tracking to help you better understand your vehicle's performance,
            your driving habits, and how different metrics affect each other.
        `,
        summary: 'A real-time OBD-II dashboard with live charts and historical analysis',
        images: ['/img/projects/live-obd.png'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['Python', 'NuxtJs', 'FastAPI', 'SQLAlchemy', 'Docker', 'Raspberry Pi'],
        tags: ['Data Science', 'Full-Stack', 'IoT'],
        year: 2025,
    },
    {
        name: 'Music Analyzer',
        description: `
            A data science experiment born out of curiosity about what makes me like a song, or in particular which parts of a song.
            It breaks a song into chunks, extracts audio features and embeddings from each chunk, then clusters and compares them to find patterns.
            Paired with a personal rating system, and you get a system that can recommend you songs or even specific parts of songs.
        `,
        summary: 'An AI music analysis and recommendation system',
        images: ['/img/projects/music-analyzer.jpg'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['Python', 'NuxtJs', 'FastAPI', 'SQLAlchemy', 'Chroma', 'Librosa'],
        tags: ['AI', 'Data Science', 'Full-Stack', 'Music'],
        year: 2025,
    },
    {
        name: 'MyAssistant',
        description: `
            An agentic AI personal assistant that has access to my system information, files, cloud data, calendar,
            email, smart home devices, web search, memories, and more, to help me manage and centralize my information
            and integrate these services together for improved productivity and automation.
        `,
        summary: 'My agentic personal assistant that integrates multiple services',
        images: ['/img/projects/myassistant.png'],
        links: [{ icon: 'mdi:github', link: 'https://github.com/ChrisRahme/MyAssistant' }],
        skills: ['Python', 'Agno', 'FastAPI', 'Chroma', 'NuxtJs'],
        tags: ['AI', 'Full-Stack', 'LLM'],
        year: 2025,
    },
    {
        name: 'Piano Trainer',
        description: `
            A simple web application that helps you learn the piano by providing a virtual keyboard, interactive
            lessons with raining tiles when uploading a MIDI, or free-play mode. Record plays and convert to MIDI,
            change key mappings, and more.
        `,
        summary: 'A web app to learn the piano with interactive lessons',
        images: ['/img/projects/piano-trainer.png'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['VueJs', 'Tone.js'],
        tags: ['Front-End', 'Music'],
        year: 2026,
    },
    {
        name: 'NoteBlocks',
        description: `
            Learning piano is nice, but I could not manage to read sheet music efficiently.
            I kept writing down the note names on paper, losing all sense of tempo and timing in the process.
            So I built NoteBlocks, an interactive music sheet viewer designed for beginners.
            Upload a MIDI, MusicXML, MuseScore, or even audio and PDF file and get a sheet music layout, but instead of traditional notation,
            each stave displays note blocks, labeled with the note name and sized proportionally to its duration.
            Supports multiple staves/tracks that can be reordered, muted, and assigned different instruments.
            Highly configurable with color palettes, layouts, notation options, preferences, and more.
            NoteBlocks started small, but I kept adding features until it turned into a full-fledged music editing and viewing tool, and the biggest project I've ever built for myself.
        `,
        summary: 'An music viewer & editor app to convert music into easy-to-read note blocks',
        images: ['/img/projects/noteblocks.png'],
        links: [{ icon: 'carbon:progress-bar-round' }],
        skills: ['Python', 'FastAPI', 'VueJs', 'PyInstaller'],
        tags: ['Full-Stack', 'Music'],
        year: 2026,
    },
    {
        name: 'Amazing Chessboard Patterns',
        description: `
            Inspired by two Numberphile videos, this interactive web app visualizes the spiral placement of fairy-chess leaper pieces on a square grid.
            Pieces walk outward in spiral order, each claiming the next available cell and marking attacked cells to block opposing colors.
            Supports 12 built-in pieces as well as custom ones.
            Features interactive playback, live stats, and image and video export.
        `,
        summary: 'An interactive visualizer for fairy-chess leaper spiral patterns on a chessboard',
        images: ['/img/projects/chessboard-patterns.png'],
        links: [
            { icon: 'mdi:web', link: 'https://chrisrahme.github.io/Chessboard_Patterns/' },
            { icon: 'mdi:github', link: 'https://github.com/ChrisRahme/Chessboard_Patterns' },
        ],
        skills: ['VueJs', 'TypeScript', 'Vite'],
        tags: ['Front-End', 'Maths'],
        year: 2026,
    },
]
