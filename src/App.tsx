import React, { ChangeEvent, useState } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <OtherExchanges />
    </div>
  );
}

function Header() {
  return (
    <nav className="header">
      <Logo />
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">💱</span>
      <h1>Currency Exchanger</h1>
    </div>
  );
}

function Form() {
  const [value, setValue] = useState<number>(1);
  const [fromCurr, setFromCurr] = useState("eur");
  const [toCurr, setToCurr] = useState("usd");
  const [buttonEnable, setButtonEnable] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
  function handleConverte() {}

  return (
    <form className="box">
      <div className="row">
        <table>
          <tr>
            <td>
              <h6>Amount </h6>
              <input type="number" value={value} onChange={onChange} />
            </td>
            <td>
              <div className="currency-selector">
                <div>
                  <h6>From </h6>
                  <select
                    value={fromCurr}
                    onChange={(e) => setFromCurr(e.target.value)}
                  >
                    <option value="eur">euro</option>
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
                    <option value="usd">USD</option>
                    <option value="eur">euro</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="position">
              <Button enabled={buttonEnable} onClick={handleConverte}>
                Converte
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <small className="default-result">1 Euro = XXX usd</small>
            </td>
            <td className="position">
              <strong className="result"> XXX US</strong>
              <Button
                enabled={buttonEnable}
                onClick={() => alert("test More details")}
              >
                More Details
              </Button>
            </td>
          </tr>
        </table>
      </div>
    </form>
  );
}
function OtherExchanges() {
  return (
    <div className="box2">
      <table>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
        </tr>
        <tr>
          <td>Data 7</td>
          <td>Data 8</td>
          <td>Data 9</td>
        </tr>
      </table>
    </div>
  );
}
type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
  enabled: boolean;
};
function Button({ children, onClick, enabled = true }: ButtonProps) {
  return (
    <button className={enabled ? "button" : "disabledButton"} onClick={onClick}>
      {children}
    </button>
  );
}
export default App;
