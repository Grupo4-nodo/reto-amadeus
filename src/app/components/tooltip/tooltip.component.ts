import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'tooltip',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  @Input() text = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'right';

  isVisible = false;

  @HostListener('mouseenter') // si el mouse entra en contacto
  show() {
    this.isVisible = true; // muestra el tooltip
  }

  @HostListener('mouseleave') // si el mouse se quita
  hide() {
    this.isVisible = false; // oculta el tooltip
  }
}
