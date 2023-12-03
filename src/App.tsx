import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./screens/Details";
import { OtherCurr } from "./OtherCurr";
import { Form } from "./Form";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  interface CurrencyRates {
    [key: string]: {
      code: string;
      value: number;
    };
  }

  const [result, setResult] = useState<CurrencyRates>({
    USD: { code: "USD", value: 1.0 },
    EUR: { code: "EUR", value: 0.95 },
    JPY: { code: "JPY", value: 135 },
  });
  const [value, setValue] = useState<number>(0);
  const [stage, setStage] = useState<boolean>(false);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const navigate = useNavigate();

  useEffect(() => {
    axios(
      "https://api.currencyapi.com/v3/latest?apikey=cur_live_ifi9VOGn7gpRneZeUmWwhAozQJHsISGJkXag72Ou"
    ).then((response) => {
      console.log(response.data.data);
      setResult(response.data.data);
    });
  }, []);
  function handleSetToCurr(newCurr: string) {
    setToCurr(newCurr);
  }
  function handleDefault(curr: string) {
    setStage(true);
    setValue(1);
    setToCurr(curr);
  }
  function handleBackHome() {
    navigate("/");
    setStage(false);
  }
  function handleStage() {
    setStage(true);
  }
  return (
    <div className="App">
      <Header handleDefault={handleDefault} />
      {stage && (
        <div className="belowHeader">
          <h1 className="FromDetails">{fromCurr}</h1>
          <button className={"button"} onClick={handleBackHome}>
            Back to Home
          </button>
        </div>
      )}
      <Form
        result={result}
        onSetResult={setResult}
        value={value}
        onSetValue={setValue}
        stage={stage}
        onHandleStage={handleStage}
        fromCurr={fromCurr}
        toCurr={toCurr}
        setToCurr={handleSetToCurr}
      />
      <Routes>
        <Route path="/" element={<OtherCurr result={result} value={value} />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
