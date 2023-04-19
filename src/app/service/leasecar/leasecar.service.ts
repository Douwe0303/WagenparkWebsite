import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LeasecarDto } from "../../interface/dto/leasecar-dto";

@Injectable({
  providedIn: 'root'
})
export class LeasecarService {

  LEASECAR_URL: string = '/api/leasecars/';

  constructor(private http: HttpClient) { }

  async fetchLeasecars(): Promise<any> {
    return this.http.get(this.LEASECAR_URL);
  }

  async fetchLeasecar(id: number | null): Promise<any> {
    return this.http.get(this.LEASECAR_URL+id);
  }

  async createLeasecar(leasecar: LeasecarDto | null): Promise<any> {
    return this.http.post(this.LEASECAR_URL, leasecar);
  }

  async deleteLeasecar(id: number | undefined): Promise<any> {
    return this.http.delete(this.LEASECAR_URL+id);
  }

  async editLeasecar(leasecar: LeasecarDto | null): Promise<any> {
    return this.http.put(this.LEASECAR_URL+leasecar?.id, leasecar);
  }
}
