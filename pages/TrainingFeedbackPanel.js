export default function TrainingFeedbackPanel({ scenario, userPlay, iqTraits, decision }) {
    return (
      <div style={{ padding: 20 }}>
        <h2>✅ Decision Review</h2>
        <p><strong>Scenario:</strong> {scenario}</p>
        <p><strong>Your Choice:</strong> {userPlay}</p>
        <p><strong>IQ Score:</strong> {decision.score}</p>
        <ul>
          {Object.entries(iqTraits).map(([trait, value], i) => (
            <li key={i}>{trait}: {value}</li>
          ))}
        </ul>
      </div>
    );
  }