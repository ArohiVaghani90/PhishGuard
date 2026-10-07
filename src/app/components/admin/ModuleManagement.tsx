import { useState } from 'react';
import { trainingModules as initialModules } from '../../data/mockData';
import {
  Plus, Edit2, Trash2, Eye, CheckCircle, BookOpen, Clock,
  X, AlertTriangle, Save, Search, Award
} from 'lucide-react';

type Module = typeof initialModules[0];
type ModalType = 'create' | 'edit' | 'delete' | 'preview' | null;

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const CATEGORIES = ['Foundations', 'Technical', 'Psychology', 'Advanced Defense', 'Practical Skills', 'Procedures'];

export function ModuleManagement() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    category: 'Foundations',
    duration: '30 min',
    points: 100,
    lessons: 5,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setForm({ title: '', description: '', difficulty: 'Beginner', category: 'Foundations', duration: '30 min', points: 100, lessons: 5 });
    setSelectedModule(null);
    setModal('create');
  };

  const openEdit = (mod: Module) => {
    setSelectedModule(mod);
    setForm({
      title: mod.title,
      description: mod.description,
      difficulty: mod.difficulty,
      category: mod.category,
      duration: mod.duration,
      points: mod.points,
      lessons: mod.lessons,
    });
    setModal('edit');
  };

  const handleSave = () => {
    if (modal === 'create') {
      const newModule: Module = {
        id: `tm${Date.now()}`,
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,
        category: form.category,
        duration: form.duration,
        points: form.points,
        lessons: form.lessons,
        progress: 0,
        score: null,
        completed: false,
        tags: [form.category.toLowerCase()],
        lastActivity: null,
        quiz: [],
      };
      setModules(prev => [...prev, newModule]);
      showToast('Training module created and published successfully');
    } else if (modal === 'edit' && selectedModule) {
      setModules(prev => prev.map(m => m.id === selectedModule.id ? { ...m, ...form } : m));
      showToast('Training module updated successfully');
    }
    setModal(null);
  };

  const handleDelete = () => {
    setModules(prev => prev.filter(m => m.id !== selectedModule?.id));
    setModal(null);
    showToast('Module deleted. Affected user progress records archived.');
  };

  const filtered = modules.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-white mb-1">Module Management</h1>
          <p className="text-slate-400 text-sm">{modules.length} training modules available</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={14} /> Create Module
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search modules..."
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(mod => (
          <div key={mod.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <BookOpen size={18} className="text-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setSelectedModule(mod); setModal('preview'); }} className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors" title="Preview">
                  <Eye size={14} />
                </button>
                <button onClick={() => openEdit(mod)} className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors" title="Edit">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => { setSelectedModule(mod); setModal('delete'); }} className="p-1.5 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="text-white text-sm mb-1">{mod.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{mod.description}</p>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                mod.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                mod.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{mod.difficulty}</span>
              <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{mod.category}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Clock size={11} />{mod.duration}</span>
              <span className="flex items-center gap-1"><BookOpen size={11} />{mod.lessons} lessons</span>
              <span className="flex items-center gap-1"><Award size={11} />+{mod.points} pts</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 text-xs">Published</span>
              </div>
              <span className="text-slate-500 text-xs">
                {mod.completed ? `${mod.score}% avg score` : mod.progress > 0 ? 'In progress' : 'Not started'}
              </span>
            </div>
          </div>
        ))}

        {/* Create card */}
        <button
          onClick={openCreate}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-200 text-slate-500 hover:text-cyan-400"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="text-sm">Create New Module</span>
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Create / Edit */}
            {(modal === 'create' || modal === 'edit') && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">{modal === 'create' ? 'Create Training Module' : 'Edit Training Module'}</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Module Title *</label>
                    <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Advanced Spear Phishing Defense" className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Description *</label>
                    <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe what users will learn..." rows={3} className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Difficulty *</label>
                      <select value={form.difficulty} onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                        {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Category *</label>
                      <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Duration</label>
                      <input value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Points</label>
                      <input type="number" value={form.points} onChange={e => setForm(p => ({ ...p, points: +e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Lessons</label>
                      <input type="number" value={form.lessons} onChange={e => setForm(p => ({ ...p, lessons: +e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-2">Passing Criteria</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-300 text-sm">Minimum score:</span>
                      <span className="text-cyan-400 font-semibold">70%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                  <button
                    onClick={handleSave}
                    disabled={!form.title || !form.description}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-900 font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    {modal === 'create' ? 'Save & Publish' : 'Save Changes'}
                  </button>
                </div>
              </>
            )}

            {/* Preview */}
            {modal === 'preview' && selectedModule && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Module Preview</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-xl p-4">
                    <h4 className="text-white mb-1">{selectedModule.title}</h4>
                    <p className="text-slate-400 text-sm">{selectedModule.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: 'Difficulty', value: selectedModule.difficulty },
                      { label: 'Duration', value: selectedModule.duration },
                      { label: 'Points', value: `+${selectedModule.points}` },
                    ].map((s, i) => (
                      <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                        <p className="text-white text-sm font-semibold">{s.value}</p>
                        <p className="text-slate-400 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedModule.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">Quiz: {selectedModule.quiz.length} questions (70% passing score)</p>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Close</button>
                  <button onClick={() => openEdit(selectedModule)} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2.5 rounded-lg text-sm">Edit Module</button>
                </div>
              </>
            )}

            {/* Delete */}
            {modal === 'delete' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Delete Module</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                  <AlertTriangle size={20} className="text-red-400 mb-2" />
                  <p className="text-slate-300 text-sm">Permanently delete <strong className="text-white">"{selectedModule?.title}"</strong>? This will remove the module from all users' training tracks and archive their progress data.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm">Delete Module</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
