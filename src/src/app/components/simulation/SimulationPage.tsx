import { useState } from 'react';
import { phishingSimulations } from '../../data/mockData';
import {
  Mail, AlertTriangle, CheckCircle, XCircle, Lock, ChevronRight,
  ArrowLeft, Info, Send, RotateCcw, Award
} from 'lucide-react';

type IndicatorId = string;

function SimulationAttempt({ sim, onBack }: { sim: typeof phishingSimulations[0]; onBack: () => void }) {
  const [selectedIndicators, setSelectedIndicators] = useState<Set<IndicatorId>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [action, setAction] = useState<'pending' | 'clicked' | 'reported' | 'ignored'>('pending');
  const [showWarning, setShowWarning] = useState(false);

  const toggleIndicator = (id: string) => {
    if (submitted) return;
    setSelectedIndicators(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAction = (act: 'clicked' | 'reported' | 'ignored') => {
    if (act === 'clicked') {
      setShowWarning(true);
      setAction('clicked');
    } else {
      setAction(act);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctIndicators = sim.indicators.filter(i => i.suspicious);
  const correctSelected = [...selectedIndicators].filter(id => correctIndicators.some(i => i.id === id));
  const score = submitted && correctIndicators.length > 0
    ? Math.round((correctSelected.length / correctIndicators.length) * 100)
    : 0;
  const passed = score >= 70;

  if (showWarning && !submitted) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-400" />
          </div>
          <h2 className="text-white mb-3">You Clicked the Link!</h2>
          <p className="text-slate-300 mb-4">
            In a real attack, this would have taken you to a fake login page to steal your credentials.
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-left">
            <p className="text-red-400 text-sm font-semibold mb-2">🎣 This was a phishing simulation</p>
            <p className="text-slate-300 text-sm">Don't worry — no harm was done. Let's learn from this. Review the phishing indicators below to understand what you should look for.</p>
          </div>
          <button
            onClick={() => { setShowWarning(false); }}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-lg text-sm font-bold transition-colors"
          >
            Review Indicators & Submit
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Simulations
        </button>

        <div className="text-center mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
            {action === 'reported' ? (
              <Award size={40} className="text-yellow-400" />
            ) : (
              <span className={`text-3xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>{score}%</span>
            )}
          </div>
          <h2 className="text-white mb-2">
            {action === 'reported' ? '🎉 Excellent Catch!' : passed ? '✅ Good Job!' : '⚠️ Keep Practicing'}
          </h2>
          <p className="text-slate-400">
            {action === 'reported'
              ? 'You correctly identified and reported this as a phishing attempt! +150 points awarded.'
              : action === 'clicked'
              ? 'You clicked a suspicious link. Review the indicators and remember to verify before clicking.'
              : `You identified ${correctSelected.length} of ${correctIndicators.length} phishing indicators.`}
          </p>
        </div>

        <h3 className="text-white text-sm mb-4">Indicator Breakdown</h3>
        <div className="space-y-3">
          {sim.indicators.map(indicator => {
            const wasSelected = selectedIndicators.has(indicator.id);
            const isCorrect = indicator.suspicious;
            const status = isCorrect && wasSelected ? 'correct' :
                          !isCorrect && !wasSelected ? 'correct-ignore' :
                          !isCorrect && wasSelected ? 'false-positive' :
                          'missed';
            return (
              <div key={indicator.id} className={`rounded-xl p-4 border ${
                status === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30' :
                status === 'missed' ? 'bg-red-500/10 border-red-500/30' :
                status === 'false-positive' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-slate-800 border-slate-700'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {status === 'correct' ? <CheckCircle size={14} className="text-emerald-400" /> :
                   status === 'missed' ? <XCircle size={14} className="text-red-400" /> :
                   status === 'false-positive' ? <AlertTriangle size={14} className="text-yellow-400" /> :
                   <CheckCircle size={14} className="text-slate-500" />}
                  <span className="text-sm text-white font-semibold">{indicator.label}</span>
                  {indicator.suspicious && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Phishing Indicator</span>}
                </div>
                <p className="text-slate-400 text-xs">{indicator.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-4">
          <p className="text-cyan-400 text-sm font-semibold mb-2 flex items-center gap-2">
            <Info size={14} /> Security Tip
          </p>
          <p className="text-slate-300 text-sm">
            Always hover over links before clicking to see the actual URL destination. When in doubt, contact the sender through a separate, verified channel — never reply to the suspicious email itself.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex-1 border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 px-4 py-3 rounded-xl text-sm transition-colors"
          >
            Back to Simulations
          </button>
          <button
            onClick={() => { setSubmitted(false); setSelectedIndicators(new Set()); setAction('pending'); }}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-slate-700">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex-1">
          <h2 className="text-white">{sim.title}</h2>
          <p className="text-slate-400 text-xs">Click on elements you think are suspicious phishing indicators</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          sim.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
          sim.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>{sim.difficulty}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Email Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Email toolbar */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-gray-500 text-xs flex-1">📧 Inbox - Email Client</span>
              </div>

              {/* Email header */}
              <div className="px-6 py-4 border-b border-gray-100">
                {/* Sender */}
                <button
                  onClick={() => toggleIndicator('i1')}
                  className={`w-full text-left mb-3 p-2 rounded-lg transition-all ${selectedIndicators.has('i1') ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      IT
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-semibold">{sim.email.fromName}</p>
                      <p className="text-gray-500 text-xs">&lt;{sim.email.from}&gt;</p>
                    </div>
                  </div>
                </button>

                {/* Subject */}
                <button
                  onClick={() => toggleIndicator('i2')}
                  className={`w-full text-left p-2 rounded-lg transition-all ${selectedIndicators.has('i2') ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-50'}`}
                >
                  <p className="text-gray-800 font-bold">{sim.email.subject}</p>
                  <p className="text-gray-400 text-xs">{sim.email.date} • To: {sim.email.to}</p>
                </button>
              </div>

              {/* Email body */}
              <div className="px-6 py-5">
                <button
                  onClick={() => toggleIndicator('i4')}
                  className={`w-full text-left p-2 rounded-lg mb-3 transition-all ${selectedIndicators.has('i4') ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-50'}`}
                >
                  <p className="text-gray-800 text-sm">Dear User,</p>
                </button>
                <p className="text-gray-700 text-sm mb-4 px-2 leading-relaxed">
                  We have detected unusual activity on your account. Your password must be reset IMMEDIATELY to avoid account suspension.
                </p>

                <button
                  onClick={() => toggleIndicator('i3')}
                  className={`block mx-auto mb-4 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                    selectedIndicators.has('i3')
                      ? 'bg-red-100 ring-2 ring-red-400 text-red-600'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {selectedIndicators.has('i3') ? '⚠️ Suspicious Link Flagged' : 'Reset Password Now'}
                </button>

                <p className="text-gray-500 text-xs text-center mb-4 px-2">
                  Failure to reset your password within 24 hours will result in permanent account lockout.
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() => toggleIndicator('i5')}
                    className={`w-full text-left p-2 rounded-lg transition-all ${selectedIndicators.has('i5') ? 'bg-red-100 ring-2 ring-red-400' : 'hover:bg-gray-50'}`}
                  >
                    <p className="text-gray-700 text-sm">Regards,<br />IT Support Team<br />
                      <span className="text-gray-400 text-xs">company-helpdesk.net | Security Department</span>
                    </p>
                  </button>
                </div>
              </div>

              {/* Email actions */}
              <div className="px-6 pb-4 flex gap-2">
                <button
                  onClick={() => handleAction('clicked')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg transition-colors"
                >
                  Click Link (Simulate)
                </button>
                <button
                  onClick={() => handleAction('reported')}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Send size={12} /> Report as Phishing
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-cyan-400 text-sm font-semibold mb-2">📌 How to Play</p>
              <ul className="space-y-1.5 text-slate-300 text-xs">
                <li>• Click on email elements you find suspicious</li>
                <li>• Selected elements are highlighted in red</li>
                <li>• Click again to deselect</li>
                <li>• Submit when done to see your score</li>
              </ul>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-white text-sm mb-2">Selected ({selectedIndicators.size})</p>
              {selectedIndicators.size === 0 ? (
                <p className="text-slate-500 text-xs">No indicators selected yet</p>
              ) : (
                <div className="space-y-1">
                  {sim.indicators.filter(i => selectedIndicators.has(i.id)).map(i => (
                    <div key={i.id} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="text-slate-300">{i.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-400 text-xs font-semibold mb-1 flex items-center gap-1">
                <AlertTriangle size={12} /> Quick Tip
              </p>
              <p className="text-slate-300 text-xs">Look carefully at the sender's email address and any links in the email before taking action.</p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Submit & See Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SimulationPage() {
  const [activeSimulation, setActiveSimulation] = useState<typeof phishingSimulations[0] | null>(null);

  if (activeSimulation) {
    return <SimulationAttempt sim={activeSimulation} onBack={() => setActiveSimulation(null)} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-white mb-1">Phishing Simulations</h1>
        <p className="text-slate-400 text-sm">Practice identifying phishing attempts with realistic email simulations</p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 flex gap-3">
        <Info size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-300 text-sm font-semibold">How Simulations Work</p>
          <p className="text-slate-400 text-sm">You'll be presented with a realistic-looking email. Identify suspicious elements by clicking on them, then submit to see how well you did. Correctly report phishing emails for bonus points!</p>
        </div>
      </div>

      {/* Simulations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phishingSimulations.map(sim => (
          <div key={sim.id} className={`bg-slate-800 border rounded-xl p-5 transition-all duration-200 ${
            sim.status === 'locked'
              ? 'border-slate-700 opacity-60 cursor-not-allowed'
              : 'border-slate-700 hover:border-slate-500 cursor-pointer hover:bg-slate-750'
          }`}
          onClick={() => sim.status !== 'locked' && setActiveSimulation(sim)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                sim.status === 'locked' ? 'bg-slate-700' :
                sim.userResult?.passed ? 'bg-emerald-500/20' : 'bg-blue-500/20'
              }`}>
                {sim.status === 'locked'
                  ? <Lock size={22} className="text-slate-500" />
                  : sim.userResult?.passed
                  ? <CheckCircle size={22} className="text-emerald-400" />
                  : <Mail size={22} className="text-blue-400" />}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  sim.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                  sim.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>{sim.difficulty}</span>
              </div>
            </div>

            <h3 className="text-white text-sm mb-2">{sim.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">{sim.description}</p>

            {sim.userResult && (
              <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Last Score</span>
                  <span className={sim.userResult.passed ? 'text-emerald-400' : 'text-red-400'}>
                    {sim.userResult.score}% {sim.userResult.passed ? '✓ Passed' : '✗ Failed'}
                  </span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-slate-400">Indicators Found</span>
                  <span className="text-slate-300">{sim.userResult.identified}/{sim.userResult.total}</span>
                </div>
              </div>
            )}

            {sim.status === 'locked' ? (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Lock size={12} /> Complete previous simulations to unlock
              </div>
            ) : (
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  sim.userResult
                    ? 'border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {sim.userResult ? (
                  <><RotateCcw size={14} /> Try Again</>
                ) : (
                  <>Start Simulation <ChevronRight size={14} /></>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-sm mb-4">Your Simulation History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-700">
                <th className="text-left pb-3">Simulation</th>
                <th className="text-left pb-3">Difficulty</th>
                <th className="text-left pb-3">Score</th>
                <th className="text-left pb-3">Result</th>
                <th className="text-left pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {phishingSimulations.filter(s => s.userResult).map(sim => (
                <tr key={sim.id}>
                  <td className="py-3 text-slate-300">{sim.title}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      sim.difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{sim.difficulty}</span>
                  </td>
                  <td className="py-3 text-slate-300">{sim.userResult?.score}%</td>
                  <td className="py-3">
                    <span className={`text-xs ${sim.userResult?.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                      {sim.userResult?.passed ? '✓ Passed' : '✗ Failed'}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setActiveSimulation(sim)}
                      className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Retry
                    </button>
                  </td>
                </tr>
              ))}
              {phishingSimulations.filter(s => s.userResult).length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500 text-sm">
                    No simulation attempts yet. Start your first simulation above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
