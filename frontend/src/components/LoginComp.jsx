import React from "react";
import {
  Flex,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

const LoginComp = () => {
  return (
    <Box display="flex" flexDir="column" justifyContent={"center"}>
      <Box
        bgImage="url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_PzXC4VGESpYHQpmn0_S5gxekSPWh1mvfPovZB9G9bA&s')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="auto"
        backgroundColor="white"
        borderRadius="10px"
        w="100%"
        h={"150px"}
        mb="10%"
      ></Box>
      <Text fontSize="xx-large" letterSpacing="5px">
        LOGIN
      </Text>
    </Box>
  );
};
export default LoginComp;
