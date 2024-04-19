import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box, Text, Flex } from '@chakra-ui/react';

const SideBarManager = () => {
  const history = useHistory();

  const handleVeiculos = () => {
    history.push('/vehicle');
    window.location.reload(true);
  };

  const handleSimulationView = () => {
    history.push('/simulationView');
    window.location.reload(true);
  };

  const handleBackToLogin = () => {
    history.push('/');
    window.location.reload(true);
  };

  return (
    <Box
      bg="lightblue"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      w="240px"
      minW="240px"
      pt="20px"
      overflowY="auto"
    >
      <Flex
        height="100%"
        alignItems="center"
        flexDir="column"
        justifyContent="space-between" // Para distribuir os itens uniformemente na flexbox
        borderRight="1px solid lightblue"
        position="sticky"
        top={0}
      >
        <Box>
          <Text letterSpacing={10} mb={10} fontSize="xx-large" align="center">
            MENU
          </Text>
          <Flex direction="column" align="center" gap={2}>
            <Button p="10%" m="5%" onClick={handleVeiculos}>
              Cadastro de Veículos
            </Button>
            <Button p="10%" m="5%" onClick={handleSimulationView}>
              Histórico de simulação
            </Button>
          </Flex>
        </Box>
        <Box>
          <Button mb="1rem" p={5} onClick={handleBackToLogin}>
            Logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideBarManager;
