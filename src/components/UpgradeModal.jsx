import { useState } from 'react';
import { Check } from './icons';
import { isStripeConfigured, PRICES, redirectToCheckout } from '../lib/stripe';

export default function UpgradeModal({ darkMode, userEmail, onClose, onShowAuth }) {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isStripeConfigured) {
      onClose();
      onShowAuth();
      return;
    }

    setLoading(true);
    const { error } = await redirectToCheckout({
      priceId: PRICES[plan].id,
      customerEmail: userEmail,
    });
    if (error) console.warn('Checkout error:', error.message);
    setLoading(false);
  };

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

        <div className="flex gap-2 mb-4">
          {Object.entries(PRICES).map(([key, price]) => (
            <button
              key={key}
              onClick={() => setPlan(key)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                plan === key
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : darkMode
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-slate-100 text-slate-700'
              }`}
            >
              {price.label}
              {key === 'yearly' && (
                <span className="block text-xs opacity-75 mt-0.5">Save 35%</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? 'Redirecting…' : `Subscribe — ${PRICES[plan].label}`}
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
