import { Terminal, GitBranch, Activity, Globe2 } from 'lucide-react'

export const TOOLS = [
  { id: 'logging', name: 'TASK LOGGING', label: 'TASK LOGGING & TELEMETRY', icon: Terminal, desc: 'Real-time agent telemetry.' },
  { id: 'roi', name: 'ROI SCORECARD', label: 'AI AGENT ROI SCORECARD', icon: GitBranch, desc: 'Algorithmic wealth synthesis.' },
  { id: 'experiment', name: 'A/B EXPERIMENT', label: 'A/B EXPERIMENT TERMINAL', icon: Activity, desc: 'Evolutionary node testing.' },
  { id: 'team', name: 'TEAM AGGREGATION', label: 'AGENTIC TEAM AGGREGATION', icon: Globe2, desc: 'Global cluster distribution.' },
]

export const E_PATH = "M 70 25 H 30 L 60 45 L 30 65 H 70"
