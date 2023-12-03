import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Header({ handleDefault }: any) {
  return (
    <nav className="header">
      <Logo />
      <ul>
        <li onClick={() => handleDefault("EUR")}>
          <Link to={"/details"}>USD-EUR Details</Link>
        </li>
        <li onClick={() => handleDefault("SAR")}>
          <Link to={"/details"}>USD-SAR Details</Link>
        </li>
      </ul>
    </nav>
  );
}
