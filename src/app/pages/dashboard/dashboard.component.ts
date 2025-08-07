import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/Flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
_router=inject(Router)
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  logout():void{
     localStorage.removeItem("token");
    this._router.navigate(['/login'])
  }
}

