import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, FOODS } from "./mock-data/Constants";
import FoodCard from "./components/Foodcard";
import FoodModal from "./components/Foodmodal";
import SpinAnimation from "./components/Spinanimation";
import "./App.css";

export default function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [randomFood, setRandomFood] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const timeoutRef = useRef(null);

  const foods = useMemo(
    () =>
      activeCategory === "ทั้งหมด"
        ? FOODS
        : FOODS.filter((food) => food.category === activeCategory),
    [activeCategory],
  );

  const handleRandomFood = () => {
    if (isSpinning) return;

    const pool = activeCategory === "ทั้งหมด" ? FOODS : foods;
    if (pool.length === 0) return;

    setSelectedFood(null);
    setIsSpinning(true);

    const nextFood = pool[Math.floor(Math.random() * pool.length)];
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setRandomFood(nextFood);
      setIsSpinning(false);
    }, 1200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6E3" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 22px 48px",
        }}
      >
        <header style={{ marginBottom: 26 }}>
          <img
            src="/images/thai2.png"
            alt="Thai food illustration"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              pointerEvents: "none",
              userSelect: "none",
              filter: "drop-shadow(0 4px 16px rgba(120,60,0,0.10))",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#991B1B",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                อาหารตามสุ่ม
              </div>
              <h1
                style={{
                  margin: "8px 0 0",
                  fontSize: 38,
                  lineHeight: 1.1,
                  color: "#1C1410",
                  fontWeight: 800,
                }}
              >
                สุ่มเมนูอาหารไทย
              </h1>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#6B4F3A",
                  maxWidth: 480,
                  fontSize: 15,
                }}
              >
                เลือกหมวดหมู่และกดที่เมนูเพื่อดูรายละเอียดสูตรอาหาร
              </p>
            </div>
            <div
              onClick={handleRandomFood}
              className={`popularDishButton${isSpinning ? " spinning" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  color: isSpinning ? "#9A3412" : "#7C2D12",
                }}
              >
                ⟳
              </span>
              <span
                style={{
                  color: isSpinning ? "#9A3412" : "#1C1410",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {isSpinning ? "กำลังสุ่ม" : "สุ่มเมนู"}
              </span>
            </div>
          </div>

          <nav
            style={{
              marginTop: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {[
              { key: "home", label: "หน้าโฮม" },
              { key: "catalog", label: "แคตตาล็อค" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePage(tab.key)}
                className={`navLink ${activePage === tab.key ? "active" : ""}`}
                style={{
                  cursor: "pointer",
                  borderRadius: 999,
                  border: "1px solid #E5E7EB",
                  background: activePage === tab.key ? "#F8F1E7" : "#ffffff",
                  color: activePage === tab.key ? "#7C2D12" : "#475569",
                  padding: "10px 18px",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* <SpinAnimation isSpinning={isSpinning} /> */}

        {activePage === "home" && (
          <section style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "1.2fr 0.8fr",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 18,
                  padding: "24px",
                  minHeight: 250,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1C1410",
                    marginBottom: 12,
                  }}
                >
                  เริ่มต้นใช้งาน
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    {
                      title: "เลือกหมวดหมู่",
                      description: "ค้นหาอาหารตามประเภทที่คุณอยากทาน",
                    },
                    {
                      title: "กดปุ่มสุ่ม",
                      description: "ให้ระบบช่วยเลือกเมนูให้แบบง่ายๆ",
                    },
                    {
                      title: "ดูสูตรอาหาร",
                      description: "คลิกการ์ดเพื่อดูวิธีทำเต็มรูปแบบ",
                    },
                  ].map((step) => (
                    <div
                      key={step.title}
                      style={{
                        borderRadius: 14,
                        background: "#F8F1E7",
                        border: "1px solid #F0E2CE",
                        padding: "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#4B4032",
                          marginBottom: 4,
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#6B4F3A",
                          lineHeight: 1.5,
                        }}
                      >
                        {step.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 18,
                  padding: "24px",
                  minHeight: 250,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1C1410",
                    marginBottom: 12,
                  }}
                >
                  เมนูแนะนำวันนี้
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {FOODS.slice(0, 3).map((food) => (
                    <div
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "12px",
                        borderRadius: 14,
                        border: "1px solid #E5E7EB",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#FFFBF0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <img
                        src={food.image}
                        alt={food.name}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: "cover",
                          borderRadius: 14,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1C1410",
                          }}
                        >
                          {food.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#6B4F3A",
                            marginTop: 2,
                          }}
                        >
                          {food.time} • {food.calories} kcal
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "catalog" && (
          <section style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setRandomFood(null);
                  }}
                  style={{
                    border: "1px solid",
                    borderColor:
                      activeCategory === category ? "#991B1B" : "#DEB887",
                    background:
                      activeCategory === category ? "#991B1B" : "#FFFBF0",
                    color: activeCategory === category ? "#fff" : "#6B4F3A",
                    padding: "10px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
        )}
        <SpinAnimation isSpinning={isSpinning} />

        {randomFood && (
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#4B5563",
                  textAlign: "center",
                  letterSpacing: "0.3px",
                }}
              >
                ผลการสุ่มอาหาร
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <div
                onClick={() => setSelectedFood(randomFood)}
                style={{
                  background: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  transform: "translateY(0)",
                  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
                  maxWidth: 460,
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 28px rgba(15, 23, 42, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 24px rgba(15, 23, 42, 0.06)";
                }}
              >
                <div>
                  <img
                    src={randomFood.image}
                    alt={randomFood.name}
                    style={{
                      width: "100%",
                      height: 280,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div style={{ padding: "20px 20px 18px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 20,
                          color: "#111827",
                          lineHeight: 1.3,
                          marginBottom: 4,
                        }}
                      >
                        {randomFood.name}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          fontWeight: 500,
                        }}
                      >
                        {randomFood.nameEn}
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#F3F4F6",
                        color: "#374151",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "5px 10px",
                        borderRadius: 999,
                        whiteSpace: "nowrap",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      {randomFood.difficulty}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 14,
                    }}
                  >
                    {randomFood.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          background: "#F8FAFC",
                          color: "#475569",
                          padding: "4px 10px",
                          borderRadius: 999,
                          border: "1px solid #E5E7EB",
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                      color: "#52525B",
                      fontWeight: 500,
                    }}
                  >
                    <span>{randomFood.time}</span>
                    <span>{randomFood.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "catalog" ? (
          <div
            style={{
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              marginBottom: 32,
            }}
          >
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} onClick={setSelectedFood} />
            ))}
          </div>
        ) : (
          <div
            style={{
              marginBottom: 32,
              padding: "24px 20px",
              borderRadius: 18,
              border: "1px solid #E5E7EB",
              background: "#ffffff",
              color: "#6B7280",
              textAlign: "center",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            กดปุ่มสุ่มเมนูหรือไปที่หน้าแคตตาล็อคเพื่อดูอาหารทั้งหมด
          </div>
        )}

        {selectedFood && (
          <FoodModal
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
          />
        )}
      </div>

      <footer className="appFooter">
        <div>Kin Rai Dee</div>
        <div>อาหารตามสุ่ม • หน้าโฮม • แคตตาล็อค</div>
      </footer>
    </div>
  );
}
