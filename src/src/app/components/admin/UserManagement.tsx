import { useState } from 'react';
import { adminUsers as initialUsers } from '../../data/mockData';
import {
  Search, Filter, Plus, Edit2, Trash2, UserX, UserCheck,
  Upload, Download, X, CheckCircle, AlertTriangle, ChevronDown
} from 'lucide-react';

type User = typeof initialUsers[0];
type ModalType = 'edit' | 'delete' | 'deactivate' | 'create' | 'bulk' | null;

const DEPARTMENTS = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'Legal', 'Operations', 'IT Security'];

function RiskBadge({ level }: { level: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
      level === 'high' ? 'bg-red-500/20 text-red-400' :
      level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
      'bg-emerald-500/20 text-emerald-400'
    }`}>{level}</span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${
      status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-slate-400'
    }`}>{status}</span>
  );
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [bulkStep, setBulkStep] = useState(1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = users.filter(u => {
    const matchSearch = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === 'All' || u.department === filterDept;
    const matchRisk = filterRisk === 'All' || u.riskLevel === filterRisk;
    const matchStatus = filterStatus === 'All' || u.status === filterStatus;
    return matchSearch && matchDept && matchRisk && matchStatus;
  });

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setModal('edit');
  };

  const handleSaveEdit = () => {
    setUsers(prev => prev.map(u => u.id === selectedUser?.id ? { ...u, ...editForm } : u));
    setModal(null);
    showToast('User account updated successfully');
  };

  const handleDeactivate = () => {
    setUsers(prev => prev.map(u => u.id === selectedUser?.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    setModal(null);
    showToast(`User ${selectedUser?.status === 'active' ? 'deactivated' : 'reactivated'} successfully`);
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== selectedUser?.id));
    setModal(null);
    showToast('User account deleted');
  };

  const handleCreate = () => {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: editForm.firstName || 'New',
      lastName: editForm.lastName || 'User',
      email: editForm.email || 'new@company.com',
      department: editForm.department || 'Engineering',
      role: 'user',
      status: 'active',
      progress: 0,
      lastLogin: 'Never',
      riskLevel: 'medium',
    };
    setUsers(prev => [newUser, ...prev]);
    setModal(null);
    setEditForm({});
    showToast('New user account created successfully');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle size={16} />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white mb-1">User Management</h1>
          <p className="text-slate-400 text-sm">{users.length} total users • {users.filter(u => u.status === 'active').length} active</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setEditForm({}); setModal('bulk'); setBulkStep(1); }}
            className="flex items-center gap-2 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Upload size={14} /> Bulk Upload
          </button>
          <button
            onClick={() => { setEditForm({}); setModal('create'); }}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors w-56"
          />
        </div>
        {[
          { label: 'Department', value: filterDept, setter: setFilterDept, options: ['All', ...DEPARTMENTS] },
          { label: 'Risk', value: filterRisk, setter: setFilterRisk, options: ['All', 'low', 'medium', 'high'] },
          { label: 'Status', value: filterStatus, setter: setFilterStatus, options: ['All', 'active', 'inactive'] },
        ].map((f, i) => (
          <div key={i} className="relative">
            <select
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
            >
              {f.options.map(o => <option key={o} value={o}>{f.label}: {o === 'All' ? 'All' : o}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        ))}
        <button
          onClick={() => showToast('Exporting analytics data... CSV will be sent to your email.')}
          className="flex items-center gap-2 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 px-3 py-2 rounded-lg text-sm transition-colors ml-auto"
        >
          <Download size={14} /> Export Analytics
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/30">
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">User</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Department</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Status</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Progress</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Risk</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Last Login</th>
                <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        user.riskLevel === 'high' ? 'bg-red-500/30 text-red-300' :
                        user.riskLevel === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
                        'bg-emerald-500/30 text-emerald-300'
                      }`}>
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm">{user.firstName} {user.lastName}</p>
                        <p className="text-slate-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-sm">{user.department}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${user.progress >= 70 ? 'bg-emerald-500' : user.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                      <span className="text-slate-300 text-xs">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><RiskBadge level={user.riskLevel} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{user.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setModal('deactivate'); }}
                        className="text-slate-400 hover:text-yellow-400 transition-colors p-1"
                        title={user.status === 'active' ? 'Deactivate' : 'Reactivate'}
                      >
                        {user.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setModal('delete'); }}
                        className="text-slate-400 hover:text-red-400 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No users found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
          <p className="text-slate-500 text-xs">Showing {filtered.length} of {users.length} users</p>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            {/* Edit / Create Modal */}
            {(modal === 'edit' || modal === 'create') && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">{modal === 'edit' ? 'Edit User' : 'Create User'}</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">First Name</label>
                      <input value={editForm.firstName || ''} onChange={e => setEditForm(p => ({ ...p, firstName: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Last Name</label>
                      <input value={editForm.lastName || ''} onChange={e => setEditForm(p => ({ ...p, lastName: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Email</label>
                    <input value={editForm.email || ''} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs mb-1 block">Department</label>
                    <select value={editForm.department || ''} onChange={e => setEditForm(p => ({ ...p, department: e.target.value }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  {modal === 'edit' && (
                    <div>
                      <label className="text-slate-400 text-xs mb-1 block">Role</label>
                      <select value={editForm.role || 'user'} onChange={e => setEditForm(p => ({ ...p, role: e.target.value as 'user' | 'admin' }))} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                  <button onClick={modal === 'edit' ? handleSaveEdit : handleCreate} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                    {modal === 'edit' ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </>
            )}

            {/* Delete Modal */}
            {modal === 'delete' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Delete User</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                  <AlertTriangle size={20} className="text-red-400 mb-2" />
                  <p className="text-slate-300 text-sm">You are about to permanently delete <strong className="text-white">{selectedUser?.firstName} {selectedUser?.lastName}</strong>. This action cannot be undone.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">Delete Account</button>
                </div>
              </>
            )}

            {/* Deactivate Modal */}
            {modal === 'deactivate' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">{selectedUser?.status === 'active' ? 'Deactivate' : 'Reactivate'} User</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                <p className="text-slate-300 text-sm mb-5">
                  {selectedUser?.status === 'active'
                    ? `Deactivating ${selectedUser.firstName} ${selectedUser.lastName} will suspend their account. Their data will be preserved.`
                    : `Reactivating ${selectedUser?.firstName} ${selectedUser?.lastName} will restore their access to the platform.`}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 hover:text-white py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                  <button onClick={handleDeactivate} className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-2.5 rounded-lg text-sm transition-colors">
                    {selectedUser?.status === 'active' ? 'Deactivate' : 'Reactivate'}
                  </button>
                </div>
              </>
            )}

            {/* Bulk Upload Modal */}
            {modal === 'bulk' && (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white">Bulk User Upload</h3>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-white"><X size={18} /></button>
                </div>
                {bulkStep === 1 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-4">Upload a CSV file with user data. Required columns: First Name, Last Name, Email, Department.</p>
                    <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center mb-4">
                      <Upload size={32} className="text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm mb-2">Drop your CSV file here or click to browse</p>
                      <button className="text-cyan-400 text-xs hover:text-cyan-300">Download template CSV</button>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setModal(null)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Cancel</button>
                      <button onClick={() => setBulkStep(2)} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2.5 rounded-lg text-sm">Upload File</button>
                    </div>
                  </div>
                )}
                {bulkStep === 2 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-4">Preview of 5 users to be imported:</p>
                    <div className="bg-slate-700/50 rounded-xl p-3 mb-4 space-y-2">
                      {['Alice Brown', 'Bob Chen', 'Carol Davis', 'Dave Evans', 'Eve Foster'].map((name, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-slate-300">{name}</span>
                          <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={10} /> Valid</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBulkStep(1)} className="flex-1 border border-slate-600 text-slate-400 py-2.5 rounded-lg text-sm">Back</button>
                      <button onClick={() => { setModal(null); showToast('5 users enrolled successfully!'); }} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-2.5 rounded-lg text-sm">Confirm & Enroll</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
