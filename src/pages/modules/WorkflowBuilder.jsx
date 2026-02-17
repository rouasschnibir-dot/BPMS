import { useState } from 'react';
import {
  GitBranch, Plus, Play, Pause, Save, Eye, Settings2,
  Layers, Zap, Copy,
} from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import StatusBadge from '../../components/ui/StatusBadge';
import WorkflowStep, { STEP_TYPES } from '../../components/ui/WorkflowStep';

/**
 * Mock workflow definition — represents a realistic HR Onboarding process.
 */
const mockWorkflow = {
  name: 'Employee Onboarding',
  version: '1.2',
  status: 'published',
  lastModified: 'Feb 13, 2026 — 14:32',
  author: 'Ibrahim Rouass',
  steps: [
    {
      type: 'start',
      title: 'Onboarding Initiated',
      description: 'Triggered when a new hire is confirmed in the system.',
    },
    {
      type: 'task',
      title: 'Prepare Employee Profile',
      description: 'Create employee account, assign department, set up credentials and workspace access.',
      assignee: 'HR Admin',
      duration: '1 day',
      conditions: ['Employee data validated', 'Contract signed'],
    },
    {
      type: 'approval',
      title: 'Manager Approval',
      description: 'Direct manager reviews and approves the onboarding package including role assignments.',
      assignee: 'Team Manager',
      duration: '2 days',
      conditions: ['Profile complete', 'Equipment requested'],
    },
    {
      type: 'decision',
      title: 'Background Check',
      description: 'Route based on background verification results. Approved candidates proceed; flagged ones require review.',
      conditions: ['If passed → Continue', 'If flagged → Manual Review', 'If failed → Reject'],
    },
    {
      type: 'task',
      title: 'IT Setup & Provisioning',
      description: 'Configure email, development tools, VPN access, and equipment allocation.',
      assignee: 'IT Support',
      duration: '1 day',
      conditions: ['Laptop assigned', 'Accounts provisioned'],
    },
    {
      type: 'timer',
      title: 'Orientation Period',
      description: 'Scheduled 3-day orientation window for culture sessions, team introductions, and policy walkthroughs.',
      duration: '3 days',
    },
    {
      type: 'approval',
      title: 'Final Sign-off',
      description: 'HR and department lead confirm the onboarding is complete and all systems are operational.',
      assignee: 'HR Director',
      duration: '1 day',
      conditions: ['All tasks completed', 'Training verified'],
    },
    {
      type: 'end',
      title: 'Onboarding Complete',
      description: 'Employee is fully onboarded and active in the organization.',
    },
  ],
};

/**
 * Available step types palette for the sidebar builder panel.
 */
const stepPalette = Object.entries(STEP_TYPES).map(([key, config]) => ({
  type: key,
  ...config,
}));

export default function WorkflowBuilder() {
  const [activeStep, setActiveStep] = useState(2); // highlight approval by default

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Workflow Builder"
        description="Visually design and configure multi-step business processes"
        icon={GitBranch}
        iconColor="from-violet-500 to-purple-600"
        actionLabel="Save Workflow"
        actionIcon={Save}
        actionColor="from-violet-500 to-purple-600"
      >
        {/* Extra action buttons */}
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
                           bg-surface-tertiary border border-border-secondary
                           text-sm font-medium text-text-secondary
                           hover:bg-surface-overlay hover:text-text-primary
                           transition-all duration-200 cursor-pointer">
          <Eye size={14} /> Preview
        </button>
      </PageHeader>

      {/* Workflow Meta Bar */}
      <div className="bg-surface-primary rounded-2xl border border-border-secondary p-4
                      flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 animate-fade-in"
           style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl
                          bg-gradient-to-br from-violet-500/15 to-purple-500/15 shrink-0">
            <Layers size={18} className="text-violet-500" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-text-primary truncate">{mockWorkflow.name}</h2>
            <span className="text-[11px] text-text-tertiary">
              v{mockWorkflow.version} • Modified {mockWorkflow.lastModified} • by {mockWorkflow.author}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge variant="success" dot>{mockWorkflow.status}</StatusBadge>
          <StatusBadge variant="brand" size="sm">
            <Zap size={10} /> {mockWorkflow.steps.length} steps
          </StatusBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* ── Step Palette (Side Panel) ── */}
        <div className="xl:col-span-1 order-2 xl:order-1 space-y-4">
          {/* Step types */}
          <div className="bg-surface-primary rounded-2xl border border-border-secondary p-5 animate-fade-in"
               style={{ animationDelay: '200ms' }}>
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Step Types
            </h3>
            <div className="space-y-2">
              {stepPalette.map(step => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.type}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary
                               border border-border-secondary cursor-grab
                               hover:border-brand-300 hover:shadow-sm
                               transition-all duration-200 group"
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0
                                    bg-gradient-to-br ${step.iconBg} shadow-sm
                                    group-hover:scale-110 transition-transform duration-200`}>
                      <Icon size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-text-primary block capitalize">
                        {step.label}
                      </span>
                      <span className="text-[10px] text-text-tertiary">Drag to canvas</span>
                    </div>
                    <Plus size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Stats */}
          <div className="bg-surface-primary rounded-2xl border border-border-secondary p-5 animate-fade-in"
               style={{ animationDelay: '300ms' }}>
            <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Summary
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Tasks', value: mockWorkflow.steps.filter(s => s.type === 'task').length, color: 'brand' },
                { label: 'Approvals', value: mockWorkflow.steps.filter(s => s.type === 'approval').length, color: 'warning' },
                { label: 'Decisions', value: mockWorkflow.steps.filter(s => s.type === 'decision').length, color: 'violet' },
                { label: 'Timers', value: mockWorkflow.steps.filter(s => s.type === 'timer').length, color: 'info' },
                { label: 'Est. Duration', value: '~8 days', color: 'neutral' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{item.label}</span>
                  <StatusBadge variant={item.color} size="sm">{item.value}</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Canvas ── */}
        <div className="xl:col-span-3 order-1 xl:order-2">
          <div className="bg-surface-primary rounded-2xl border border-border-secondary p-6 sm:p-8
                          min-h-[600px] animate-fade-in relative overflow-hidden"
               style={{ animationDelay: '150ms' }}>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                 style={{
                   backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                   backgroundSize: '24px 24px',
                 }} />

            {/* Canvas header */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-text-primary">Process Canvas</h2>
                <StatusBadge variant="neutral" size="sm">{mockWorkflow.steps.length} nodes</StatusBadge>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer" title="Zoom In">
                  <Plus size={14} className="text-text-tertiary" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer" title="Settings">
                  <Settings2 size={14} className="text-text-tertiary" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors cursor-pointer" title="Duplicate">
                  <Copy size={14} className="text-text-tertiary" />
                </button>
              </div>
            </div>

            {/* ── Workflow Steps ── */}
            <div className="flex flex-col items-center relative">
              {mockWorkflow.steps.map((step, i) => (
                <div key={i} className="cursor-pointer" onClick={() => setActiveStep(i)}>
                  <WorkflowStep
                    type={step.type}
                    title={step.title}
                    description={step.description}
                    assignee={step.assignee}
                    duration={step.duration}
                    conditions={step.conditions || []}
                    isLast={i === mockWorkflow.steps.length - 1}
                    index={i}
                    active={activeStep === i}
                  />
                </div>
              ))}
            </div>

            {/* Add step button at bottom */}
            <div className="flex justify-center mt-6">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                                 border-2 border-dashed border-border-primary
                                 text-sm font-medium text-text-tertiary
                                 hover:border-brand-400 hover:text-brand-500 hover:bg-brand-500/5
                                 transition-all duration-200 cursor-pointer group">
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                Add Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
