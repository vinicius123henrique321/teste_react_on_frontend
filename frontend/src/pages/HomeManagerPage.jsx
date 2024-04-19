import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

const HomeManagerPage = () => {

  return (
    <Box opacity="0.7" display={"flex"} justifyContent="center" m=" 0 5rem 0 20rem" alignItems="center" height="100vh"  flexDir="column" gap="30px" textAlign="center">
      <QuestionIcon boxSize="15%" />
      <Text p="15px" wordBreak="break-word" fontSize={20}>Como manager, você pode acessar tanto o cadastro de veiculos, quanto a vizualização de simulações já realizadas</Text>
    </Box>
  );
};

export default HomeManagerPage;
