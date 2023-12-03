import React from "react";
import { Cell } from "./Cell";

export function OtherCurr({ result, value }: any) {
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
