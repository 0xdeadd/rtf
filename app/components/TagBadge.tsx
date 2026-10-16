const tagColorMap: Record<string, string> = {
  "12 Step Study": "bg-emerald-100 text-emerald-800",
  Grapevine: "bg-purple-100 text-purple-800",
  Discussion: "bg-blue-100 text-blue-800",
};

export default function TagBadge({ label }: { label: string }) {
  const color = tagColorMap[label] || "bg-amber/10 text-amber-dark";
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}
    >
      {label}
    </span>
  );
}
