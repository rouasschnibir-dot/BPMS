import { useState, useMemo } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Building2, Clock,
  FileText, CreditCard, ShieldCheck, Search, Filter, X,
  ChevronRight, Download, Users, Edit
} from 'lucide-react';
import { useRole } from '../../contexts/RoleContext';
import { users as mockUsers } from '../../data/mockData';

function InfoItem({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="flex items-start gap-4 py-3 px-1 transition-colors hover:bg-surface-tertiary/50 rounded-xl">
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0
                      ${highlight ? 'bg-brand-500/10 text-brand-500' : 'bg-surface-secondary text-text-tertiary'}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest block mb-0.5">{label}</span>
        <span className={`text-sm font-semibold break-words ${highlight ? 'text-brand-600 dark:text-brand-400' : 'text-text-primary'}`}>
          {value || 'Not provided'}
        </span>
      </div>
    </div>
  );
}

function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 bg-surface-primary/20 backdrop-blur-md animate-fade-in overflow-hidden">
      {/* Backdrop Close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-surface-primary w-full max-w-5xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl border-none sm:border sm:border-border-secondary shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        {/* Premium Header / Banner */}
        <div className="h-40 sm:h-48 bg-gradient-to-br from-brand-600 via-brand-500 to-violet-600 relative shrink-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-2xl bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all border border-white/20 cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          <div className="absolute -bottom-12 left-10 flex items-end gap-6">
            <div className="relative">
              <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] bg-gradient-to-br from-white to-brand-50 text-brand-600 text-4xl font-extrabold shadow-2xl ring-8 ring-surface-primary animate-float">
                {employee.avatar}
              </div>
              <div className="absolute bottom-2 right-2 w-7 h-7 rounded-lg bg-emerald-500 border-4 border-surface-primary shadow-lg" />
            </div>
            <div className="pb-4 hidden sm:block">
              <h2 className="text-3xl font-black text-white drop-shadow-sm mb-1">{employee.name}</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/10">
                  {employee.role}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-950/20 backdrop-blur-md text-white/90 text-[11px] font-bold uppercase tracking-wider border border-white/5">
                  {employee.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto pt-16 pb-10 px-6 sm:px-10">
          <div className="sm:hidden mb-8">
            <h2 className="text-2xl font-black text-text-primary mb-1">{employee.name}</h2>
            <p className="text-brand-500 font-bold uppercase tracking-widest text-[10px]">{employee.role} • {employee.department}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Info Column */}
            <div className="lg:col-span-8 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-bold text-text-primary">Professional Profile</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed bg-surface-secondary/50 p-5 rounded-2xl border border-border-secondary">
                  {employee.bio || `High-performance team member at ${employee.department} department. Dedicated to excellence, innovation, and direct contribution to the company success since 2025.`}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-surface-primary border border-border-secondary shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-black text-text-tertiary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-brand-500" /> Identification & Compliance
                  </h3>
                  <div className="space-y-1">
                    <InfoItem icon={ShieldCheck} label="CNSS Number" value={employee.cnss} highlight />
                    <InfoItem icon={CreditCard} label="RIB / Bank ID" value={employee.rib} highlight />
                    <InfoItem icon={Building2} label="Organization" value="TechCorp International" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-surface-primary border border-border-secondary shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xs font-black text-text-tertiary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <User size={14} className="text-brand-500" /> Contact Details
                  </h3>
                  <div className="space-y-1">
                    <InfoItem icon={Mail} label="Professional Email" value={employee.email} />
                    <InfoItem icon={Phone} label="Mobile Phone" value={employee.phone} />
                    <InfoItem icon={MapPin} label="Work Location" value="Casablanca HQ" />
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-bold text-text-primary">Career Path</h3>
                </div>
                <div className="space-y-6 pl-2">
                  {[
                    { role: employee.role, date: 'Jan 2025 - Present', desc: 'Current active role with full responsibilities.' },
                    { role: 'Pre-onboarding', date: 'Dec 2024', desc: 'Recruitment and training phase.' },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-border-secondary pb-2 last:border-none">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-brand-500/10" />
                      <div>
                        <h4 className="text-sm font-bold text-text-primary">{step.role}</h4>
                        <span className="text-[10px] font-black text-brand-500 uppercase">{step.date}</span>
                        <p className="text-xs text-text-tertiary mt-1.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="p-6 rounded-3xl bg-brand-500/[0.03] border border-brand-500/10">
                <h3 className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-[0.2em] mb-5">Core Expertise</h3>
                <div className="flex flex-wrap gap-2.5">
                  {['Productivity', 'Digital Transformation', 'Strategic Planning', 'Agile', 'Team Leadership'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl bg-surface-primary border border-border-secondary text-xs font-bold text-text-secondary hover:border-brand-500/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-text-tertiary uppercase tracking-[0.2em] mb-4">Official Records</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Legal Employment Contract', size: '2.4 MB' },
                    { name: 'Digital Identity Copy', size: '1.1 MB' },
                    { name: 'Onboarding Checklist', size: '0.8 MB' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface-primary border border-border-secondary hover:border-brand-500/50 hover:bg-surface-secondary transition-all cursor-pointer group shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center text-text-tertiary group-hover:text-brand-500 transition-colors">
                          <FileText size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-text-primary block">{doc.name}</span>
                          <span className="text-[10px] text-text-tertiary font-medium">{doc.size}</span>
                        </div>
                      </div>
                      <Download size={14} className="text-text-tertiary group-hover:text-brand-500 hover:scale-110 transition-all font-bold" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 p-6 border-t border-border-secondary bg-surface-secondary/50 backdrop-blur-md flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-text-tertiary">
            <ShieldCheck size={16} className="text-brand-500" />
            <span className="text-xs font-bold uppercase tracking-widest">Confidential Record</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl border border-border-secondary text-sm font-bold text-text-secondary hover:bg-surface-primary transition-all cursor-pointer active:scale-95"
            >
              Close Profile
            </button>
            <button className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-bold shadow-xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2">
              <Edit size={16} /> Edit Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmployeeProfile() {
  const { currentRole } = useRole();
  const [search, setSearch] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const orgEmployees = useMemo(() => {
    return mockUsers.filter(u => u.orgId === currentRole.orgId);
  }, [currentRole.orgId]);

  const filtered = orgEmployees.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 animate-pulse-slow">
              <Users size={24} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tighter">Team Directory</h1>
          </div>
          <p className="text-sm font-medium text-text-secondary max-w-md pl-1">
            Browse and manage your organization's professional talent network with filtered access.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" />
            <input
              type="text"
              placeholder="Search by name, role, department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold bg-surface-primary border border-border-secondary shadow-md focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all placeholder:text-text-tertiary"
            />
          </div>
          <button className="hidden sm:flex p-3.5 rounded-2xl bg-surface-primary border border-border-secondary text-text-secondary hover:text-brand-500 transition-colors shadow-sm cursor-pointer hover:shadow-md">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-children">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmployee(emp)}
            className="group relative bg-surface-primary rounded-[2.5rem] border border-border-secondary p-7 hover-lift cursor-pointer overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

            <div className="flex flex-col items-center relative z-10">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[2rem] bg-surface-secondary flex items-center justify-center border-2 border-border-secondary group-hover:border-brand-500/30 transition-all duration-300">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-brand-500/10 transform group-hover:rotate-6 transition-transform">
                    {emp.avatar}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 border-4 border-surface-primary shadow-lg" />
              </div>

              <h3 className="text-xl font-black text-text-primary group-hover:text-brand-500 transition-colors tracking-tight">{emp.name}</h3>
              <p className="text-[11px] font-black text-brand-500 uppercase tracking-[0.2em] mt-1">{emp.role}</p>

              <div className="mt-4 px-4 py-1.5 rounded-full bg-surface-secondary/80 backdrop-blur-sm border border-border-secondary text-[10px] font-black text-text-tertiary uppercase tracking-wider group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all">
                {emp.department}
              </div>

              <div className="mt-8 pt-6 border-t border-border-secondary w-full flex items-center justify-between group-hover:border-brand-500/10 transition-colors">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-surface-primary bg-surface-tertiary flex items-center justify-center text-[10px] font-bold text-text-tertiary">
                      {String.fromCharCode(64 + j + (emp.id % 10))}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-surface-primary bg-brand-500 flex items-center justify-center text-[8px] font-black text-white">
                    +7
                  </div>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-surface-secondary group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 press overflow-hidden shadow-inner translate-x-1">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Data State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-surface-primary rounded-[3rem] border-2 border-dashed border-border-secondary animate-fade-in shadow-inner">
          <div className="p-8 rounded-[2rem] bg-surface-secondary mb-6 text-brand-300 animate-float">
            <Search size={48} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-black text-text-primary tracking-tight">Search Result: Zero</h3>
          <p className="text-sm font-semibold text-text-tertiary mt-2">Try a different name or department filter</p>
          <button
            onClick={() => setSearch('')}
            className="mt-8 px-8 py-3 rounded-2xl bg-surface-secondary text-brand-600 text-sm font-bold hover:bg-brand-500 hover:text-white transition-all cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Details Modal Component */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
