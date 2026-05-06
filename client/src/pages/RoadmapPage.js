import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import api from '../utils/api';
import styles from './RoadmapPage.module.css';

// Resource link maps (best-effort URL mapping for known resources)
const resourceLinks = {
  'MDN HTML Guide': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'CSS Tricks': 'https://css-tricks.com',
  'Flexbox Froggy': 'https://flexboxfroggy.com',
  'javascript.info': 'https://javascript.info',
  'Eloquent JavaScript': 'https://eloquentjavascript.net',
  'Pro Git Book': 'https://git-scm.com/book',
  'React Docs': 'https://react.dev',
  'Redux Toolkit Docs': 'https://redux-toolkit.js.org',
  'Tailwind Docs': 'https://tailwindcss.com/docs',
  'Testing Library Docs': 'https://testing-library.com/docs/',
  'Jest Docs': 'https://jestjs.io/docs/getting-started',
  'Vite Docs': 'https://vitejs.dev',
  'TypeScript Handbook': 'https://www.typescriptlang.org/docs/handbook/',
  'Node.js Docs': 'https://nodejs.org/en/docs/',
  'Express Docs': 'https://expressjs.com',
  'MongoDB University': 'https://university.mongodb.com',
  'Docker Docs': 'https://docs.docker.com',
  'Kubernetes.io': 'https://kubernetes.io/docs/home/',
  'GitHub Actions Docs': 'https://docs.github.com/en/actions',
  'Terraform Docs': 'https://developer.hashicorp.com/terraform/docs',
  'LeetCode': 'https://leetcode.com',
  'NeetCode': 'https://neetcode.io',
  'Hack The Box': 'https://www.hackthebox.com',
  'TryHackMe': 'https://tryhackme.com',
  'Kaggle Python Course': 'https://www.kaggle.com/learn/python',
  'Hugging Face Course': 'https://huggingface.co/learn/nlp-course',
  'PyTorch Docs': 'https://pytorch.org/docs/',
  'TensorFlow Tutorials': 'https://www.tensorflow.org/tutorials',
  'Solidity Docs': 'https://docs.soliditylang.org',
  'CryptoZombies': 'https://cryptozombies.io',
  'ethereum.org': 'https://ethereum.org/en/developers/',
  'Redis Docs': 'https://redis.io/docs/',
  'PostgreSQL Docs': 'https://www.postgresql.org/docs/',
  'SQLZoo': 'https://sqlzoo.net',
  'AWS Docs': 'https://docs.aws.amazon.com',
  'React Native Docs': 'https://reactnative.dev/docs/getting-started',
  'Flutter Docs': 'https://docs.flutter.dev',
};

const aestheticColors = [
  '#6366f1', // Indigo
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#10b981', // Emerald
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#f43f5e', // Rose
  '#14b8a6', // Teal
  '#f59e0b', // Amber
];

const stepDescriptions = {
  'html': 'HTML (HyperText Markup Language) is the fundamental building block of the Web. It defines the meaning and structure of web content. In modern web development, mastering HTML goes far beyond basic tags; it involves understanding semantic markup to improve accessibility (a11y) and SEO. You will need to get comfortable with structuring document outlines, utilizing HTML5 native form validations, embedding media securely, and utilizing meta tags for responsive design. A strong foundation here ensures that your applications are robust, accessible to screen readers, and easily indexable by search engines.',
  
  'css': 'CSS (Cascading Style Sheets) is responsible for the visual presentation of your web applications. Moving beyond basic colors and fonts, modern CSS involves constructing complex, responsive layouts using Flexbox and CSS Grid. You will learn to establish design systems using CSS Variables (Custom Properties), create fluid typography that scales with the viewport, and implement engaging micro-interactions via animations and transitions. Mastering CSS also means understanding the cascade, specificity, and modern architectural methodologies like BEM or utility-first approaches to keep your styling scalable and maintainable.',
  
  'javascript': 'JavaScript is the dynamic programming language that breathes life into web pages. As the core language of the web, it handles complex features, asynchronous data fetching, and dynamic DOM manipulation. To master JavaScript, you must deeply understand its execution context, the event loop, closures, and prototypical inheritance. Modern JavaScript (ES6+) relies heavily on concepts like Promises and async/await for non-blocking operations, array methods for data transformation, and module systems for organizing code. This is the most critical language in the modern web ecosystem.',
  
  'react': 'React is a declarative, component-based JavaScript library for building highly interactive user interfaces. Created by Meta, it revolutionized frontend development by introducing the Virtual DOM, which optimizes rendering performance by minimizing direct DOM manipulations. You will dive deep into React Hooks (like useState, useEffect, and custom hooks) to manage component state and side effects. A true mastery of React also involves understanding the component lifecycle, managing global state context, and implementing performance optimizations like memoization to build highly scalable single-page applications.',
  
  'node': 'Node.js is a powerful, asynchronous, event-driven JavaScript runtime built on Chrome\'s V8 engine. It allows developers to use JavaScript outside the browser to build scalable network applications and backend APIs. Rather than relying on multi-threading, Node.js uses a single-threaded non-blocking I/O model, making it incredibly lightweight and efficient for data-intensive real-time applications. You will learn about the Node package manager (NPM), building RESTful architectures with Express, interacting with the file system, and managing streams and buffers.',
  
  'database': 'Databases are the persistent memory of your applications. Understanding database architecture is crucial for any full-stack developer. You will explore both Relational Database Management Systems (like PostgreSQL or MySQL), which rely on strict schemas and SQL for querying, and NoSQL databases (like MongoDB), which offer flexible, document-based storage. Key concepts include understanding data normalization, indexing for query performance, managing transactions (ACID properties), and knowing when to choose a relational model versus a document model for your specific application needs.',
  
  'git': 'Git is the industry-standard distributed version control system. It is the backbone of modern software collaboration, allowing teams of developers to work on the same codebase simultaneously without destroying each other\'s work. You will learn how to initialize repositories, stage and commit changes with descriptive messages, branch off for feature development, and resolve merge conflicts. Mastery of Git and platforms like GitHub or GitLab is absolutely non-negotiable for a professional engineering role, as it ensures code history integrity and enables seamless CI/CD pipelines.',

  'internet': 'Understanding How the Internet Works is the critical first step for any web developer. The Internet is a vast global network of interconnected computers. You will explore the foundational protocols that govern data exchange, such as TCP/IP and HTTP/HTTPS. Key topics include understanding how Domain Name Systems (DNS) translate human-readable URLs into IP addresses, the role of web hosting and servers, and the exact request-response cycle that occurs when a browser attempts to load a webpage. This macro-level understanding is essential for debugging network issues and optimizing load times.'
};

const categoryQuizzes = {
  'HTML': [
    { q: 'What does HTML stand for?', opts: ['HyperText Markup Language', 'Hyperlink Text Module Language', 'Hyper Tool Multi Language'], ans: 0 },
    { q: 'Which attribute provides alternative text for an image?', opts: ['title', 'alt', 'src'], ans: 1 },
    { q: 'What does the <canvas> element do?', opts: ['Draw graphics via JavaScript', 'Create database tables', 'Style page layout'], ans: 0 },
    { q: 'Which tag creates a hyperlink?', opts: ['<link>', '<a>', '<href>'], ans: 1 },
    { q: 'What is the correct HTML element for the largest heading?', opts: ['<heading>', '<h6>', '<h1>'], ans: 2 },
    { q: 'Which HTML element defines the title of a document?', opts: ['<meta>', '<title>', '<head>'], ans: 1 },
    { q: 'What is semantic HTML?', opts: ['HTML with inline styles', 'HTML that conveys meaning about its content', 'HTML written in a specific order'], ans: 1 },
    { q: 'Which input type is used for email validation?', opts: ['type="text"', 'type="email"', 'type="mail"'], ans: 1 },
    { q: 'What does the DOCTYPE declaration do?', opts: ['Defines the document type and HTML version', 'Links CSS files', 'Adds metadata'], ans: 0 },
    { q: 'Which element is used for an unordered list?', opts: ['<ol>', '<li>', '<ul>'], ans: 2 }
  ],
  'CSS': [
    { q: 'What does CSS stand for?', opts: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'], ans: 1 },
    { q: 'How do you select an element with id "demo"?', opts: ['.demo', '#demo', '*demo'], ans: 1 },
    { q: 'Which property changes the background color?', opts: ['bgcolor', 'color', 'background-color'], ans: 2 },
    { q: 'What does "display: flex" do?', opts: ['Makes element invisible', 'Creates a flex container for layout', 'Adds animation'], ans: 1 },
    { q: 'How do you make text bold in CSS?', opts: ['font-weight: bold', 'text-style: bold', 'font-bold: true'], ans: 0 },
    { q: 'Which CSS property controls element spacing outside the border?', opts: ['padding', 'margin', 'border-spacing'], ans: 1 },
    { q: 'What is the CSS Box Model order (outside to inside)?', opts: ['Margin, Border, Padding, Content', 'Content, Padding, Border, Margin', 'Border, Margin, Padding, Content'], ans: 0 },
    { q: 'Which unit is relative to the viewport width?', opts: ['px', 'em', 'vw'], ans: 2 },
    { q: 'What does "position: sticky" do?', opts: ['Fixes element at top always', 'Toggles between relative and fixed based on scroll', 'Removes element from flow'], ans: 1 },
    { q: 'How do you apply a style to all <p> elements?', opts: ['#p { }', '.p { }', 'p { }'], ans: 2 }
  ],
  'JavaScript': [
    { q: 'Inside which element do we put JavaScript?', opts: ['<javascript>', '<scripting>', '<script>'], ans: 2 },
    { q: 'How do you create a function?', opts: ['function myFunc()', 'function = myFunc()', 'function:myFunc()'], ans: 0 },
    { q: 'Which is NOT a JS data type?', opts: ['Undefined', 'Number', 'Float'], ans: 2 },
    { q: 'What does "===" check in JavaScript?', opts: ['Value only', 'Value and type', 'Reference only'], ans: 1 },
    { q: 'What is a closure?', opts: ['A function with access to its outer scope variables', 'A way to close a browser tab', 'A CSS animation technique'], ans: 0 },
    { q: 'What does Array.map() return?', opts: ['The original array modified', 'A new array with transformed elements', 'A boolean value'], ans: 1 },
    { q: 'What is the purpose of async/await?', opts: ['Speed up code execution', 'Handle asynchronous operations more readably', 'Create new threads'], ans: 1 },
    { q: 'What does JSON stand for?', opts: ['JavaScript Object Notation', 'Java Standard Object Naming', 'JavaScript Online Network'], ans: 0 },
    { q: 'Which method adds an element to the end of an array?', opts: ['push()', 'pop()', 'shift()'], ans: 0 },
    { q: 'What is the event loop responsible for?', opts: ['Styling the DOM', 'Managing asynchronous callbacks in the call stack', 'Compiling JavaScript to machine code'], ans: 1 }
  ],
  'React': [
    { q: 'What hook tracks component state?', opts: ['useState', 'let keyword', 'useEffect'], ans: 0 },
    { q: 'What does JSX stand for?', opts: ['JavaScript XML', 'Java Syntax Extension', 'JSON X'], ans: 0 },
    { q: 'Which method is required in a Class Component?', opts: ['componentDidMount()', 'render()', 'getInitialState()'], ans: 1 },
    { q: 'What is the Virtual DOM?', opts: ['The real browser DOM', 'A lightweight copy of the actual DOM', 'A CSS framework'], ans: 1 },
    { q: 'What hook handles side effects?', opts: ['useState', 'useRef', 'useEffect'], ans: 2 },
    { q: 'How do you pass data from parent to child?', opts: ['Using state', 'Using props', 'Using context only'], ans: 1 },
    { q: 'What does useRef return?', opts: ['A state variable', 'A mutable ref object that persists across renders', 'A callback function'], ans: 1 },
    { q: 'What is the purpose of React.memo()?', opts: ['Create memos in the app', 'Prevent unnecessary re-renders of a component', 'Store data in memory'], ans: 1 },
    { q: 'What is a controlled component?', opts: ['A component managed by Redux', 'A form element whose value is controlled by React state', 'A component with no props'], ans: 1 }
  ],
  'Node.js': [
    { q: 'Which module creates a web server?', opts: ['fs', 'http', 'url'], ans: 1 },
    { q: 'How do you import a module in CommonJS?', opts: ['import module', 'require("module")', 'include module'], ans: 1 },
    { q: 'Node.js runs on which engine?', opts: ['V8', 'SpiderMonkey', 'Chakra'], ans: 0 },
    { q: 'What is Express.js?', opts: ['A database', 'A web application framework for Node.js', 'A front-end library'], ans: 1 },
    { q: 'What is middleware in Express?', opts: ['A database layer', 'Functions that execute between request and response', 'A routing mechanism'], ans: 1 },
    { q: 'What does npm stand for?', opts: ['Node Package Manager', 'New Program Module', 'Node Process Manager'], ans: 0 },
    { q: 'Is Node.js single-threaded or multi-threaded?', opts: ['Multi-threaded', 'Single-threaded with async I/O', 'Neither'], ans: 1 },
    { q: 'What is the default port for a Node.js app?', opts: ['80', '3000', '8080'], ans: 1 }
  ],
  'Git': [
    { q: 'Which command saves changes to the local repo?', opts: ['git push', 'git commit', 'git save'], ans: 1 },
    { q: 'How do you create a new branch?', opts: ['git branch new-branch', 'git checkout -b new-branch', 'Both are correct'], ans: 2 },
    { q: 'What does "git pull" do?', opts: ['Pushes code to remote', 'Fetches and merges changes from remote', 'Creates a new branch'], ans: 1 },
    { q: 'What is a merge conflict?', opts: ['A syntax error', 'When two branches have competing changes to the same lines', 'A broken git installation'], ans: 1 },
    { q: 'What does "git stash" do?', opts: ['Deletes changes permanently', 'Temporarily saves uncommitted changes', 'Pushes to remote'], ans: 1 },
    { q: 'What file tells Git which files to ignore?', opts: ['.gitconfig', '.gitignore', '.gitmodules'], ans: 1 },
    { q: 'What is a pull request?', opts: ['A way to download code', 'A request to merge your changes into another branch', 'A Git error message'], ans: 1 },
    { q: 'What command shows the commit history?', opts: ['git status', 'git log', 'git diff'], ans: 1 }
  ],
  'Database': [
    { q: 'What does SQL stand for?', opts: ['Structured Query Language', 'Strong Question Language', 'Standard Query Logic'], ans: 0 },
    { q: 'Which is a NoSQL database?', opts: ['PostgreSQL', 'MySQL', 'MongoDB'], ans: 2 },
    { q: 'What does ACID stand for?', opts: ['Array Column Index Data', 'Atomicity Consistency Isolation Durability', 'Access Create Insert Delete'], ans: 1 },
    { q: 'What is a primary key?', opts: ['A password', 'A unique identifier for each row', 'The first column'], ans: 1 },
    { q: 'What is database normalization?', opts: ['Optimizing query speed', 'Organizing data to reduce redundancy', 'Backing up the database'], ans: 1 },
    { q: 'What is a JOIN in SQL?', opts: ['Combining two databases', 'Linking rows from two or more tables', 'Creating a new table'], ans: 1 },
    { q: 'What is an index in a database?', opts: ['The first table', 'A data structure that speeds up retrieval', 'A list of all tables'], ans: 1 },
    { q: 'What is the difference between SQL and NoSQL?', opts: ['SQL is newer', 'SQL uses structured tables; NoSQL uses flexible schemas', 'NoSQL is always faster'], ans: 1 }
  ],
  'Web': [
    { q: 'What protocol securely transfers data over the web?', opts: ['HTTP', 'HTTPS', 'FTP'], ans: 1 },
    { q: 'What does DNS stand for?', opts: ['Data Network System', 'Domain Name System', 'Digital Node Server'], ans: 1 },
    { q: 'What is an IP address?', opts: ['A website name', 'A unique numerical label for each device on a network', 'A programming language'], ans: 1 },
    { q: 'What does URL stand for?', opts: ['Uniform Resource Locator', 'Universal Reference Link', 'Unified Resource Library'], ans: 0 },
    { q: 'What is a CDN?', opts: ['A programming language', 'A network of servers that delivers cached content to users', 'A type of database'], ans: 1 },
    { q: 'What HTTP method retrieves data?', opts: ['POST', 'GET', 'PUT'], ans: 1 },
    { q: 'What is latency?', opts: ['Server storage capacity', 'The delay before data transfer begins', 'Network bandwidth'], ans: 1 },
    { q: 'What port does HTTP use by default?', opts: ['443', '80', '3000'], ans: 1 }
  ],
  'Python': [
    { q: 'What is the output of print(type([]))?', opts: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>"], ans: 0 },
    { q: 'Which keyword defines a function in Python?', opts: ['function', 'def', 'lambda'], ans: 1 },
    { q: 'What does "self" refer to in a class?', opts: ['The module', 'The current instance', 'A global variable'], ans: 1 },
    { q: 'Which data structure is immutable?', opts: ['List', 'Set', 'Tuple'], ans: 2 },
    { q: 'What is a list comprehension?', opts: ['A way to sort lists', 'Concise list creation from expressions', 'A type of loop'], ans: 1 },
    { q: 'What does pip install do?', opts: ['Compiles code', 'Installs packages from PyPI', 'Creates environments'], ans: 1 },
    { q: 'What is a decorator?', opts: ['A CSS class', 'A function that modifies another function', 'A type annotation'], ans: 1 },
    { q: 'What is a virtual environment?', opts: ['A VM', 'Isolated Python dependency space', 'A Docker container'], ans: 1 },
    { q: 'What does try/except handle?', opts: ['Loops', 'Exceptions and errors', 'File imports'], ans: 1 },
    { q: 'What is PEP 8?', opts: ['A Python version', 'Python style guide', 'A testing framework'], ans: 1 }
  ],
  'Java': [
    { q: 'What is the JVM?', opts: ['Java Visual Machine', 'Java Virtual Machine', 'Java Version Manager'], ans: 1 },
    { q: 'Which keyword prevents inheritance?', opts: ['static', 'abstract', 'final'], ans: 2 },
    { q: 'What is the difference between == and .equals()?', opts: ['No difference', '== compares references; .equals() compares values', '== is faster'], ans: 1 },
    { q: 'What is an interface?', opts: ['A class with private methods', 'A contract defining method signatures', 'A GUI component'], ans: 1 },
    { q: 'What is garbage collection?', opts: ['Deleting files', 'Automatic memory management', 'Removing imports'], ans: 1 },
    { q: 'What are generics?', opts: ['Generic classes', 'Type parameters for type-safe code', 'A design pattern'], ans: 1 },
    { q: 'What is Spring Boot?', opts: ['A compiler', 'A framework for production Java apps', 'An IDE'], ans: 1 },
    { q: 'What does JDK stand for?', opts: ['Java Development Kit', 'Java Debug Kernel', 'Java Data Key'], ans: 0 },
    { q: 'What is Maven used for?', opts: ['Testing', 'Build automation and dependency management', 'Database access'], ans: 1 },
    { q: 'What is a lambda expression?', opts: ['A class type', 'Anonymous function for functional programming', 'A loop construct'], ans: 1 }
  ],
  'System Design': [
    { q: 'What is horizontal scaling?', opts: ['More power to one server', 'Adding more servers', 'Reducing servers'], ans: 1 },
    { q: 'What is the CAP theorem?', opts: ['Security protocol', 'Can only guarantee 2 of 3: Consistency, Availability, Partition tolerance', 'Caching strategy'], ans: 1 },
    { q: 'What is a CDN?', opts: ['Database network', 'Content Delivery Network', 'Container network'], ans: 1 },
    { q: 'What is database sharding?', opts: ['Backing up data', 'Splitting DB across multiple servers', 'Encrypting data'], ans: 1 },
    { q: 'What is eventual consistency?', opts: ['Always consistent', 'Nodes eventually sync but not immediately', 'Never consistent'], ans: 1 },
    { q: 'What is a message queue?', opts: ['An email service', 'Async communication between services', 'A database type'], ans: 1 },
    { q: 'What is an API gateway?', opts: ['A firewall', 'Single entry point routing to microservices', 'A load balancer'], ans: 1 },
    { q: 'What is the saga pattern?', opts: ['A story format', 'Managing distributed transactions', 'A caching method'], ans: 1 }
  ],
  'TypeScript': [
    { q: 'What is TypeScript?', opts: ['A new language', 'A typed superset of JavaScript', 'A framework'], ans: 1 },
    { q: 'What is a union type?', opts: ['Combining objects', 'A type that can be several types (string | number)', 'A CSS type'], ans: 1 },
    { q: 'What does "any" type do?', opts: ['Strict type', 'Disables type checking for a variable', 'An error type'], ans: 1 },
    { q: 'What are generics?', opts: ['Generic functions', 'Reusable type-safe components', 'A way to ignore types'], ans: 1 },
    { q: 'What does "readonly" do?', opts: ['Makes global', 'Prevents modification after init', 'Makes private'], ans: 1 },
    { q: 'What is type narrowing?', opts: ['Making types smaller', 'Refining types using type guards', 'Removing types'], ans: 1 },
    { q: 'What is an interface?', opts: ['A CSS selector', 'A contract for object shapes', 'A function type'], ans: 1 },
    { q: 'What does "as" keyword do?', opts: ['Creates aliases', 'Type assertion', 'Imports modules'], ans: 1 }
  ],
  'Game': [
    { q: 'What is a game loop?', opts: ['A level type', 'Continuous cycle of input, update, render', 'A scoring system'], ans: 1 },
    { q: 'What is Unity?', opts: ['A language', 'A cross-platform game engine', 'A graphics card'], ans: 1 },
    { q: 'What is a sprite?', opts: ['A sound effect', 'A 2D image for game objects', 'A shader'], ans: 1 },
    { q: 'What is a collider?', opts: ['A renderer', 'Defines shape for collision detection', 'A camera'], ans: 1 },
    { q: 'What is a prefab?', opts: ['A script', 'Reusable GameObject template', 'A texture'], ans: 1 },
    { q: 'What is pathfinding?', opts: ['Finding files', 'Algorithm for optimal routes between points', 'A render technique'], ans: 1 },
    { q: 'What is a state machine in game AI?', opts: ['A server', 'System managing NPC behavior states', 'A physics engine'], ans: 1 },
    { q: 'What is a rigidbody?', opts: ['A mesh type', 'Component enabling physics simulation', 'An animation clip'], ans: 1 }
  ],
  'UX': [
    { q: 'What is the difference between UI and UX?', opts: ['Same thing', 'UI is visual; UX is overall experience', 'UI is mobile; UX is web'], ans: 1 },
    { q: 'What is a wireframe?', opts: ['Finished design', 'Low-fidelity layout blueprint', 'An animation'], ans: 1 },
    { q: 'What is a user persona?', opts: ['Real user', 'Fictional character representing target users', 'A login avatar'], ans: 1 },
    { q: 'What does WCAG stand for?', opts: ['Web Content Accessibility Guidelines', 'Web Coding Guide', 'Web Component Architecture'], ans: 0 },
    { q: 'What is a design system?', opts: ['A framework', 'Reusable components and guidelines for consistency', 'A color palette'], ans: 1 },
    { q: 'What is usability testing?', opts: ['Bug testing', 'Observing users interact with a product', 'Performance testing'], ans: 1 },
    { q: 'What is information architecture?', opts: ['Server architecture', 'Structural design for findability', 'Database design'], ans: 1 },
    { q: 'What is a heuristic evaluation?', opts: ['Code review', 'Expert review against usability principles', 'User survey'], ans: 1 }
  ],
  'Data Engineering': [
    { q: 'What is ETL?', opts: ['Encrypted Transfer Layer', 'Extract, Transform, Load', 'Event Trigger Logic'], ans: 1 },
    { q: 'What is Apache Spark?', opts: ['A database', 'Distributed data processing engine', 'A web server'], ans: 1 },
    { q: 'What is a data warehouse?', opts: ['File server', 'Centralized repo for analysis', 'A NoSQL database'], ans: 1 },
    { q: 'What is Apache Kafka?', opts: ['Web hosting', 'Distributed event streaming platform', 'Image processing'], ans: 1 },
    { q: 'What is a DAG in Airflow?', opts: ['A data type', 'Directed Acyclic Graph for task dependencies', 'A file format'], ans: 1 },
    { q: 'Batch vs stream processing?', opts: ['No difference', 'Batch in chunks; streaming in real-time', 'Batch is faster'], ans: 1 },
    { q: 'What is dbt?', opts: ['Database type', 'SQL transformation tool for data models', 'A Docker tool'], ans: 1 },
    { q: 'What is a data lake?', opts: ['A backup', 'Raw data storage for analytics', 'A cache layer'], ans: 1 }
  ],
  'Linux': [
    { q: 'What does chmod do?', opts: ['Changes ownership', 'Changes file permissions', 'Creates directories'], ans: 1 },
    { q: 'What is the root user?', opts: ['Regular user', 'Superuser with full access', 'Guest account'], ans: 1 },
    { q: 'What does grep do?', opts: ['Compresses files', 'Searches text patterns in files', 'Creates users'], ans: 1 },
    { q: 'What is systemd?', opts: ['A shell script', 'Init system and service manager', 'A file system'], ans: 1 },
    { q: 'What is SSH?', opts: ['Secure Shell for encrypted remote access', 'Simple Server Host', 'Storage Share Hub'], ans: 0 },
    { q: 'What is a cron job?', opts: ['A background process', 'Scheduled task at set intervals', 'A file permission'], ans: 1 },
    { q: 'What does the pipe operator (|) do?', opts: ['Creates files', 'Sends output of one command as input to another', 'Runs in parallel'], ans: 1 },
    { q: 'What is sudo?', opts: ['A user name', 'Execute command as superuser', 'A config file'], ans: 1 }
  ],
  'API': [
    { q: 'What does REST stand for?', opts: ['Remote Execution', 'Representational State Transfer', 'Real-time Event System'], ans: 1 },
    { q: 'What is HTTP status 201?', opts: ['Server error', 'Resource created successfully', 'Not found'], ans: 1 },
    { q: 'What is OAuth 2.0?', opts: ['Database protocol', 'Authorization framework', 'Encryption algorithm'], ans: 1 },
    { q: 'What is rate limiting?', opts: ['Limiting queries', 'Controlling API requests per time period', 'Reducing speed'], ans: 1 },
    { q: 'What is GraphQL?', opts: ['A database', 'Query language letting clients request exact data', 'A REST framework'], ans: 1 },
    { q: 'What is API versioning?', opts: ['Tracking usage', 'Managing multiple API versions to prevent breaks', 'Code versioning'], ans: 1 },
    { q: 'What is an API contract?', opts: ['Legal document', 'Specification defining request/response formats', 'Pricing model'], ans: 1 },
    { q: 'What is idempotency?', opts: ['A security measure', 'Same request produces same result regardless of repetition', 'A caching method'], ans: 1 }
  ],
  'default': [
    { q: 'What does API stand for?', opts: ['Application Programming Interface', 'Applied Process Integration', 'Advanced Program Instructions'], ans: 0 },
    { q: 'What does DRY stand for?', opts: ['Do Repeat Yourself', "Don't Repeat Yourself", 'Data Resource Yield'], ans: 1 },
    { q: 'Which HTTP status code means success?', opts: ['404', '500', '200'], ans: 2 },
    { q: 'What is version control?', opts: ['A backup tool', 'A system that tracks changes to code over time', 'A testing framework'], ans: 1 },
    { q: 'What does MVC stand for?', opts: ['Model View Controller', 'Module Version Control', 'Main Visual Component'], ans: 0 },
    { q: 'What is a REST API?', opts: ['A sleeping computer', 'An architectural style for building web services', 'A JavaScript library'], ans: 1 },
    { q: 'What is an algorithm?', opts: ['A programming language', 'A step-by-step procedure to solve a problem', 'A database type'], ans: 1 },
    { q: 'What is open source?', opts: ['Free hardware', 'Software with publicly available source code', 'A cloud service'], ans: 1 }
  ]
};

export default function RoadmapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState({ completedSteps: [], percentage: 0 });
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Mini Quiz State
  const [miniQuizOpen, setMiniQuizOpen] = useState(null);
  const [miniQuizAnswers, setMiniQuizAnswers] = useState({});
  const [miniQuizQuestionIndices, setMiniQuizQuestionIndices] = useState([]);
  const [quizPhase, setQuizPhase] = useState('answering'); // 'answering' | 'results'
  const [quizResults, setQuizResults] = useState(null); // { passed, details: [{q, opts, ans, userAns, correct}] }
  
  // For forcing re-render when local storage updates
  // eslint-disable-next-line no-unused-vars
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [rmRes, pgRes] = await Promise.all([
          api.get(`/roadmaps/${id}`),
          api.get(`/progress/${id}`)
        ]);
        setRoadmap(rmRes.data.roadmap);
        setProgress(pgRes.data.progress);
      } catch (e) {
        console.error(e);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const toggleStep = async (stepId, e) => {
    e && e.stopPropagation();
    if (toggling) return;
    setToggling(stepId);
    try {
      const res = await api.post(`/progress/${id}/toggle`, { stepId });
      setProgress(res.data.progress);
      if (selectedStep && selectedStep.id === stepId) {
        // update selected step done state
        setSelectedStep(s => ({ ...s, _done: !s._done }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setToggling(null);
    }
  };

  const openDrawer = useCallback((step, isDone) => {
    setSelectedStep({ ...step, _done: isDone });
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedStep(null), 300);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeDrawer(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeDrawer]);

  if (loading) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.loadWrap}>
        <div className="spinner" style={{ width: 40, height: 40 }} />
      </div>
    </div>
  );

  if (!roadmap) return null;

  const completed = progress.completedSteps || [];
  const pct = progress.percentage || 0;

  // Group steps by category preserving order
  const grouped = [];
  const seen = {};
  roadmap.steps.forEach(step => {
    const cat = step.category || 'General';
    if (!seen[cat]) {
      seen[cat] = true;
      grouped.push({ category: cat, steps: [] });
    }
    grouped[grouped.length - 1].steps.push(step);
  });

  let drawerColor = aestheticColors[0];
  if (selectedStep) {
    const cat = selectedStep.category || 'General';
    const idx = grouped.findIndex(g => g.category === cat);
    if (idx !== -1) {
      drawerColor = aestheticColors[idx % aestheticColors.length];
    }
  }

  const getRichDescription = (step) => {
    if (!step) return "";
    const t = step.title.toLowerCase();
    for (const [key, val] of Object.entries(stepDescriptions)) {
      if (t.includes(key.toLowerCase())) return val;
    }
    return step.description || "This topic is a critical milestone in your developmental journey. In this module, you will dive into the core mechanisms, underlying architecture, and standard best practices associated with this technology. Rather than just memorizing syntax, focus on understanding the 'why' behind these concepts. Build small, iterative projects to apply what you learn hands-on. Consult the provided learning resources, read the official documentation thoroughly, and experiment with the code to truly solidify your mental model before moving forward to advanced architectures.";
  };

  const getQuizSetForCategory = (categoryName) => {
    // 1. Try roadmap title match first (e.g., "Java Development" -> "Java" quiz set)
    if (roadmap?.title) {
      const rt = roadmap.title;
      const roadmapKeyMatch = Object.keys(categoryQuizzes).find(k => 
        k !== 'default' && rt.toLowerCase().includes(k.toLowerCase())
      );
      if (roadmapKeyMatch) return categoryQuizzes[roadmapKeyMatch];
    }

    // 2. Try category name match
    let keyMatch = Object.keys(categoryQuizzes).find(k => categoryName.toLowerCase().includes(k.toLowerCase()) && k !== 'default');
    
    // 3. Try steps title match
    if (!keyMatch) {
      const catObj = grouped.find(g => g.category === categoryName);
      if (catObj) {
        for (const step of catObj.steps) {
           keyMatch = Object.keys(categoryQuizzes).find(k => step.title.toLowerCase().includes(k.toLowerCase()) && k !== 'default');
           if (keyMatch) break;
        }
      }
    }
    return keyMatch ? categoryQuizzes[keyMatch] : categoryQuizzes.default;
  };

  const openMiniQuiz = (category) => {
    setMiniQuizOpen(category);
    const quizSet = getQuizSetForCategory(category);
    
    // Pick 3 random distinct questions
    let indices = [];
    const count = Math.min(3, quizSet.length);
    while (indices.length < count) {
       const r = Math.floor(Math.random() * quizSet.length);
       if (!indices.includes(r)) indices.push(r);
    }
    
    setMiniQuizQuestionIndices(indices);
    setMiniQuizAnswers({});
    setQuizPhase('answering');
    setQuizResults(null);
  };

  const submitMiniQuiz = (category) => {
    const quizSet = getQuizSetForCategory(category);
    
    // Build detailed results for each question
    const details = miniQuizQuestionIndices.map((qIdx, i) => {
       const question = quizSet[qIdx];
       const userAns = miniQuizAnswers[i];
       return {
         q: question.q,
         opts: question.opts,
         ans: question.ans,
         userAns: userAns,
         correct: userAns === question.ans
       };
    });
    
    const allCorrect = details.every(d => d.correct) && Object.keys(miniQuizAnswers).length === miniQuizQuestionIndices.length;
    
    if (allCorrect) {
      localStorage.setItem(`quiz_${id}_${category}`, 'true');
      setUpdateTrigger(prev => prev + 1);
    }
    
    setQuizResults({ passed: allCorrect, details });
    setQuizPhase('results');
  };

  const retryQuiz = () => {
    if (miniQuizOpen) {
      openMiniQuiz(miniQuizOpen);
    }
  };

  const closeQuiz = () => {
    setMiniQuizOpen(null);
    setMiniQuizAnswers({});
    setQuizPhase('answering');
    setQuizResults(null);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={`${styles.layout} ${drawerOpen ? styles.layoutShifted : ''}`}>
        {/* ── Main scrollable roadmap ── */}
        <main className={styles.main}>
          {/* Back */}
          <button className={styles.back} onClick={() => navigate('/dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to Dashboard
          </button>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerIcon} style={{ background: `${roadmap.color}18`, border: `1.5px solid ${roadmap.color}40` }}>
                {roadmap.icon}
              </div>
              <div>
                <h1 className={styles.title}>{roadmap.title}</h1>
                <p className={styles.desc}>{roadmap.description}</p>
              </div>
            </div>
            <button className={styles.quizBtn} onClick={() => navigate(`/quiz/${id}`)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Take Quiz
            </button>
          </div>

          {/* Progress bar */}
          <div className={styles.progressCard}>
            <div className={styles.progressTop}>
              <div>
                <div className={styles.progressTitle}>Your Progress</div>
                <div className={styles.progressSub}>{completed.length} of {roadmap.steps.length} steps completed</div>
              </div>
              <div className={styles.progressPct} style={{ color: pct === 100 ? 'var(--success)' : roadmap.color }}>
                {pct}%
              </div>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}cc, ${roadmap.color})` }} />
            </div>
            {pct === 100 && (
              <div className={styles.completedMsg}>
                🎉 Congratulations! You've completed this roadmap. Take the quiz to test your knowledge!
              </div>
            )}
          </div>

          {/* ── Visual Roadmap Flow ── */}
          <div className={styles.roadmapFlow}>
            {grouped.map(({ category, steps }, gIdx) => {
              const catColor = aestheticColors[gIdx % aestheticColors.length];
              const isLeft = gIdx % 2 !== 0;

              // Locking logic
              let isLocked = false;
              if (gIdx > 0) {
                const prevCat = grouped[gIdx - 1];
                const prevStepsDone = prevCat.steps.every(s => completed.includes(s.id));
                const prevQuizPassed = localStorage.getItem(`quiz_${id}_${prevCat.category}`) === 'true';
                isLocked = !(prevStepsDone && prevQuizPassed);
              }

              const isCatCompleted = steps.every(s => completed.includes(s.id));
              const isQuizPassed = localStorage.getItem(`quiz_${id}_${category}`) === 'true';

              // Extract rendering logic for steps container to reuse for left/right
              const renderStepsContainer = () => (
                <div className={styles.stepsContainer} style={{ '--node-color': catColor }}>
                  {steps.map((step, idx) => {
                    const isDone = completed.includes(step.id);
                    const isToggling = toggling === step.id;
                    const isSelected = selectedStep?.id === step.id && drawerOpen;

                    return (
                      <div key={step.id} className={styles.branchRow} style={{ animationDelay: `${(gIdx * 3 + idx) * 0.05}s` }}>
                        <div className={styles.branchLine} style={{ '--node-color': catColor }} />
                        
                        <div
                          className={`${styles.stepNode} ${isDone ? styles.stepNodeDone : ''} ${isSelected ? styles.stepNodeSelected : ''}`}
                          style={{ '--node-color': catColor }}
                          onClick={() => openDrawer(step, isDone)}
                        >
                          <div className={styles.stepNodeContent}>
                            <div className={styles.stepTitle}>{step.title}</div>
                            {step.resources?.length > 0 && (
                              <div className={styles.stepResources}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                </svg>
                                {step.resources.length} resource{step.resources.length !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>

                          <button
                            className={`${styles.stepCheck} ${isDone ? styles.stepCheckDone : ''}`}
                            onClick={(e) => toggleStep(step.id, e)}
                            disabled={isToggling}
                            title={isDone ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {isToggling ? (
                              <span className="spinner" style={{ width: 12, height: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                            ) : isDone ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : null}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );

              return (
                <div key={category} className={styles.roadmapBlock} style={{ opacity: isLocked ? 0.4 : 1, pointerEvents: isLocked ? 'none' : 'auto' }}>
                  {/* Left Column (Either Spacer or Steps) */}
                  {isLeft ? (
                    <div className={styles.leftCol}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {renderStepsContainer()}
                        {/* Section Checkpoint Quiz */}
                        {isCatCompleted && (
                          <div className={styles.branchRow} style={{ marginTop: '16px' }}>
                            <div className={styles.branchLine} style={{ '--node-color': catColor, borderTopStyle: 'dotted' }} />
                            <div className={styles.stepNode} style={{ '--node-color': catColor, borderStyle: 'dashed', background: isQuizPassed ? `${catColor}15` : undefined }}
                                 onClick={() => !isQuizPassed && openMiniQuiz(category)}>
                              <div className={styles.stepNodeContent}>
                                <div className={styles.stepTitle} style={{ color: isQuizPassed ? catColor : undefined }}>
                                  {isQuizPassed ? '✓ Checkpoint Passed' : '🔒 Take Checkpoint Quiz'}
                                </div>
                                <div className={styles.stepResources}>Pass to unlock next section</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.forkStem} style={{ '--node-color': catColor }} />
                    </div>
                  ) : (
                    <div className={styles.leftSpacer} />
                  )}

                  {/* Center Column */}
                  <div className={styles.centerCol}>
                    <div className={styles.categoryNode} style={{ '--node-color': catColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      {isLocked && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                      {category}
                    </div>
                    {/* The vertical timeline connector between categories */}
                    {gIdx !== grouped.length - 1 && <div className={styles.mainTimelineLine} />}
                  </div>

                  {/* Right Column (Either Spacer or Steps) */}
                  {!isLeft ? (
                    <div className={styles.rightCol}>
                      <div className={styles.forkStem} style={{ '--node-color': catColor }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {renderStepsContainer()}
                        {/* Section Checkpoint Quiz */}
                        {isCatCompleted && (
                          <div className={styles.branchRow} style={{ marginTop: '16px' }}>
                            <div className={styles.branchLine} style={{ '--node-color': catColor, borderTopStyle: 'dotted' }} />
                            <div className={styles.stepNode} style={{ '--node-color': catColor, borderStyle: 'dashed', background: isQuizPassed ? `${catColor}15` : undefined }}
                                 onClick={() => !isQuizPassed && openMiniQuiz(category)}>
                              <div className={styles.stepNodeContent}>
                                <div className={styles.stepTitle} style={{ color: isQuizPassed ? catColor : undefined }}>
                                  {isQuizPassed ? '✓ Checkpoint Passed' : '🔒 Take Checkpoint Quiz'}
                                </div>
                                <div className={styles.stepResources}>Pass to unlock next section</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.leftSpacer} />
                  )}
                </div>
              );
            })}
          </div>
        </main>

        {/* ── Right Drawer ── */}
        <aside className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
          {selectedStep && (
            <>
              {/* Drawer header */}
              <div className={styles.drawerHeader} style={{ '--step-color': drawerColor }}>
                <div className={styles.drawerHeaderTop}>
                  <span className={styles.drawerCategory}
                    style={{ color: drawerColor,
                             background: `${drawerColor}18`,
                             borderColor: `${drawerColor}30` }}>
                    {selectedStep.category}
                  </span>
                  <button className={styles.drawerClose} onClick={closeDrawer} title="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <h2 className={styles.drawerTitle}>{selectedStep.title}</h2>
                <div className={styles.drawerAccentBar} style={{ background: `linear-gradient(90deg, ${drawerColor}, transparent)` }} />
              </div>

              {/* Drawer body */}
              <div className={styles.drawerBody}>
                {/* About section */}
                <section className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    About this topic
                  </div>
                  <p className={styles.drawerText}>
                    {getRichDescription(selectedStep)}
                  </p>
                </section>

                {/* Resources section */}
                {selectedStep.resources?.length > 0 && (
                  <section className={styles.drawerSection}>
                    <div className={styles.drawerSectionTitle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      Learning Resources
                    </div>
                    <div className={styles.resourceList}>
                      {selectedStep.resources.map((r, idx) => {
                        let url = '';
                        let title = r;
                        
                        // Parse "URL|TITLE" format
                        if (r.includes('|')) {
                           const parts = r.split('|');
                           url = parts[0];
                           title = parts[1];
                        } else if (r.startsWith('http')) {
                          url = r;
                          try { title = new URL(r).hostname.replace('www.', ''); } catch(e){}
                        } else {
                          url = resourceLinks[r];
                        }
                        
                        return (
                          <a
                            key={idx}
                            href={url || '#'}
                            target={url ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className={`${styles.resourceCard} ${!url ? styles.resourceCardNoLink : ''}`}
                            onClick={!url ? (e) => e.preventDefault() : undefined}
                          >
                            <div className={styles.resourceIcon}>
                              {url ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                              ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                                </svg>
                              )}
                            </div>
                            <div className={styles.resourceInfo}>
                              <div className={styles.resourceName}>{title}</div>
                              {url && <div className={styles.resourceUrl}>{url.includes('youtube') ? 'YouTube Tutorial' : 'Documentation'}</div>}
                            </div>
                            {url && (
                              <svg className={styles.resourceExternal} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6"/>
                              </svg>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Tips section */}
                <section className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Study Tips
                  </div>
                  <div className={styles.tipsList}>
                    <div className={styles.tip}>
                      <span className={styles.tipBullet}>01</span>
                      Build small projects to apply concepts hands-on
                    </div>
                    <div className={styles.tip}>
                      <span className={styles.tipBullet}>02</span>
                      Read the official documentation first, then supplementary resources
                    </div>
                    <div className={styles.tip}>
                      <span className={styles.tipBullet}>03</span>
                      Practice daily — even 30 minutes makes a difference
                    </div>
                  </div>
                </section>
              </div>

              {/* Drawer footer */}
              <div className={styles.drawerFooter}>
                <button
                  className={`${styles.drawerToggleBtn} ${selectedStep._done ? styles.drawerToggleBtnDone : ''}`}
                  onClick={(e) => toggleStep(selectedStep.id, e)}
                  disabled={toggling === selectedStep.id}
                  style={selectedStep._done ? {} : { background: drawerColor }}
                >
                  {toggling === selectedStep.id ? (
                    <span className="spinner" style={{ width: 16, height: 16 }} />
                  ) : selectedStep._done ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Mark as Incomplete
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Backdrop for mobile */}
        {drawerOpen && <div className={styles.backdrop} onClick={closeDrawer} />}
        
        {/* Mini Quiz Modal */}
        {miniQuizOpen && (() => {
           return (
            <div className={styles.backdrop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
               <div className={styles.card} style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '16px', maxWidth: '520px', width: '90%', maxHeight: '90vh', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '6px', fontSize: '18px', color: 'var(--text-primary)' }}>Checkpoint: {miniQuizOpen}</h3>
                  
                  {/* ANSWERING PHASE */}
                  {quizPhase === 'answering' && (
                    <>
                      <p style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Answer all {miniQuizQuestionIndices.length} questions correctly to unlock the next section.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                        {miniQuizQuestionIndices.map((qIdx, qIndex) => {
                          const quizSet = getQuizSetForCategory(miniQuizOpen);
                          const activeQuiz = quizSet[qIdx];
                          return (
                            <div key={qIndex} style={{ borderBottom: qIndex === miniQuizQuestionIndices.length - 1 ? 'none' : '1px solid var(--border)', paddingBottom: qIndex === miniQuizQuestionIndices.length - 1 ? 0 : '16px' }}>
                               <p style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                                 <strong>Q{qIndex + 1}:</strong> {activeQuiz.q}
                               </p>
                               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                 {activeQuiz.opts.map((opt, i) => (
                                   <button key={i}
                                      onClick={() => setMiniQuizAnswers(prev => ({ ...prev, [qIndex]: i }))}
                                      style={{
                                         padding: '10px 14px', borderRadius: '8px', textAlign: 'left',
                                         background: miniQuizAnswers[qIndex] === i ? 'color-mix(in srgb, var(--accent) 20%, transparent)' : 'var(--bg-secondary)',
                                         border: `1px solid ${miniQuizAnswers[qIndex] === i ? 'var(--accent)' : 'var(--border)'}`,
                                         color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px'
                                      }}>
                                      {opt}
                                   </button>
                                 ))}
                               </div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                         <button onClick={closeQuiz} style={{ flex: 1, padding: '10px', background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                         <button onClick={() => submitMiniQuiz(miniQuizOpen)} disabled={Object.keys(miniQuizAnswers).length < miniQuizQuestionIndices.length} style={{ flex: 1, padding: '10px', background: 'var(--accent-glow)', border: '1px solid var(--accent)', borderRadius: '8px', color: 'var(--accent)', cursor: 'pointer', opacity: Object.keys(miniQuizAnswers).length < miniQuizQuestionIndices.length ? 0.5 : 1 }}>Submit Answers</button>
                      </div>
                    </>
                  )}

                  {/* RESULTS PHASE */}
                  {quizPhase === 'results' && quizResults && (
                    <>
                      <div style={{ textAlign: 'center', margin: '10px 0 20px' }}>
                        <div style={{ fontSize: '40px', marginBottom: '8px' }}>{quizResults.passed ? '🎉' : '📚'}</div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: quizResults.passed ? '#10b981' : '#ef4444' }}>
                          {quizResults.passed ? 'Checkpoint Passed!' : 'Not Quite — Review Below'}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {quizResults.details.filter(d => d.correct).length}/{quizResults.details.length} correct
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                        {quizResults.details.map((d, i) => (
                          <div key={i} style={{ padding: '14px', borderRadius: '10px', border: `1px solid ${d.correct ? '#10b98140' : '#ef444440'}`, background: d.correct ? '#10b98108' : '#ef444408' }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: 'var(--text-primary)' }}>
                              <span style={{ color: d.correct ? '#10b981' : '#ef4444', fontWeight: 'bold', marginRight: '6px' }}>{d.correct ? '✓' : '✗'}</span>
                              <strong>Q{i + 1}:</strong> {d.q}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {d.opts.map((opt, j) => {
                                const isCorrectAnswer = j === d.ans;
                                const isUserAnswer = j === d.userAns;
                                const isWrongPick = isUserAnswer && !d.correct;
                                let bg = 'transparent';
                                let borderCol = 'var(--border)';
                                let labelText = '';
                                if (isCorrectAnswer) { bg = '#10b98115'; borderCol = '#10b98160'; labelText = '✓ Correct Answer'; }
                                if (isWrongPick) { bg = '#ef444415'; borderCol = '#ef444460'; labelText = '✗ Your Answer'; }
                                return (
                                  <div key={j} style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', border: `1px solid ${borderCol}`, background: bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
                                    <span>{opt}</span>
                                    {labelText && <span style={{ fontSize: '11px', fontWeight: 'bold', color: isCorrectAnswer ? '#10b981' : '#ef4444' }}>{labelText}</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        {quizResults.passed ? (
                          <button onClick={closeQuiz} style={{ flex: 1, padding: '10px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Continue →</button>
                        ) : (
                          <>
                            <button onClick={closeQuiz} style={{ flex: 1, padding: '10px', background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>Close</button>
                            <button onClick={retryQuiz} style={{ flex: 1, padding: '10px', background: 'var(--accent)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Try Again (New Questions)</button>
                          </>
                        )}
                      </div>
                    </>
                  )}
               </div>
            </div>
           );
        })()}
      </div>
    </div>
  );
}
