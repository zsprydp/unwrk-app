import { useState } from 'react';
import { X } from './icons';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ darkMode, onClose, onDemoUpgrade }) {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setStatus('sending');

    const { error, demo } = await signInWithMagicLink(email);

    if (demo) {
      onDemoUpgrade(email);
      onClose();
      return;
    }

    if (error) {
      setStatus('error');
      console.warn('Magic link error:', error.message);
    } else {
      setStatus('sent');
    }
  };

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
            {status === 'sent' ? 'Check your email' : 'Get Started with Premium'}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {status === 'sent'
              ? `We sent a magic link to ${email}`
              : 'Enter your email to continue'}
          </p>
        </div>

        {status !== 'sent' && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full p-4 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-800'} mb-4 focus:ring-2 focus:ring-indigo-500 border-0`}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />

            {status === 'error' && (
              <p className="text-red-500 text-xs mb-3 text-center">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Continue with Email'}
            </button>

            <div
              className={`text-center text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}
            >
              We&apos;ll send you a magic link to sign in
            </div>
          </>
        )}

        {status === 'sent' && (
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl mt-2 ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-800'}`}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
