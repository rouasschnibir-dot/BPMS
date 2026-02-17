import { useState, useMemo } from 'react';
import {
  Building2, Plus, Users, Globe, MapPin, Phone, Mail,
  MoreHorizontal, Edit, Trash2, Eye,
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import { useRole } from '../../contexts/RoleContext';
import { organizations as mockOrgs } from '../../data/mockData';

const columns = [
  {
    key: 'name', label: 'Organization',
    render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl
                        bg-gradient-to-br from-brand-500/15 to-brand-600/15 shrink-0">
          <Building2 size={18} className="text-brand-500" />
        </div>
        <div>
          <span className="font-semibold text-text-primary block">{val}</span>
          <span className="text-[11px] text-text-tertiary">{row.industry}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'location', label: 'Location',
    render: (val) => (
      <div className="flex items-center gap-1.5 text-text-secondary text-xs">
        <MapPin size={12} className="text-text-tertiary" />{val}
      </div>
    ),
  },
  { key: 'employees', label: 'Employees', cellClassName: 'font-semibold text-text-primary' },
  {
    key: 'plan', label: 'Plan',
    render: (val) => (
      <StatusBadge variant={val === 'Enterprise' ? 'violet' : val === 'Business' ? 'brand' : 'neutral'} size="sm">
        {val}
      </StatusBadge>
    ),
  },
  {
    key: 'status', label: 'Status',
    render: (val) => {
      const map = { active: 'success', trial: 'warning', suspended: 'danger' };
      return <StatusBadge variant={map[val]} dot size="sm">{val}</StatusBadge>;
    },
  },
  { key: 'created', label: 'Created', cellClassName: 'text-text-tertiary text-xs' },
  {
    key: 'actions', label: '',
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer" title="View">
          <Eye size={14} className="text-text-tertiary" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer" title="Edit">
          <Edit size={14} className="text-text-tertiary" />
        </button>
      </div>
    ),
  },
];

export default function EnterpriseManagement() {
  const { currentRole } = useRole();
  const [search, setSearch] = useState('');

  // Filter enterprises to show only the current user's organization
  const filtered = useMemo(() => {
    return mockOrgs.filter(e => e.id === currentRole.orgId &&
      (e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.industry.toLowerCase().includes(search.toLowerCase())));
  }, [currentRole.orgId, search]);

  const stats = useMemo(() => {
    const org = mockOrgs.find(o => o.id === currentRole.orgId) || filtered[0];
    return [
      { label: 'My Organization', value: org?.name || 'Loading...', icon: Building2, color: 'from-brand-500 to-brand-600' },
      { label: 'Status', value: org?.status || 'active', icon: Globe, color: 'from-emerald-500 to-teal-600' },
      { label: 'Total Team', value: org?.employees?.toLocaleString() || '0', icon: Users, color: 'from-violet-500 to-purple-600' },
      { label: 'Current Plan', value: org?.plan || 'Enterprise', icon: Globe, color: 'from-amber-500 to-orange-600' },
    ];
  }, [currentRole.orgId, filtered]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Enterprise Information"
        description="View and manage your organization details"
        icon={Building2}
        iconColor="from-brand-500 to-brand-600"
        actionLabel={currentRole.id === 'admin' ? "Update Info" : null}
        actionIcon={Edit}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card, i) => (
          <div key={i} className="bg-surface-primary rounded-2xl border border-border-secondary p-4
                                  hover:shadow-md transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{card.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color}
                              flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon size={14} className="text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold text-text-primary mt-2 block truncate">{card.value}</span>
          </div>
        ))}
      </div>

      {/* Search + Table */}
      <div className="bg-surface-primary rounded-2xl border border-border-secondary overflow-hidden animate-fade-in"
        style={{ animationDelay: '450ms' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 pt-5 pb-3">
          <h2 className="text-sm font-semibold text-text-primary">Your Organization</h2>
          <input
            type="text"
            placeholder="Search details..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm bg-surface-secondary border border-border-secondary
                       focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400
                       transition-all duration-200 w-full sm:w-64 text-text-primary placeholder:text-text-tertiary"
          />
        </div>
        <DataTable columns={columns} data={filtered} emptyMessage="No organization details found" />
      </div>
    </div>
  );
}
