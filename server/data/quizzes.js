const quizzes = {
  frontend: [
    { id: 'q1', question: 'Which HTML tag is used for the largest heading?', options: ['<h6>', '<h1>', '<header>', '<title>'], correct: 1 },
    { id: 'q2', question: 'Which CSS property controls the text size?', options: ['font-weight', 'text-size', 'font-size', 'text-style'], correct: 2 },
    { id: 'q3', question: 'What does the "C" in CSS stand for?', options: ['Computer', 'Cascading', 'Creative', 'Compiled'], correct: 1 },
    { id: 'q4', question: 'Which method is used to add an element to the end of an array in JavaScript?', options: ['push()', 'pop()', 'shift()', 'append()'], correct: 0 },
    { id: 'q5', question: 'What is a React hook?', options: ['A lifecycle class method', 'A function that lets you use state in functional components', 'A type of component', 'An event listener'], correct: 1 },
    { id: 'q6', question: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JSON XML'], correct: 0 },
    { id: 'q7', question: 'Which hook is used for side effects in React?', options: ['useState', 'useCallback', 'useEffect', 'useMemo'], correct: 2 },
    { id: 'q8', question: 'What is the virtual DOM?', options: ['A real browser DOM', 'A lightweight copy of the actual DOM', 'A CSS framework', 'A state management tool'], correct: 1 },
    { id: 'q9', question: 'Which CSS layout model is best for one-dimensional layouts?', options: ['Grid', 'Flexbox', 'Float', 'Position'], correct: 1 },
    { id: 'q10', question: 'What does "async/await" replace in JavaScript?', options: ['Callbacks and Promises', 'Only Callbacks', 'For loops', 'Event listeners'], correct: 0 }
  ],
  backend: [
    { id: 'q1', question: 'What does REST stand for?', options: ['Remote Execution Standard Technology', 'Representational State Transfer', 'Real-time Event State Transfer', 'Request/Response State Transport'], correct: 1 },
    { id: 'q2', question: 'Which HTTP status code means "Not Found"?', options: ['200', '301', '401', '404'], correct: 3 },
    { id: 'q3', question: 'What is middleware in Express.js?', options: ['A database layer', 'Functions that execute between request and response', 'A routing mechanism', 'A templating engine'], correct: 1 },
    { id: 'q4', question: 'What does JWT stand for?', options: ['JavaScript Web Token', 'JSON Web Token', 'Java Web Transfer', 'JSON Worker Thread'], correct: 1 },
    { id: 'q5', question: 'Which database is MongoDB?', options: ['Relational', 'Document-oriented NoSQL', 'Graph', 'Key-value store'], correct: 1 },
    { id: 'q6', question: 'What HTTP method should be used to update a resource?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct: 2 },
    { id: 'q7', question: 'What is bcrypt used for?', options: ['Compressing files', 'Hashing passwords', 'Generating JWT tokens', 'Database encryption'], correct: 1 },
    { id: 'q8', question: 'What is an ORM?', options: ['Object Relational Mapping', 'Online Resource Manager', 'Open Route Middleware', 'Optimized Request Model'], correct: 0 },
    { id: 'q9', question: 'Which port does MongoDB use by default?', options: ['3000', '5432', '27017', '6379'], correct: 2 },
    { id: 'q10', question: 'What is CORS?', options: ['Cross-Origin Resource Sharing', 'Centralized Object Routing System', 'Client-side Object Resolution', 'Cross-Origin Route Security'], correct: 0 }
  ],
  devops: [
    { id: 'q1', question: 'What is a Docker container?', options: ['A virtual machine', 'A lightweight isolated runtime environment', 'A cloud server', 'A build tool'], correct: 1 },
    { id: 'q2', question: 'What does CI/CD stand for?', options: ['Code Integration/Code Delivery', 'Continuous Integration/Continuous Deployment', 'Container Image/Container Deployment', 'Cloud Infrastructure/Cloud Delivery'], correct: 1 },
    { id: 'q3', question: 'What is Kubernetes primarily used for?', options: ['Container orchestration', 'Writing Dockerfiles', 'Load balancing only', 'Database management'], correct: 0 },
    { id: 'q4', question: 'What is Infrastructure as Code (IaC)?', options: ['Writing application code', 'Managing infrastructure through configuration files', 'Container build scripts', 'Cloud pricing models'], correct: 1 },
    { id: 'q5', question: 'Which tool is used for IaC in cloud environments?', options: ['Docker', 'Ansible', 'Terraform', 'Jenkins'], correct: 2 },
    { id: 'q6', question: 'What is a Kubernetes Pod?', options: ['A Docker image', 'The smallest deployable unit in K8s', 'A namespace', 'A service type'], correct: 1 },
    { id: 'q7', question: 'What command starts a Docker container?', options: ['docker build', 'docker run', 'docker start-container', 'docker exec'], correct: 1 },
    { id: 'q8', question: 'What is a load balancer?', options: ['A server that stores logs', 'Distributes traffic across multiple servers', 'A monitoring tool', 'A CI/CD tool'], correct: 1 }
  ],
  cloud: [
    { id: 'q1', question: 'What does S3 stand for in AWS?', options: ['Simple Server Storage', 'Simple Storage Service', 'Scalable Storage System', 'Structured Storage Service'], correct: 1 },
    { id: 'q2', question: 'What is a VPC in AWS?', options: ['Virtual Private Computer', 'Virtual Private Cloud', 'Volume Processing Center', 'Verified Private Container'], correct: 1 },
    { id: 'q3', question: 'What is AWS Lambda?', options: ['A container service', 'A serverless compute service', 'A database service', 'A networking tool'], correct: 1 },
    { id: 'q4', question: 'What is the cloud computing model where the vendor manages everything except applications?', options: ['IaaS', 'PaaS', 'SaaS', 'FaaS'], correct: 1 },
    { id: 'q5', question: 'What is IAM in AWS?', options: ['Infrastructure and Monitoring', 'Identity and Access Management', 'Instance Auto Manager', 'Integration API Module'], correct: 1 },
    { id: 'q6', question: 'Which service is used for DNS in AWS?', options: ['CloudFront', 'Route 53', 'EC2', 'ELB'], correct: 1 },
    { id: 'q7', question: 'What is auto-scaling?', options: ['Automatically backing up data', 'Adjusting compute resources based on demand', 'Auto-patching servers', 'Automatic billing adjustment'], correct: 1 }
  ],
  cybersecurity: [
    { id: 'q1', question: 'What does CIA stand for in cybersecurity?', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer Incident Analysis', 'Critical Infrastructure Assessment'], correct: 1 },
    { id: 'q2', question: 'What is SQL injection?', options: ['A database migration technique', 'Inserting malicious SQL code into queries', 'A SQL optimization method', 'A backup strategy'], correct: 1 },
    { id: 'q3', question: 'What is a zero-day vulnerability?', options: ['A vulnerability with no impact', 'An unknown vulnerability with no available patch', 'A vulnerability fixed on day zero', 'A low-severity bug'], correct: 1 },
    { id: 'q4', question: 'What does HTTPS ensure?', options: ['Faster page loading', 'Encrypted communication between client and server', 'Better SEO ranking only', 'Authentication only'], correct: 1 },
    { id: 'q5', question: 'What is phishing?', options: ['Network scanning', 'Social engineering to trick users into revealing information', 'A type of malware', 'A firewall bypass technique'], correct: 1 },
    { id: 'q6', question: 'What is a firewall?', options: ['An antivirus program', 'A network security system that monitors and controls traffic', 'A VPN service', 'An intrusion detection tool'], correct: 1 },
    { id: 'q7', question: 'What is two-factor authentication (2FA)?', options: ['Using two passwords', 'Verification using two different authentication factors', 'Logging in twice', 'Two-step email verification only'], correct: 1 }
  ],
  aiml: [
    { id: 'q1', question: 'What is overfitting in machine learning?', options: ['When a model performs too slowly', 'When a model learns training data too well and fails on new data', 'When training data is too large', 'When accuracy is too high'], correct: 1 },
    { id: 'q2', question: 'What is a neural network?', options: ['A computer network', 'A system inspired by the brain with layers of connected nodes', 'A type of database', 'A statistical formula'], correct: 1 },
    { id: 'q3', question: 'What does gradient descent do?', options: ['Increases model accuracy instantly', 'Minimizes loss by adjusting model parameters', 'Downloads training data', 'Visualizes model predictions'], correct: 1 },
    { id: 'q4', question: 'What is supervised learning?', options: ['Learning with labeled data', 'Learning without any data', 'Unsupervised learning with feedback', 'Reinforcement learning with supervision'], correct: 0 },
    { id: 'q5', question: 'What is a transformer model?', options: ['A type of CNN', 'An attention-based architecture for sequences', 'A hardware accelerator', 'A data preprocessing method'], correct: 1 },
    { id: 'q6', question: 'What is cross-validation?', options: ['Validating across multiple datasets', 'A technique to evaluate model performance on different data splits', 'Comparing two models', 'A training optimization method'], correct: 1 },
    { id: 'q7', question: 'What library is commonly used for ML in Python?', options: ['NumPy', 'Scikit-learn', 'Pandas', 'Matplotlib'], correct: 1 }
  ],
  database: [
    { id: 'q1', question: 'What does ACID stand for in databases?', options: ['Array, Column, Index, Data', 'Atomicity, Consistency, Isolation, Durability', 'Access, Create, Insert, Delete', 'Async, Consistent, Integrated, Durable'], correct: 1 },
    { id: 'q2', question: 'What is a primary key?', options: ['A password for database access', 'A unique identifier for each row in a table', 'The first column in a table', 'The most important table'], correct: 1 },
    { id: 'q3', question: 'What is a JOIN in SQL?', options: ['Combining two databases', 'Linking rows from two or more tables', 'Creating a new table', 'A type of index'], correct: 1 },
    { id: 'q4', question: 'What is database normalization?', options: ['Optimizing query speed', 'Organizing data to reduce redundancy', 'Backing up the database', 'Converting data types'], correct: 1 },
    { id: 'q5', question: 'What is an index in a database?', options: ['The first table in a database', 'A data structure that speeds up data retrieval', 'A list of all tables', 'A foreign key constraint'], correct: 1 },
    { id: 'q6', question: 'What is the difference between SQL and NoSQL?', options: ['SQL is newer', 'SQL uses structured tables; NoSQL uses flexible schemas', 'NoSQL is always faster', 'SQL is only for small databases'], correct: 1 }
  ],
  mobile: [
    { id: 'q1', question: 'What is React Native?', options: ['A CSS framework for mobile', 'A framework for building native mobile apps with React', 'A native Android SDK', 'An iOS development tool'], correct: 1 },
    { id: 'q2', question: 'What does Expo simplify in React Native?', options: ['State management', 'Development setup and native module access', 'CSS styling', 'Database connections'], correct: 1 },
    { id: 'q3', question: 'What is the equivalent of div in React Native?', options: ['Container', 'View', 'Box', 'Section'], correct: 1 },
    { id: 'q4', question: 'How does React Native differ from React?', options: ['No JavaScript in React Native', 'React Native renders native components; React renders HTML', 'React Native is slower', 'No JSX in React Native'], correct: 1 },
    { id: 'q5', question: 'What is AsyncStorage used for?', options: ['API calls', 'Persisting key-value data locally on device', 'State management', 'Async functions'], correct: 1 }
  ],
  blockchain: [
    { id: 'q1', question: 'What is a smart contract?', options: ['A legal contract stored digitally', 'Self-executing code on a blockchain', 'A type of cryptocurrency', 'An NFT standard'], correct: 1 },
    { id: 'q2', question: 'What is Solidity?', options: ['A cryptocurrency', 'A programming language for Ethereum smart contracts', 'A consensus algorithm', 'A blockchain wallet'], correct: 1 },
    { id: 'q3', question: 'What is gas in Ethereum?', options: ['Fuel for mining rigs', 'The fee required to execute transactions on Ethereum', 'A token standard', 'The Ether currency unit'], correct: 1 },
    { id: 'q4', question: 'What is a blockchain?', options: ['A type of database', 'A distributed, immutable ledger of transactions', 'A private server', 'An encryption algorithm'], correct: 1 },
    { id: 'q5', question: 'What is an NFT?', options: ['Non-Fungible Token — a unique digital asset', 'New Financial Technology', 'Network File Transfer', 'Node Function Token'], correct: 0 }
  ],
  dsa: [
    { id: 'q1', question: 'What is Big O notation?', options: ['A sorting algorithm', 'A way to describe algorithm time/space complexity', 'A data structure', 'A debugging method'], correct: 1 },
    { id: 'q2', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2 },
    { id: 'q3', question: 'What data structure uses LIFO order?', options: ['Queue', 'Stack', 'Linked List', 'Heap'], correct: 1 },
    { id: 'q4', question: 'What is a hash table?', options: ['A sorted array', 'A data structure mapping keys to values', 'A tree data structure', 'A graph representation'], correct: 1 },
    { id: 'q5', question: 'What is dynamic programming?', options: ['Writing dynamic code', 'Breaking problems into overlapping subproblems and caching solutions', 'A programming language paradigm', 'A runtime optimization'], correct: 1 },
    { id: 'q6', question: 'What is BFS in graphs?', options: ['Breadth-First Search — explores level by level', 'Backward First Search', 'Binary First Scan', 'Block Flow Search'], correct: 0 },
    { id: 'q7', question: 'Which sorting algorithm has O(n log n) average complexity?', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'], correct: 2 }
  ],
  python: [
    { id: 'q1', question: 'What is the output of print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0 },
    { id: 'q2', question: 'Which keyword is used to define a function in Python?', options: ['function', 'func', 'def', 'lambda'], correct: 2 },
    { id: 'q3', question: 'What does "self" refer to in a Python class?', options: ['The module', 'The current instance of the class', 'A global variable', 'The parent class'], correct: 1 },
    { id: 'q4', question: 'Which data structure is immutable in Python?', options: ['List', 'Dictionary', 'Set', 'Tuple'], correct: 3 },
    { id: 'q5', question: 'What is a list comprehension?', options: ['A way to sort lists', 'A concise way to create lists from expressions', 'A type of loop', 'A debugging tool'], correct: 1 },
    { id: 'q6', question: 'What does pip install do?', options: ['Compiles Python code', 'Installs Python packages from PyPI', 'Creates virtual environments', 'Runs Python scripts'], correct: 1 },
    { id: 'q7', question: 'What is a decorator in Python?', options: ['A CSS class', 'A function that modifies the behavior of another function', 'A type annotation', 'A design pattern only'], correct: 1 }
  ],
  java: [
    { id: 'q1', question: 'What is the JVM?', options: ['Java Visual Machine', 'Java Virtual Machine — runs Java bytecode', 'Java Version Manager', 'Java Variable Module'], correct: 1 },
    { id: 'q2', question: 'Which keyword prevents a class from being inherited?', options: ['static', 'abstract', 'final', 'private'], correct: 2 },
    { id: 'q3', question: 'What is the difference between == and .equals() in Java?', options: ['No difference', '== compares references; .equals() compares values', '== is faster', '.equals() only works with strings'], correct: 1 },
    { id: 'q4', question: 'What is an interface in Java?', options: ['A class with only private methods', 'A contract that defines method signatures without implementations', 'A type of variable', 'A GUI component'], correct: 1 },
    { id: 'q5', question: 'What is Spring Boot?', options: ['A Java compiler', 'A framework for building production-ready Java apps with auto-configuration', 'An IDE for Java', 'A testing library'], correct: 1 },
    { id: 'q6', question: 'What is garbage collection in Java?', options: ['Deleting source files', 'Automatic memory management that reclaims unused objects', 'Removing unused imports', 'Clearing the console'], correct: 1 },
    { id: 'q7', question: 'What are generics in Java?', options: ['Generic classes with no functionality', 'Type parameters that enable type-safe collections and methods', 'A design pattern', 'A way to bypass type checking'], correct: 1 }
  ],
  systemdesign: [
    { id: 'q1', question: 'What is horizontal scaling?', options: ['Adding more power to a single server', 'Adding more servers to handle load', 'Reducing server count', 'Upgrading the database'], correct: 1 },
    { id: 'q2', question: 'What is the CAP theorem?', options: ['A security protocol', 'States a distributed system can only guarantee 2 of 3: Consistency, Availability, Partition tolerance', 'A caching strategy', 'A load balancing algorithm'], correct: 1 },
    { id: 'q3', question: 'What is a CDN?', options: ['Central Database Network', 'Content Delivery Network — caches content geographically close to users', 'Cloud Deployment Node', 'Container Distribution Network'], correct: 1 },
    { id: 'q4', question: 'What is database sharding?', options: ['Backing up data', 'Splitting a database into smaller pieces across multiple servers', 'Encrypting data', 'Normalizing tables'], correct: 1 },
    { id: 'q5', question: 'What is an API gateway?', options: ['A firewall', 'A single entry point that routes requests to appropriate microservices', 'A database proxy', 'A load balancer only'], correct: 1 },
    { id: 'q6', question: 'What is eventual consistency?', options: ['Data is always consistent', 'All nodes will eventually have the same data, but not immediately', 'Data is never consistent', 'A backup strategy'], correct: 1 },
    { id: 'q7', question: 'What pattern is used for reliable distributed transactions?', options: ['Singleton', 'Saga pattern', 'Factory pattern', 'Observer pattern'], correct: 1 }
  ],
  reactadvanced: [
    { id: 'q1', question: 'What does useMemo do?', options: ['Creates a new component', 'Memoizes a computed value to avoid expensive recalculations', 'Manages global state', 'Handles side effects'], correct: 1 },
    { id: 'q2', question: 'What is React.lazy used for?', options: ['Making components slow', 'Code splitting — loading components on demand', 'Lazy state updates', 'Debouncing events'], correct: 1 },
    { id: 'q3', question: 'What is a Higher-Order Component (HOC)?', options: ['A component at the top of the tree', 'A function that takes a component and returns an enhanced component', 'A CSS wrapper', 'A routing component'], correct: 1 },
    { id: 'q4', question: 'What is the purpose of useCallback?', options: ['To make callbacks faster', 'To memoize a function reference to prevent unnecessary re-renders', 'To handle errors in callbacks', 'To debounce function calls'], correct: 1 },
    { id: 'q5', question: 'What is SSR in Next.js?', options: ['Single Source Rendering', 'Server-Side Rendering — HTML is generated on the server per request', 'Static Site Routing', 'Secure Socket Rendering'], correct: 1 },
    { id: 'q6', question: 'What is React Suspense?', options: ['A loading state manager', 'A component that shows fallback content while waiting for async operations', 'An error boundary', 'A performance tool'], correct: 1 },
    { id: 'q7', question: 'What is the Context API used for?', options: ['Routing', 'Sharing state across components without prop drilling', 'Styling components', 'Making API calls'], correct: 1 }
  ],
  typescript: [
    { id: 'q1', question: 'What is TypeScript?', options: ['A new programming language', 'A typed superset of JavaScript that compiles to plain JS', 'A JavaScript framework', 'A testing tool'], correct: 1 },
    { id: 'q2', question: 'What is a union type?', options: ['A type that combines two objects', 'A type that can be one of several types (e.g., string | number)', 'A CSS type', 'An array type'], correct: 1 },
    { id: 'q3', question: 'What is the "any" type?', options: ['A strict type', 'A type that disables type checking for a variable', 'An error type', 'A null type'], correct: 1 },
    { id: 'q4', question: 'What are generics in TypeScript?', options: ['Generic functions without types', 'Reusable components that work with multiple types while maintaining type safety', 'A way to ignore types', 'A CSS feature'], correct: 1 },
    { id: 'q5', question: 'What is the difference between interface and type?', options: ['No difference', 'Interfaces can be extended/merged; type aliases are more flexible with unions', 'Types are faster', 'Interfaces are deprecated'], correct: 1 },
    { id: 'q6', question: 'What does "readonly" do?', options: ['Makes a variable global', 'Prevents a property from being modified after initialization', 'Makes it private', 'Adds encryption'], correct: 1 },
    { id: 'q7', question: 'What is type narrowing?', options: ['Making types smaller', 'Refining a broader type to a more specific type using type guards', 'Removing types', 'Converting types'], correct: 1 }
  ],
  gamedev: [
    { id: 'q1', question: 'What is a game loop?', options: ['A type of level', 'The continuous cycle of input, update, and render that drives a game', 'A scoring system', 'A multiplayer protocol'], correct: 1 },
    { id: 'q2', question: 'What is Unity?', options: ['A programming language', 'A cross-platform game engine for 2D and 3D development', 'A graphics card', 'A music tool'], correct: 1 },
    { id: 'q3', question: 'What is a sprite in 2D games?', options: ['A sound effect', 'A 2D image or animation used for game characters/objects', 'A type of shader', 'A physics engine'], correct: 1 },
    { id: 'q4', question: 'What is a collider in game physics?', options: ['A rendering component', 'A component that defines the shape for physics collision detection', 'A camera type', 'A lighting effect'], correct: 1 },
    { id: 'q5', question: 'What is pathfinding in game AI?', options: ['Finding file paths', 'An algorithm for finding the optimal route between two points', 'A rendering technique', 'A networking protocol'], correct: 1 },
    { id: 'q6', question: 'What is a prefab in Unity?', options: ['A script file', 'A reusable template for GameObjects with preconfigured components', 'A texture format', 'An audio clip'], correct: 1 }
  ],
  uiux: [
    { id: 'q1', question: 'What is the difference between UI and UX?', options: ['They are the same', 'UI is visual design; UX is the overall user experience and journey', 'UI is for mobile; UX is for web', 'UX is newer than UI'], correct: 1 },
    { id: 'q2', question: 'What is a wireframe?', options: ['A finished design', 'A low-fidelity blueprint showing layout and structure', 'A type of animation', 'A coding framework'], correct: 1 },
    { id: 'q3', question: 'What is a user persona?', options: ['A real user profile', 'A fictional character representing a target user group', 'A login avatar', 'A social media profile'], correct: 1 },
    { id: 'q4', question: 'What does WCAG stand for?', options: ['Web Content Accessibility Guidelines', 'Web Coding And Graphics', 'World CSS Art Guide', 'Web Component Architecture Guide'], correct: 0 },
    { id: 'q5', question: 'What is a design system?', options: ['A coding framework', 'A collection of reusable components, patterns, and guidelines for consistency', 'A project management tool', 'A color palette'], correct: 1 },
    { id: 'q6', question: 'What is usability testing?', options: ['Testing code for bugs', 'Observing real users interact with a product to identify issues', 'A/B testing only', 'Performance testing'], correct: 1 },
    { id: 'q7', question: 'What is information architecture?', options: ['Server architecture', 'The structural design of shared information environments for findability', 'A database design method', 'A networking concept'], correct: 1 }
  ],
  dataengineering: [
    { id: 'q1', question: 'What is ETL?', options: ['Extract, Transform, Load — a data pipeline pattern', 'Encrypted Transfer Layer', 'External Table Linking', 'Event Trigger Logic'], correct: 0 },
    { id: 'q2', question: 'What is Apache Spark?', options: ['A database', 'A distributed computing engine for large-scale data processing', 'A messaging queue', 'A web server'], correct: 1 },
    { id: 'q3', question: 'What is a data warehouse?', options: ['A file server', 'A centralized repository optimized for analysis and reporting', 'A NoSQL database', 'A cache layer'], correct: 1 },
    { id: 'q4', question: 'What is Apache Kafka used for?', options: ['Web hosting', 'Distributed event streaming and real-time data pipelines', 'Image processing', 'Machine learning'], correct: 1 },
    { id: 'q5', question: 'What is a DAG in Airflow?', options: ['A data type', 'Directed Acyclic Graph — defines task dependencies and execution order', 'A database query', 'A file format'], correct: 1 },
    { id: 'q6', question: 'What is the difference between batch and stream processing?', options: ['No difference', 'Batch processes data in chunks; streaming processes data in real-time', 'Batch is faster', 'Streaming uses more storage'], correct: 1 },
    { id: 'q7', question: 'What is dbt?', options: ['A database type', 'A transformation tool that lets you write SQL to build data models', 'A Docker tool', 'A testing framework'], correct: 1 }
  ],
  linuxadmin: [
    { id: 'q1', question: 'What does the chmod command do?', options: ['Changes file ownership', 'Changes file permissions', 'Creates a directory', 'Moves files'], correct: 1 },
    { id: 'q2', question: 'What is the root user in Linux?', options: ['A regular user', 'The superuser with unrestricted access to all commands and files', 'A guest account', 'A network user'], correct: 1 },
    { id: 'q3', question: 'What does the grep command do?', options: ['Compresses files', 'Searches for text patterns in files', 'Creates users', 'Monitors processes'], correct: 1 },
    { id: 'q4', question: 'What is systemd?', options: ['A shell script', 'An init system and service manager for Linux', 'A file system', 'A text editor'], correct: 1 },
    { id: 'q5', question: 'What is SSH?', options: ['Secure Shell — a protocol for encrypted remote access', 'Simple Server Host', 'System Shell Handler', 'Storage Share Hub'], correct: 0 },
    { id: 'q6', question: 'What is a cron job?', options: ['A background process', 'A scheduled task that runs at specified times/intervals', 'A file permission', 'A network service'], correct: 1 },
    { id: 'q7', question: 'What does the pipe operator (|) do?', options: ['Creates files', 'Sends the output of one command as input to another', 'Runs commands in parallel', 'Comments out code'], correct: 1 }
  ],
  apidesign: [
    { id: 'q1', question: 'What does REST stand for?', options: ['Remote Execution Standard', 'Representational State Transfer', 'Request/Response State Transport', 'Real-time Event System'], correct: 1 },
    { id: 'q2', question: 'What is the purpose of HTTP status code 201?', options: ['Server error', 'Resource created successfully', 'Not found', 'Unauthorized'], correct: 1 },
    { id: 'q3', question: 'What is OAuth 2.0?', options: ['A database protocol', 'An authorization framework for delegated access', 'An encryption algorithm', 'A REST alternative'], correct: 1 },
    { id: 'q4', question: 'What is rate limiting?', options: ['Limiting database queries', 'Controlling the number of API requests a client can make in a time period', 'Reducing server speed', 'Limiting file uploads'], correct: 1 },
    { id: 'q5', question: 'What is GraphQL?', options: ['A database', 'A query language for APIs that lets clients request exactly the data they need', 'A REST framework', 'A graph database'], correct: 1 },
    { id: 'q6', question: 'What is API versioning?', options: ['Tracking API usage', 'Managing multiple versions of an API to prevent breaking changes', 'Version control for code', 'Database versioning'], correct: 1 },
    { id: 'q7', question: 'What is an API contract?', options: ['A legal document', 'A formal specification defining request/response formats and behavior', 'A pricing model', 'A rate limit policy'], correct: 1 }
  ]
};

module.exports = quizzes;
