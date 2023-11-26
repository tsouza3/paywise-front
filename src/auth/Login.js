import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import Loader from "../components/loading/loader";

import LoginSvg from "../../src/assets/login.svg";

const Flex = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const LeftSection = styled.section`
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const Content = styled.div`
  text-align: center;
  font-size: 2.2rem;
  color: white;
  margin-top: 4em;
  font-weight: 500;
`;

const LoginSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 60%;
  background-color: #fff;
  padding: 1rem;
  width: 80%;
  max-width: 400px;
  border-radius: 0.5rem;
  box-shadow:
    0 15px 15px -3px rgba(0, 0, 0, 0.1),
    0 8px 8px -2px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: #000;
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  background-color: #fff;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: calc(100% - 2rem);
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled.button`
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
`;

const SignupLink = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;

  a {
    text-decoration: underline;
  }
`;

const Logo = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;

const Img = styled.img`
  width: 450px;
  height: 450px;
`;

const To = styled(Link)``;

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3006/api/users/login",
        credentials,
      );

      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;

      navigate("/home");
    } catch (error) {
      setLoginError(
        "Credenciais inválidas. Por favor, verifique seu email e senha.",
      );
      console.error("Erro no login:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex>
      <LeftSection>
        <Content>
          <Logo to="/">
            <strong>Paywise</strong>
          </Logo>
          Bem vindo de <strong>volta.</strong>
          <br />
          É ótimo ver você novamente.
          <Img src={LoginSvg} />
        </Content>
      </LeftSection>
      <LoginSection>
        <Form onSubmit={handleLogin}>
          <FormTitle>Acesse sua conta.</FormTitle>
          <InputContainer>
            <Input
              type="text"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              style={{ borderColor: loginError ? "red" : "3" }}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Senha"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              style={{ borderColor: loginError ? "red" : "" }}
            />
          </InputContainer>

          {loginError && <p style={{ color: "red" }}>{loginError}</p>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader /> : "Entrar"}
          </SubmitButton>
          <SignupLink>
            Não possui conta? <To to="/register">Registrar</To>
          </SignupLink>
        </Form>
      </LoginSection>
    </Flex>
  );
};

export default Login;
