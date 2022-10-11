import {Link } from "react-router-dom";

function Register(){

    return <>
          <p>Login</p>
    <div className="input-cont">
        <input className="input-block" placeholder="Insira o Usuário"/>
        <input className="input-block" placeholder="Insira a Senha" type="password"/>
        <button className="btn-send">Entrar</button>
    </div> 
    </>
}

export default Register