import axios from "axios";

//Aqui está colocndo o URL da api para ser consumida sepre q puxar a constante.
const apiGithub = axios.create({
    baseURL: 'https://api.github.com'
})

export default apiGithub;