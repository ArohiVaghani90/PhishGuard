import { userProgressData, trainingModules } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp, Award, Star, Flame, BookOpen, Mail, CheckCircle,
  Clock, Target, Trophy
} from 'lucide-react';

function AchievementCard({ achievement }: { achievement: typeof userProgressData.achievements[0] }) {
  return (
    <div className={`bg-slate-800 border rounded-xl p-4 text-center transition-all duration-200 ${
      achievement.earned
        ? 'border-slate-600 hover:border-cyan-500/50'
        : 'border-slate-700/50 opacity-40'
    }`}>
      <div className={`text-4xl mb-3 transition-transform ${achievement.earned ? 'hover:scale-110' : 'grayscale'}`}>
        {achievement.icon}
      </div>
      <h4 className={`text-sm mb-1 ${achievement.earned ? 'text-white' : 'text-slate-500'}`}>{achievement.name}</h4>
      <p className="text-slate-500 text-xs leading-tight mb-2">{achievement.description}</p>
      {achievement.earned ? (
        <p className="text-emerald-400 text-xs flex items-center justify-center gap-1">
          <CheckCircle size={10} /> Earned {achievement.date}
        </p>
      ) : (
        <p className="text-slate-600 text-xs">Not yet earned</p>
      )}
    </div>
  );
}

export function ProgressPage() {
  const { user } = useAuth();
  const data = userProgressData;

  const completedModules = trainingModules.filter(m => m.completed);
  const earnedAchievements = data.achievements.filter(a => a.earned);
  const totalPossiblePoints = trainingModules.reduce((sum, m) => sum + m.points, 0);

  const levelThresholds = [0, 500, 1000, 2000, 3500, 5000];
  const currentLevel = levelThresholds.reduce((level, t, i) => (user?.points ?? 0) >= t ? i + 1 : level, 1);
  const nextLevelPoints = levelThresholds[currentLevel] ?? levelThresholds[levelThresholds.length - 1];
  const prevLevelPoints = levelThresholds[currentLevel - 1] ?? 0;
  const levelProgress = ((user?.points ?? 0) - prevLevelPoints) / (nextLevelPoints - prevLevelPoints) * 100;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white mb-1">My Progress</h1>
        <p className="text-slate-400 text-sm">Track your learning journey and achievements</p>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-3xl font-bold">{currentLevel}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-slate-400 text-sm">Level {currentLevel}</p>
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                {currentLevel < 3 ? 'Novice' : currentLevel < 5 ? 'Defender' : 'Guardian'}
              </span>
            </div>
            <h2 className="text-white mb-2">{user?.firstName} {user?.lastName}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400" />{data.totalPoints.toLocaleString()} pts</span>
              {nextLevelPoints && (
                <span>{nextLevelPoints - (user?.points ?? 0)} pts to Level {currentLevel + 1}</span>
              )}
            </div>
            <div className="mt-3">
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, levelProgress)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <BookOpen size={20} />, label: 'Modules Completed', value: data.modulesCompleted, total: data.modulesTotal, color: 'text-blue-400', bg: 'bg-blue-500/20' },
          { icon: <Target size={20} />, label: 'Simulations Passed', value: data.simulationsPassed, total: data.simulationsTotal, color: 'text-purple-400', bg: 'bg-purple-500/20' },
          { icon: <Trophy size={20} />, label: 'Achievements', value: earnedAchievements.length, total: data.achievements.length, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
          { icon: <Flame size={20} />, label: 'Day Streak', value: data.currentStreak, total: null, color: 'text-orange-400', bg: 'bg-orange-500/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">
              {stat.value}{stat.total !== null ? `/${stat.total}` : ''}
            </div>
            <div className="text-slate-400 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Training Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm">Overall Training Progress</h3>
              <span className="text-cyan-400 text-sm font-bold">{data.overallProgress}%</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${data.overallProgress}%` }}
              />
            </div>
            <p className="text-slate-400 text-xs">{data.modulesCompleted} of {data.modulesTotal} modules completed</p>
          </div>

          {/* Module Details */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Module Performance</h3>
            <div className="space-y-3">
              {trainingModules.map(module => (
                <div key={module.id} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    module.completed ? 'bg-emerald-500/20' : module.progress > 0 ? 'bg-cyan-500/20' : 'bg-slate-700'
                  }`}>
                    {module.completed
                      ? <CheckCircle size={14} className="text-emerald-400" />
                      : <BookOpen size={14} className="text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <p className="text-slate-300 text-xs truncate">{module.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {module.score !== null && (
                          <span className="text-xs text-slate-400">Score: {module.score}%</span>
                        )}
                        <span className={`text-xs ${
                          module.completed ? 'text-emerald-400' :
                          module.progress > 0 ? 'text-cyan-400' : 'text-slate-500'
                        }`}>{module.progress}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${module.completed ? 'bg-emerald-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Activity History</h3>
            <div className="space-y-3">
              {data.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'module' ? 'bg-blue-500/20' :
                    activity.type === 'simulation' ? 'bg-purple-500/20' :
                    'bg-yellow-500/20'
                  }`}>
                    {activity.type === 'module' ? <BookOpen size={14} className="text-blue-400" /> :
                     activity.type === 'simulation' ? <Mail size={14} className="text-purple-400" /> :
                     <Award size={14} className="text-yellow-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm">{activity.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <Clock size={10} />
                      <span>{activity.date}</span>
                      {activity.score !== null && <span>• Score: {activity.score}%</span>}
                    </div>
                  </div>
                  {activity.points > 0 && (
                    <span className="text-emerald-400 text-sm font-semibold flex-shrink-0">+{activity.points}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-white text-sm">Achievements</h3>
              <span className="text-slate-400 text-xs">{earnedAchievements.length}/{data.achievements.length}</span>
            </div>
            <p className="text-slate-500 text-xs mb-4">Complete tasks to earn medals and badges</p>

            {/* Earned count */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-yellow-400" />
                <span className="text-yellow-300 text-sm font-semibold">{earnedAchievements.length} Medals Earned</span>
              </div>
              <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  style={{ width: `${(earnedAchievements.length / data.achievements.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {data.achievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}