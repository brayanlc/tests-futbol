import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../teams.service';
import { Team } from '../models/team';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teams-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teams-create.component.html',
  styleUrls: ['./teams-create.component.scss'],
})
export class TeamsCreateComponent implements OnInit {
  /*Inject*/
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  /*Vars*/

  /*Forms*/
  createForm = this.fb.nonNullable.group({
    nombre: [''],
    estadio: [''],
    sitioWeb: [''],
    nacionalidad: [''],
    fundacion: [''],
    entrenador: [''],
    capacidad: [0],
    valor: [0],
  });

  ngOnInit(): void {
    if (this.teamId) {
      this.getTeams(this.teamId);
    }
  }

  onSubmit() {
    this.createForm.markAllAsTouched();
    if (this.createForm.invalid) return;
    if (this.teamId) {
      this.updateTeam();
    } else {
      this.saveTeam();
    }
  }

  saveTeam() {
    this.teamsService.createTeam(this.data).subscribe(() => {
      this.router.navigate(['/teams/list']);
    });
  }

  updateTeam() {
    this.teamsService.updateTeam(this.teamId, this.data).subscribe(() => {
      this.router.navigate(['/teams/list']);
    });
  }

  getTeams(id: number) {
    this.teamsService.getTeam(id).subscribe((res) => {
      this.setTeam(res);
    });
  }

  setTeam(team: Team) {
    this.createForm.patchValue(team);
  }

  get teamId(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  get data(): Team {
    return this.createForm.value as Team;
  }
}
