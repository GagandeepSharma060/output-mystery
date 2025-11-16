'use client';

import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  points: number;
  completed: boolean;
  videoId?: string;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Array Methods Master',
    description: 'Complete all array method exercises: map, filter, reduce, find, some, every',
    difficulty: 'Beginner',
    category: 'JavaScript',
    points: 100,
    completed: false,
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'React Hooks Challenge',
    description: 'Build a counter component using useState and useEffect hooks',
    difficulty: 'Intermediate',
    category: 'React',
    points: 200,
    completed: false,
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Python List Comprehension',
    description: 'Solve 5 problems using only list comprehensions',
    difficulty: 'Beginner',
    category: 'Python',
    points: 150,
    completed: true,
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'CSS Grid Layout',
    description: 'Create a responsive grid layout with 3 different breakpoints',
    difficulty: 'Intermediate',
    category: 'CSS',
    points: 180,
    completed: false,
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '5',
    title: 'TypeScript Generics',
    description: 'Implement a generic function that works with multiple data types',
    difficulty: 'Advanced',
    category: 'TypeScript',
    points: 300,
    completed: false,
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: '6',
    title: 'Node.js Async Patterns',
    description: 'Build an async function that handles multiple API calls with error handling',
    difficulty: 'Advanced',
    category: 'Node.js',
    points: 250,
    completed: false,
    videoId: 'dQw4w9WgXcQ'
  }
];

const categories = ['All', 'JavaScript', 'React', 'Python', 'CSS', 'TypeScript', 'Node.js'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ChallengesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = selectedCategory === 'All' || challenge.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Coding Challenges</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Test your skills with hands-on coding challenges. Complete them to earn points and track your progress.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-400">{completedChallenges}</div>
            <div className="text-gray-400">Completed</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-400">{totalPoints}</div>
            <div className="text-gray-400">Total Points</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-400">{challenges.length - completedChallenges}</div>
            <div className="text-gray-400">Remaining</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium">Category:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium">Difficulty:</span>
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
                challenge.completed ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white">
                    {challenge.category}
                  </span>
                </div>
                {challenge.completed && (
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">{challenge.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{challenge.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-500 font-medium">{challenge.points} pts</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {challenge.completed ? 'Completed' : 'Start Challenge'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Challenge Modal */}
        {selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedChallenge.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                        {selectedChallenge.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white">
                        {selectedChallenge.category}
                      </span>
                      <span className="text-yellow-500 font-medium">{selectedChallenge.points} points</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-300 mb-6">{selectedChallenge.description}</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">Instructions:</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Watch the related video tutorial</li>
                      <li>• Open the IDE to start coding</li>
                      <li>• Complete the challenge requirements</li>
                      <li>• Test your solution thoroughly</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-4">
                    {selectedChallenge.videoId && (
                      <a
                        href={`https://www.youtube.com/watch?v=${selectedChallenge.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Watch Tutorial
                      </a>
                    )}
                    <a
                      href="/ide"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Start Coding
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
