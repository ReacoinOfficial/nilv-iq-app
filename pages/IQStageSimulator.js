import React, { useState } from "react";
import TrainingFeedbackPanel from "./TrainingFeedbackPanel";

// Placeholder Card component
const Card = ({ children }) => (
  <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 10, marginBottom: 20 }}>
    {children}
  </div>
);
const CardContent = ({ children }) => <div>{children}</div>;

// Placeholder Button component
const Button = ({ children, onClick, variant = "default" }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: variant === "outline" ? "#fff" : "#4f46e5",
      color: variant === "outline" ? "#4f46e5" : "#fff",
      border: "1px solid #4f46e5",
      borderRadius: 6,
      padding: "10px 16px",
      width: "100%",
      marginBottom: 8,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const scenarios = {
  Basketball: {
    title: "Final 20s, Shot Clock Off",
    description: "You're down by 1 with 20 seconds left. What play do you run?",
    fieldImage: "/images/court.png",
    options: [
      { label: "Iso for Star Player", result: "Aggressive", score: 90 },
      { label: "Drive and Kick", result: "Smart Read", score: 80 },
      { label: "High Screen Pick & Pop", result: "Conservative", score: 70 }
    ]
  },
  Football: {
    title: "4th & 1 at the 45",
    description: "You're trailing by 3 with 2:30 left in the 4th. What’s your call?",
    fieldImage: "/images/field.png",
    options: [
      { label: "Go For It", result: "Aggressive", score: 90 },
      { label: "Punt", result: "Conservative", score: 60 },
      { label: "Fake Punt", result: "High Risk", score: 40 }
    ]
  },
  Soccer: {
    title: "Final Minute, Down 1",
    description: "You’ve earned a corner kick. What’s your call?",
    fieldImage: "/images/pitch.png",
    options: [
      { label: "Send Goalkeeper Forward", result: "Aggressive", score: 85 },
      { label: "Cross to Back Post", result: "Smart Read", score: 75 },
      { label: "Play it Short", result: "Conservative", score: 60 }
    ]
  }
};

export default function IQStageSimulator() {
  const [sport, setSport] = useState("Basketball");
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const current = scenarios[sport];

  const handleSelect = (option) => {
    setSelected(option);
    setDone(true);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, justifyContent: "center" }}>
        {Object.keys(scenarios).map((s) => (
          <Button key={s} onClick={() => {
            setSport(s);
            setDone(false);
            setSelected(null);
          }} variant={sport === s ? "default" : "outline"}>
            {s}
          </Button>
        ))}
      </div>

      {!done ? (
        <Card>
          <CardContent>
            <h2 style={{ fontSize: 20, marginBottom: 10 }}>{current.title}</h2>
            <p style={{ marginBottom: 10 }}>{current.description}</p>
            <img src={current.fieldImage} alt={sport} style={{ width: "100%", borderRadius: 10, marginBottom: 20 }} />
            {current.options.map((opt, i) => (
              <Button key={i} onClick={() => handleSelect(opt)}>
                {opt.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : (
        <TrainingFeedbackPanel
          scenario={current.title}
          userPlay={selected.label}
          iqTraits={{
            Clock: 85,
            Scheme: 80,
            Pressure: 75,
            Adaptability: 82,
            Speed: 88
          }}
          decision={{
            context: current.title,
            choice: selected.label,
            score: selected.score
          }}
        />
      )}
    </div>
  );
}