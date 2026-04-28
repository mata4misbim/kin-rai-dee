import { useState } from "react";
import FoodImage from "./Foodimage";
import { DIFFICULTY_COLOR } from "../mock-data/Constants";

export default function FoodCard({ food, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(food)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFBF0",
        border: `1px solid ${hovered ? "#B45309" : "#DEB887"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 28px rgba(153,27,27,0.12)"
          : "0 1px 4px rgba(120,70,20,0.07)",
      }}
    >
      <FoodImage
        src={food.image}
        alt={food.name}
        style={{ height: 148, width: "100%" }}
      />

      <div style={{ padding: "14px 14px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#1C1410",
                lineHeight: 1.3,
              }}
            >
              {food.name}
            </div>
            <div style={{ fontSize: 11, color: "#9C7B5A", marginTop: 1 }}>
              {food.nameEn}
            </div>
          </div>
          <span
            style={{
              background: DIFFICULTY_COLOR[food.difficulty].bg,
              color: DIFFICULTY_COLOR[food.difficulty].text,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 7px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              marginTop: 1,
            }}
          >
            {food.difficulty}
          </span>
        </div>

        <div
          style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}
        >
          {food.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                background: "#FEF3C7",
                color: "#92400E",
                padding: "2px 7px",
                borderRadius: 20,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#9C7B5A" }}> {food.time}</span>
          <span style={{ fontSize: 11, color: "#9C7B5A" }}>
            {food.calories} kcal
          </span>
        </div>
      </div>
    </div>
  );
}
