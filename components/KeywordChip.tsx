export default function KeywordChip({ word, score }: { word: string; score: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs mr-2 mb-2">
      {word}
      <span className="ml-2 text-[10px] opacity-60">{Math.round(score * 100)}</span>
    </span>
  );
}
