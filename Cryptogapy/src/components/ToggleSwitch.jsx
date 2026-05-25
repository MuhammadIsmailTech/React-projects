function ToggleSwitch({ isOn, onToggle, labelOn, labelOff }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-11 items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 text-slate-200 transition hover:border-brand"
    >
      {isOn ? labelOn : labelOff}
      <span className="text-sm">{isOn ? 'Dark' : 'Light'}</span>
    </button>
  );
}

export default ToggleSwitch;
