export function formatNumber(value:number) {
    // Formatar o número sem casas decimais
    value.toFixed(2)
    return value.toLocaleString('pt-PT').replace(/\./g, ' ');
}