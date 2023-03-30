export interface Transformer<M, D> {
  toModel(dto: D): M;

  toDto(model: M): D;
}
