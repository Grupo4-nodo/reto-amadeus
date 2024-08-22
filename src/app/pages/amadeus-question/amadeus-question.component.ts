import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AmadeusQuestionService } from '../../services/amadeus-questions.service';
import { catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
//linea si edwin va a enviarme un dato
//import { QuestionsComponent } from '../questions/questions.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { constants } from 'node:buffer';
import { error } from 'node:console';
interface questionsData {
  _id: string;
  category: string;
  question: string;
  options: string[];
  img: string;
}
interface User {
  email: string;
  amadeusAnswers: number[];  
}
@Component({
  imports: [
  CommonModule,
  ],
  standalone: true,
  selector: 'app-amadeus-question',
  templateUrl: './amadeus-question.component.html',
  styleUrl: './amadeus-question.component.scss',
})
export class AmadeusQuestionComponent implements OnInit {
  constructor(
    private amadeusService: AmadeusQuestionService,
    private usersService: UsersService, 
    private router:Router
    ) {}
  //no hace nada pero hasta no hacer pruebas no la borro
  public infoImgs: any = [];
  //como lo dice el nombre variable que deside mostrar el boton de continuar
  public showContinue: boolean = false;
  //variable para almacenar las preguntas
  public questions: any;
  //realiza el seguimiento de las preguntas
  public currentIndex: number = 0;
  // variable que guarda las respuestas del usuario
  public answers: string[] = new Array(11).fill('');
   //no hace nada pero hasta no hacer pruebas no la borro
  public userEmail: string = '';
  //es una variable que decide mostrar otro contenido 
  public showInner: boolean = false;
  //esta es la variable que se va a guardar en el localstorage para verificar si todas  las preguntas estan respondidas
  public allQuestionsAnswered: boolean = false;

  
  async ngOnInit() {

    const maxamadeusQuestion:number = 10;

    const storedIndex = sessionStorage.getItem('questionsIndex');
    
    const questionsCompleted = sessionStorage.getItem('questionsCompleted');

    const questionsArray = sessionStorage.getItem('questionsArray');

    this.answers = questionsArray ? JSON.parse(questionsArray) : []

    this.currentIndex = storedIndex ? parseInt(storedIndex) : 0;

    this.questions = await lastValueFrom(this.amadeusService.getQuestion());

    if (this.currentIndex === maxamadeusQuestion) {
      this.router.navigate(['/cities']);
      return;
    }
  }
  
  public async placeImg(option: string): Promise<void> {
    // Marca el botón "CONTINUAR" como visible
    this.showContinue = true;

    // Guarda la opción seleccionada en el array de respuestas en la posición actual
    this.answers[this.currentIndex] = option;

    sessionStorage.setItem('questionsArray',JSON.stringify(this.answers))
    // Muestra en la consola las respuestas guardadas
    console.log('Respuesta guardada:', this.answers);
    
    // Obtiene el email del usuario desde sessionStorage en lugar de localStorage
    const email = sessionStorage.getItem('email'); 
    if (email) {
      
        const users = await firstValueFrom(this.usersService.getUsers());
        // Espera a que el observable devuelto por checkIfUserExits se complete y obtiene los datos del usuario
        const user = users.find((user:any) => user.email === email )
        if (user && typeof user.id === 'string') {
          // Espera a que el observable devuelto por editUser se complete y actualiza el array amadeusAnswers del usuario
          this.usersService.editUser(user.id, { "amadeusAnswers": this.answers }).pipe(
            catchError((error) => {
              console.error('Error al actualizar el usuario:', error);
              throw error;
            })
          ).subscribe(()=> {
            console.log("Usuario actualizado correctamente");
          });
        }
      }
    }
  
  // esta es la forma en la que cambio al componente de edwin
  public changeComponent() {
    // al cambiar la variable true despliega el componente al que se reditige 
    this.showInner = true;
    //de esta forma cambia al componente de edwin
    
    // verifica si todas las preguntas han sido respondidas
    if (this.currentIndex >= this.questions.length) {
      this.allQuestionsAnswered = true;
      // guardar en localStorage que el usuario ha completado todas las preguntas
      sessionStorage.setItem('questionsCompleted', 'true');
      // redirigir al componente de camilo
      
    } else {
      this.showContinue = false; // Oculta el botón "CONTINUAR" si no se han completado todas las preguntas
      this.currentIndex = (this.currentIndex + 1) % this.questions.length;
      sessionStorage.setItem('questionsIndex',this.currentIndex.toString());
      this.router.navigate(['/cities']);
    }
  }
}
//npx json-server src/assets/data/db.json
