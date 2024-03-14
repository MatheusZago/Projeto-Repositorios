import React, {useState, useCallback} from "react";
import {FaGithub, FaPlus, FaSpinner} from 'react-icons/fa';
import {Container, Form, SubmitButton} from "./styles";

import apiGithub from "../../services/api";

export default function Main(){

  const [novoRepositorio, setNovoRepositorio] = useState('');
  const [repositorios, setRepositorios] = useState([]); //Isso é um array
  const [loading, setLoading] = useState(false); //Se está carregando a página

   const realizarSubmit = useCallback((e) => {//Usou o useCallback pq ele retorna uma função memorizada, é melhor do que ficar criando outras
    e.preventDefault(); 

    async function submit(){  //Essa função é assincrona, ela pode ser executada em qualquer ordem, não só quando for chamada.
      setLoading(true);
      try{
        const resposta = await apiGithub.get(`repos/${novoRepositorio}`)
        
          //Aqui ele está filtgrando, para pegar apenas o necessário 
          const data = {
            nome: resposta.data.full_name,
          }
        
          //Aqui está atualizando o array do repositório, os 3 pontos serve para pegar os antigos e adicionar o data novo
          setRepositorios([...repositorios, data]);
          setNovoRepositorio('')
        }catch(error) {
          console.log(error);
        }finally{
          setLoading(false);
        }
            
    }
    
    submit();

},[novoRepositorio, repositorios]) //Quando um ou outro for atualizado, ele chama o useCallback


    function realizarMudançaInput(e) {
        setNovoRepositorio(e.target.value);
    }

    return(
        <Container>
            
            <h1>
                <FaGithub size={25}/>
                Meus Repositórios
            </h1>

            <Form onSubmit={realizarSubmit}> 
                <input 
                type="text" 
                placeHolder="Adicionar Repositorios" 
                value={novoRepositorio}
                onChange={realizarMudançaInput} />

        
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14}/>
                    ) : (
                        <FaPlus color="#fff" size={14}/>
                    )}
        
                </SubmitButton>

            </Form>

        </Container>
    )
}