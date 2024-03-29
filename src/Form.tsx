import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Form({
  result,
  onSetResult,
  value,
  onSetValue,
  stage,
  onHandleStage,
  fromCurr,
  toCurr,
  setToCurr,
}: any) {
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const array: string[] = [
    "USD",
    "EUR",
    "SAR",
    "AED",
    "CNY",
    "EGP",
    "CAD",
    "BTC",
    "CZK",
    "AMD",
    "JPY",
    "AUD",
  ];
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
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_ifi9VOGn7gpRneZeUmWwhAozQJHsISGJkXag72Ou`
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
              <td style={{ justifyItems: "stretch" }}>
                <div className="currency-selector">
                  <div>
                    <h6>From </h6>
                    <select
                      value={fromCurr}
                      // onChange={(e) => setFromCurr(e.target.value)}
                      style={{
                        pointerEvents: stage ? "none" : "initial",
                        backgroundColor: stage ? "#626466" : "",
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
                    >
                      {typeof result === "object"
                        ? Object.keys(result).map((currencyCode) => (
                            <option key={currencyCode} value={currencyCode}>
                              {currencyCode}
                            </option>
                          ))
                        : ""}
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
                  onClick={() => onMoreDetails()}
                  style={{ display: stage ? "none" : "initial" }}
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
