import { Component, Input, input } from '@angular/core';
import { Coche } from '../../interfaces/coche.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detalle-coche',
  imports: [MatCardModule],
  templateUrl: './detalle-coche.component.html',
  styleUrl: './detalle-coche.component.scss',
})
export class DetalleCocheComponent {
  @Input() coche: Coche | undefined;
}
