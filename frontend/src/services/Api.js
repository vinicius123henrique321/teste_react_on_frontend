import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// Métodos para operações CRUD de veículos
export const getVeiculos = () => axios.get(`${BASE_URL}/veiculos`);
export const getVeiculoById = (id) => axios.get(`${BASE_URL}/veiculos/${id}`);
export const addVeiculo = (veiculo) => axios.post(`${BASE_URL}/veiculos`, veiculo);
export const updateVeiculo = (id, veiculo) => axios.put(`${BASE_URL}/veiculos/${id}`, veiculo);
export const deleteVeiculo = (id) => axios.delete(`${BASE_URL}/veiculos/${id}`);

// Métodos para operações CRUD de simulação
export const insertSimulation = (simulacao) => axios.post(`${BASE_URL}/simulacao`, simulacao);
export const getAll = (simulacao)  => axios.get(`${BASE_URL}/simulacao`, simulacao);
export const deleteSimulation = (id_sim) => axios.delete(`${BASE_URL}/simulacao/${id_sim}`);
