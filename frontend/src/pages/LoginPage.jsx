import React, { useState } from "react";
import {
  Button,
  Input,
  Box,
  FormLabel,
  FormControl,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LoginComp from "../components/LoginComp";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const users = [
        {
          email: "user",
          password: "1234",
          redirectPage: "/homeUser"
        },
        {
          email: "manager",
          password: "4321",
          redirectPage: "/homeManager"
        }
      ];
  
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
  
      if (user) {
        history.push(user.redirectPage);
        window.location.reload();
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login");
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDir="column"
        bgColor="lightsteelblue"
        w="50%"
        h="fit-content"
        p="5%"
        borderRadius="10px"
      >
        <LoginComp />
        <Box display="flex" mt="2rem" mb="2rem" gap="4rem">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              backgroundColor="whitesmoke"
              border="blue 1px solid"
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress} // Adicionando o evento de teclado
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              backgroundColor="whitesmoke"
              border="blue 1px solid"
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Adicionando o evento de teclado
            />
          </FormControl>
        </Box>
        <Box display="flex" gap={10} justifyContent="right">
          <Button
            alignItems="center"
            width="20%"
            mt={4}
            colorScheme="blue"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
