import { useState } from 'react';
import { reportData, adminUsers } from '../../data/mockData';
import {
  Download, Filter, TrendingUp, Users, Target, AlertTriangle,
  CheckCircle, BarChart2, PieChart as PieIcon
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('6months');
  const [department, setDepartment] = useState('All');
  const [reportType, setReportType] = useState('overview');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = (format: string) => {
    showToast(`Report exported as ${format}. Check your email for the download link.`);
  };

  const avgProgress = Math.round(adminUsers.reduce((sum, u) => sum + u.progress, 0) / adminUsers.length);
  const highRisk = adminUsers.filter(u => u.riskLevel === 'high').length;
  const lowRisk = adminUsers.filter(u => u.riskLevel === 'low').length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle size={16} /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white mb-1">Reports & Analytics</h1>
          <p className="text-slate-400 text-sm">Analyze user performance and training effectiveness</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-2 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-800 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Filter size={14} /> Filters:
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Date Range', value: dateRange, setter: setDateRange, options: [['30days', 'Last 30 days'], ['3months', 'Last 3 months'], ['6months', 'Last 6 months'], ['year', 'Last year']] },
            { label: 'Department', value: department, setter: setDepartment, options: [['All', 'All Departments'], ['Engineering', 'Engineering'], ['Marketing', 'Marketing'], ['Finance', 'Finance'], ['HR', 'HR'], ['Sales', 'Sales']] },
          ].map((f, i) => (
            <select
              key={i}
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
            >
              {f.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          ))}
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-800 border border-slate-700 rounded-xl p-1 w-fit">
        {[
          { key: 'overview', label: 'Overview', icon: <BarChart2 size={14} /> },
          { key: 'users', label: 'User Progress', icon: <Users size={14} /> },
          { key: 'simulations', label: 'Simulations', icon: <Target size={14} /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setReportType(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              reportType === tab.key
                ? 'bg-cyan-500 text-slate-900 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Report */}
      {reportType === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Avg. Training Completion', value: `${avgProgress}%`, change: '+12%', positive: true, icon: <TrendingUp size={18} className="text-cyan-400" /> },
              { label: 'Users at High Risk', value: highRisk, change: '-2', positive: true, icon: <AlertTriangle size={18} className="text-red-400" /> },
              { label: 'Phishing Click Rate', value: '22%', change: '-8%', positive: true, icon: <Target size={18} className="text-purple-400" /> },
              { label: 'Users in Low Risk', value: lowRisk, change: '+5', positive: true, icon: <CheckCircle size={18} className="text-emerald-400" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                {stat.icon}
                <div className="text-2xl font-bold text-white mt-2 mb-0.5">{stat.value}</div>
                <div className="text-slate-400 text-xs">{stat.label}</div>
                <div className={`text-xs mt-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.change} vs last period
                </div>
              </div>
            ))}
          </div>

          {/* Trend Chart */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Training & Simulation Completion Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={reportData.completionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
                <Line type="monotone" dataKey="completions" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} name="Module Completions" />
                <Line type="monotone" dataKey="simulations" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 4 }} name="Simulation Passes" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Module Completion */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white text-sm mb-4">Module Completion by Course</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={reportData.moduleCompletion} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="module" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} formatter={(v) => [`${v}%`, 'Completion']} />
                  <Bar dataKey="completion" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Simulation Outcomes */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white text-sm mb-4">Simulation Outcomes</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={reportData.simulationOutcomes} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {reportData.simulationOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} formatter={(v) => [`${v}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3">
                  {reportData.simulationOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: outcome.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{outcome.name}</span>
                          <span className="text-white font-semibold">{outcome.value}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dept Risk */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Risk Level by Department</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={reportData.departmentRisk}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
                <Bar dataKey="low" fill="#10b981" name="Low Risk" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="medium" fill="#f59e0b" name="Medium Risk" stackId="a" />
                <Bar dataKey="high" fill="#ef4444" name="High Risk" radius={[2, 2, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* User Progress Report */}
      {reportType === 'users' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-white text-sm">Individual User Progress</h3>
            <button
              onClick={() => handleExport('CSV')}
              className="flex items-center gap-2 text-cyan-400 text-xs hover:text-cyan-300"
            >
              <Download size={12} /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-400 border-b border-slate-700 bg-slate-700/30">
                  <th className="text-left px-4 py-3">User</th>
                  <th className="text-left px-4 py-3">Department</th>
                  <th className="text-left px-4 py-3">Progress</th>
                  <th className="text-left px-4 py-3">Risk Level</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {adminUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div>
                          <p className="text-white text-sm">{user.firstName} {user.lastName}</p>
                          <p className="text-slate-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{user.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${user.progress >= 70 ? 'bg-emerald-500' : user.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' :
                        user.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>{user.riskLevel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${user.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Simulation Report */}
      {reportType === 'simulations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Avg. Click Rate', value: '22%', icon: '🎣', color: 'text-red-400' },
              { label: 'Avg. Report Rate', value: '45%', icon: '📧', color: 'text-emerald-400' },
              { label: 'Avg. Ignore Rate', value: '33%', icon: '👀', color: 'text-yellow-400' },
            ].map((s, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
                <div className="text-slate-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white text-sm mb-4">Simulation Results Breakdown</h3>
            <div className="space-y-4">
              {[
                { name: 'Q1 Password Reset Campaign', total: 247, clicked: 54, reported: 112, ignored: 81 },
                { name: 'Finance Dept Spear Phishing', total: 18, clicked: 8, reported: 6, ignored: 4 },
                { name: 'March All-Hands Awareness', total: 247, clicked: 33, reported: 89, ignored: 125 },
              ].map((sim, i) => (
                <div key={i} className="p-4 bg-slate-700/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white text-sm">{sim.name}</p>
                    <span className="text-slate-400 text-xs">{sim.total} targets</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    <div className="bg-red-500 rounded-l-full" style={{ width: `${(sim.clicked / sim.total) * 100}%` }} title={`Clicked: ${sim.clicked}`} />
                    <div className="bg-emerald-500" style={{ width: `${(sim.reported / sim.total) * 100}%` }} title={`Reported: ${sim.reported}`} />
                    <div className="bg-yellow-500 rounded-r-full flex-1" title={`Ignored: ${sim.ignored}`} />
                  </div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-red-400">🎣 {sim.clicked} clicked ({Math.round(sim.clicked/sim.total*100)}%)</span>
                    <span className="text-emerald-400">✓ {sim.reported} reported ({Math.round(sim.reported/sim.total*100)}%)</span>
                    <span className="text-yellow-400">◯ {sim.ignored} ignored ({Math.round(sim.ignored/sim.total*100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
