import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

const HomeUserPage = () => {

  return (
    <Box opacity="0.7" display={"flex"} justifyContent="center" m=" 0 5rem 0 20rem" alignItems="center" height="100vh"  flexDir="column" gap="30px" textAlign="center">
      <QuestionIcon boxSize="15%" />
      <Text p="15px" wordBreak="break-word" fontSize={20}>Como Usuário, você possui acesso a todos os veiculos disponiveis e a requisição de simulação de crédito</Text>
    </Box>
  );
};

export default HomeUserPage;
