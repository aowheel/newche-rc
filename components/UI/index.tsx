export const PendingSvg = () => {
  return (
    <svg className="animate-spin h-6 w-6 fill-none" viewBox="0 0 24 24">
      <path d="M 12,2 A 10,10 0 0,1 22,12" strokeWidth={3} className="stroke-slate-100" />
      <path d="M 22,12 A 10,10 0 0,1 12,22 A 10,10 0 0,1 2,12 A 10,10 0 0,1 12,2" strokeWidth={3} className="stroke-slate-300" />
    </svg>
  );
} 