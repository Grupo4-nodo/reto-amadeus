import { Component, Input, NgModule, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { CommonModule } from '@angular/common';
import { Questions } from '../../Interfaces/questions.interface';
import { Router } from '@angular/router';import { publicDecrypt } from 'node:crypto';
import { CitiesService } from '../../services/cities.service.ts.service';
import { Cities } from '../../Interfaces/cities.interface';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  public questions: Questions[] = [];
  public currentIndex: number = 0;
  public contadorRespuestas:number=0;
  public nameCity: string = 'Playa_del_Carmen';
  public cities: Cities[] = [];
  public image: string = '';


  constructor(private questionService:QuestionsService,private router:Router, private cityService:CitiesService) {}

  ngOnInit() {
    this.getData()
    this.getCitys()
  }

  public sentAnswer (answer : string){
      if (this.questions[this.currentIndex].Answer === answer){
        this.contadorRespuestas++; 
          if (this.currentIndex < this.questions.length-1){ 
            this.currentIndex++;
          }
      }
    
    else{
      this.router.navigate(['/amadeus-questions/'], {
        queryParams: { nameCity: this.nameCity, currentIndex: this.currentIndex, contadorRespuestas: this.contadorRespuestas, question: this.questions[this.currentIndex].Question, answer: this.questions[this.currentIndex].Answer, option1: this.questions[this.currentIndex].Options[0], option2: this.questions[this.currentIndex].Options[1], option3: this.questions[this.currentIndex].Options[2], option4: this.questions[this.currentIndex].Options[3] },
     });
      console.log('Regresa a amadeus-question-preguntamal') 
    }
    if (this.contadorRespuestas>=3) {
      console.log('Regresa a amadeus-question-maxrespuesta')
      
    }
    console.log(this.currentIndex)
  }



//@Input()
  getData() {
    this.questionService.getQuestions().subscribe((data) => {
      console.log(data);
      this.questions = data as Questions[];
      this.questions = this.questions.filter((question) => question.City === this.nameCity);
    });
  }
  getCitys() {
    this.cityService.getCities().subscribe((data) => {
      console.log(data);
      this.cities = data as Cities[];
      this.image = this.cities.filter((city) => city.city === this.nameCity)[0].img;

   
    });
  }
}


