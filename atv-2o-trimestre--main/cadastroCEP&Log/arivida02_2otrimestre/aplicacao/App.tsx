import { useState } from "react";
import Cadastro from "./components/cadastramento";
import Login from "./components/login";
import Teste from "./components/teste";

export default function () {
  const [route, setRoute] = useState("login")

  return <>
    {route == "login" ? <login setRoute={setRoute} /> : ""}
    {route == "cadastro" ? <Cadastro setRoute={setRoute} /> : ""}
    {route == "teste" ? <teste /> : ""}
  </>
}