import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AmadeusQuestionService } from './services/amadeus-questions.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { QuestionsComponent } from '../questions/questions.component';
interface questionsData {
  _id:string; 
  category:string;
  question:string;
  options:string[];
  img:string;
}
@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-amadeus-question',
  templateUrl: './amadeus-question.component.html',
  styleUrl: './amadeus-question.component.scss'
})
export class AmadeusQuestionComponent implements OnInit {
  constructor(private amadeusService:AmadeusQuestionService){}

  public infoImgs:any=[];
  public showContinue:boolean = false;
  public questions:any;
  public currentIndex:number = 0;
  async ngOnInit() {
  this.questions = await lastValueFrom(this.amadeusService.getQuestion());
  
}

  public placeImg(){
    this.showContinue = true;
  }

  public nextQuestion() {
    this.currentIndex = (this.currentIndex + 1) % this.questions.length;
    this.showContinue = false;

  }
}
//npx json-server src/assets/data/db.json