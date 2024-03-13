import {createGlobalStyle} from 'styled-components';


//Aqui ta criando um padrão para todos 
export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        outline: 0px;
        box-sizing: border-box;
    }

//Aqui é padrão só pra esses especificos
html, body, #root{
    min-height: 100%;
}

body{
    background: #0d2636;
    font-size: 14px;
    -webikit-font-smoothing: antialiased !important;
}

body, input, button{
    color: #222;
    font: 14px;
    font-family: Arial, Helvetica, sans-serif;
}

button{
    cursor: pointer;
}

`;