import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AmadeusQuestionService } from '../../services/amadeus-questions.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
//linea si edwin va a enviarme un dato
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
  //edwin si vas a enviarme algo tienes que descomentar la funcion de abajo
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
    // espera a que el observable devuelto por getQuestion se complete y asigna las preguntas obtenidas a this.questions
    this.questions = await lastValueFrom(this.amadeusService.getQuestion());

     // verifica si el usuario ya completó todas las preguntas
    const questionsCompleted = localStorage.getItem('questionsCompleted');
    
    if (questionsCompleted === 'true') {
         // si el usuario ya completó las preguntas, redirige o muestra un mensaje diferente
        this.router.navigate(['']);
         return; // Detiene la ejecución para no cargar el resto del componente
    }
    
     // si no ha completado las preguntas, continúa con la lógica normal (ya la tienes)
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
  // esta es la forma en la que cambio al componente de edwin
  public changeComponent() {
    // al cambiar la variable true despliega el componente al que se reditige 
    this.showInner = true;
    //de esta forma cambia al componente de edwin
    
    // verifica si todas las preguntas han sido respondidas
    if (this.currentIndex >= this.questions.length) {
      this.allQuestionsAnswered = true;

      // guardar en localStorage que el usuario ha completado todas las preguntas
      localStorage.setItem('questionsCompleted', 'true');

      // redirigir al componente de camilo
      this.router.navigate(['']);
  } else {
      this.showContinue = false; // Oculta el botón "CONTINUAR" si no se han completado todas las preguntas
  }
  }
  //funcion en la que se va almacenar el dato enviado de questions component
  public onDataReceived(data:boolean){
        // aqui espera el dato en flase de edwin para cambiar de pregunta
        this.showInner = data
        // Incrementa el índice de la pregunta actual y asegura que vuelva al inicio cuando se pase el final del array
        this.currentIndex = (this.currentIndex + 1) % this.questions.length;
        // oculta el botón "CONTINUAR" al cambiar a la siguiente pregunta
        this.showContinue = false;
    
  }  
  //funcion para recibir el dato de questions component
  public continueCitiesQuestions(){
    //recojo el dato de questions component
    this.onDataReceived(false)
  }


}
//npx json-server src/assets/data/db.json
