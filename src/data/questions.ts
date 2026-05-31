import { Question } from '../types';

export const questions: Question[] = [
  // Technical Questions
  {
    id: 't1',
    category: 'technical',
    question: 'Explain the concept of closures in JavaScript and provide a practical example of when you would use one.',
    difficulty: 'medium',
    tips: 'Mention lexical scope, data encapsulation, and callback functions'
  },
  {
    id: 't2',
    category: 'technical',
    question: 'What is the difference between REST and GraphQL? When would you choose one over the other?',
    difficulty: 'medium',
    tips: 'Consider data fetching patterns, overfetching, and caching'
  },
  {
    id: 't3',
    category: 'technical',
    question: 'Describe how you would design a scalable microservices architecture for an e-commerce platform.',
    difficulty: 'hard',
    tips: 'Think about service boundaries, communication patterns, and fault tolerance'
  },
  {
    id: 't4',
    category: 'technical',
    question: 'What is the time complexity of binary search? Explain why it works efficiently.',
    difficulty: 'easy',
    tips: 'Discuss divide and conquer approach and log(n) complexity'
  },
  {
    id: 't5',
    category: 'technical',
    question: 'Explain the difference between SQL and NoSQL databases. Give examples of when to use each.',
    difficulty: 'medium',
    tips: 'Consider data structure, scalability, and consistency requirements'
  },
  {
    id: 't6',
    category: 'technical',
    question: 'What is React Virtual DOM? How does it improve performance?',
    difficulty: 'medium',
    tips: 'Explain reconciliation process and diffing algorithm'
  },
  {
    id: 't7',
    category: 'technical',
    question: 'Describe the concept of dependency injection and its benefits in software development.',
    difficulty: 'hard',
    tips: 'Discuss decoupling, testability, and inversion of control'
  },
  {
    id: 't8',
    category: 'technical',
    question: 'What is the difference between let, const, and var in JavaScript?',
    difficulty: 'easy',
    tips: 'Discuss scope, hoisting, and reassignment'
  },
  // Behavioral Questions
  {
    id: 'b1',
    category: 'behavioral',
    question: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
    difficulty: 'medium',
    tips: 'Use STAR method: Situation, Task, Action, Result'
  },
  {
    id: 'b2',
    category: 'behavioral',
    question: 'Describe a project where you had to learn a new technology quickly. What was your approach?',
    difficulty: 'easy',
    tips: 'Highlight adaptability and continuous learning mindset'
  },
  {
    id: 'b3',
    category: 'behavioral',
    question: 'Tell me about a time when you failed at something. What did you learn from it?',
    difficulty: 'medium',
    tips: 'Show self-awareness and growth mindset'
  },
  {
    id: 'b4',
    category: 'behavioral',
    question: 'Describe a situation where you had to make a decision with incomplete information.',
    difficulty: 'hard',
    tips: 'Demonstrate critical thinking and risk assessment'
  },
  {
    id: 'b5',
    category: 'behavioral',
    question: 'How do you prioritize tasks when you have multiple competing deadlines?',
    difficulty: 'easy',
    tips: 'Mention prioritization frameworks and communication'
  },
  {
    id: 'b6',
    category: 'behavioral',
    question: 'Tell me about a time you demonstrated leadership qualities, even without a formal leadership title.',
    difficulty: 'medium',
    tips: 'Focus on influence, initiative, and impact on others'
  },
  {
    id: 'b7',
    category: 'behavioral',
    question: 'Describe a situation where you had to give difficult feedback to a colleague.',
    difficulty: 'hard',
    tips: 'Show empathy, preparation, and constructive approach'
  },
  {
    id: 'b8',
    category: 'behavioral',
    question: 'How do you stay updated with the latest technologies and industry trends?',
    difficulty: 'easy',
    tips: 'Mention resources, communities, and continuous learning habits'
  },
  // Situational Questions
  {
    id: 's1',
    category: 'situational',
    question: 'What would you do if you discovered a critical bug in production just before a major release?',
    difficulty: 'hard',
    tips: 'Consider impact assessment, communication, and decision-making'
  },
  {
    id: 's2',
    category: 'situational',
    question: 'How would you handle a situation where your manager asks you to deliver a project with an unrealistic timeline?',
    difficulty: 'medium',
    tips: 'Focus on negotiation and finding solutions'
  },
  {
    id: 's3',
    category: 'situational',
    question: 'What would you do if you disagreed with a technical decision made by your team lead?',
    difficulty: 'medium',
    tips: 'Show respect for hierarchy while demonstrating conviction'
  },
  {
    id: 's4',
    category: 'situational',
    question: 'How would you onboard a new team member who is struggling to catch up with the codebase?',
    difficulty: 'easy',
    tips: 'Demonstrate mentorship and knowledge sharing'
  },
  {
    id: 's5',
    category: 'situational',
    question: 'What would you do if you noticed a security vulnerability in a legacy system that no one is actively maintaining?',
    difficulty: 'hard',
    tips: 'Consider responsibility, escalation, and risk management'
  },
  {
    id: 's6',
    category: 'situational',
    question: 'How would you handle a situation where a client keeps changing requirements mid-project?',
    difficulty: 'medium',
    tips: 'Discuss change management, communication, and flexibility'
  },
  {
    id: 's7',
    category: 'situational',
    question: 'What would you do if you realized you made a mistake in your code that went to production?',
    difficulty: 'medium',
    tips: 'Focus on ownership, quick response, and prevention'
  },
  {
    id: 's8',
    category: 'situational',
    question: 'How would you approach a situation where you need to refactor legacy code without breaking existing functionality?',
    difficulty: 'hard',
    tips: 'Discuss testing strategy, incremental changes, and documentation'
  }
];

export const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Software Engineer',
  'Senior Software Engineer',
  'Tech Lead',
  'Engineering Manager',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager'
];

export const companies = [
  'Google',
  'Meta',
  'Amazon',
  'Apple',
  'Microsoft',
  'Netflix',
  'Stripe',
  'Airbnb',
  'Uber',
  'Spotify',
  'LinkedIn',
  'Twitter'
];