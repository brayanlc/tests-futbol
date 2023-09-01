import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { TeamsService } from '../teams.service';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit {
  /*Inject*/
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);
  private router = inject(Router);

  /*Form*/
  filterForm = this.fb.nonNullable.group({
    dateFrom: ['', [Validators.required]],
    dateTo: ['', [Validators.required]],
  });

  teams$: Observable<Team[]> = this.teamsService.getTeams();

  ngOnInit() {}

  onSubmit() {
    console.log(this.filterForm);
  }

  formatDate(d: Date): string {
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  filterByDate() {
    if (this.filterForm.invalid) return;

    const { dateFrom, dateTo } = this.filterForm.value;

    const dateFromFormat = this.formatDate(new Date(dateFrom || ''));
    const dateToFormat = this.formatDate(new Date(dateTo || ''));

    this.teams$ = this.teamsService.getTeamsByDate(
      dateFromFormat,
      dateToFormat,
    );
  }

  editTeam(id: number | undefined) {
    this.router.navigate(['/teams/edit', id]);
  }

  deleteTeam(id: number | undefined) {
    if (!id) return;

    let confirmDelete = confirm("Are you sure you want to delete this team?");

    if (confirmDelete) {
      this.teamsService.deleteTeam(id).subscribe(() => {
        this.teams$ = this.teamsService.getTeams();
      });
    }
  }
}
