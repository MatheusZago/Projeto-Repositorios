import styled, {keyframes, css} from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    background: #FFFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2  );
    padding: 30px;
    margin: 80px auto;


    h1{
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        //Isso é o icone
        svg{
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex:1;
        border: 1px solid #ddd;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }

`;

//Fazendo animação do botão
const animacao = keyframes` 
  from{
    transform: rotate(0deg)
  }

  to{
    transform: rotate(360deg)
  }

`;


//Esse botão ganhou o tipo submit, e as coisas tão indo pra ele
//O props é a caracteristica do botão, se a propos for 1 ele desativa o botão, se não deixa normal
export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
  }))`
    background:#0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    &[disabled]{
      cursor: not-allowed;
      opacity: 0.5;
    }

    ${props => props.loading &&
    css`
      svg{
        animation: ${animacao} 2s linear infinite;
      }
    `
  }

`;
