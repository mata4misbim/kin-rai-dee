import { FOODS } from "../mock-data/Constants";

export default function SpinAnimation({ isSpinning }) {
  return (
    <div
      style={{
        height: isSpinning ? 100 : 0,
        overflow: "hidden",
        transition: "height 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {FOODS.slice(0, 5).map((food, i) => (
        <div
          key={i}
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            overflow: "hidden",
            animation: isSpinning
              ? "spinCard 0.5s ease-in-out infinite"
              : "none",
            animationDelay: `${i * 0.08}s`,
            flexShrink: 0,
            border: "2px solid #fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={food.image}
            alt={food.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
