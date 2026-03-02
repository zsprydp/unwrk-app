export default function TaskInputModal({
  darkMode,
  currentTask,
  isActive,
  onChangeTask,
  onClose,
  onSetActive,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-3xl p-8 max-w-sm w-full`}>
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          What are you working on?
        </h3>
        <input
          type="text"
          value={currentTask}
          onChange={(e) => onChangeTask(e.target.value)}
          placeholder="e.g., Write report"
          className={`w-full p-4 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-800'} mb-4 focus:ring-2 focus:ring-indigo-500 border-0`}
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-800'}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              if (!isActive) onSetActive(true);
            }}
            className="flex-1 py-3 rounded-xl bg-indigo-600 text-white"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
