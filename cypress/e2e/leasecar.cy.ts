describe('Leasecar', () => {
  let leasecar = {
    driver: "Douwe de Leeuw",
    licensePlate: "12-AB-34",
    brand: "Volkswagen",
    model: "A4 Avant",
    extra: "blauw",
    engine: "PETROL",
    kilometers: 2000,
    price: 43000.59,
    particularities: "trekhaak",
    contract: {
      contractType: "A",
      signed: true,
      startDate: "12-04-2023",
      endDate: "15-05-2023",
      taxAddition: 12,
      contribution: 25
    }
  }

  it('passes post', () => {
    cy.request('POST', 'api/leasecars/', leasecar)
      .its('status')
      .should('eq', 201)
  })
});
