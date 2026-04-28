import { useState } from "react";

export default function FoodImage({ src, alt, style = {} }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F3F4F6",
        ...style,
      }}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            display: "block",
          }}
        />
      )}
      {(!loaded || error) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {error ? (
            <span style={{ fontSize: 28, color: "#9CA3AF" }}>🍽</span>
          ) : (
            <div
              style={{
                width: 22,
                height: 22,
                border: "2px solid #E5E7EB",
                borderTopColor: "#9CA3AF",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
