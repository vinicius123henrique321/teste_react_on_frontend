import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Text, Input, useToast, Menu, MenuButton, MenuList, MenuItem, Table, Tbody, Tr, Td, Tooltip } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import * as api from '../services/Api';

const CreditLimitInfoTable = () => (
  <Table size="sm">
    <Tbody>
      <Tr>
        <Td>Score</Td>
        <Td>Crédito</Td>
      </Tr>
      <Tr>
        <Td>0</Td>
        <Td>Reprovado</Td>
      </Tr>
      <Tr>
        <Td>0.3</Td>
        <Td>70% de entrada, 30% do comprometimento da renda</Td>
      </Tr>
      <Tr>
        <Td>0.5</Td>
        <Td>50% de entrada, 25% do comprometimento da renda</Td>
      </Tr>
      <Tr>
        <Td>0.7</Td>
        <Td>30% de entrada, 20% do comprometimento da renda</Td>
      </Tr>
      <Tr>
        <Td>1.0</Td>
        <Td>100% de financiamento, taxa zero</Td>
      </Tr>
    </Tbody>
  </Table>
);

const SimulationPage = () => {
  const [clienteNome, setClienteNome] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [clienteCpf, setClienteCpf] = useState('');
  const [resultadoSimulacao, setResultadoSimulacao] = useState(null);
  const [simulacaoEmAndamento, setSimulacaoEmAndamento] = useState(false);
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await api.getVeiculos();
      setVeiculos(response.data);
    } catch (error) {
      console.error("Error fetching veiculos:", error);
    }
  };

  const handleSelectVeiculo = (veiculo) => {
    setVeiculoSelecionado(veiculo.id);
  };

  const handleSimulacao = async () => {
    try {
      if (!clienteNome || !clienteEmail || !clienteCpf || !veiculoSelecionado || simulacaoEmAndamento) {
        throw new Error("Por favor, preencha todos os campos ou aguarde o término da simulação anterior.");
      }
  
      // Verifica se já existe uma simulação para o veículo selecionado
      const simulacaoExistente = resultadoSimulacao && resultadoSimulacao.selected_car === veiculos.find(veiculo => veiculo.id === veiculoSelecionado).modelo;
      if (simulacaoExistente) {
        throw new Error("Já existe uma simulação aqui. Clique em Simulação de crédito e faça outra simulação");
      }
      
      // Verifica se já existe um cliente com o nome inserido
      const clientes = await api.getAll();
      const clienteExistente = Array.isArray(clientes) && clientes.find(cliente => cliente.nome === clienteNome);
      if (clienteExistente) {
        throw new Error("Já existe um cliente com esse nome. Por favor, insira um nome diferente.");
      }
  
      setSimulacaoEmAndamento(true);
  
      const simulacao = {
        cliente_nome: clienteNome,
        cliente_email: clienteEmail,
        cliente_cpf: clienteCpf,
        veiculoId: veiculoSelecionado
      };
  
      const response = await api.insertSimulation(simulacao);
      if (response.data) {
        setResultadoSimulacao(response.data);
      } else {
        throw new Error("Dados de simulação não encontrados na resposta");
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSimulacaoEmAndamento(false);
    }
  };

  const creditLimitInfo = (
    <Tooltip label={<CreditLimitInfoTable />} placement="right">
      <Text fontSize="xl" color="gray.500" cursor="pointer">ℹ️</Text>
    </Tooltip>
  );

  return (
    <Box display="flex" flexDir="column" ml="16rem" height="100vh" p={4}>
      <Heading size="lg" mb={4}>Simulação de Crédito</Heading>
      <Box mb={4}>
        <Input
          placeholder="Nome do Cliente"
          value={clienteNome}
          onChange={(e) => setClienteNome(e.target.value)}
          w="30%"
          isDisabled={resultadoSimulacao || simulacaoEmAndamento}
        />
      </Box>
      <Box mb={4}>
        <Input
          placeholder="E-mail do Cliente"
          value={clienteEmail}
          onChange={(e) => setClienteEmail(e.target.value)}
          w="30%"
          isDisabled={resultadoSimulacao || simulacaoEmAndamento}
        />
      </Box>
      <Box mb={4}>
      <Input
        placeholder="CPF do Cliente"
        value={clienteCpf}
        onChange={(e) => {
          const re = /^[0-9\b]+$/; // Expressão regular para permitir apenas números
          if (e.target.value === '' || re.test(e.target.value)) {
            setClienteCpf(e.target.value);
          }
        }}
        w="30%"
        isDisabled={resultadoSimulacao || simulacaoEmAndamento}
        maxLength={11}
      />
      </Box>
      <Box mb={4}>
        <Menu>
          <MenuButton bgColor="lightgray" as={Button} rightIcon={<ChevronDownIcon />} isDisabled={simulacaoEmAndamento}>
            {veiculoSelecionado ? veiculos.find(veiculo => veiculo.id === veiculoSelecionado).modelo : 'Selecione um veículo'}
          </MenuButton>
          <MenuList>
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo.id} onClick={() => handleSelectVeiculo(veiculo)} isDisabled={resultadoSimulacao || simulacaoEmAndamento}>
                {veiculo.modelo}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      <Button w="30%" justifyContent="center" ml="30%" minW="154px" colorScheme="blue" onClick={handleSimulacao} isDisabled={simulacaoEmAndamento}>
        {simulacaoEmAndamento ? 'Simulação em andamento...' : 'Realizar Simulação'}
      </Button>
      {resultadoSimulacao && (
        <Box mt={4}>
          <Heading size="md" mb={2}>Resultado da Simulação</Heading>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Score de Crédito:</Td>
                <Td>{resultadoSimulacao.creditScore}</Td>
              </Tr>
              <Tr>
                <Td>Aprovação:</Td>
                <Td>{resultadoSimulacao.approvalStatus}</Td>
              </Tr>
              <Tr>
                <Td>Limite de Crédito:</Td>
                <Td display="flex" gap={2}>
                  {resultadoSimulacao.creditLimit}
                  {creditLimitInfo}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default SimulationPage;
