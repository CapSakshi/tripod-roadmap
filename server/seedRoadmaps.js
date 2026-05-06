const mongoose = require('mongoose');
require('dotenv').config();
const Roadmap = require('./models/Roadmap');
const User = require('./models/User');
const originalRoadmapsData = require('./data/roadmaps');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tripod-roadmap';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Ensure we have an admin user
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      admin = await User.findOne({}); 
      if (!admin) {
        admin = await User.create({
          name: 'System Admin',
          email: 'admin@system.local',
          password: 'password123',
          role: 'admin'
        });
      }
    }

    // Function to generate real, working URLs (YouTube & Docs) based on topic, formatted as "URL|TITLE"
    const getRichResourcesForTopic = (topicTitle) => {
      const t = topicTitle.toLowerCase();
      if (t.includes('html')) return ['https://developer.mozilla.org/en-US/docs/Learn/HTML|MDN HTML Docs', 'https://www.youtube.com/watch?v=qz0aGYrrlhU|YouTube - HTML Crash Course'];
      if (t.includes('css')) return ['https://developer.mozilla.org/en-US/docs/Learn/CSS|MDN CSS Guide', 'https://www.youtube.com/watch?v=1Rs2ND1ryYc|YouTube - CSS Full Course'];
      if (t.includes('javascript') || t.includes('js')) return ['https://javascript.info/|JavaScript.info', 'https://www.youtube.com/watch?v=W6NZfCO5SIk|YouTube - JavaScript for Beginners'];
      if (t.includes('react')) return ['https://react.dev/learn|Official React Docs', 'https://www.youtube.com/watch?v=bMknfKXIFA8|YouTube - React JS Course'];
      if (t.includes('node') || t.includes('express')) return ['https://nodejs.org/en/learn|Node.js Guide', 'https://www.youtube.com/watch?v=Oe421EPjeBE|YouTube - Node.js Crash Course'];
      if (t.includes('git')) return ['https://git-scm.com/book/en/v2|Pro Git Book', 'https://www.youtube.com/watch?v=RGOj5yH7evk|YouTube - Git Tutorial'];
      if (t.includes('docker')) return ['https://docs.docker.com/|Docker Documentation', 'https://www.youtube.com/watch?v=fqMOX6JJhGo|YouTube - Docker Course'];
      if (t.includes('kubernetes') || t.includes('k8s')) return ['https://kubernetes.io/docs/home/|Kubernetes Docs', 'https://www.youtube.com/watch?v=X48VuDVv0do|YouTube - K8s Crash Course'];
      if (t.includes('python')) return ['https://docs.python.org/3/|Python Docs', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc|YouTube - Python for Beginners'];
      if (t.includes('sql') || t.includes('database') || t.includes('postgres')) return ['https://www.postgresql.org/docs/|PostgreSQL Docs', 'https://www.youtube.com/watch?v=HXV3zeJZ1EQ|YouTube - SQL Tutorial'];
      if (t.includes('aws') || t.includes('cloud')) return ['https://aws.amazon.com/getting-started/|AWS Getting Started', 'https://www.youtube.com/watch?v=3hLmDS179YE|YouTube - AWS Cloud Practitioner'];
      if (t.includes('mongo') || t.includes('nosql')) return ['https://www.mongodb.com/docs/|MongoDB Docs', 'https://www.youtube.com/watch?v=ofme2o29ngU|YouTube - MongoDB Course'];
      if (t.includes('api') || t.includes('rest')) return ['https://restfulapi.net/|REST API Best Practices', 'https://www.youtube.com/watch?v=-MTSQjw5DrM|YouTube - What is an API?'];
      if (t.includes('linux')) return ['https://linuxjourney.com/|Linux Journey', 'https://www.youtube.com/watch?v=v_1kOCFOsMQ|YouTube - Linux Crash Course'];
      if (t.includes('security') || t.includes('cyber')) return ['https://owasp.org/|OWASP Foundation', 'https://www.youtube.com/watch?v=inWWhr5tnEA|YouTube - Cybersecurity Full Course'];
      if (t.includes('blockchain') || t.includes('web3')) return ['https://ethereum.org/en/developers/docs/|Ethereum Docs', 'https://www.youtube.com/watch?v=gyMwXuJrbJQ|YouTube - Web3 Full Course'];
      if (t.includes('java') || t.includes('spring')) return ['https://docs.oracle.com/en/java/|Oracle Java Docs', 'https://www.youtube.com/watch?v=eIrMbAQSU34|YouTube - Java Full Course'];
      if (t.includes('flask') || t.includes('django')) return ['https://docs.djangoproject.com/|Django Docs', 'https://www.youtube.com/watch?v=Z1RJmh_OqeA|YouTube - Flask Course'];
      if (t.includes('figma') || t.includes('wireframe') || t.includes('prototype')) return ['https://help.figma.com/|Figma Help Center', 'https://www.youtube.com/watch?v=FTFaQWZBqQ8|YouTube - Figma Tutorial'];
      if (t.includes('unity') || t.includes('game')) return ['https://learn.unity.com/|Unity Learn', 'https://www.youtube.com/watch?v=gB1F9G0JXOo|YouTube - Unity Beginner Tutorial'];
      if (t.includes('spark') || t.includes('etl') || t.includes('pipeline')) return ['https://spark.apache.org/docs/latest/|Apache Spark Docs', 'https://www.youtube.com/watch?v=_C8kWso4ne4|YouTube - Spark Tutorial'];
      if (t.includes('airflow') || t.includes('orchestrat')) return ['https://airflow.apache.org/docs/|Apache Airflow Docs', 'https://www.youtube.com/watch?v=AHMm1wfGuR8|YouTube - Airflow Tutorial'];
      if (t.includes('bash') || t.includes('shell') || t.includes('scripting')) return ['https://www.gnu.org/software/bash/manual/|Bash Manual', 'https://www.youtube.com/watch?v=tK9Oc6AEnR4|YouTube - Bash Scripting'];
      if (t.includes('systemd') || t.includes('process') || t.includes('service')) return ['https://systemd.io/|systemd Documentation', 'https://www.youtube.com/watch?v=5JVBpXiYMKo|YouTube - systemd Tutorial'];
      if (t.includes('design') || t.includes('ux') || t.includes('ui')) return ['https://www.nngroup.com/|Nielsen Norman Group', 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU|YouTube - UX Design Course'];
      if (t.includes('oauth') || t.includes('jwt') || t.includes('auth')) return ['https://auth0.com/docs/|Auth0 Docs', 'https://www.youtube.com/watch?v=7Q17ubqLfaM|YouTube - OAuth Explained'];
      if (t.includes('graphql')) return ['https://graphql.org/learn/|GraphQL Docs', 'https://www.youtube.com/watch?v=ed8SzALpx1Q|YouTube - GraphQL Course'];
      if (t.includes('typescript') || t.includes('type')) return ['https://www.typescriptlang.org/docs/|TypeScript Docs', 'https://www.youtube.com/watch?v=BwuLxPH8IDs|YouTube - TypeScript Course'];
      if (t.includes('redux') || t.includes('state management') || t.includes('zustand')) return ['https://redux-toolkit.js.org/|Redux Toolkit Docs', 'https://www.youtube.com/watch?v=iBUJVy8phqw|YouTube - Redux Tutorial'];
      if (t.includes('next') || t.includes('ssr')) return ['https://nextjs.org/docs|Next.js Docs', 'https://www.youtube.com/watch?v=mTz0GXj8NN0|YouTube - Next.js Course'];
      if (t.includes('test')) return ['https://jestjs.io/docs/|Jest Docs', 'https://www.youtube.com/watch?v=FgnxcUQ5vho|YouTube - Testing Tutorial'];
      
      // Generic fallback
      return [
        `https://www.youtube.com/results?search_query=${encodeURIComponent(topicTitle + ' tutorial full course')}|YouTube - ${topicTitle} Tutorial`,
        `https://www.google.com/search?q=${encodeURIComponent(topicTitle + ' documentation best practices')}|Google - ${topicTitle} Best Practices`
      ];
    };

    // Restore ALL original roadmaps from the static file to preserve functionality
    const roadmapsToInsert = Object.values(originalRoadmapsData).map(roadmap => {
      // Map domain category to strict schema enum
      let mappedCategory = 'Other';
      if (roadmap.id === 'frontend' || roadmap.id === 'backend' || roadmap.id === 'reactadvanced' || roadmap.id === 'typescript' || roadmap.id === 'apidesign') mappedCategory = 'Web Dev';
      else if (roadmap.id === 'devops' || roadmap.id === 'cloud' || roadmap.id === 'linuxadmin') mappedCategory = 'DevOps';
      else if (roadmap.id === 'aiml' || roadmap.id === 'dsa' || roadmap.id === 'dataengineering') mappedCategory = 'AI/ML';
      else if (roadmap.id === 'cybersecurity') mappedCategory = 'Cybersecurity';
      else if (roadmap.id === 'mobile') mappedCategory = 'Mobile Dev';
      else if (roadmap.id === 'blockchain') mappedCategory = 'Blockchain';
      else if (roadmap.id === 'database') mappedCategory = 'Data Science';
      else if (roadmap.id === 'python' || roadmap.id === 'java' || roadmap.id === 'systemdesign' || roadmap.id === 'gamedev' || roadmap.id === 'uiux') mappedCategory = 'Other';

      return {
        title: roadmap.title,
        description: roadmap.description || 'Comprehensive developer roadmap',
        category: mappedCategory,
        difficulty: 'Intermediate',
        isAdminRoadmap: true,
        isPublic: true,
        isDraft: false,
        createdBy: admin._id,
        steps: roadmap.steps.map(step => ({
          title: step.title,
          description: step.description || step.title,
          // CRITICAL: We MUST keep the original step.category (e.g. 'Foundation', 'Core') so the Checkpoint Quizzes work properly!
          category: step.category, 
          // Inject the parsed URL|TITLE format for hidden links
          resources: getRichResourcesForTopic(step.title)
        }))
      };
    });

    console.log('Clearing existing seeded roadmaps...');
    await Roadmap.deleteMany({ isAdminRoadmap: true });
    
    console.log(`Seeding all ${roadmapsToInsert.length} original roadmaps into MongoDB...`);
    await Roadmap.insertMany(roadmapsToInsert);
    
    console.log(`✅ All ${roadmapsToInsert.length} roadmaps successfully seeded with rich URLs and full functionality!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error seeding data:', err.message);
    process.exit(1);
  });
