const roadmaps = {
  frontend: {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern web development from Internet basics to React, TypeScript, and production deployment',
    icon: '🌐',
    color: '#3B82F6',
    estimatedHours: 200,
    steps: [
      // ── Internet ──
      { id: 'fe-1', title: 'How Does the Internet Work?', description: 'Understand the global network of interconnected computers, data packets, IP addresses, TCP/IP model, and how data travels from server to client across the world.', category: 'Internet', resources: ['https://cs.fyi/guide/how-does-internet-work|How Does the Internet Work (cs.fyi)', 'https://www.youtube.com/watch?v=x3c1ih2NJEg|How the Internet Works in 5 Minutes (YouTube)', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work|MDN: How does the Internet work?'] },
      { id: 'fe-2', title: 'What is HTTP/HTTPS?', description: 'Learn the Hypertext Transfer Protocol — request/response cycle, HTTP methods (GET, POST, PUT, DELETE), status codes (200, 301, 404, 500), headers, cookies, and the role of HTTPS/TLS encryption for secure communication.', category: 'Internet', resources: ['https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview|MDN: HTTP Overview', 'https://www.cloudflare.com/learning/ssl/what-is-https/|Cloudflare: What is HTTPS?', 'https://cs.fyi/guide/http-in-depth|HTTP in Depth (cs.fyi)'] },
      { id: 'fe-3', title: 'Domain Names, DNS & Hosting', description: 'Understand domain name systems, how DNS resolves human-readable URLs to IP addresses, types of DNS records (A, CNAME, MX), and how web hosting servers deliver content to users.', category: 'Internet', resources: ['https://www.cloudflare.com/learning/dns/what-is-dns/|Cloudflare: What is DNS?', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name|MDN: What is a Domain Name?', 'https://www.youtube.com/watch?v=MOd_gVEnMKk|DNS Explained (YouTube)'] },
      { id: 'fe-4', title: 'How Browsers Work', description: 'Explore the browser rendering pipeline — HTML parsing, DOM tree construction, CSSOM, render tree, layout, paint, and compositing. Understand the critical rendering path and how browsers optimize page loads.', category: 'Internet', resources: ['https://web.dev/howbrowserswork/|How Browsers Work (web.dev)', 'https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work|MDN: How Browsers Work', 'https://www.youtube.com/watch?v=WjDrMKZWCt0|How Browsers Render Pages (YouTube)'] },

      // ── HTML ──
      { id: 'fe-5', title: 'HTML Fundamentals', description: 'Learn HTML document structure, elements, attributes, headings, paragraphs, lists, links, images, and how to build well-structured web pages from scratch.', category: 'HTML & CSS', resources: ['https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML|MDN: Introduction to HTML', 'https://www.w3schools.com/html/|W3Schools HTML Tutorial', 'https://www.youtube.com/watch?v=UB1O30fR-EE|HTML Crash Course (Traversy Media)'] },
      { id: 'fe-6', title: 'Semantic HTML & Accessibility', description: 'Master semantic elements (header, nav, main, article, section, footer), ARIA roles, alt text, form accessibility, and how to build inclusive websites that work for all users including screen readers.', category: 'HTML & CSS', resources: ['https://developer.mozilla.org/en-US/docs/Learn/Accessibility|MDN: Accessibility Guide', 'https://web.dev/learn/accessibility/|web.dev: Learn Accessibility', 'https://www.a11yproject.com/checklist/|The A11Y Project Checklist'] },
      { id: 'fe-7', title: 'HTML Forms & Validation', description: 'Build interactive forms with input types (text, email, password, date, file), form validation attributes (required, pattern, min/max), fieldsets, labels, and native browser validation APIs.', category: 'HTML & CSS', resources: ['https://developer.mozilla.org/en-US/docs/Learn/Forms|MDN: Web Forms Guide', 'https://web.dev/learn/forms/|web.dev: Learn Forms', 'https://www.youtube.com/watch?v=fNcJuPIZ2WE|HTML Forms Tutorial (YouTube)'] },

      // ── CSS ──
      { id: 'fe-8', title: 'CSS Fundamentals', description: 'Understand CSS selectors, specificity, the cascade, inheritance, the box model (margin, border, padding, content), display properties, units (px, em, rem, %, vw/vh), and colors.', category: 'CSS', resources: ['https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps|MDN: CSS First Steps', 'https://web.dev/learn/css/|web.dev: Learn CSS', 'https://www.youtube.com/watch?v=1Rs2ND1ryYc|CSS Crash Course (Traversy Media)'] },
      { id: 'fe-9', title: 'CSS Flexbox', description: 'Master the Flexible Box Layout — flex containers, flex items, main axis vs cross axis, justify-content, align-items, flex-wrap, flex-grow/shrink/basis, and building responsive layouts.', category: 'CSS', resources: ['https://css-tricks.com/snippets/css/a-guide-to-flexbox/|CSS-Tricks: Complete Guide to Flexbox', 'https://flexboxfroggy.com/|Flexbox Froggy (Interactive Game)', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout|MDN: Flexbox'] },
      { id: 'fe-10', title: 'CSS Grid', description: 'Learn CSS Grid Layout — grid containers, grid items, template columns/rows, grid-area, gap, auto-fit/auto-fill, minmax(), and creating complex two-dimensional layouts.', category: 'CSS', resources: ['https://css-tricks.com/snippets/css/complete-guide-grid/|CSS-Tricks: Complete Guide to Grid', 'https://cssgridgarden.com/|Grid Garden (Interactive Game)', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout|MDN: CSS Grid Layout'] },
      { id: 'fe-11', title: 'Responsive Design & Media Queries', description: 'Build mobile-first responsive layouts using media queries, fluid typography (clamp), responsive images (srcset), viewport units, and breakpoint strategies for all screen sizes.', category: 'CSS', resources: ['https://web.dev/responsive-web-design-basics/|web.dev: Responsive Design Basics', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design|MDN: Responsive Design', 'https://www.youtube.com/watch?v=srvUrASNj0s|Responsive Design Tutorial (YouTube)'] },
      { id: 'fe-12', title: 'CSS Animations & Transitions', description: 'Create smooth animations with CSS transitions, keyframe animations, transform properties (translate, rotate, scale), and understand performance implications (GPU compositing, will-change).', category: 'CSS', resources: ['https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations|MDN: Using CSS Animations', 'https://web.dev/animations-guide/|web.dev: Animations Guide', 'https://animate.style/|Animate.css Library'] },

      // ── JavaScript ──
      { id: 'fe-13', title: 'JavaScript Essentials', description: 'Master variables (let, const, var), data types, operators, control flow (if/else, switch, loops), functions (declarations, expressions, arrow functions), and scope.', category: 'JavaScript', resources: ['https://javascript.info/first-steps|JavaScript.info: First Steps', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps|MDN: JavaScript First Steps', 'https://www.youtube.com/watch?v=hdI2bqOjy3c|JavaScript Crash Course (Traversy Media)'] },
      { id: 'fe-14', title: 'DOM Manipulation & Events', description: 'Learn to select, create, modify, and remove DOM elements. Understand event listeners, event bubbling/capturing, event delegation, and building interactive web pages with vanilla JS.', category: 'JavaScript', resources: ['https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents|MDN: Manipulating Documents', 'https://javascript.info/document|JavaScript.info: Document', 'https://www.youtube.com/watch?v=5fb2aPlgoys|DOM Manipulation Tutorial (YouTube)'] },
      { id: 'fe-15', title: 'ES6+ Modern JavaScript', description: 'Master destructuring, spread/rest operators, template literals, modules (import/export), classes, symbols, iterators, generators, Map/Set, and optional chaining.', category: 'JavaScript', resources: ['https://javascript.info/js-misc|JavaScript.info: Advanced', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules|MDN: JavaScript Modules', 'https://www.youtube.com/watch?v=NCwa_xi0Uuc|ES6 Tutorial (YouTube)'] },
      { id: 'fe-16', title: 'Async JavaScript', description: 'Understand the event loop, callbacks, Promises, async/await, error handling with try/catch, Promise.all/race/allSettled, and the Fetch API for making HTTP requests.', category: 'JavaScript', resources: ['https://javascript.info/async|JavaScript.info: Promises & Async/Await', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous|MDN: Asynchronous JavaScript', 'https://www.youtube.com/watch?v=PoRJizFvM7s|Async JS Crash Course (Traversy Media)'] },

      // ── Version Control ──
      { id: 'fe-17', title: 'Git Fundamentals', description: 'Learn Git basics — init, add, commit, log, diff, stash, reset. Understand the working directory, staging area, and repository. Master branching, merging, and rebasing workflows.', category: 'Version Control', resources: ['https://git-scm.com/book/en/v2|Pro Git Book (Official)', 'https://learngitbranching.js.org/|Learn Git Branching (Interactive)', 'https://www.youtube.com/watch?v=RGOj5yH7evk|Git & GitHub Crash Course (YouTube)'] },
      { id: 'fe-18', title: 'GitHub & Collaboration', description: 'Master GitHub workflows — forking, pull requests, code reviews, issues, project boards, GitHub Actions basics, and collaborating with teams on open-source projects.', category: 'Version Control', resources: ['https://docs.github.com/en/get-started|GitHub Docs: Getting Started', 'https://skills.github.com/|GitHub Skills (Interactive Courses)', 'https://www.youtube.com/watch?v=8Dd7KRpKeaE|GitHub for Beginners (YouTube)'] },

      // ── Package Managers ──
      { id: 'fe-19', title: 'npm, yarn & pnpm', description: 'Learn package managers — installing, updating, and removing packages. Understand package.json, lock files, semantic versioning, scripts, and the differences between npm, yarn, and pnpm.', category: 'Package Managers', resources: ['https://docs.npmjs.com/getting-started|npm Documentation', 'https://yarnpkg.com/getting-started|Yarn Getting Started', 'https://pnpm.io/motivation|pnpm: Why pnpm?'] },

      // ── CSS Frameworks ──
      { id: 'fe-20', title: 'Tailwind CSS', description: 'Learn utility-first CSS with Tailwind — responsive utilities, custom configuration, JIT mode, component extraction, plugins, and building production-ready UIs rapidly.', category: 'CSS Frameworks', resources: ['https://tailwindcss.com/docs/installation|Tailwind CSS Documentation', 'https://www.youtube.com/watch?v=UBOj6rqRUME|Tailwind CSS Crash Course (YouTube)', 'https://tailwindui.com/|Tailwind UI Components'] },
      { id: 'fe-21', title: 'CSS Modules & Styled-Components', description: 'Understand CSS-in-JS approaches — CSS Modules for locally scoped styles, styled-components for component-based styling, and when to use each approach in React projects.', category: 'CSS Frameworks', resources: ['https://github.com/css-modules/css-modules|CSS Modules Documentation', 'https://styled-components.com/docs|styled-components Docs', 'https://www.youtube.com/watch?v=j5P9FHiBVNo|CSS-in-JS Explained (YouTube)'] },

      // ── React Framework ──
      { id: 'fe-22', title: 'React Fundamentals', description: 'Learn React core concepts — JSX, components (functional), props, state with useState, event handling, conditional rendering, lists & keys, and component composition patterns.', category: 'React', resources: ['https://react.dev/learn|React Official Tutorial', 'https://www.youtube.com/watch?v=CgkZ7MvWUAA|React 19 Crash Course (YouTube)', 'https://scrimba.com/learn/learnreact|Scrimba: Learn React'] },
      { id: 'fe-23', title: 'React Hooks Deep Dive', description: 'Master useState, useEffect, useContext, useRef, useMemo, useCallback, useReducer. Build custom hooks for reusable logic like data fetching, form handling, and local storage.', category: 'React', resources: ['https://react.dev/reference/react/hooks|React Hooks API Reference', 'https://www.youtube.com/watch?v=LlvBzyy-558|React Hooks Explained (YouTube)', 'https://usehooks.com/|useHooks.com (Collection)'] },
      { id: 'fe-24', title: 'React Router & Navigation', description: 'Implement client-side routing with React Router v6 — BrowserRouter, Routes, Link, useNavigate, useParams, nested routes, route guards, and lazy loading routes with Suspense.', category: 'React', resources: ['https://reactrouter.com/en/main/start/tutorial|React Router Tutorial', 'https://www.youtube.com/watch?v=Ul3y1LXxzdU|React Router v6 Tutorial (YouTube)', 'https://reactrouter.com/en/main|React Router Documentation'] },

      // ── State Management ──
      { id: 'fe-25', title: 'State Management (Redux & Zustand)', description: 'Learn global state management — Redux Toolkit (slices, reducers, middleware, RTK Query), Zustand for lightweight stores, and Context API. Know when to use each approach.', category: 'State Management', resources: ['https://redux-toolkit.js.org/tutorials/quick-start|Redux Toolkit Quick Start', 'https://zustand-demo.pmnd.rs/|Zustand Documentation', 'https://www.youtube.com/watch?v=bbkBuqC1rU4|Redux Toolkit Tutorial (YouTube)'] },

      // ── Testing ──
      { id: 'fe-26', title: 'Testing (Jest & React Testing Library)', description: 'Write unit tests with Jest, component tests with React Testing Library, and E2E tests with Cypress. Understand testing best practices, mocking, and test-driven development.', category: 'Testing', resources: ['https://testing-library.com/docs/react-testing-library/intro/|React Testing Library Docs', 'https://jestjs.io/docs/getting-started|Jest Getting Started', 'https://www.youtube.com/watch?v=8Xwq35cPwYg|React Testing Crash Course (YouTube)'] },

      // ── Build Tools ──
      { id: 'fe-27', title: 'Build Tools (Vite & Webpack)', description: 'Understand modern build tools — Vite for lightning-fast development, Webpack for advanced bundling. Learn code splitting, tree shaking, HMR, loaders, plugins, and environment variables.', category: 'Build Tools', resources: ['https://vitejs.dev/guide/|Vite Official Guide', 'https://webpack.js.org/concepts/|Webpack Concepts', 'https://www.youtube.com/watch?v=5IG4UmULyoA|Vite Crash Course (YouTube)'] },

      // ── TypeScript ──
      { id: 'fe-28', title: 'TypeScript with React', description: 'Add type safety to React — typing props, state, events, refs, and context. Learn interfaces, generics, utility types, discriminated unions, and configuring tsconfig for React projects.', category: 'TypeScript', resources: ['https://www.typescriptlang.org/docs/handbook/react.html|TypeScript: React', 'https://react-typescript-cheatsheet.netlify.app/|React TypeScript Cheatsheet', 'https://www.youtube.com/watch?v=FJDVKeh7RJI|TypeScript with React Tutorial (YouTube)'] },

      // ── Performance & Deployment ──
      { id: 'fe-29', title: 'Web Performance & SEO', description: 'Optimize Core Web Vitals (LCP, FID, CLS), implement lazy loading, code splitting, image optimization, service workers, and SEO best practices (meta tags, structured data, sitemaps).', category: 'Performance', resources: ['https://web.dev/performance/|web.dev: Performance', 'https://developer.chrome.com/docs/lighthouse/|Lighthouse Documentation', 'https://www.youtube.com/watch?v=AQqFZ5t8uNc|Web Performance Tips (YouTube)'] },
      { id: 'fe-30', title: 'Deployment (Vercel, Netlify & CI/CD)', description: 'Deploy React apps to Vercel and Netlify. Set up CI/CD with GitHub Actions, configure environment variables, custom domains, preview deployments, and production build optimization.', category: 'Performance', resources: ['https://vercel.com/docs|Vercel Documentation', 'https://docs.netlify.com/|Netlify Documentation', 'https://docs.github.com/en/actions|GitHub Actions Docs'] }
    ]
  },
  backend: {
    id: 'backend',
    title: 'Backend Development',
    description: 'Build robust server-side applications with Node.js, databases, APIs, authentication, and deployment',
    icon: '⚙️',
    color: '#10B981',
    estimatedHours: 220,
    steps: [
      // ── Introduction ──
      { id: 'be-1', title: 'How Does the Internet Work?', description: 'Understand the fundamentals of the Internet — data packets, IP addresses, TCP/IP protocol stack, routing, and how requests travel from client to server and back.', category: 'Introduction', resources: ['https://cs.fyi/guide/how-does-internet-work|How Does the Internet Work (cs.fyi)', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work|MDN: How the Internet Works', 'https://www.youtube.com/watch?v=x3c1ih2NJEg|How the Internet Works in 5 Min (YouTube)'] },
      { id: 'be-2', title: 'What is HTTP?', description: 'Master the HTTP protocol — request/response cycle, HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes, headers, cookies, content negotiation, and the differences between HTTP/1.1, HTTP/2, and HTTP/3.', category: 'Introduction', resources: ['https://developer.mozilla.org/en-US/docs/Web/HTTP|MDN: HTTP Reference', 'https://cs.fyi/guide/http-in-depth|HTTP in Depth (cs.fyi)', 'https://www.youtube.com/watch?v=iYM2zFP3Zn0|HTTP Crash Course (YouTube)'] },
      { id: 'be-3', title: 'What is a Domain Name?', description: 'Learn how domain names map to IP addresses, the domain name hierarchy (TLD, SLD, subdomain), DNS resolution process, and different types of DNS records (A, AAAA, CNAME, MX, TXT, NS).', category: 'Introduction', resources: ['https://www.cloudflare.com/learning/dns/what-is-dns/|Cloudflare: What is DNS?', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name|MDN: Domain Names', 'https://howdns.works/|How DNS Works (Visual)'] },
      { id: 'be-4', title: 'What is Hosting?', description: 'Understand different hosting options — shared hosting, VPS, dedicated servers, cloud hosting (AWS, GCP, Azure), and serverless platforms. Know how servers receive and respond to HTTP requests.', category: 'Introduction', resources: ['https://www.youtube.com/watch?v=htbY9-yggB0|Web Hosting Explained (YouTube)', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server|MDN: What is a Web Server?', 'https://www.cloudflare.com/learning/cdn/glossary/web-server/|Cloudflare: Web Server'] },
      { id: 'be-5', title: 'How Browsers Work', description: 'Understand the browser rendering pipeline from a backend perspective — DNS lookup, TCP handshake, TLS negotiation, HTTP request, server processing, and response delivery.', category: 'Introduction', resources: ['https://web.dev/howbrowserswork/|How Browsers Work (web.dev)', 'https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work|MDN: Populating the Page'] },

      // ── Frontend Basics ──
      { id: 'be-6', title: 'HTML Basics', description: 'Learn the fundamentals of HTML — document structure, semantic elements, forms, links, and how HTML is served by the backend to the browser. Essential for understanding full-stack interactions.', category: 'Frontend Basics', resources: ['https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML|MDN: Introduction to HTML', 'https://www.w3schools.com/html/|W3Schools HTML', 'https://www.youtube.com/watch?v=UB1O30fR-EE|HTML Crash Course (YouTube)'] },
      { id: 'be-7', title: 'CSS Basics', description: 'Understand CSS selectors, box model, flexbox basics, responsive design principles, and how the frontend consumes styled content served by your backend templates or APIs.', category: 'Frontend Basics', resources: ['https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps|MDN: CSS First Steps', 'https://web.dev/learn/css/|web.dev: Learn CSS'] },
      { id: 'be-8', title: 'JavaScript Basics', description: 'Learn core JavaScript — variables, functions, DOM manipulation, event handling, asynchronous programming (callbacks, promises, async/await), and the Fetch API for communicating with backend APIs.', category: 'Frontend Basics', resources: ['https://javascript.info/|JavaScript.info (Complete Guide)', 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript|MDN: JavaScript Guide', 'https://www.youtube.com/watch?v=hdI2bqOjy3c|JS Crash Course (YouTube)'] },

      // ── Pick a Backend Language ──
      { id: 'be-9', title: 'JavaScript (Node.js)', description: 'Master Node.js — the event loop, non-blocking I/O, CommonJS & ES modules, file system operations, streams, buffers, child processes, and the npm ecosystem for building high-performance backends.', category: 'Backend Language', resources: ['https://nodejs.org/en/learn/getting-started/introduction-to-nodejs|Node.js Official Guide', 'https://www.youtube.com/watch?v=TlB_eWDSMt4|Node.js Crash Course (YouTube)', 'https://nodejs.dev/en/learn/|Node.js Learn'] },
      { id: 'be-10', title: 'Python (Alternative)', description: 'Python as a backend language — Flask for microservices, Django for full-featured web apps. Understand WSGI/ASGI, virtual environments, pip, and Python\'s strengths in data-heavy applications.', category: 'Backend Language', resources: ['https://flask.palletsprojects.com/en/latest/tutorial/|Flask Official Tutorial', 'https://docs.djangoproject.com/en/stable/intro/tutorial01/|Django Official Tutorial', 'https://realpython.com/|Real Python'] },

      // ── Version Control ──
      { id: 'be-11', title: 'Git Version Control', description: 'Master Git for backend development — init, add, commit, branching, merging, rebasing, cherry-picking, stashing, and resolving merge conflicts. Understand git-flow and trunk-based development workflows.', category: 'Version Control', resources: ['https://git-scm.com/book/en/v2|Pro Git Book (Official)', 'https://learngitbranching.js.org/|Learn Git Branching (Interactive)', 'https://www.youtube.com/watch?v=RGOj5yH7evk|Git & GitHub Course (YouTube)'] },
      { id: 'be-12', title: 'GitHub & GitLab', description: 'Use GitHub/GitLab for code hosting, pull requests, code reviews, CI/CD pipelines, issue tracking, and project management. Set up branch protection rules and automated workflows.', category: 'Version Control', resources: ['https://docs.github.com/en/get-started|GitHub Documentation', 'https://docs.gitlab.com/ee/gitlab-basics/|GitLab Basics', 'https://skills.github.com/|GitHub Skills'] },

      // ── Express.js Framework ──
      { id: 'be-13', title: 'Express.js Fundamentals', description: 'Build REST APIs with Express.js — routing, middleware (built-in & custom), request/response objects, static file serving, template engines (EJS, Pug), and error handling middleware.', category: 'Framework', resources: ['https://expressjs.com/en/starter/installing.html|Express.js Getting Started', 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs|MDN: Express/Node Tutorial', 'https://www.youtube.com/watch?v=SccSCuHhOw0|Express.js Crash Course (YouTube)'] },
      { id: 'be-14', title: 'Express.js Advanced Patterns', description: 'Master advanced Express patterns — route modularization (Router), middleware chaining, request validation (Joi/Zod), file uploads (Multer), CORS configuration, rate limiting, and project structure best practices.', category: 'Framework', resources: ['https://expressjs.com/en/guide/routing.html|Express: Routing Guide', 'https://www.youtube.com/watch?v=Oe421EPjeBE|Node.js REST API (YouTube)', 'https://github.com/goldbergyoni/nodebestpractices|Node.js Best Practices'] },

      // ── Relational Databases ──
      { id: 'be-15', title: 'Relational Database Concepts', description: 'Understand RDBMS fundamentals — tables, rows, columns, primary/foreign keys, relationships (1:1, 1:N, N:M), normalization (1NF, 2NF, 3NF, BCNF), ACID properties, and transactions.', category: 'Relational Databases', resources: ['https://www.youtube.com/watch?v=ztHopE5Wnpc|Database Course (YouTube)', 'https://www.postgresql.org/docs/current/tutorial.html|PostgreSQL Tutorial', 'https://sqlzoo.net/wiki/SQL_Tutorial|SQLZoo Interactive'] },
      { id: 'be-16', title: 'SQL Queries & Joins', description: 'Master SQL — SELECT, INSERT, UPDATE, DELETE, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Learn all JOIN types (INNER, LEFT, RIGHT, FULL, CROSS), subqueries, CTEs, and window functions.', category: 'Relational Databases', resources: ['https://mode.com/sql-tutorial/|Mode SQL Tutorial', 'https://sqlzoo.net/wiki/SQL_Tutorial|SQLZoo (Interactive)', 'https://www.youtube.com/watch?v=HXV3zeQKqGY|SQL Full Course (YouTube)'] },
      { id: 'be-17', title: 'PostgreSQL', description: 'Deep dive into PostgreSQL — data types, indexing (B-tree, GIN, GiST), views, stored procedures, triggers, JSON/JSONB support, full-text search, and database migrations.', category: 'Relational Databases', resources: ['https://www.postgresql.org/docs/current/|PostgreSQL Official Docs', 'https://pgexercises.com/|PG Exercises (Interactive)', 'https://www.youtube.com/watch?v=qw--VYLpxG4|PostgreSQL Course (YouTube)'] },

      // ── NoSQL Databases ──
      { id: 'be-18', title: 'MongoDB Fundamentals', description: 'Learn MongoDB — documents, collections, BSON, CRUD operations, the Mongo shell, indexing strategies, and when to choose document databases over relational databases.', category: 'NoSQL Databases', resources: ['https://university.mongodb.com/|MongoDB University (Free)', 'https://www.mongodb.com/docs/manual/tutorial/|MongoDB Official Tutorial', 'https://www.youtube.com/watch?v=ofme2o29ngU|MongoDB Crash Course (YouTube)'] },
      { id: 'be-19', title: 'Mongoose ODM', description: 'Master Mongoose for Node.js — schemas, models, validation, middleware (pre/post hooks), virtuals, population (references), aggregation pipeline, and schema design patterns.', category: 'NoSQL Databases', resources: ['https://mongoosejs.com/docs/guide.html|Mongoose Official Guide', 'https://www.youtube.com/watch?v=DZBGEVgL2eE|Mongoose Crash Course (YouTube)', 'https://mongoosejs.com/docs/api.html|Mongoose API Reference'] },

      // ── API Design ──
      { id: 'be-20', title: 'RESTful API Design', description: 'Design production-grade REST APIs — proper resource naming, HTTP methods mapping, status codes, pagination, filtering, sorting, versioning (URL vs header), HATEOAS, and Richardson Maturity Model.', category: 'API Design', resources: ['https://restfulapi.net/|REST API Tutorial', 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design|Microsoft: API Design Guide', 'https://www.youtube.com/watch?v=-MTSQjw5DrM|REST API Best Practices (YouTube)'] },
      { id: 'be-21', title: 'API Documentation (Swagger/OpenAPI)', description: 'Document APIs with OpenAPI/Swagger specification — schema definitions, endpoints, request/response examples, authentication schemes, and generating interactive API docs with Swagger UI.', category: 'API Design', resources: ['https://swagger.io/docs/specification/about/|Swagger/OpenAPI Specification', 'https://learning.postman.com/docs/getting-started/overview/|Postman Learning Center', 'https://www.youtube.com/watch?v=YyPM0VgPMBQ|Swagger Tutorial (YouTube)'] },

      // ── Authentication & Security ──
      { id: 'be-22', title: 'Authentication (JWT & Sessions)', description: 'Implement authentication — JSON Web Tokens (JWT), session-based auth, bcrypt password hashing, refresh tokens, token rotation, and secure cookie-based authentication flows.', category: 'Auth & Security', resources: ['https://jwt.io/introduction|JWT.io Introduction', 'https://www.youtube.com/watch?v=mbsmsi7l3r4|JWT Authentication (YouTube)', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies|MDN: HTTP Cookies'] },
      { id: 'be-23', title: 'OAuth 2.0 & Social Login', description: 'Implement OAuth 2.0 flows — authorization code, PKCE, client credentials. Integrate Google, GitHub, and other social login providers using Passport.js strategies.', category: 'Auth & Security', resources: ['https://oauth.net/2/|OAuth 2.0 Specification', 'https://www.passportjs.org/docs/|Passport.js Documentation', 'https://www.youtube.com/watch?v=SoUdKxCUP3I|OAuth 2.0 Explained (YouTube)'] },
      { id: 'be-24', title: 'Web Security (OWASP)', description: 'Protect against OWASP Top 10 vulnerabilities — SQL injection, XSS, CSRF, broken authentication, security misconfiguration. Implement CORS, helmet.js, rate limiting, and input sanitization.', category: 'Auth & Security', resources: ['https://owasp.org/www-project-top-ten/|OWASP Top 10', 'https://cheatsheetseries.owasp.org/|OWASP Cheat Sheet Series', 'https://www.youtube.com/watch?v=F-sFp_IaEBM|Web Security Course (YouTube)'] },

      // ── Caching & Performance ──
      { id: 'be-25', title: 'Caching with Redis', description: 'Implement caching strategies — cache-aside, write-through, write-behind. Use Redis for session storage, rate limiting, pub/sub messaging, and job queues. Understand cache invalidation patterns.', category: 'Caching', resources: ['https://redis.io/docs/latest/get-started/|Redis Getting Started', 'https://www.youtube.com/watch?v=jgpVdJB2sKQ|Redis Crash Course (YouTube)', 'https://redis.io/docs/latest/develop/use/patterns/|Redis Patterns'] },

      // ── Testing ──
      { id: 'be-26', title: 'Testing (Jest & Supertest)', description: 'Write unit tests, integration tests, and API endpoint tests. Use Jest for assertions and mocking, Supertest for HTTP testing, and understand TDD/BDD methodologies for backend code.', category: 'Testing', resources: ['https://jestjs.io/docs/getting-started|Jest Documentation', 'https://github.com/ladjs/supertest|Supertest (GitHub)', 'https://www.youtube.com/watch?v=FgnxcUQ5vho|Node.js Testing (YouTube)'] },

      // ── Containerization ──
      { id: 'be-27', title: 'Docker Fundamentals', description: 'Containerize Node.js applications — Dockerfiles, images, containers, volumes, networks, docker-compose for multi-service setups, and building production-optimized Docker images.', category: 'Containerization', resources: ['https://docs.docker.com/get-started/|Docker Getting Started', 'https://www.youtube.com/watch?v=pTFZFxd4hOI|Docker Tutorial (YouTube)', 'https://docs.docker.com/compose/|Docker Compose Docs'] },

      // ── Architecture ──
      { id: 'be-28', title: 'Message Queues (RabbitMQ/Kafka)', description: 'Implement asynchronous communication — message queues, pub/sub patterns, event-driven architecture. Use RabbitMQ or Kafka for decoupling services and handling background jobs.', category: 'Architecture', resources: ['https://www.rabbitmq.com/tutorials|RabbitMQ Tutorials', 'https://kafka.apache.org/documentation/|Apache Kafka Docs', 'https://www.youtube.com/watch?v=J6CBdSCB_fY|Message Queues Explained (YouTube)'] },
      { id: 'be-29', title: 'Microservices Architecture', description: 'Design microservices — service decomposition, API gateways, inter-service communication (REST, gRPC, message queues), saga pattern for distributed transactions, and circuit breaker pattern.', category: 'Architecture', resources: ['https://microservices.io/|Microservices.io (Patterns)', 'https://www.youtube.com/watch?v=lTAcCNbJ7KE|Microservices Explained (YouTube)', 'https://12factor.net/|The Twelve-Factor App'] },

      // ── Deployment ──
      { id: 'be-30', title: 'Deployment & CI/CD', description: 'Deploy Node.js apps — PM2 process management, Nginx reverse proxy, environment variables, CI/CD with GitHub Actions, cloud deployment (Vercel, Railway, Render, AWS), and monitoring with logging.', category: 'Deployment', resources: ['https://pm2.keymetrics.io/docs/usage/quick-start/|PM2 Quick Start', 'https://docs.github.com/en/actions|GitHub Actions Documentation', 'https://www.youtube.com/watch?v=6GC95TLSWTY|Deploy Node.js App (YouTube)'] }
    ]
  },
  devops: {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Master CI/CD, containerization, and infrastructure automation',
    icon: '🔄',
    color: '#F59E0B',
    estimatedHours: 160,
    steps: [
      { id: 'do-1', title: 'Linux Fundamentals', description: 'Shell commands, file permissions, processes, networking basics.', category: 'Foundation', resources: ['Linux Journey', 'The Linux Command Line'] },
      { id: 'do-2', title: 'Networking Basics', description: 'TCP/IP, DNS, HTTP/HTTPS, load balancing, firewalls.', category: 'Foundation', resources: ['Computer Networking: A Top-Down Approach', 'Cisco Networking Academy'] },
      { id: 'do-3', title: 'Git & Version Control', description: 'Advanced Git workflows, branching strategies, GitFlow.', category: 'Tools', resources: ['Pro Git', 'GitHub Flow'] },
      { id: 'do-4', title: 'Docker', description: 'Containers, images, Dockerfile, docker-compose, registries.', category: 'Containers', resources: ['Docker Docs', 'Play with Docker'] },
      { id: 'do-5', title: 'Kubernetes', description: 'Pods, deployments, services, ingress, Helm charts.', category: 'Orchestration', resources: ['Kubernetes.io', 'Kubernetes in Action'] },
      { id: 'do-6', title: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins, GitLab CI for automated deployments.', category: 'Automation', resources: ['GitHub Actions Docs', 'Jenkins Tutorial'] },
      { id: 'do-7', title: 'Infrastructure as Code', description: 'Terraform for provisioning cloud resources declaratively.', category: 'IaC', resources: ['Terraform Docs', 'HashiCorp Learn'] },
      { id: 'do-8', title: 'Configuration Management', description: 'Ansible for server configuration and automation.', category: 'Automation', resources: ['Ansible Docs', 'Ansible for DevOps'] },
      { id: 'do-9', title: 'Monitoring & Logging', description: 'Prometheus, Grafana, ELK stack for observability.', category: 'Observability', resources: ['Prometheus Docs', 'Grafana Docs'] },
      { id: 'do-10', title: 'Cloud Platforms', description: 'AWS, GCP, or Azure fundamentals and core services.', category: 'Cloud', resources: ['AWS Training', 'Google Cloud Skills Boost'] }
    ]
  },
  cloud: {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Design and deploy scalable cloud architecture on AWS, GCP, or Azure',
    icon: '☁️',
    color: '#6366F1',
    estimatedHours: 150,
    steps: [
      { id: 'cl-1', title: 'Cloud Fundamentals', description: 'Cloud models (IaaS, PaaS, SaaS), deployment models, shared responsibility.', category: 'Foundation', resources: ['AWS Cloud Practitioner', 'Google Cloud Fundamentals'] },
      { id: 'cl-2', title: 'AWS Core Services', description: 'EC2, S3, VPC, IAM, RDS, Lambda fundamentals.', category: 'AWS', resources: ['AWS Docs', 'A Cloud Guru'] },
      { id: 'cl-3', title: 'Serverless Architecture', description: 'AWS Lambda, API Gateway, Step Functions, event-driven design.', category: 'Architecture', resources: ['Serverless Framework Docs', 'AWS SAM'] },
      { id: 'cl-4', title: 'Cloud Networking', description: 'VPCs, subnets, route tables, security groups, NAT gateways.', category: 'Networking', resources: ['AWS VPC Docs', 'Cloud Networking Course'] },
      { id: 'cl-5', title: 'Cloud Storage & Databases', description: 'S3, DynamoDB, Aurora, ElastiCache, storage classes.', category: 'Storage', resources: ['AWS Storage Docs', 'DynamoDB Guide'] },
      { id: 'cl-6', title: 'Cloud Security', description: 'IAM best practices, KMS, CloudTrail, WAF, Shield.', category: 'Security', resources: ['AWS Security Docs', 'Cloud Security Alliance'] },
      { id: 'cl-7', title: 'Cloud Architecture Patterns', description: 'Well-architected framework, microservices, event-driven architectures.', category: 'Architecture', resources: ['AWS Well-Architected', 'Cloud Design Patterns'] },
      { id: 'cl-8', title: 'Cost Optimization', description: 'Reserved instances, Spot instances, cost monitoring, right-sizing.', category: 'FinOps', resources: ['AWS Cost Management', 'FinOps Foundation'] },
      { id: 'cl-9', title: 'Cloud Certifications', description: 'AWS Solutions Architect, Google Cloud Professional, or Azure Administrator.', category: 'Certification', resources: ['AWS Cert Prep', 'Whizlabs'] }
    ]
  },
  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Learn ethical hacking, threat analysis, and defensive security practices',
    icon: '🔐',
    color: '#EF4444',
    estimatedHours: 180,
    steps: [
      { id: 'cs-1', title: 'Security Fundamentals', description: 'CIA triad, threat modeling, attack surfaces, security policies.', category: 'Foundation', resources: ['CompTIA Security+', 'Cybrary'] },
      { id: 'cs-2', title: 'Networking for Security', description: 'Protocols, packet analysis, Wireshark, network scanning.', category: 'Networking', resources: ['Practical Packet Analysis', 'Wireshark Docs'] },
      { id: 'cs-3', title: 'Linux for Security', description: 'Kali Linux, command-line tools, scripting for automation.', category: 'Tools', resources: ['Kali Linux Docs', 'OverTheWire'] },
      { id: 'cs-4', title: 'Web Application Security', description: 'OWASP Top 10, XSS, SQLi, CSRF, penetration testing basics.', category: 'Web Security', resources: ['OWASP WebGoat', 'PortSwigger Web Academy'] },
      { id: 'cs-5', title: 'Cryptography', description: 'Symmetric/asymmetric encryption, hashing, PKI, TLS/SSL.', category: 'Cryptography', resources: ['Cryptography I (Coursera)', 'Crypto101'] },
      { id: 'cs-6', title: 'Ethical Hacking', description: 'Reconnaissance, scanning, exploitation, post-exploitation methodology.', category: 'Offensive', resources: ['Hack The Box', 'TryHackMe'] },
      { id: 'cs-7', title: 'Malware Analysis', description: 'Static and dynamic analysis, reverse engineering basics, sandboxing.', category: 'Malware', resources: ['Malware Analysis Course', 'SANS FOR610'] },
      { id: 'cs-8', title: 'Incident Response', description: 'SIEM, log analysis, forensics, incident handling procedures.', category: 'Defensive', resources: ['SANS Incident Handler', 'Splunk Fundamentals'] },
      { id: 'cs-9', title: 'Cloud Security', description: 'Cloud security posture, CSPM tools, securing cloud environments.', category: 'Cloud', resources: ['AWS Security Specialty', 'CCSP Cert'] }
    ]
  },
  aiml: {
    id: 'aiml',
    title: 'AI / Machine Learning',
    description: 'Build intelligent systems with Python, ML algorithms, and deep learning',
    icon: '🤖',
    color: '#8B5CF6',
    estimatedHours: 200,
    steps: [
      { id: 'ai-1', title: 'Python for Data Science', description: 'NumPy, Pandas, Matplotlib, Seaborn for data manipulation and visualization.', category: 'Foundation', resources: ['Python for Data Analysis', 'Kaggle Python Course'] },
      { id: 'ai-2', title: 'Statistics & Math', description: 'Probability, statistics, linear algebra, and calculus for ML.', category: 'Foundation', resources: ['StatQuest', '3Blue1Brown'] },
      { id: 'ai-3', title: 'ML Fundamentals', description: 'Supervised, unsupervised learning, evaluation metrics, overfitting.', category: 'Core ML', resources: ['Hands-On ML (Aurélien Géron)', 'Coursera ML Specialization'] },
      { id: 'ai-4', title: 'Scikit-Learn', description: 'Classification, regression, clustering, pipelines, and model selection.', category: 'Libraries', resources: ['Scikit-learn Docs', 'Kaggle Courses'] },
      { id: 'ai-5', title: 'Deep Learning Basics', description: 'Neural networks, backpropagation, activation functions, CNNs, RNNs.', category: 'Deep Learning', resources: ['Deep Learning Specialization', 'fast.ai'] },
      { id: 'ai-6', title: 'PyTorch / TensorFlow', description: 'Building and training neural networks with modern DL frameworks.', category: 'Frameworks', resources: ['PyTorch Docs', 'TensorFlow Tutorials'] },
      { id: 'ai-7', title: 'Natural Language Processing', description: 'Text processing, transformers, BERT, LLMs, and NLP pipelines.', category: 'NLP', resources: ['Hugging Face Course', 'Stanford NLP'] },
      { id: 'ai-8', title: 'Computer Vision', description: 'Image classification, object detection, segmentation, GANs.', category: 'CV', resources: ['CS231n', 'PyTorch Vision'] },
      { id: 'ai-9', title: 'MLOps', description: 'Model deployment, monitoring, MLflow, feature stores, CI/CD for ML.', category: 'Production', resources: ['MLOps Zoomcamp', 'Made With ML'] },
      { id: 'ai-10', title: 'Large Language Models', description: 'Prompt engineering, fine-tuning, RAG, and building LLM applications.', category: 'Advanced', resources: ['LLM Course', 'LangChain Docs'] }
    ]
  },
  database: {
    id: 'database',
    title: 'Database Engineering',
    description: 'Design, optimize, and manage SQL and NoSQL database systems',
    icon: '🗄️',
    color: '#14B8A6',
    estimatedHours: 100,
    steps: [
      { id: 'db-1', title: 'Database Fundamentals', description: 'ACID properties, transactions, normalization, ER diagrams.', category: 'Foundation', resources: ['Database System Concepts', 'CMU Database Course'] },
      { id: 'db-2', title: 'SQL Mastery', description: 'Advanced queries, joins, subqueries, CTEs, window functions.', category: 'SQL', resources: ['SQLZoo', 'Mode SQL Tutorial'] },
      { id: 'db-3', title: 'PostgreSQL', description: 'Advanced PostgreSQL features, extensions, JSON support, full-text search.', category: 'RDBMS', resources: ['PostgreSQL Docs', 'pgexercises.com'] },
      { id: 'db-4', title: 'Database Design', description: 'Schema design, relationships, normalization forms, anti-patterns.', category: 'Design', resources: ['Database Design for Mere Mortals', 'Vertabelo Academy'] },
      { id: 'db-5', title: 'Indexing & Query Optimization', description: 'B-trees, query plans, EXPLAIN, slow query analysis.', category: 'Performance', resources: ['Use The Index, Luke', 'PostgreSQL Query Optimization'] },
      { id: 'db-6', title: 'MongoDB & NoSQL', description: 'Document modeling, aggregation pipeline, indexes, Atlas.', category: 'NoSQL', resources: ['MongoDB University', 'NoSQL Distilled'] },
      { id: 'db-7', title: 'Redis', description: 'Data structures, persistence, pub/sub, Lua scripting, clustering.', category: 'Cache', resources: ['Redis Docs', 'Redis University'] },
      { id: 'db-8', title: 'Replication & Sharding', description: 'High availability, read replicas, horizontal scaling strategies.', category: 'Scaling', resources: ['Designing Data-Intensive Applications', 'Percona Blog'] }
    ]
  },
  mobile: {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Build cross-platform mobile apps with React Native and Flutter',
    icon: '📱',
    color: '#F97316',
    estimatedHours: 130,
    steps: [
      { id: 'mob-1', title: 'Mobile App Fundamentals', description: 'App lifecycle, navigation patterns, gestures, responsive design.', category: 'Foundation', resources: ['Mobile Design Patterns', 'Google Material Design'] },
      { id: 'mob-2', title: 'React Native Basics', description: 'Components, StyleSheet, Flexbox for mobile, platform APIs.', category: 'React Native', resources: ['React Native Docs', 'Expo Docs'] },
      { id: 'mob-3', title: 'Navigation in React Native', description: 'React Navigation: stack, tab, drawer navigators.', category: 'React Native', resources: ['React Navigation Docs', 'React Native School'] },
      { id: 'mob-4', title: 'State Management for Mobile', description: 'Redux, Context API, AsyncStorage for mobile apps.', category: 'State', resources: ['Redux Docs', 'Zustand Docs'] },
      { id: 'mob-5', title: 'Native Device APIs', description: 'Camera, location, push notifications, biometrics, sensors.', category: 'Native', resources: ['Expo Modules', 'React Native Community'] },
      { id: 'mob-6', title: 'Flutter Basics', description: 'Dart language, widgets, layouts, theming in Flutter.', category: 'Flutter', resources: ['Flutter Docs', 'Dart Language Tour'] },
      { id: 'mob-7', title: 'App Publishing', description: 'App Store and Google Play submission, signing, app store optimization.', category: 'Deployment', resources: ['Apple Developer Docs', 'Google Play Academy'] },
      { id: 'mob-8', title: 'Mobile Testing', description: 'Unit tests, integration tests, E2E with Detox.', category: 'Testing', resources: ['Detox Docs', 'React Native Testing Library'] }
    ]
  },
  blockchain: {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    description: 'Develop decentralized applications and smart contracts',
    icon: '⛓️',
    color: '#EC4899',
    estimatedHours: 150,
    steps: [
      { id: 'bc-1', title: 'Blockchain Fundamentals', description: 'Distributed ledger, consensus mechanisms, cryptographic hashing.', category: 'Foundation', resources: ['Bitcoin Whitepaper', 'Blockchain Basics Coursera'] },
      { id: 'bc-2', title: 'Ethereum & EVM', description: 'Ethereum architecture, gas, wallets, transactions, Metamask.', category: 'Ethereum', resources: ['ethereum.org', 'Mastering Ethereum'] },
      { id: 'bc-3', title: 'Solidity', description: 'Smart contract language, data types, functions, events, inheritance.', category: 'Smart Contracts', resources: ['Solidity Docs', 'CryptoZombies'] },
      { id: 'bc-4', title: 'Smart Contract Development', description: 'Hardhat/Foundry, testing, deployment, contract patterns.', category: 'Development', resources: ['Hardhat Docs', 'OpenZeppelin Docs'] },
      { id: 'bc-5', title: 'DeFi Protocols', description: 'AMMs, lending protocols, yield farming, smart contract auditing basics.', category: 'DeFi', resources: ['DeFi Developer Roadmap', 'Uniswap Docs'] },
      { id: 'bc-6', title: 'Web3.js / Ethers.js', description: 'Interacting with blockchain from frontend applications.', category: 'Frontend', resources: ['Ethers.js Docs', 'Web3.js Docs'] },
      { id: 'bc-7', title: 'NFT Development', description: 'ERC-721, ERC-1155, metadata, IPFS, NFT marketplaces.', category: 'NFTs', resources: ['OpenZeppelin ERC-721', 'IPFS Docs'] }
    ]
  },
  dsa: {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master algorithmic thinking and ace technical interviews',
    icon: '📊',
    color: '#059669',
    estimatedHours: 120,
    steps: [
      { id: 'dsa-1', title: 'Big O Notation', description: 'Time and space complexity analysis, best/worst/average cases.', category: 'Foundation', resources: ['Big O Cheat Sheet', 'NeetCode'] },
      { id: 'dsa-2', title: 'Arrays & Strings', description: 'Two pointers, sliding window, array manipulation patterns.', category: 'Linear', resources: ['LeetCode Arrays', 'NeetCode 150'] },
      { id: 'dsa-3', title: 'Linked Lists', description: 'Singly/doubly linked lists, fast/slow pointers, reversal patterns.', category: 'Linear', resources: ['LeetCode Linked List', 'Visualgo'] },
      { id: 'dsa-4', title: 'Stacks & Queues', description: 'Stack patterns, monotonic stack, queue implementations.', category: 'Linear', resources: ['LeetCode Stack', 'AlgoExpert'] },
      { id: 'dsa-5', title: 'Hash Tables', description: 'Hashing, collision resolution, frequency counting patterns.', category: 'Non-Linear', resources: ['LeetCode Hash Table', 'Hash Map Internals'] },
      { id: 'dsa-6', title: 'Trees & Binary Search Trees', description: 'Traversals (BFS/DFS), BST operations, balanced trees.', category: 'Trees', resources: ['LeetCode Trees', 'Visualgo Trees'] },
      { id: 'dsa-7', title: 'Heaps & Priority Queues', description: 'Min/max heaps, k-th element problems, heap sort.', category: 'Trees', resources: ['LeetCode Heap', 'Heap Visualization'] },
      { id: 'dsa-8', title: 'Graphs', description: 'BFS, DFS, Dijkstra, topological sort, Union-Find.', category: 'Graphs', resources: ['LeetCode Graphs', 'CP Algorithms'] },
      { id: 'dsa-9', title: 'Dynamic Programming', description: 'Memoization, tabulation, common DP patterns (knapsack, LCS, etc).', category: 'Advanced', resources: ['NeetCode DP', 'DP for Interviews'] },
      { id: 'dsa-10', title: 'Sorting Algorithms', description: 'QuickSort, MergeSort, HeapSort, counting sort, and when to use each.', category: 'Sorting', resources: ['Sorting Visualizations', 'CLRS Chapter 6-8'] }
    ]
  },
  python: {
    id: 'python',
    title: 'Python Programming',
    description: 'Master Python from basics to advanced topics including web, automation, and scripting',
    icon: '🐍',
    color: '#3776AB',
    estimatedHours: 110,
    steps: [
      { id: 'py-1', title: 'Python Basics', description: 'Variables, data types, operators, input/output, and basic syntax.', category: 'Foundation', resources: ['Python Official Tutorial', 'Automate the Boring Stuff'] },
      { id: 'py-2', title: 'Control Flow & Functions', description: 'Conditionals, loops, function definitions, scope, and recursion.', category: 'Foundation', resources: ['Real Python', 'Python Crash Course'] },
      { id: 'py-3', title: 'Data Structures in Python', description: 'Lists, tuples, dictionaries, sets, comprehensions, and iterators.', category: 'Core', resources: ['Python Docs Collections', 'Corey Schafer Python'] },
      { id: 'py-4', title: 'OOP in Python', description: 'Classes, inheritance, polymorphism, dunder methods, and decorators.', category: 'Core', resources: ['Real Python OOP', 'Python OOP Tutorial'] },
      { id: 'py-5', title: 'File Handling & Modules', description: 'Reading/writing files, CSV/JSON, creating and importing modules/packages.', category: 'Intermediate', resources: ['Python File I/O Docs', 'Real Python Modules'] },
      { id: 'py-6', title: 'Error Handling & Testing', description: 'Try/except, custom exceptions, unittest, pytest, and debugging.', category: 'Intermediate', resources: ['Python Testing with pytest', 'Real Python Exceptions'] },
      { id: 'py-7', title: 'Web Development with Flask/Django', description: 'Building web apps, routing, templates, ORM, and REST APIs.', category: 'Framework', resources: ['Flask Mega Tutorial', 'Django Official Tutorial'] },
      { id: 'py-8', title: 'Automation & Scripting', description: 'Web scraping, task automation, regex, working with APIs.', category: 'Applied', resources: ['Automate the Boring Stuff', 'BeautifulSoup Docs'] },
      { id: 'py-9', title: 'Concurrency & Async', description: 'Threading, multiprocessing, asyncio, and concurrent.futures.', category: 'Advanced', resources: ['Real Python Concurrency', 'Python Asyncio Docs'] },
      { id: 'py-10', title: 'Python Best Practices', description: 'PEP 8, type hints, virtual environments, packaging, and linting.', category: 'Advanced', resources: ['PEP 8 Style Guide', 'Python Packaging Guide'] }
    ]
  },
  java: {
    id: 'java',
    title: 'Java Development',
    description: 'Build enterprise-grade applications with Java, Spring Boot, and design patterns',
    icon: '☕',
    color: '#ED8B00',
    estimatedHours: 150,
    steps: [
      { id: 'jv-1', title: 'Java Fundamentals', description: 'Syntax, data types, operators, control flow, and JVM basics.', category: 'Foundation', resources: ['Oracle Java Tutorials', 'Java Programming MOOC'] },
      { id: 'jv-2', title: 'OOP in Java', description: 'Classes, interfaces, abstract classes, inheritance, and encapsulation.', category: 'Foundation', resources: ['Head First Java', 'Baeldung OOP'] },
      { id: 'jv-3', title: 'Collections Framework', description: 'List, Set, Map, Queue, iterators, and the Collections API.', category: 'Core', resources: ['Java Collections Docs', 'Baeldung Collections'] },
      { id: 'jv-4', title: 'Exception Handling & I/O', description: 'Try-catch, custom exceptions, streams, readers, NIO, and serialization.', category: 'Core', resources: ['Oracle I/O Tutorial', 'Baeldung Exceptions'] },
      { id: 'jv-5', title: 'Multithreading & Concurrency', description: 'Threads, synchronized, ExecutorService, CompletableFuture.', category: 'Intermediate', resources: ['Java Concurrency in Practice', 'Baeldung Concurrency'] },
      { id: 'jv-6', title: 'Java 8+ Features', description: 'Lambdas, streams, Optional, functional interfaces, and records.', category: 'Intermediate', resources: ['Modern Java in Action', 'Baeldung Java 8'] },
      { id: 'jv-7', title: 'Spring Boot', description: 'Dependency injection, REST APIs, Spring Data JPA, and security.', category: 'Framework', resources: ['Spring Boot Docs', 'Baeldung Spring'] },
      { id: 'jv-8', title: 'Build Tools & Testing', description: 'Maven, Gradle, JUnit 5, Mockito, and integration testing.', category: 'Tools', resources: ['Maven Docs', 'JUnit 5 User Guide'] },
      { id: 'jv-9', title: 'Design Patterns', description: 'Singleton, Factory, Observer, Strategy, Builder, and MVC patterns.', category: 'Architecture', resources: ['Refactoring Guru', 'Head First Design Patterns'] },
      { id: 'jv-10', title: 'Microservices with Java', description: 'Spring Cloud, service discovery, API gateway, and distributed systems.', category: 'Advanced', resources: ['Spring Cloud Docs', 'Microservices with Spring Boot'] }
    ]
  },
  systemdesign: {
    id: 'systemdesign',
    title: 'System Design',
    description: 'Learn to design scalable, reliable, and efficient distributed systems',
    icon: '🏗️',
    color: '#7C3AED',
    estimatedHours: 100,
    steps: [
      { id: 'sd-1', title: 'System Design Fundamentals', description: 'Scalability, availability, consistency, latency, and throughput.', category: 'Foundation', resources: ['System Design Primer', 'Grokking System Design'] },
      { id: 'sd-2', title: 'Networking & Protocols', description: 'HTTP, TCP/UDP, WebSockets, DNS, CDNs, and load balancers.', category: 'Foundation', resources: ['High Performance Browser Networking', 'Cloudflare Learning'] },
      { id: 'sd-3', title: 'Database Design', description: 'SQL vs NoSQL, sharding, replication, indexing, and CAP theorem.', category: 'Core', resources: ['DDIA Book', 'ByteByteGo Database'] },
      { id: 'sd-4', title: 'Caching Strategies', description: 'Cache-aside, write-through, write-back, Redis, Memcached, CDN caching.', category: 'Core', resources: ['Redis Docs', 'AWS Caching Best Practices'] },
      { id: 'sd-5', title: 'Message Queues & Streaming', description: 'Kafka, RabbitMQ, event-driven architecture, pub/sub patterns.', category: 'Intermediate', resources: ['Kafka Documentation', 'RabbitMQ Tutorials'] },
      { id: 'sd-6', title: 'API Design', description: 'REST, GraphQL, gRPC, rate limiting, pagination, and versioning.', category: 'Intermediate', resources: ['API Design Patterns', 'Google API Design Guide'] },
      { id: 'sd-7', title: 'Microservices Architecture', description: 'Service decomposition, communication, saga pattern, circuit breaker.', category: 'Architecture', resources: ['Microservices.io', 'Building Microservices Book'] },
      { id: 'sd-8', title: 'Real-World System Designs', description: 'Design URL shortener, chat app, Twitter, YouTube, and ride-sharing.', category: 'Advanced', resources: ['ByteByteGo', 'System Design Interview Book'] }
    ]
  },
  reactadvanced: {
    id: 'reactadvanced',
    title: 'React.js Advanced',
    description: 'Deep dive into React patterns, performance, and production-grade applications',
    icon: '⚛️',
    color: '#61DAFB',
    estimatedHours: 90,
    steps: [
      { id: 'ra-1', title: 'React Hooks Deep Dive', description: 'useState, useEffect, useRef, useMemo, useCallback, and custom hooks.', category: 'Foundation', resources: ['React Hooks Docs', 'Epic React by Kent C. Dodds'] },
      { id: 'ra-2', title: 'Component Patterns', description: 'Compound components, render props, HOCs, and controlled vs uncontrolled.', category: 'Core', resources: ['React Patterns', 'Advanced React Patterns'] },
      { id: 'ra-3', title: 'State Management', description: 'Context API, Redux Toolkit, Zustand, Jotai, and when to use each.', category: 'Core', resources: ['Redux Toolkit Docs', 'Zustand GitHub'] },
      { id: 'ra-4', title: 'React Router & Navigation', description: 'Dynamic routes, nested layouts, route guards, and lazy loading.', category: 'Intermediate', resources: ['React Router Docs', 'UI.dev React Router'] },
      { id: 'ra-5', title: 'Performance Optimization', description: 'React.memo, virtualization, code splitting, Suspense, and profiling.', category: 'Intermediate', resources: ['React Performance Docs', 'Web.dev React'] },
      { id: 'ra-6', title: 'Server-Side Rendering', description: 'Next.js fundamentals, SSR vs SSG, ISR, and API routes.', category: 'Framework', resources: ['Next.js Docs', 'Vercel Blog'] },
      { id: 'ra-7', title: 'Testing React Apps', description: 'React Testing Library, Jest, Cypress, and testing best practices.', category: 'Quality', resources: ['Testing Library Docs', 'Kent C. Dodds Testing'] },
      { id: 'ra-8', title: 'Production Deployment', description: 'CI/CD, environment configs, monitoring, error boundaries, and analytics.', category: 'Advanced', resources: ['Vercel Deployment Docs', 'Sentry React'] }
    ]
  },
  typescript: {
    id: 'typescript',
    title: 'TypeScript Mastery',
    description: 'Add type safety to JavaScript with TypeScript for robust applications',
    icon: '🔷',
    color: '#3178C6',
    estimatedHours: 80,
    steps: [
      { id: 'ts-1', title: 'TypeScript Basics', description: 'Type annotations, primitives, arrays, tuples, enums, and type inference.', category: 'Foundation', resources: ['TypeScript Handbook', 'TypeScript in 5 Minutes'] },
      { id: 'ts-2', title: 'Interfaces & Type Aliases', description: 'Object shapes, optional properties, readonly, extending interfaces.', category: 'Foundation', resources: ['TypeScript Docs Interfaces', 'Total TypeScript'] },
      { id: 'ts-3', title: 'Functions & Generics', description: 'Function types, overloads, generic functions, constraints, and utility types.', category: 'Core', resources: ['TypeScript Generics Docs', 'Matt Pocock TypeScript'] },
      { id: 'ts-4', title: 'Advanced Types', description: 'Union, intersection, conditional types, mapped types, and template literals.', category: 'Core', resources: ['TypeScript Advanced Types', 'Type Challenges'] },
      { id: 'ts-5', title: 'Classes & OOP', description: 'Access modifiers, abstract classes, decorators, and mixins.', category: 'Intermediate', resources: ['TypeScript Classes Docs', 'TypeScript Deep Dive'] },
      { id: 'ts-6', title: 'TypeScript with React', description: 'Typing props, hooks, events, context, and generic components.', category: 'Framework', resources: ['React TypeScript Cheatsheet', 'Total TypeScript React'] },
      { id: 'ts-7', title: 'TypeScript with Node.js', description: 'Express typing, Prisma ORM, environment configs, and monorepos.', category: 'Framework', resources: ['TypeScript Node Starter', 'Prisma Docs'] },
      { id: 'ts-8', title: 'TypeScript Best Practices', description: 'Strict mode, linting, declaration files, and migration strategies.', category: 'Advanced', resources: ['Effective TypeScript Book', 'TypeScript ESLint'] }
    ]
  },
  gamedev: {
    id: 'gamedev',
    title: 'Game Development',
    description: 'Create 2D and 3D games using modern engines and programming concepts',
    icon: '🎮',
    color: '#E91E63',
    estimatedHours: 160,
    steps: [
      { id: 'gd-1', title: 'Game Design Fundamentals', description: 'Game loops, mechanics, level design, player experience, and prototyping.', category: 'Foundation', resources: ['Game Design Workshop Book', 'Extra Credits YouTube'] },
      { id: 'gd-2', title: 'Programming for Games', description: 'C# or C++ basics, OOP, vectors, math for games, and physics.', category: 'Foundation', resources: ['Game Programming Patterns', 'C# Yellow Book'] },
      { id: 'gd-3', title: 'Unity Engine Basics', description: 'Scene management, GameObjects, components, prefabs, and the editor.', category: 'Engine', resources: ['Unity Learn', 'Brackeys YouTube'] },
      { id: 'gd-4', title: '2D Game Development', description: 'Sprites, tilesmaps, 2D physics, animations, and camera systems.', category: 'Core', resources: ['Unity 2D Docs', 'Heartbeast YouTube'] },
      { id: 'gd-5', title: '3D Game Development', description: '3D modeling basics, lighting, materials, terrain, and 3D physics.', category: 'Core', resources: ['Unity 3D Tutorials', 'Blender Guru'] },
      { id: 'gd-6', title: 'Game AI', description: 'Pathfinding, state machines, behavior trees, and NPC decision-making.', category: 'Intermediate', resources: ['AI for Games Book', 'Unity AI Docs'] },
      { id: 'gd-7', title: 'Multiplayer & Networking', description: 'Client-server model, netcode, synchronization, and lobby systems.', category: 'Advanced', resources: ['Unity Netcode Docs', 'Gabriel Gambetta Networking'] },
      { id: 'gd-8', title: 'Publishing Your Game', description: 'Optimization, platform builds, Steam/itch.io publishing, and marketing.', category: 'Deployment', resources: ['Steamworks Docs', 'itch.io Creator Docs'] }
    ]
  },
  uiux: {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Design intuitive, beautiful user interfaces and seamless user experiences',
    icon: '🎨',
    color: '#FF6B6B',
    estimatedHours: 100,
    steps: [
      { id: 'ux-1', title: 'Design Thinking', description: 'Empathize, define, ideate, prototype, and test methodology.', category: 'Foundation', resources: ['IDEO Design Thinking', 'Stanford d.school'] },
      { id: 'ux-2', title: 'User Research', description: 'Interviews, surveys, personas, user journeys, and usability testing.', category: 'Foundation', resources: ['Just Enough Research', 'Nielsen Norman Group'] },
      { id: 'ux-3', title: 'Information Architecture', description: 'Site maps, navigation patterns, card sorting, and content strategy.', category: 'Core', resources: ['IA for the Web', 'NNGroup IA Articles'] },
      { id: 'ux-4', title: 'Wireframing & Prototyping', description: 'Low and high fidelity wireframes, interactive prototypes with Figma.', category: 'Core', resources: ['Figma Tutorial', 'Balsamiq Wireframing'] },
      { id: 'ux-5', title: 'Visual Design Principles', description: 'Typography, color theory, spacing, hierarchy, and grid systems.', category: 'Visual', resources: ['Refactoring UI', 'Material Design Guidelines'] },
      { id: 'ux-6', title: 'Design Systems', description: 'Component libraries, tokens, style guides, and documentation.', category: 'Visual', resources: ['Design Systems Book', 'Storybook Docs'] },
      { id: 'ux-7', title: 'Interaction Design', description: 'Micro-interactions, animations, transitions, and gesture-based design.', category: 'Intermediate', resources: ['Microinteractions Book', 'LottieFiles'] },
      { id: 'ux-8', title: 'Accessibility (a11y)', description: 'WCAG guidelines, screen readers, keyboard navigation, and ARIA roles.', category: 'Advanced', resources: ['WebAIM', 'A11y Project'] }
    ]
  },
  dataengineering: {
    id: 'dataengineering',
    title: 'Data Engineering',
    description: 'Build and manage data pipelines, warehouses, and ETL processes at scale',
    icon: '🔧',
    color: '#00BCD4',
    estimatedHours: 140,
    steps: [
      { id: 'de-1', title: 'Data Engineering Fundamentals', description: 'Data lifecycle, batch vs streaming, data quality, and governance.', category: 'Foundation', resources: ['Fundamentals of Data Engineering', 'DataTalks Club'] },
      { id: 'de-2', title: 'SQL & Data Modeling', description: 'Advanced SQL, dimensional modeling, star/snowflake schemas, and normalization.', category: 'Foundation', resources: ['The Data Warehouse Toolkit', 'Mode SQL Tutorial'] },
      { id: 'de-3', title: 'Python for Data Engineering', description: 'Pandas, data manipulation, scripting, and API integrations.', category: 'Core', resources: ['Python for Data Analysis', 'Real Python Data'] },
      { id: 'de-4', title: 'ETL/ELT Pipelines', description: 'Extract, transform, load patterns, Airflow, dbt, and scheduling.', category: 'Core', resources: ['Apache Airflow Docs', 'dbt Documentation'] },
      { id: 'de-5', title: 'Apache Spark', description: 'Distributed computing, RDDs, DataFrames, SparkSQL, and PySpark.', category: 'Big Data', resources: ['Spark Official Docs', 'Learning Spark Book'] },
      { id: 'de-6', title: 'Data Warehousing', description: 'Snowflake, BigQuery, Redshift, data lakes, and lakehouse architecture.', category: 'Big Data', resources: ['Snowflake Docs', 'Google BigQuery Docs'] },
      { id: 'de-7', title: 'Stream Processing', description: 'Apache Kafka, Flink, real-time pipelines, and event-driven data.', category: 'Streaming', resources: ['Kafka Documentation', 'Flink Docs'] },
      { id: 'de-8', title: 'Data Orchestration & Monitoring', description: 'Airflow DAGs, Prefect, data observability, and pipeline monitoring.', category: 'Advanced', resources: ['Prefect Docs', 'Monte Carlo Data'] }
    ]
  },
  linuxadmin: {
    id: 'linuxadmin',
    title: 'Linux Administration',
    description: 'Master Linux server management, shell scripting, and system administration',
    icon: '🐧',
    color: '#FCC624',
    estimatedHours: 120,
    steps: [
      { id: 'la-1', title: 'Linux Fundamentals', description: 'File system hierarchy, basic commands, man pages, and shell navigation.', category: 'Foundation', resources: ['Linux Journey', 'The Linux Command Line Book'] },
      { id: 'la-2', title: 'Users, Groups & Permissions', description: 'User management, file permissions, sudo, ACLs, and ownership.', category: 'Foundation', resources: ['Linux Permissions Guide', 'DigitalOcean Linux Basics'] },
      { id: 'la-3', title: 'Shell Scripting (Bash)', description: 'Variables, loops, conditionals, functions, and automation scripts.', category: 'Core', resources: ['Bash Scripting Guide', 'ShellCheck'] },
      { id: 'la-4', title: 'Package Management', description: 'apt, yum/dnf, compiling from source, and managing repositories.', category: 'Core', resources: ['Ubuntu Package Guide', 'Fedora DNF Docs'] },
      { id: 'la-5', title: 'Networking in Linux', description: 'IP configuration, iptables, firewalld, SSH, DNS, and troubleshooting.', category: 'Networking', resources: ['Linux Networking Docs', 'DigitalOcean Networking'] },
      { id: 'la-6', title: 'Process & Service Management', description: 'systemd, cron jobs, process monitoring, top/htop, and logs.', category: 'Intermediate', resources: ['systemd Documentation', 'Linux Process Management'] },
      { id: 'la-7', title: 'Storage & File Systems', description: 'Disk partitioning, LVM, RAID, NFS, and backup strategies.', category: 'Storage', resources: ['Linux Storage Guide', 'Red Hat Storage Docs'] },
      { id: 'la-8', title: 'Security Hardening', description: 'SELinux, AppArmor, SSH hardening, audit logs, and CIS benchmarks.', category: 'Security', resources: ['CIS Benchmarks', 'Linux Security HOWTO'] },
      { id: 'la-9', title: 'Server Administration', description: 'Web servers (Nginx/Apache), database servers, load balancing, and HA.', category: 'Advanced', resources: ['Nginx Docs', 'Apache HTTP Server Docs'] }
    ]
  },
  apidesign: {
    id: 'apidesign',
    title: 'API Design & Development',
    description: 'Design, build, document, and secure production-grade APIs',
    icon: '🔌',
    color: '#4CAF50',
    estimatedHours: 90,
    steps: [
      { id: 'api-1', title: 'API Fundamentals', description: 'What is an API, HTTP methods, status codes, headers, and request lifecycle.', category: 'Foundation', resources: ['MDN HTTP Guide', 'RESTful Web APIs Book'] },
      { id: 'api-2', title: 'RESTful API Design', description: 'Resource naming, CRUD operations, HATEOAS, and Richardson Maturity Model.', category: 'Foundation', resources: ['REST API Tutorial', 'Microsoft REST Guidelines'] },
      { id: 'api-3', title: 'Authentication & Authorization', description: 'API keys, OAuth 2.0, JWT, session tokens, and RBAC.', category: 'Security', resources: ['OAuth.net', 'Auth0 Docs'] },
      { id: 'api-4', title: 'API Documentation', description: 'OpenAPI/Swagger, Postman collections, and developer portal best practices.', category: 'Core', resources: ['Swagger Docs', 'Postman Learning Center'] },
      { id: 'api-5', title: 'GraphQL', description: 'Schema definition, queries, mutations, subscriptions, and Apollo Server.', category: 'Core', resources: ['GraphQL.org Learn', 'Apollo Docs'] },
      { id: 'api-6', title: 'Rate Limiting & Caching', description: 'Throttling, API quotas, HTTP caching, ETags, and CDN integration.', category: 'Performance', resources: ['Cloudflare Rate Limiting', 'HTTP Caching MDN'] },
      { id: 'api-7', title: 'API Testing', description: 'Unit tests, integration tests, contract testing, and load testing.', category: 'Quality', resources: ['Postman Testing', 'Pact Contract Testing'] },
      { id: 'api-8', title: 'API Gateway & Versioning', description: 'API gateways, versioning strategies, deprecation, and monitoring.', category: 'Advanced', resources: ['Kong Gateway Docs', 'AWS API Gateway'] }
    ]
  }
};

module.exports = roadmaps;
