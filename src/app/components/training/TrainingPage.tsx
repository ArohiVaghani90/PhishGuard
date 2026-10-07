import { useState } from 'react';
import { trainingModules } from '../../data/mockData';
import {
  Search, BookOpen, Clock, CheckCircle, ChevronRight, X,
  ArrowLeft, Award, Target, Layers
} from 'lucide-react';

type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

interface QuizState {
  answers: number[];
  submitted: boolean;
  score: number;
}

function ModuleDetail({ module, onClose }: { module: typeof trainingModules[0]; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<'lessons' | 'quiz'>('lessons');
  const [lessonPage, setLessonPage] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>({ answers: Array(module.quiz.length).fill(-1), submitted: false, score: 0 });

  const lessons = [
    { title: `Introduction to ${module.title}`, content: `Welcome to this module on ${module.title}. ${module.description} In this module, you will learn the key concepts, real-world examples, and practical skills to protect yourself and your organization.` },
    { title: 'Key Concepts', content: 'Understanding the fundamentals is crucial. Phishing attacks rely on psychological manipulation — creating urgency, fear, or excitement to make you act without thinking. Always pause and verify before clicking any link or providing any information.' },
    { title: 'Real-World Examples', content: 'In 2023, 91% of all cyberattacks began with a phishing email. Common scenarios include: fake IT support emails, executive impersonation (CEO fraud), fake invoice requests, and credential harvesting through cloned login pages.' },
    { title: 'How to Protect Yourself', content: 'Always verify the sender\'s actual email address. Hover over links before clicking. Never provide credentials via email. When in doubt, contact the sender through a different channel. Report suspicious emails to your IT/security team immediately.' },
    { title: 'Summary & Key Takeaways', content: `Great work! You\'ve completed the lessons for "${module.title}". Key takeaways: (1) Always verify, (2) Think before you click, (3) Report suspicious activity, (4) Use multi-factor authentication. Ready to test your knowledge? Take the quiz!` },
  ];

  const handleAnswer = (qIndex: number, aIndex: number) => {
    if (quiz.submitted) return;
    const newAnswers = [...quiz.answers];
    newAnswers[qIndex] = aIndex;
    setQuiz(prev => ({ ...prev, answers: newAnswers }));
  };

  const handleSubmitQuiz = () => {
    const correct = module.quiz.filter((q, i) => quiz.answers[i] === q.correct).length;
    const score = Math.round((correct / module.quiz.length) * 100);
    setQuiz(prev => ({ ...prev, submitted: true, score }));
  };

  const allAnswered = quiz.answers.every(a => a !== -1);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-slate-700">
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Modules</span>
        </button>
        <div className="h-4 w-px bg-slate-700" />
        <div className="flex-1">
          <h2 className="text-white text-lg">{module.title}</h2>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
            <span className={`px-2 py-0.5 rounded-full ${
              module.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
              module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>{module.difficulty}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{module.duration}</span>
            <span>+{module.points} pts</span>
          </div>
        </div>
        {module.completed && (
          <div className="flex items-center gap-1 text-emerald-400 text-sm">
            <CheckCircle size={16} /> Completed
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 px-6">
        <button
          onClick={() => setActiveSection('lessons')}
          className={`px-4 py-3 text-sm border-b-2 transition-colors ${activeSection === 'lessons' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <span className="flex items-center gap-2"><Layers size={14} /> Lessons ({lessons.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('quiz')}
          className={`px-4 py-3 text-sm border-b-2 transition-colors ${activeSection === 'quiz' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          <span className="flex items-center gap-2"><Target size={14} /> Quiz ({module.quiz.length} questions)</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeSection === 'lessons' && (
          <div>
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {lessons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLessonPage(i)}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${i <= lessonPage ? 'bg-cyan-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>

            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span>Lesson {lessonPage + 1} of {lessons.length}</span>
              </div>
              <h3 className="text-white mb-4">{lessons[lessonPage].title}</h3>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
                <p className="text-slate-300 leading-relaxed">{lessons[lessonPage].content}</p>
              </div>

              {/* Example phishing indicator if first lessons */}
              {lessonPage === 1 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <p className="text-red-400 text-sm font-semibold mb-2">⚠️ Example Phishing Indicator</p>
                  <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-300">
                    <div>From: <span className="text-red-400">it-support@company-helpdesk.net</span> <span className="text-slate-500">(Suspicious domain!)</span></div>
                    <div>Subject: <span className="text-yellow-400">URGENT: Your account will be locked</span></div>
                    <div className="mt-2 text-slate-400">← These are classic phishing red flags</div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setLessonPage(p => Math.max(0, p - 1))}
                  disabled={lessonPage === 0}
                  className="px-4 py-2 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 rounded-lg text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {lessonPage < lessons.length - 1 ? (
                  <button
                    onClick={() => setLessonPage(p => p + 1)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    Next Lesson <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveSection('quiz')}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    Take Quiz <Target size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'quiz' && (
          <div className="max-w-2xl">
            {quiz.submitted ? (
              // Results
              <div className="text-center py-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${quiz.score >= 70 ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                  <span className={`text-3xl font-bold ${quiz.score >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>{quiz.score}%</span>
                </div>
                <h3 className="text-white mb-2">{quiz.score >= 70 ? '🎉 Module Complete!' : 'Keep Practicing!'}</h3>
                <p className="text-slate-400 text-sm mb-6">
                  {quiz.score >= 70 ? `Excellent work! You passed with ${quiz.score}%. +${module.points} points awarded!` : `You scored ${quiz.score}%. You need 70% to pass. Review the lessons and try again.`}
                </p>
                <div className="space-y-3 text-left">
                  {module.quiz.map((q, i) => (
                    <div key={q.id} className={`rounded-xl p-4 border ${quiz.answers[i] === q.correct ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                      <p className="text-sm font-semibold text-white mb-2">{q.question}</p>
                      <p className={`text-sm ${quiz.answers[i] === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                        {quiz.answers[i] === q.correct ? '✓' : '✗'} Your answer: {q.options[quiz.answers[i]]}
                      </p>
                      {quiz.answers[i] !== q.correct && (
                        <p className="text-emerald-400 text-sm">✓ Correct: {q.options[q.correct]}</p>
                      )}
                    </div>
                  ))}
                </div>
                {quiz.score < 70 && (
                  <button
                    onClick={() => setQuiz({ answers: Array(module.quiz.length).fill(-1), submitted: false, score: 0 })}
                    className="mt-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Retry Quiz
                  </button>
                )}
              </div>
            ) : (
              // Quiz questions
              <div>
                <div className="mb-4">
                  <h3 className="text-white mb-1">Knowledge Check</h3>
                  <p className="text-slate-400 text-sm">Answer all {module.quiz.length} questions. You need 70% to pass.</p>
                </div>
                <div className="space-y-5">
                  {module.quiz.map((q, qIndex) => (
                    <div key={q.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                      <p className="text-white text-sm mb-3">
                        <span className="text-slate-400 text-xs">Q{qIndex + 1}. </span>
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswer(qIndex, oIndex)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 ${
                              quiz.answers[qIndex] === oIndex
                                ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300'
                                : 'border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            <span className="text-slate-500 mr-2">{String.fromCharCode(65 + oIndex)}.</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-lg text-sm transition-all duration-200"
                >
                  {allAnswered ? 'Submit Quiz' : `Answer all questions (${quiz.answers.filter(a => a !== -1).length}/${module.quiz.length})`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function TrainingPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Difficulty>('All');
  const [selectedModule, setSelectedModule] = useState<typeof trainingModules[0] | null>(null);

  const filtered = trainingModules.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || m.difficulty === filter;
    return matchSearch && matchFilter;
  });

  const completedCount = trainingModules.filter(m => m.completed).length;
  const inProgressCount = trainingModules.filter(m => m.progress > 0 && !m.completed).length;

  if (selectedModule) {
    return (
      <div className="h-full">
        <ModuleDetail module={selectedModule} onClose={() => setSelectedModule(null)} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white mb-1">Training Modules</h1>
        <p className="text-slate-400 text-sm">Complete modules to earn points and improve your security awareness</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Completed', value: completedCount, total: trainingModules.length, color: 'text-emerald-400' },
          { label: 'In Progress', value: inProgressCount, total: trainingModules.length, color: 'text-yellow-400' },
          { label: 'Not Started', value: trainingModules.length - completedCount - inProgressCount, total: trainingModules.length, color: 'text-slate-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>{stat.value}</div>
            <div className="text-slate-400 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search modules by title or topic..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                filter === d
                  ? 'bg-cyan-500 text-slate-900 font-semibold'
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No modules found for "{search}"</p>
          <button onClick={() => setSearch('')} className="text-cyan-400 text-sm mt-2 hover:text-cyan-300">Clear search</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(module => (
            <div
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className="bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:bg-slate-750 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  module.completed ? 'bg-emerald-500/20' : module.progress > 0 ? 'bg-cyan-500/20' : 'bg-slate-700'
                }`}>
                  {module.completed
                    ? <CheckCircle size={20} className="text-emerald-400" />
                    : <BookOpen size={20} className="text-cyan-400" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    module.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                    module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{module.difficulty}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-white text-sm mb-2 group-hover:text-cyan-300 transition-colors">{module.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{module.description}</p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Clock size={11} />{module.duration}</span>
                <span className="flex items-center gap-1"><Layers size={11} />{module.lessons} lessons</span>
                <span className="flex items-center gap-1"><Award size={11} />+{module.points} pts</span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">
                    {module.completed ? 'Completed' : module.progress > 0 ? 'In progress' : 'Not started'}
                  </span>
                  <span className={module.completed ? 'text-emerald-400' : module.progress > 0 ? 'text-cyan-400' : 'text-slate-500'}>
                    {module.progress}%
                    {module.score !== null && ` • Score: ${module.score}%`}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${module.completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {module.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
