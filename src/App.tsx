import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./screens/Details";
import { useNavigate } from "react-router-dom";

function App() {
  interface CurrencyRates {
    [key: string]: {
      code: string;
      value: number;
    };
  }
  const [result, setResult] = useState<CurrencyRates | null>(null);
  const [value, setValue] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);
  const [fromCurr, setFromCurr] = useState("USD");
  function handleStage() {
    stage === 1 ? setStage(2) : setStage(1);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Header onHandleStage={handleStage} />
        {stage === 2 && <h1 className="FromDetails">{fromCurr}</h1>}
        <Form
          result={result}
          onSetResult={setResult}
          value={value}
          onSetValue={setValue}
          stage={stage}
          onHandleStage={handleStage}
          fromCurr={fromCurr}
          setFromCurr={setFromCurr}
        />
        <Routes>
          <Route
            path="/"
            element={<OtherCurr result={result} value={value} />}
          />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Header({ onHandleStage }: any) {
  return (
    <nav className="header">
      <Logo onHandleStage={onHandleStage} />
      <ul>
        <li>
          <Link to={"/details"}>USD-EUR Details</Link>
        </li>
        <li>
          <Link to={"/details"}>USD-SAR Details</Link>
        </li>
      </ul>
    </nav>
  );
}
function Logo({ onHandleStage }: any) {
  const navigate = useNavigate();
  function click() {
    onHandleStage();
    navigate("/");
  }
  return (
    <div className="logo" onClick={() => click()}>
      <span role="img">💱</span>
      <h1>Currency Exchanger</h1>
    </div>
  );
}

function Form({
  result,
  onSetResult,
  value,
  onSetValue,
  stage,
  onHandleStage,
  fromCurr,
  setFromCurr,
}: any) {
  // const [value, setValue] = useState<number>(0);

  const [toCurr, setToCurr] = useState("EUR");
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (Number(e.target.value) >= 0) {
      onSetValue(Number(e.target.value));
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  };
  async function handleConverte(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_ifi9VOGn7gpRneZeUmWwhAozQJHsISGJkXag72Ou&currencies=EUR%2CUSD%2CCAD%2CEGP%2CAED%2CCNY%2CSAR%2CBTC%2CCZK%2CAMD%2CJPY%2CAUD%2CCHF%2CHKD`
    )
      .then((response) => {
        console.log(response.data.data);
        onSetResult(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function onMoreDetails() {
    onHandleStage();
    navigate("/details");
  }

  return (
    <>
      <form className="box" onSubmit={handleConverte}>
        <div className="row">
          <table>
            <tr>
              <td>
                <h6>Amount </h6>
                <input type="text" value={value} onChange={onChange} />
              </td>
              <td>
                <div className="currency-selector">
                  <div>
                    <h6>From </h6>
                    <select
                      value={fromCurr}
                      onChange={(e) => setFromCurr(e.target.value)}
                      style={{
                        pointerEvents: stage === 2 ? "none" : "initial",
                      }}
                    >
                      <option value="usd">USD</option>
                    </select>
                  </div>
                  <p>⬅️➡️</p>
                  <div>
                    <h6>To </h6>
                    <select
                      value={toCurr}
                      onChange={(e) => setToCurr(e.target.value)}
                      style={{ userSelect: "unset" }}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">euro</option>
                      <option value="SAR">sar</option>
                      <option value="AED">aed</option>
                      <option value="CNY">cny</option>
                      <option value="EGP">egp</option>
                      <option value="CAD">cad</option>
                      <option value="BTC">btc</option>
                      <option value="CZK">czk</option>
                      <option value="AMD">amd</option>
                      <option value="JPY">jpy</option>
                      <option value="AUD">aud</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="position">
                <button
                  className={buttonEnable ? "button" : "disabledButton"}
                  // onClick={handleConverte}
                  type="submit"
                >
                  Convert
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <small className="default-result">
                  1 {fromCurr} = {result && result[toCurr].value.toFixed(3)}{" "}
                  {toCurr}
                </small>
              </td>
              <td className="position">
                <strong className="result">
                  {result && (result[toCurr].value * value).toFixed(3)} {toCurr}
                </strong>
                <button
                  className={"button"}
                  onClick={onMoreDetails}
                  style={{ display: stage === 2 ? "none" : "initial" }}
                >
                  More Details
                </button>
              </td>
            </tr>
          </table>
        </div>
      </form>
    </>
  );
}
function OtherCurr({ result, value }: any) {
  let rows = [0, 1, 2];
  let columns = [0, 1, 2];
  return (
    <div className="box2">
      <table>
        <tr>
          <Cell code={"USD"} result={result} value={value} />
          <Cell code={"EUR"} result={result} value={value} />
          <Cell code={"SAR"} result={result} value={value} />
        </tr>
        <tr>
          <Cell code={"AED"} result={result} value={value} />
          <Cell code={"AMD"} result={result} value={value} />
          <Cell code={"EGP"} result={result} value={value} />
        </tr>
        <tr>
          <Cell code={"CHF"} result={result} value={value} />
          <Cell code={"CAD"} result={result} value={value} />
          <Cell code={"JPY"} result={result} value={value} />
        </tr>
      </table>
    </div>
  );
}
function Cell({ code, result, value }: any) {
  return (
    <td>
      {result && value > 0 ? (
        <div>
          <h6>{code}</h6>
          <p>{(result[code].value * value).toFixed(2)}</p>
        </div>
      ) : (
        <p>----</p>
      )}
    </td>
  );
}

export default App;
