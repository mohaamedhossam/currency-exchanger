import React from "react";

export function Cell({ code, result, value }: any) {
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
