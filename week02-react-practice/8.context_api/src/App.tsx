import { createContext, useContext, useState } from "react";

// StudyMode 타입 정의
type StudyMode = "focus" | "break";

// StudyModeContext 생성 (기본값: "focus")
const StudyModeContext = createContext<StudyMode>("focus");

// 자식 컴포넌트: StudyStatus
function StudyStatus() {
  const mode = useContext(StudyModeContext);

  return (
    <div>
      <h2>현재 모드: {mode === "focus" ? "집중 모드" : "휴식 모드"}</h2>
      <p>
        {mode === "focus"
          ? "열심히 공부하세요! 🎯"
          : "잠깐 쉬면서 충전하세요! ☕"}
      </p>
    </div>
  );
}

// 다른 자식 컴포넌트: ModeIndicator
function ModeIndicator() {
  const mode = useContext(StudyModeContext);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: mode === "focus" ? "#fff3cd" : "#d1ecf1",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      <p>상태: {mode === "focus" ? "⚡ 활발한 상태" : "😴 휴식 상태"}</p>
    </div>
  );
}

// App 컴포넌트 (부모)
export default function App() {
  const [mode, setMode] = useState<StudyMode>("focus");

  function handleToggleMode() {
    setMode((currentMode) => (currentMode === "focus" ? "break" : "focus"));
  }

  return (
    <StudyModeContext value={mode}>
      <main style={{ padding: "20px" }}>
        <h1>학습 모드 관리</h1>
        
        <StudyStatus />
        <ModeIndicator />
        
        <button 
          onClick={handleToggleMode}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          모드 전환 ({mode === "focus" ? "휴식으로" : "집중으로"})
        </button>
      </main>
    </StudyModeContext>
  );
}