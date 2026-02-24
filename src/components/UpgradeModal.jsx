import { Check } from './icons';

export default function UpgradeModal({ darkMode, onClose, onShowAuth }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl p-8 max-w-md w-full`}>
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🎯</div>
          <h3
            className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}
          >
            Unlock Premium Features
          </h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Get access to all binaural beats and advanced analytics
          </p>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} mb-6`}>
          <div className="space-y-3">
            {[
              'All binaural beats (Beta & Gamma)',
              'Advanced analytics & insights',
              'Goal tracking & milestones',
              'Cloud sync across devices',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check />
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              onShowAuth();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
          >
            $4.99/month or $39/year
          </button>
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-800'}`}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
