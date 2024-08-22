import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { CommonModule } from '@angular/common';
import { Questions } from '../../interfaces/questions.interface';
import { Router } from '@angular/router';
import { publicDecrypt } from 'node:crypto';
import { Cities } from '../../interfaces/cities.interface';
import { CitiesService } from '../../services/cities.service';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  public citiesService = inject(CitiesService);
  public questions: Questions[] = [];
  public currentIndex: number = 0;
  public contadorRespuestas:number=0;
  public cities: Cities[] = [];
  public image: string = '';



  constructor(
    private questionService:QuestionsService,
    private router:Router, 
    private cityService:CitiesService
  ) {}

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
        
    });
      console.log('Regresa a amadeus-question-preguntamal') 
    }
    if (this.contadorRespuestas>=3) {
      console.log('Regresa a amadeus-question-maxrespuesta')
      this.router.navigate(['/amadeus-questions/']);
      
    }
    console.log(this.currentIndex)
  }



//@Input()
  getData() {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data as Questions[];
      this.questions = this.questions.filter((question) => question.City === this.citiesService.citySend);
    });
  }
  
  getCitys() {
    this.cityService.getCities().subscribe({
      next: (data) => {
      this.cities = data as Cities[];
      this.cities.forEach(
        (city) =>{
          if(city.City === this.citiesService.citySend) {
            this.image = city.img;
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  }
  //this.image = this.cities.filter((city) => city.city === this.citiesService.citySend)[0].img;
  //console.log(this.image);


