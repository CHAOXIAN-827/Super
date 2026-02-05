interface ProgressBarProps {
  current: number;
  total: number;
  correct: number;
}

export default function ProgressBar({
  current,
  total,
  correct,
}: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-primary-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-600">
          Progress: {current}/{total}
        </span>
        <span className="text-sm font-bold text-success-600">
          Score: {correct}/{current > 0 ? current : 0}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
