import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./App.css";
import { generateRandomNumber } from "./random";
import Logs from "./Logs";

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  const handleAnswerChanged = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    if (answers.some((number) => isNaN(number))) {
      alert("숫자만 입력해주세요!");
      return;
    }

    if (answers.length !== 4) {
      alert("4자리 숫자를 입력해주세요!");
      return;
    }

    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicate) {
      alert("입력 값에 중복이 있어요!");
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (prev, cur, index) => {
        if (answers[index] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }
        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );
    if (strike === 4) {
      alert("win!");
      setLogs([...logs, `${answer} (win!)`]);
      setIsSuccess(true);
      return;
    }
    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  };

  const handleRetry = () => {
    setRandomNumber(generateRandomNumber());
    setAnswer("");
    setLogs([]);
    setIsSuccess(false);
  };
  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header>{isSuccess ? `정답: ${answer}` : "----"}</header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChanged}
          disabled={isSuccess}
        />
        {isSuccess ? (
          <button onClick={handleRetry}>Reset</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
      </section>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
