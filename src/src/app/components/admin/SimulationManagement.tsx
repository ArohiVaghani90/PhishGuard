import { useState } from 'react';
import { simulationCampaigns as initialCampaigns } from '../../data/mockData';
import {
  Plus, Eye, Trash2, CheckCircle, X, AlertTriangle, Play,
  Calendar, Users, Target, TrendingUp, Mail
} from 'lucide-react';

type Campaign = typeof initialCampaigns[0];
type ModalType = 'create' | 'view' | 'delete' | null;

const TEMPLATES = [
  'IT Password Reset',
  'CEO Wire Transfer',
  'Package Delivery',
  'Invoice Payment',
  'HR Policy Update',
  'Benefits Enrollment',
  'IT Security Alert',
];
const GROUPS = ['All Users', 'Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'Legal', 'Operations', 'Sales & Finance'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

export function SimulationManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [modal, setModal] = useState<ModalType>(null);
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    template: TEMPLATES[0],
    targetGroup: GROUPS[0],
    difficulty: 'Intermediate',
    launchDate: '',
    endDate: '',
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = () => {
    const newCampaign: Campaign = {
      id: `sc${Date.now()}`,
      name: form.name,
      template: form.template,
      targetGroup: form.targetGroup,
      targetCount: form.targetGroup === 'All Users' ? 247 : Math.floor(Math.random() * 50) + 10,
      status: 'scheduled',
      launchDate: form.launchDate || '2024-04-15',
      endDate: form.endDate || '2024-04-22',
      results: null,
      difficulty: form.difficulty,
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setModal(null);
    setForm({ name: '', template: TEMPLATES[0], targetGroup: GROUPS[0], difficulty: 'Intermediate', launchDate: '', endDate: '' });
    showToast('Simulation campaign created and scheduled successfully!');
  };

  const handleDelete = () => {
    setCampaigns(prev => prev.filter(c => c.id !== selected?.id));
    setModal(null);
    showToast('Campaign deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400';
      case 'completed': return 'bg-slate-600 text-slate-400';
      case 'scheduled': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-600 text-slate-400';
    }
  };

  const getDifficultyColor = (d: string) => {
    if (d === 'Beginner') return 'bg-emerald-500/20 text-emerald-400';
    if (d === 'Intermediate') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

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
          <h1 className="text-white mb-1">Simulation Management</h1>
          <p className="text-slate-400 text-sm">{campaigns.length} campaigns • {campaigns.filter(c => c.status === 'active').length} currently active</p>
        </div>
        <button
          onClick={() => { setForm({ name: '', template: TEMPLATES[0], targetGroup: GROUPS[0], difficulty: 'Intermediate', launchDate: '', endDate: '' }); setModal('create'); }}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={14} /> Create Simulation
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Campaigns', value: campaigns.length, icon: <Mail size={18} className="text-blue-400" />, bg: 'bg-blue-500/20' },
          { label: 'Active Now', value: campaigns.filter(c => c.status === 'active').length, icon: <Play size={18} className="text-emerald-400" />, bg: 'bg-emerald-500/20' },
          { label: 'Users Tested', value: '512', icon: <Users size={18} className="text-purple-400" />, bg: 'bg-purple-500/20' },
          { label: 'Avg. Click Rate', value: '22%', icon: <Target size={18} className="text-red-400" />, bg: 'bg-red-500/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
            <div className="text-slate-400 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map(campaign => {
          const clickRate = campaign.results ? Math.round((campaign.results.clicked / campaign.results.total) * 100) : null;
          const reportRate = campaign.results ? Math.round((campaign.results.reported / campaign.results.total) * 100) : null;
          const openRate = campaign.results ? Math.round((campaign.results.opened / campaign.results.total) * 100) : null;

          return (
            <div key={campaign.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    campaign.status === 'active' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/30' :
                    campaign.status === 'scheduled' ? 'bg-yellow-400' : 'bg-slate-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white">{campaign.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(campaign.difficulty)}`}>
                        {campaign.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Mail size={11} />{campaign.template}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{campaign.targetGroup} ({campaign.targetCount} users)</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{campaign.launchDate} – {campaign.endDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setSelected(campaign); setModal('view'); }}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                    title="View Results"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => { setSelected(campaign); setModal('delete'); }}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Results */}
              {campaign.results ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{openRate}%</div>
                    <div className="text-slate-400 text-xs">Opened ({campaign.results.opened})</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-red-400">{clickRate}%</div>
                    <div className="text-slate-400 text-xs">Clicked Link ({campaign.results.clicked})</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">{reportRate}%</div>
                    <div className="text-slate-400 text-xs">Reported ({campaign.results.reported})</div>
                  </div>
                  {/* Bar */}
                  <div className="col-span-3">
                    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                      <div className="bg-blue-500" style={{ width: `${openRate}%` }} />
                      <div className="bg-red-500" style={{ width: `${clickRate}%` }} />
                      <div className="bg-emerald-500 flex-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700/30 rounded-xl p-3 flex items-center gap-2">
                  <Calendar size={14} className="text-yellow-400" />
                  <p className="text-slate-400 text-sm">Campaign scheduled for {campaign.launchDate}. Results will appear here once launched.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Create */}
            {modal === 'create' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Create Simulation Campaign</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Campaign Name *</label>
                    <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Q2 HR Department Simulation" className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Email Template *</label>
                    <select value={form.template} onChange={e => setForm(p => ({ ...p, template: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                      {TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Target Group *</label>
                      <select value={form.targetGroup} onChange={e => setForm(p => ({ ...p, targetGroup: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                        {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Difficulty</label>
                      <select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Launch Date</label>
                      <input type="date" value={form.launchDate} onChange={e => setForm(p => ({ ...p, launchDate: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">End Date</label>
                      <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3">
                    <p className="text-slate-400 text-xs mb-1">📧 Tracking Enabled</p>
                    <p className="text-slate-500 text-xs">Opened, clicked, submitted credentials, and reported actions will be tracked in real time.</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Cancel</button>
                  <button onClick={handleCreate} disabled={!form.name} className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2">
                    <Play size={14} /> Launch Campaign
                  </button>
                </div>
              </>
            )}

            {/* View */}
            {modal === 'view' && selected && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Campaign Results</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <h4 className="text-white mb-1">{selected.name}</h4>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(selected.status)}`}>{selected.status}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(selected.difficulty)}`}>{selected.difficulty}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: 'Template', value: selected.template },
                      { label: 'Target Group', value: selected.targetGroup },
                      { label: 'Total Users', value: selected.targetCount },
                      { label: 'Date Range', value: `${selected.launchDate} – ${selected.endDate}` },
                    ].map((s, i) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">{s.label}</p>
                        <p className="text-white">{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {selected.results ? (
                    <div>
                      <p className="text-slate-400 text-xs mb-2">Results</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Opened', value: selected.results.opened, color: 'text-blue-400' },
                          { label: 'Clicked', value: selected.results.clicked, color: 'text-red-400' },
                          { label: 'Reported', value: selected.results.reported, color: 'text-emerald-400' },
                        ].map((r, i) => (
                          <div key={i} className="bg-slate-700/50 rounded-lg p-3 text-center">
                            <div className={`text-xl font-bold ${r.color}`}>{r.value}</div>
                            <div className="text-slate-400 text-xs">{r.label}</div>
                            <div className={`text-xs ${r.color}`}>{Math.round((r.value / selected.results!.total) * 100)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                      <p className="text-yellow-400 text-sm">Results will appear once the campaign launches</p>
                    </div>
                  )}
                </div>
                <button onClick={() => setModal(null)} className="w-full mt-5 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Close</button>
              </>
            )}

            {/* Delete */}
            {modal === 'delete' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Delete Campaign</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                  <AlertTriangle size={20} className="text-red-400 mb-2" />
                  <p className="text-slate-300 text-sm">Delete campaign <strong className="text-white">"{selected?.name}"</strong>? All results data will be archived.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
