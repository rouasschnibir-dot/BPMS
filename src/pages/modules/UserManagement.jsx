import { useState, useMemo } from 'react';
import {
  Users, UserPlus, Shield, Mail, Eye, Edit, Trash2,
  Search, Filter, UserCheck, UserX, UserCog, Building2
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import StatCard from '../../components/ui/StatCard';
import { useRole } from '../../contexts/RoleContext';
import { users as mockUsers } from '../../data/mockData';

const roleColors = { Admin: 'violet', Manager: 'warning', HR: 'pink', Employee: 'brand', Observer: 'neutral' };
const avatarColors = {
  Admin: 'from-violet-500 to-purple-600',
  Manager: 'from-amber-500 to-orange-600',
  HR: 'from-pink-500 to-rose-600',
  Employee: 'from-brand-500 to-brand-600',
  Observer: 'from-gray-400 to-gray-500',
};

const columns = [
  {
    key: 'name', label: 'User',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-9 h-9 rounded-full
                         bg-gradient-to-br ${avatarColors[row.role]} text-white text-xs font-bold shrink-0`}>
          {row.avatar}
        </div>
        <div>
          <span className="font-semibold text-text-primary block text-sm">{val}</span>
          <span className="text-[11px] text-text-tertiary flex items-center gap-1">
            <Mail size={10} />{row.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: 'role', label: 'Role',
    render: (val) => <StatusBadge variant={roleColors[val]} size="sm">{val}</StatusBadge>,
  },
  { key: 'department', label: 'Department', cellClassName: 'text-text-secondary text-sm' },
  {
    key: 'status', label: 'Status',
    render: (val) => {
      const map = { active: 'success', inactive: 'danger', pending: 'warning' };
      return <StatusBadge variant={map[val]} dot size="sm">{val}</StatusBadge>;
    },
  },
  { key: 'lastLogin', label: 'Last Login', cellClassName: 'text-text-tertiary text-xs' },
  {
    key: 'actions', label: '',
    render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer"><Eye size={14} className="text-text-tertiary" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer"><Edit size={14} className="text-text-tertiary" /></button>
        <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"><Trash2 size={14} className="text-red-400" /></button>
      </div>
    ),
  },
];

export default function UserManagement() {
  const { currentRole } = useRole();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Filter users by organization (orgId)
  const orgUsers = useMemo(() => {
    return mockUsers.filter(u => u.orgId === currentRole.orgId);
  }, [currentRole.orgId]);

  const filtered = orgUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const activeCount = orgUsers.filter(u => u.status === 'active').length;
  const pendingCount = orgUsers.filter(u => u.status === 'pending').length;

  const handleInviteAction = () => {
    if (currentRole.id === 'admin') {
      alert('Invitation Hierarchy:\n- Can create Company Accounts\n- Can create HR Accounts');
    } else if (currentRole.id === 'hr') {
      alert('Invitation Hierarchy:\n- Can create Employee Accounts');
    } else {
      alert('You do not have permission to invite users.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="User Management"
        description={`Manage users for ${currentRole.orgId === 'org_1' ? 'TechCorp International' : 'Your Organization'}`}
        icon={Users}
        iconColor="from-violet-500 to-purple-600"
        actionLabel={currentRole.id === 'admin' || currentRole.id === 'hr' ? "Invite User" : null}
        actionIcon={UserPlus}
        actionColor="from-violet-500 to-purple-600"
        onAction={handleInviteAction}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Team Size" value={orgUsers.length.toString()} icon={Users} iconColor="bg-gradient-to-br from-brand-500 to-brand-600" delay={0} />
        <StatCard title="Active Now" value={activeCount.toString()} icon={UserCheck} iconColor="bg-gradient-to-br from-emerald-500 to-teal-600" delay={80} />
        <StatCard title="Pending" value={pendingCount.toString()} icon={UserCog} iconColor="bg-gradient-to-br from-amber-500 to-orange-500" delay={160} />
        <StatCard title="Role Scope" value={currentRole.label} icon={Shield} iconColor="bg-gradient-to-br from-violet-500 to-purple-600" subtitle={`Permissions for ${currentRole.id}`} delay={240} />
      </div>

      {/* Users Table */}
      <div className="bg-surface-primary rounded-2xl border border-border-secondary overflow-hidden animate-fade-in"
        style={{ animationDelay: '450ms' }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 pt-5 pb-3">
          <h2 className="text-sm font-semibold text-text-primary flex-1">Organization Users</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search team..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-sm bg-surface-secondary border border-border-secondary
                           focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                           transition-all duration-200 w-56 text-text-primary placeholder:text-text-tertiary"
              />
            </div>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm bg-surface-secondary border border-border-secondary
                         focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer
                         text-text-primary outline-none"
            >
              <option value="all">All Roles</option>
              {Object.keys(roleColors).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <DataTable columns={columns} data={filtered} emptyMessage="No users in this organization" />
      </div>
    </div>
  );
}
