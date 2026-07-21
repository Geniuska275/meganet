
const BOOKING_STEPS = ["Your details", "Your operation", "Confirm & pay"];
 const GREEN = "#007518";
const GREEN_DARK = "#003d0c";
const GOLD = "#ffba00";
const CREAM = "#fcfbfe";
const INK = "#12200f";
export default function ProgressBar({ step }) {
  const pct = (step / (BOOKING_STEPS.length - 1)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {BOOKING_STEPS.map((label, i) => (
          <span
            key={label}
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: i <= step ? GREEN_DARK : "#9ca89a", transition: "color .3s ease" }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-1.5 rounded-full w-full overflow-hidden" style={{ backgroundColor: "#00751822" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: GOLD, transition: "width .35s ease" }}
        />
      </div>
    </div>
  );
}
 
 