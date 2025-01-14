import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlowscriptComponent } from './glowscript/glowscript.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlowscriptComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClinEdit';
}
