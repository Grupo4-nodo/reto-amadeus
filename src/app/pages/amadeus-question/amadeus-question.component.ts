import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AmadeusQuestionService } from '../../services/amadeus-questions.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
//import { QuestionsComponent } from '../questions/questions.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
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
  //QuestionsComponent
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

  public infoImgs: any = [];
  public showContinue: boolean = false;
  public questions: any;
  public currentIndex: number = 0;
  public answers: string[] = new Array(11).fill('');
  public userEmail: string = '';
  public showInner: boolean = false;
  
  async ngOnInit() {
    // Espera a que el observable devuelto por getQuestion se complete y asigna las preguntas obtenidas a this.questions
    this.questions = await lastValueFrom(this.amadeusService.getQuestion());
  }

  public async placeImg(option: string): Promise<void> {
    // Marca el botón "CONTINUAR" como visible
    this.showContinue = true;
    // Guarda la opción seleccionada en el array de respuestas en la posición actual
    this.answers[this.currentIndex] = option;
    // Muestra en la consola las respuestas guardadas
    console.log('Respuesta guardada:', this.answers);
    
    // Obtiene el email del usuario desde el local storage
    const email = localStorage.getItem('userEmail'); 
    if (email) {
        try {
            // Espera a que el observable devuelto por checkIfUserExits se complete y obtiene los datos del usuario
            const user = await firstValueFrom(this.usersService.checkIfUserExits(email));
            if (user.length > 0) {
                // Obtiene el ID del primer usuario encontrado.
                const userId = user[0].id;
                // Espera a que el observable devuelto por editUser se complete y actualiza el array amadeusAnswers del usuario
                await firstValueFrom(this.usersService.editUser(email, { amadeusAnswers: this.answers }));
            }
        } catch (error) {
            // Muestra un mensaje de error en la consola si ocurre una excepción.
            console.error('Error al actualizar el usuario:', error);
        }
    }
  }
  public changeComponent() {
    this.showInner = true;
    this.router.navigate(['/questions'])

  }

  public onDataReceived(data:boolean){
        this.showInner = data
        // Incrementa el índice de la pregunta actual y asegura que vuelva al inicio cuando se pase el final del array
        this.currentIndex = (this.currentIndex + 1) % this.questions.length;
        // Oculta el botón "CONTINUAR" al cambiar a la siguiente pregunta
        this.showContinue = false;
    
  }  

  public continueCitiesQuestions(){

    this.onDataReceived(false)
  }



}
//npx json-server src/assets/data/db.json