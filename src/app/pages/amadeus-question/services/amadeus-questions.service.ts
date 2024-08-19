import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../env';

@Injectable({providedIn: 'root'})
export class AmadeusQuestionService {
    constructor(private httpClient: HttpClient) { }
    


    getQuestion(){
        return this.httpClient.get(`${environment.AMADEUS_URL}/amadeus-questions`)
    }

}
