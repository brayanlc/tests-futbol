import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ResponseTeams, Team } from './models/team';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  apiService = inject(ApiService);

  getTeams() {
    return this.apiService.Get<ResponseTeams>('equipos/listar/0/20').pipe(
      map((res) => {
        return res.content;
      }),
    );
  }

  getTeamsByDate(fromDate: string, toDate: string) {
    return this.apiService.Get<Team[]>(
      `equipos/consultar/${fromDate}/${toDate}`,
    );
  }

  getTeam(id: number) {
    return this.apiService.Get<Team>(`equipos/consultar/${id}`);
  }

  createTeam(team: Team) {
    return this.apiService.Post<ResponseTeams>('equipos/crear', team);
  }

  updateTeam(id: number, team: Team) {
    return this.apiService.Put<ResponseTeams>(`equipos/actualizar/${id}`, team);
  }

  deleteTeam(id: number) {
    return this.apiService.Delete<Team>(`equipos/eliminar/${id}`, {});
  }
}
