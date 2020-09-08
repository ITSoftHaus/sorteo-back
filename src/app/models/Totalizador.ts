export default class Totalizador {
  private numero: number;
  private total: number;
  private porcentagem: number;

  getNumero(): number {
    return this.numero;
  }

  setNumero(_numero: number) {
    this.numero = _numero;
  }

  getTotal(): number {
    return this.total;
  }

  setTotal(_total: number) {
    this.total = _total;
  }

  getPorcentagem(): number {
    return this.porcentagem;
  }

  setPorcentagem(_porcentagem: number) {
    this.porcentagem = _porcentagem;
  }
}
