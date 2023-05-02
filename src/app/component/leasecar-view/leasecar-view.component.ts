import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Leasecar} from "../../interface/model/leasecar";
import {LeasecarService} from "../../service/leasecar/leasecar.service";
import {first} from "rxjs";
import {LeasecarTransformer} from "../../transformer/leasecar-transformer/leasecar-transformer";
import {LeasecarDto} from "../../interface/dto/leasecar-dto";
import {ContractTransformer} from "../../transformer/contract-transformer/contract-transformer";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-leasecar-view',
  templateUrl: './leasecar-view.component.html',
  styleUrls: ['./leasecar-view.component.css'],
  providers: [LeasecarTransformer, ContractTransformer]
})
export class LeasecarViewComponent implements OnInit{
  @Input() items: any[] = [];
  @Input() hiddenProperties: string[] = [];
  @Input() titles: string[] = [];
  @Input() id: string | null = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private _leasecarService: LeasecarService,
    private _titleService: Title,
    private leasecarTransformer: LeasecarTransformer
  ){}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id) {
      this.getLeasecar(this.id);
      this._titleService.setTitle('Leaseauto ' + this.id);
    }
  }

  getLeasecar(id: string): void {
    this._leasecarService.fetchLeasecar(+id).then((read) => {
      read.pipe(first()).subscribe((leasecarDto: LeasecarDto) => {
        let leasecar = this.leasecarTransformer.toModel(leasecarDto);
        this.setInputs(leasecar);
      })
    })
  }

  setInputs(leasecar: Leasecar): void {
    this.items = [
      leasecar,
      leasecar.contract
    ];
    this.hiddenProperties = [
      'id', 'contract', 'leasecar', 'leaseOrderId'
    ];
    this.titles = [
      'Leaseauto', 'Contract'
    ];
  }
}
