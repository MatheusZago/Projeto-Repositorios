import React, { useState, useCallback, useEffect } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import {Link} from 'react-router-dom';

import apiGithub from "../../services/api";

export default function Main() {


  const [newRepo, setNewRepo] = useState(''); //Esse aqui é onde o usuário está digitando
  const [repositorios, setRepositorios] = useState([]);//Use state foi usado para pegar função existe e voltar
  const [loading, setLoading] = useState(false); //Esse serve para ver se a página está carregando
  const [alert, setAlert] = useState(null); //Variavel de erro

  //Buscar os repositórios já salvos
  useEffect(() => {
    //Aqui ele está pegando os itens salvos no loca estorage com a "chave" repos
    const RepoStorage = localStorage.getItem('repos');

    //Aqui ele está passando os itens pegos para os repositórios do site, se tiver algum
    if (RepoStorage) {
      setRepositorios(JSON.parse(RepoStorage));
    }

  }, [])


  //Salvar as alterações
  useEffect(() => {
    //Aqui ele está ssalvando no local storage os repositórios stringificados, com o nome da chave "repo"
    localStorage.setItem('repos', JSON.stringify(repositorios))
  }, [repositorios]) //Quando ela sofrer alterações, ele puxa a função



  //Para lidar com o uso do botão submit
  const handleSubmit = useCallback((e) => {
    e.preventDefault(); //Para evitar que a pagina atualize

    async function submit() {//Foi feita assincrona para funcionar com prioridade
      setLoading(true);
      try {

        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositório');
        }

        const response = await apiGithub.get(`repos/${newRepo}`); //Pegando as infomrações da API

        const hasRepo = repositorios.find(repo => repo.name === newRepo); //Isso aqui é para ver se ta adicionando um duplicado
        if (hasRepo) {
          throw new Error('Repositório duplicado');
        }

        const data = { //Filtrando o que quer pegar da API
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, data]); //Aqui está adicionando o novo dado com os antigos
        setNewRepo('');
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    submit();

  }, [newRepo, repositorios]);//Se um desses valores for alterado, a função é chamada de novo

  function handleinputChange(e) {
    setNewRepo(e.target.value); //Aqui só ta pegando o valor do input
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {//Ta usando use callback pq ta atualizando algo existente
    //Essa função está pegando todos os repositórios com exceção no que foi clicado
    const find = repositorios.filter(r => r.name !== repo)
    //Aqui ela está atualizando os repositórios, dando todos os que recebeu.
    setRepositorios(find);

  }, [repositorios]);

  return (
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleinputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>

      </Form>

      <List>
        {repositorios.map(repo => ( //Aqui está fazendo uma lista e map para mostrar tudo
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)} >
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`repositorio/${encodeURIComponent(repo.name) }`}>
              <FaBars size={20} />
            </Link>
          </li>

          //Esse encondeURIComponente serve para mostrar que aquilo marcado é um parametro, não uma pasta.  
        ))}
      </List>

    </Container>
  )
}