import {
  Play, ClipboardCheck, GitBranch, Timer, Square,
  CheckCircle2, ChevronDown, MoreHorizontal, Grip,
  ListChecks,
} from 'lucide-react';

/**
 * Step type definitions — icon, color gradient, border accent, label.
 */
const STEP_TYPES = {
  start: {
    icon: Play,
    label: 'Start',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/8 dark:bg-emerald-500/10',
    border: 'border-emerald-300 dark:border-emerald-700',
    ring: 'ring-emerald-500/20',
    iconBg: 'from-emerald-500 to-teal-600',
    accent: 'text-emerald-600 dark:text-emerald-400',
    pill: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  task: {
    icon: ListChecks,
    label: 'Task',
    gradient: 'from-brand-500 to-brand-600',
    bg: 'bg-brand-500/8 dark:bg-brand-500/10',
    border: 'border-brand-300 dark:border-brand-700',
    ring: 'ring-brand-500/20',
    iconBg: 'from-brand-500 to-brand-600',
    accent: 'text-brand-600 dark:text-brand-400',
    pill: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  },
  approval: {
    icon: ClipboardCheck,
    label: 'Approval',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/8 dark:bg-amber-500/10',
    border: 'border-amber-300 dark:border-amber-700',
    ring: 'ring-amber-500/20',
    iconBg: 'from-amber-500 to-orange-600',
    accent: 'text-amber-600 dark:text-amber-400',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  decision: {
    icon: GitBranch,
    label: 'Decision',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/8 dark:bg-violet-500/10',
    border: 'border-violet-300 dark:border-violet-700',
    ring: 'ring-violet-500/20',
    iconBg: 'from-violet-500 to-purple-600',
    accent: 'text-violet-600 dark:text-violet-400',
    pill: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  },
  timer: {
    icon: Timer,
    label: 'Timer',
    gradient: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-500/8 dark:bg-cyan-500/10',
    border: 'border-cyan-300 dark:border-cyan-700',
    ring: 'ring-cyan-500/20',
    iconBg: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-600 dark:text-cyan-400',
    pill: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  },
  end: {
    icon: Square,
    label: 'End',
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/8 dark:bg-red-500/10',
    border: 'border-red-300 dark:border-red-700',
    ring: 'ring-red-500/20',
    iconBg: 'from-red-500 to-rose-600',
    accent: 'text-red-600 dark:text-red-400',
    pill: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
};

/**
 * WorkflowStep — A single visual step in the workflow builder.
 *
 * @param {string}  type        - One of: start, task, approval, decision, timer, end
 * @param {string}  title       - Step title / label
 * @param {string}  description - Brief description of what this step does
 * @param {string}  assignee    - Who is responsible (optional)
 * @param {string}  duration    - Estimated duration (optional)
 * @param {Array}   conditions  - Conditions / rules (optional)
 * @param {boolean} isLast      - Whether this is the last step (hides connector)
 * @param {number}  index       - Step index for staggered animations
 * @param {boolean} active      - Whether this step appears "active" / highlighted
 */
export default function WorkflowStep({
  type = 'task',
  title,
  description,
  assignee,
  duration,
  conditions = [],
  isLast = false,
  index = 0,
  active = false,
}) {
  const config = STEP_TYPES[type] || STEP_TYPES.task;
  const Icon = config.icon;
  const isTerminal = type === 'start' || type === 'end';

  return (
    <div
      className="relative flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ── Step Card ── */}
      <div
        className={`
          relative w-full max-w-lg
          ${isTerminal ? 'max-w-xs' : ''}
          bg-surface-primary rounded-2xl
          border-2 ${active ? config.border : 'border-border-secondary'}
          ${active ? `ring-4 ${config.ring}` : ''}
          shadow-sm hover:shadow-md
          transition-all duration-300 group
          overflow-hidden
        `}
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${config.gradient}`} />

        <div className={`p-4 ${isTerminal ? 'py-5' : 'p-5'}`}>
          {/* Header row */}
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`flex items-center justify-center shrink-0
                            ${isTerminal ? 'w-10 h-10 rounded-xl' : 'w-11 h-11 rounded-xl'}
                            bg-gradient-to-br ${config.iconBg} shadow-sm
                            group-hover:scale-105 transition-transform duration-200`}>
              <Icon size={isTerminal ? 18 : 20} className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-text-primary leading-tight">
                  {title}
                </h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full
                                 text-[10px] font-semibold uppercase tracking-wider
                                 ${config.pill}`}>
                  {config.label}
                </span>
              </div>
              {description && (
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Menu */}
            {!isTerminal && (
              <button className="flex items-center justify-center w-7 h-7 rounded-lg
                                 opacity-0 group-hover:opacity-100 hover:bg-surface-tertiary
                                 transition-all duration-200 cursor-pointer shrink-0">
                <MoreHorizontal size={14} className="text-text-tertiary" />
              </button>
            )}
          </div>

          {/* Meta info — assignee, duration, conditions */}
          {!isTerminal && (assignee || duration || conditions.length > 0) && (
            <div className="mt-3 pt-3 border-t border-border-secondary">
              <div className="flex items-center gap-3 flex-wrap">
                {assignee && (
                  <div className="flex items-center gap-1.5">
                    <div className={`flex items-center justify-center w-5 h-5 rounded-full
                                    bg-gradient-to-br ${config.iconBg} text-[9px] font-bold text-white`}>
                      {assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-xs text-text-secondary">{assignee}</span>
                  </div>
                )}
                {duration && (
                  <div className="flex items-center gap-1 text-xs text-text-tertiary">
                    <Timer size={11} />
                    <span>{duration}</span>
                  </div>
                )}
              </div>

              {conditions.length > 0 && (
                <div className="mt-2 space-y-1">
                  {conditions.map((cond, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 size={10} className={config.accent} />
                      <span className="text-text-secondary">{cond}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Connector Line ── */}
      {!isLast && (
        <div className="flex flex-col items-center my-0">
          {/* Animated dashed line */}
          <div className="w-0.5 h-10 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-30`} />
            <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-70
                            animate-[pulse-slow_2s_ease-in-out_infinite]`}
                 style={{ backgroundSize: '2px 8px', backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 3px, currentColor 3px, currentColor 5px)` }} />
          </div>
          {/* Arrow */}
          <ChevronDown size={16} className={`${config.accent} -mt-1.5 animate-bounce`}
                       style={{ animationDuration: '2s' }} />
        </div>
      )}
    </div>
  );
}

export { STEP_TYPES };
