import KeywordChip from "./KeywordChip";

export default function KeywordCloud({ items }: { items: { word: string; score: number }[] }) {
  return (
    <div className="flex flex-wrap">
      {items.map((k) => (
        <KeywordChip key={k.word} word={k.word} score={k.score} />
      ))}
    </div>
  );
}
