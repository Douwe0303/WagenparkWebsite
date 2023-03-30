export interface Leasecar {
  data: {
    id?: number,
    brand: string | null,
    driver: string | null,
    model: string | null,
    extra: string | null,
    engine: string | null,
    kilometers: number | null,
    price: number | null,
    particularities: string | null
  }
}
