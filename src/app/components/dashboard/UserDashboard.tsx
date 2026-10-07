import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { userProgressData, trainingModules, phishingSimulations } from '../../data/mockData';
import {
  BookOpen, Mail, TrendingUp, Award, ChevronRight, Flame,
  Star, Trophy, Clock, CheckCircle, AlertTriangle, Target
} from 'lucide-react';

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
      {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const data = userProgressData;

  const completedModules = trainingModules.filter(m => m.completed);
  const inProgressModules = trainingModules.filter(m => m.progress > 0 && !m.completed);
  const earnedAchievements = data.achievements.filter(a => a.earned);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-white mb-1">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-slate-400 text-sm">Here's your security training overview</p>
      </div>

      {/* Alert banner if at-risk */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-amber-300 text-sm">
            <span className="font-semibold">Action Required:</span> You have 2 incomplete training modules and 1 upcoming simulation due March 17.
          </p>
        </div>
        <button onClick={() => navigate('/training')} className="text-amber-400 text-xs hover:text-amber-300 flex items-center gap-1 flex-shrink-0">
          View <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<TrendingUp size={20} className="text-cyan-400" />}
          label="Overall Progress"
          value={`${data.overallProgress}%`}
          sub={`${data.modulesCompleted}/${data.modulesTotal} modules`}
          color="bg-cyan-500/20"
        />
        <StatCard
          icon={<Star size={20} className="text-yellow-400" />}
          label="Total Points"
          value={data.totalPoints.toLocaleString()}
          sub="Keep earning more!"
          color="bg-yellow-500/20"
        />
        <StatCard
          icon={<Target size={20} className="text-emerald-400" />}
          label="Simulations Passed"
          value={`${data.simulationsPassed}/${data.simulationsTotal}`}
          sub="Great performance!"
          color="bg-emerald-500/20"
        />
        <StatCard
          icon={<Flame size={20} className="text-orange-400" />}
          label="Learning Streak"
          value={`${data.currentStreak} Days`}
          sub="Keep it up!"
          color="bg-orange-500/20"
        />
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm">Training Completion</h3>
          <span className="text-cyan-400 text-sm font-semibold">{data.overallProgress}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${data.overallProgress}%` }}
          />
        </div>
        <p className="text-slate-400 text-xs mt-2">
          {data.modulesTotal - data.modulesCompleted} modules remaining to complete your training track
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Training */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm">Continue Training</h3>
            <button onClick={() => navigate('/training')} className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1">
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {inProgressModules.slice(0, 2).map(module => (
              <div
                key={module.id}
                onClick={() => navigate('/training')}
                className="bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-slate-750"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white text-sm mb-1">{module.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className={`px-2 py-0.5 rounded-full ${
                        module.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                        module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{module.difficulty}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{module.duration}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-500" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs flex-shrink-0">{module.progress}%</span>
                </div>
              </div>
            ))}

            {/* Upcoming module */}
            {trainingModules.filter(m => m.progress === 0).slice(0, 1).map(module => (
              <div
                key={module.id}
                onClick={() => navigate('/training')}
                className="bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-4 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white text-sm">{module.title}</h4>
                      <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Not started</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className={`px-2 py-0.5 rounded-full ${
                        module.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                        module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{module.difficulty}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{module.duration}</span>
                      <span>+{module.points} pts</span>
                    </div>
                  </div>
                  <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs px-3 py-1.5 rounded-lg transition-colors">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <h3 className="text-white text-sm mb-3">Recent Activity</h3>
            <div className="bg-slate-800 border border-slate-700 rounded-xl divide-y divide-slate-700">
              {data.recentActivity.slice(0, 4).map(activity => (
                <div key={activity.id} className="flex items-center gap-3 p-3">
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
                    <p className="text-slate-300 text-xs truncate">{activity.title}</p>
                    <p className="text-slate-500 text-xs">{activity.date}</p>
                  </div>
                  {activity.points > 0 && (
                    <span className="text-emerald-400 text-xs flex-shrink-0">+{activity.points} pts</span>
                  )}
                  {activity.score !== null && (
                    <span className="text-slate-400 text-xs flex-shrink-0">{activity.score}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm">Achievements</h3>
              <button onClick={() => navigate('/progress')} className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1">
                All <ChevronRight size={14} />
              </button>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-3">
                {earnedAchievements.map(a => (
                  <div key={a.id} className="text-center group" title={a.description}>
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{a.icon}</div>
                    <p className="text-slate-300 text-xs leading-tight">{a.name}</p>
                  </div>
                ))}
                {data.achievements.filter(a => !a.earned).slice(0, 3).map(a => (
                  <div key={a.id} className="text-center opacity-30" title={a.description}>
                    <div className="text-2xl mb-1 grayscale">{a.icon}</div>
                    <p className="text-slate-500 text-xs leading-tight">{a.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
                <span className="text-slate-400 text-xs">{earnedAchievements.length}/{data.achievements.length} earned</span>
                <div className="flex gap-1">
                  {data.achievements.map((a, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${a.earned ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm">Simulations</h3>
              <button onClick={() => navigate('/simulation')} className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {phishingSimulations.filter(s => s.status !== 'locked').map(sim => (
                <div key={sim.id} className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    sim.userResult?.passed ? 'bg-emerald-500/20' : 'bg-blue-500/20'
                  }`}>
                    {sim.userResult?.passed
                      ? <CheckCircle size={16} className="text-emerald-400" />
                      : <Mail size={16} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs truncate">{sim.title}</p>
                    <p className="text-slate-500 text-xs">{sim.difficulty}</p>
                  </div>
                  {sim.userResult ? (
                    <span className="text-emerald-400 text-xs">{sim.userResult.score}%</span>
                  ) : (
                    <span className="text-cyan-400 text-xs">New</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-white text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: <BookOpen size={16} />, label: 'Continue Training', path: '/training', color: 'text-blue-400' },
                { icon: <Mail size={16} />, label: 'Start Simulation', path: '/simulation', color: 'text-purple-400' },
                { icon: <Trophy size={16} />, label: 'View Achievements', path: '/progress', color: 'text-yellow-400' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200"
                >
                  <span className={action.color}>{action.icon}</span>
                  <span className="text-slate-300 text-sm">{action.label}</span>
                  <ChevronRight size={14} className="text-slate-500 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
