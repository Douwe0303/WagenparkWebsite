import { OrderTransformer } from "../src/app/transformer/order-transformer/order-transformer";
import { LeasecarTransformer } from "../src/app/transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../src/app/transformer/contract-transformer/contract-transformer";
import { CustomDateParser } from "../src/app/class/customDateParser/custom-date-parser";
import { OrderDtoDummy } from "../src/app/dummy/order-dto-dummy/order-dto-dummy";
import { OrderDummy } from "../src/app/dummy/order-dummy/order-dummy";

describe('OrderTransformer.cy.ts', () => {
  let transformer: OrderTransformer;

  beforeEach(() => {
    let customDateParser: CustomDateParser = new CustomDateParser();
    let contractTransformer: ContractTransformer = new ContractTransformer(customDateParser);
    let leasecarTransformer: LeasecarTransformer = new LeasecarTransformer(contractTransformer);
    transformer = new OrderTransformer(leasecarTransformer, customDateParser);
  });

  it('dto to model works', () => {
    let actual = transformer.toModel(OrderDtoDummy);
    expect(actual).to.deep.equal(OrderDummy);
  })

  it('model to dto works', () => {
    let actual = transformer.toDto(OrderDummy);
    expect(actual).to.deep.equal(OrderDtoDummy);
  })
})
