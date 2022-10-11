import {Link } from "react-router-dom";
import styled from "styled-components";
function Register(){
    
const NavUnlisted = styled.ul`
    text-decoration: none;
`;
const linkStyle = {
    color: '#fff',
    textDecoration: "none",
}
    return <>
          <p>Cadastro</p>
    <div className="input-cont">
        <input className="input-block" placeholder="Usuário"/>
        <input className="input-block" placeholder="Senha" type="password"/>
        <button className="btn-send" >
        <Link style={linkStyle} to="/login">Enviar</Link>
        </button>
    </div> 
    </>
}

export default Register