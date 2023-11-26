import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import RegisterIcon from "../assets/register.svg";
import styled from "styled-components";

import Loader from "../components/loading/loader";

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

const RegisterSection = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 70%;
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

const LoginLink = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;

  a {
    text-decoration: underline;
  }
`;

const To = styled(Link)``;

const Logo = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;

const Img = styled.img`
  width: 400px;
  height: 400px;
`;

function RegistrationForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (userData.password !== userData.confirmPassword) {
      setPasswordError("As senhas não coincidem");
      setSubmitted(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3006/api/users/",
        userData,
      );

      if (response.status === 201) {
        console.log("Registro bem-sucedido!");
        navigate("/login");
      } else {
        console.log("Erro no registro. Verifique os dados enviados.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
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
          Transforme sua relação com o <br />
          <strong>dinheiro.</strong>
          <br />
          <Img src={RegisterIcon} />
        </Content>
      </LeftSection>
      <RegisterSection>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Crie sua conta.</FormTitle>
          <InputContainer>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={userData.name}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={userData.password}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            {submitted && passwordError && (
              <span style={{ color: "red" }}>{passwordError}</span>
            )}
          </InputContainer>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader /> : "Registrar"}
          </SubmitButton>
          <LoginLink>
            Já possui conta? <To to="/login">Entrar</To>
          </LoginLink>
        </Form>
      </RegisterSection>
    </Flex>
  );
}

export default RegistrationForm;
