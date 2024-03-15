import { environment } from '../../../environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  urlAddress: string = environment.urlAddress;

  constructor() { }
}
