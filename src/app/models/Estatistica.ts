export default class Estatistica {
  private concurso: string;
  private mediana: number;
  private media: number;
  private moda: number;
  private numerosSorteados: number[];
  private maximo: number;
  private minimo: number;
  private desvioPadrao: number;
  private variancia: number;

  public getVariancia(): number {
    return this.variancia;
  }
  public setVariancia(variancia: number) {
    this.variancia = variancia;
  }

  public getDesvioPadrao(): number {
    return this.desvioPadrao;
  }
  public setDesvioPadrao(desvioPadrao: number) {
    this.desvioPadrao = desvioPadrao;
  }

  public getModa(): number {
    return this.moda;
  }
  public setModa(moda: number) {
    this.moda = moda;
  }

  public getMedia(): number {
    return this.media;
  }
  public setMedia(media: number) {
    this.media = media;
  }

  public getMinimo(): number {
    return this.minimo;
  }
  public setMinimo(minimo: number) {
    this.minimo = minimo;
  }

  public getMaximo(): number {
    return this.maximo;
  }
  public setMaximo(maximo: number) {
    this.maximo = maximo;
  }

  public getNumerosSorteados(): number[] {
    return this.numerosSorteados;
  }
  public setNumerosSorteados(numeros: number[]) {
    this.numerosSorteados = numeros;
  }

  public getConcurso(): string {
    return this.concurso;
  }
  public setConcurso(_concurso: string) {
    this.concurso = _concurso;
  }

  getMediana(): number {
    return this.mediana;
  }
  setMediana(_mediana: number) {
    this.mediana = _mediana;
  }
}
