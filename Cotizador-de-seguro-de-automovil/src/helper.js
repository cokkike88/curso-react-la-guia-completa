let obtenerDiferenciaYear = year => {
    return new Date().getFullYear() - year;
}

let calcularMarca = marca => {
    let incremento;

    switch(marca){
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento= 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;        
    }

    return incremento;
}

let obtenerPlan = plan => {
    return (plan === 'basico') ? 1.20 : 1.50;
}

let primeraMayuscula = texto => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export { 
    obtenerDiferenciaYear,
    calcularMarca,
    obtenerPlan,
    primeraMayuscula
 }