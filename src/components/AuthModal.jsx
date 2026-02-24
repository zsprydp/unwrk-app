import { X } from './icons';

export default function AuthModal({ darkMode, authEmail, onChangeEmail, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl p-8 max-w-md w-full`}>
        <button
          onClick={onClose}
          className={`ml-auto block p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
        >
          <X />
        </button>

        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}
          >
            Get Started with Premium
          </h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your email to continue
          </p>
        </div>

        <input
          type="email"
          value={authEmail}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="your@email.com"
          className={`w-full p-4 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-800'} mb-4 focus:ring-2 focus:ring-indigo-500 border-0`}
        />

        <button
          onClick={onSubmit}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform mb-3"
        >
          Continue with Email
        </button>

        <div className={`text-center text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          We&apos;ll send you a magic link to sign in
        </div>
      </div>
    </div>
  );
}
