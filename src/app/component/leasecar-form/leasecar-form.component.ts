import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { Leasecar } from "../../interface/model/leasecar";
import { LeasecarDummy } from "../../dummy/leasecar-dummy/leasecar-dummy";
import { EngineType } from "../../type/engine-type/engine-type";
import { ContractType } from "../../type/contract-type/contract-type";
import { LeasecarService } from "../../service/leasecar/leasecar.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs";
import { LeasecarDto } from "../../interface/dto/leasecar-dto";
import { LeasecarTransformer } from "../../transformer/leasecar-transformer/leasecar-transformer";
import { ContractTransformer } from "../../transformer/contract-transformer/contract-transformer";
import { EventService } from "../../service/event/event.service";
import { NgForm } from "@angular/forms";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-leasecar-form',
  templateUrl: './leasecar-form.component.html',
  styleUrls: ['./leasecar-form.component.css'],
  providers: [LeasecarTransformer, ContractTransformer,
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class LeasecarFormComponent implements OnInit {

  leasecar: Leasecar = JSON.parse(JSON.stringify(LeasecarDummy));

  protected readonly EngineType = EngineType;
  protected readonly ContractType = ContractType;

  @ViewChild('leasecarForm') myForm: NgForm | undefined;

  busy: boolean = false;
  action: string | null = null;

  buttonFont: string = "add_button";
  buttonName: string = "Leaseauto toevoegen";
  buttonColorClass: string = "text-success";

  constructor(
    private _leasecarService: LeasecarService,
    private _titleService: Title,
    private _eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private leasecarTransformer: LeasecarTransformer
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.action = this.activatedRoute.snapshot.paramMap.get('action');

    if(id != null && this.action == 'edit') {
      this.getLeasecar(id);
      this._titleService.setTitle('Leaseauto ' + id);
      this.buttonFont = 'settings';
      this.buttonName = 'Leaseauto wijzigen';
      this.buttonColorClass = 'text-warning';
    }
  }

  getLeasecar(id: string): void {
    this._leasecarService.fetchLeasecar(+id).then((call) => {
      call.pipe(first()).subscribe((leasecar: LeasecarDto) => {
        this.leasecar = this.leasecarTransformer.toModel(leasecar);
        console.log(this.leasecar);
      })
    })
  }

  submit(): void {
    this.busy = true;
    let leasecarDto: LeasecarDto = this.leasecarTransformer.toDto(this.leasecar);
    console.log(leasecarDto);
    if(this.action == 'edit') {
      this.rotateIcon();
      this.timer().then(()=> {
        this.update(leasecarDto);
      })
    } else {
      this.loading();
      this.timer().then(()=> {
        this.create(leasecarDto);
      })
    }
  }

  async timer(): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
  }

  loading(): void {
    this.displayElement('form-button', 'none');
    this.displayElement('loading-spinner', 'flex');
  }

  finished(): void {
    this.displayElement('loading-spinner', 'none');
    this.displayElement('form-button', 'flex');
  }

  displayElement(element: string, display: string): void {
    // @ts-ignore
    document.getElementById(element).style.display = display;
  }

  rotateIcon(): void {
    let icon = document.getElementById('form-button-icon');
    // @ts-ignore
    icon.classList.add('rotate-icon');
  }

  removeRotation(): void {
    let icon = document.getElementById('form-button-icon');
    // @ts-ignore
    icon.classList.remove('rotate-icon');
  }

  update(leasecarDto: LeasecarDto): void {
    this._leasecarService.editLeasecar(leasecarDto).then((update) => {
      update.pipe(first()).subscribe(
        () => {
          this._eventService.emitUpdate(leasecarDto.id as number, 'leaseauto');
        },
        (error: any) => {
          alert(error.statusText)
        },
        () => {
          this.busy = false;
          this.removeRotation();
        }
      )
    })
  }

  create(leasecarDto: LeasecarDto): void {
    this._leasecarService.createLeasecar(leasecarDto).then((create) => {
      create.pipe(first()).subscribe(
        (leasecar: LeasecarDto) => {
          this._eventService.emitAdd(leasecar.id as number);
          this.myForm?.form.markAsPristine();
          this.leasecar = JSON.parse(JSON.stringify(LeasecarDummy));
        },
        (error: any) => {
          alert(error.statusText)
        },
        () => {
          this.busy = false;
          this.finished();
        }
      )
    })
  }
}
