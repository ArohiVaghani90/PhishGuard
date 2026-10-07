import { useNavigate } from 'react-router';
import { adminUsers, simulationCampaigns, trainingModules, reportData } from '../../data/mockData';
import {
  Users, BookOpen, Mail, BarChart2, TrendingUp, AlertTriangle,
  ChevronRight, Shield, Activity, UserCheck, Target
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

function StatCard({ icon, label, value, sub, color, onClick }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string; onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800 border border-slate-700 rounded-xl p-5 ${onClick ? 'cursor-pointer hover:border-slate-500 transition-all duration-200' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
        {onClick && <ChevronRight size={16} className="text-slate-500" />}
      </div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-slate-400 text-xs">{label}</div>
      {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export function AdminDashboard() {
  const navigate = useNavigate();

  const activeUsers = adminUsers.filter(u => u.status === 'active').length;
  const highRiskUsers = adminUsers.filter(u => u.riskLevel === 'high').length;
  const avgProgress = Math.round(adminUsers.reduce((sum, u) => sum + u.progress, 0) / adminUsers.length);
  const activeSimulations = simulationCampaigns.filter(s => s.status === 'active').length;

  const riskUsers = adminUsers.filter(u => u.riskLevel === 'high' || (u.progress < 30 && u.status === 'active'));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white mb-1">Admin Overview</h1>
        <p className="text-slate-400 text-sm">Organization security training summary — March 2024</p>
      </div>

      {/* Alert */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
        <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-300 text-sm">
            <span className="font-semibold">{highRiskUsers} high-risk users</span> have not completed required training or have a high phishing click rate.
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/users')}
          className="text-red-400 text-xs hover:text-red-300 flex items-center gap-1 flex-shrink-0"
        >
          View <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users size={20} className="text-cyan-400" />}
          label="Total Users"
          value={adminUsers.length}
          sub={`${activeUsers} active`}
          color="bg-cyan-500/20"
          onClick={() => navigate('/admin/users')}
        />
        <StatCard
          icon={<BookOpen size={20} className="text-blue-400" />}
          label="Training Modules"
          value={trainingModules.length}
          sub={`Avg. ${avgProgress}% completion`}
          color="bg-blue-500/20"
          onClick={() => navigate('/admin/modules')}
        />
        <StatCard
          icon={<Mail size={20} className="text-purple-400" />}
          label="Active Campaigns"
          value={activeSimulations}
          sub={`${simulationCampaigns.length} total campaigns`}
          color="bg-purple-500/20"
          onClick={() => navigate('/admin/simulations')}
        />
        <StatCard
          icon={<AlertTriangle size={20} className="text-red-400" />}
          label="High Risk Users"
          value={highRiskUsers}
          sub="Require immediate attention"
          color="bg-red-500/20"
          onClick={() => navigate('/admin/users')}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Completion Trend Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm">Training & Simulation Activity (6 months)</h3>
              <button
                onClick={() => navigate('/admin/reports')}
                className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1"
              >
                Full Report <ChevronRight size={14} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={reportData.completionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }} />
                <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} name="Module Completions" />
                <Line type="monotone" dataKey="simulations" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} name="Simulation Passes" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm">Recent Simulation Campaigns</h3>
              <button
                onClick={() => navigate('/admin/simulations')}
                className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1"
              >
                Manage <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {simulationCampaigns.slice(0, 3).map(campaign => {
                const clickRate = campaign.results ? Math.round((campaign.results.clicked / campaign.results.total) * 100) : 0;
                const reportRate = campaign.results ? Math.round((campaign.results.reported / campaign.results.total) * 100) : 0;
                return (
                  <div key={campaign.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-xl">
                    <div className={`w-2 h-8 rounded-full flex-shrink-0 ${
                      campaign.status === 'active' ? 'bg-green-400' :
                      campaign.status === 'completed' ? 'bg-slate-500' :
                      'bg-yellow-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm truncate">{campaign.name}</p>
                      <p className="text-slate-500 text-xs">{campaign.targetGroup} • {campaign.targetCount} users</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {campaign.results ? (
                        <>
                          <p className="text-red-400 text-xs">Click rate: {clickRate}%</p>
                          <p className="text-emerald-400 text-xs">Report rate: {reportRate}%</p>
                        </>
                      ) : (
                        <span className="text-yellow-400 text-xs">Scheduled</span>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      campaign.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                      campaign.status === 'completed' ? 'bg-slate-600 text-slate-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* At-Risk Users */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400" /> At-Risk Users
              </h3>
              <button
                onClick={() => navigate('/admin/users')}
                className="text-cyan-400 text-xs hover:text-cyan-300 flex items-center gap-1"
              >
                All <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {riskUsers.slice(0, 5).map(user => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{user.firstName[0]}{user.lastName[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs">{user.firstName} {user.lastName}</p>
                    <p className="text-slate-500 text-xs">{user.department} • {user.progress}% complete</p>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    user.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.riskLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Platform Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Avg. User Progress', value: `${avgProgress}%`, icon: <TrendingUp size={14} className="text-cyan-400" /> },
                { label: 'Active Users (30d)', value: `${activeUsers}/${adminUsers.length}`, icon: <UserCheck size={14} className="text-emerald-400" /> },
                { label: 'Simulations This Month', value: '247', icon: <Target size={14} className="text-purple-400" /> },
                { label: 'Avg. Phishing Click Rate', value: '22%', icon: <Activity size={14} className="text-red-400" /> },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-700 last:border-0">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <span className="text-white text-sm font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Create Training Module', path: '/admin/modules', icon: <BookOpen size={14} /> },
                { label: 'Launch Simulation', path: '/admin/simulations', icon: <Mail size={14} /> },
                { label: 'View Reports', path: '/admin/reports', icon: <BarChart2 size={14} /> },
                { label: 'Manage Users', path: '/admin/users', icon: <Users size={14} /> },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-left"
                >
                  <span className="text-cyan-400">{action.icon}</span>
                  <span className="text-slate-300 text-sm">{action.label}</span>
                  <ChevronRight size={12} className="text-slate-500 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
