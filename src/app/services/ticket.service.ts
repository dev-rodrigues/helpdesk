import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../model/ticket.model';
import { HELP_DESK_API_URL } from './helpdesk.api';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id != '') {
      return this.http.put(`${HELP_DESK_API_URL}/api/ticket`, ticket);
    } else {
      ticket == null;
      ticket.status = 'New';
      return this.http.post(`${HELP_DESK_API_URL}/api/ticket`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API_URL}/api/ticket/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${HELP_DESK_API_URL}/api/ticket/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${HELP_DESK_API_URL}/api/ticket/${id}`);
  }

  findByParams(page: number, count: number, assignedTome: boolean, t: Ticket) {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == null ? 'uninformed' : t.title;
    t.status = t.status == null ? 'uninformed' : t.status;
    t.priority = t.priority == null ? 'uninformed' : t.priority;
    return this.http.get(`${HELP_DESK_API_URL}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assignedTome}`)
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.http.put(`${HELP_DESK_API_URL}/api/ticket/${ticket.id}/${status}`, ticket);
  }

  summary() {
    return this.http.get(`${HELP_DESK_API_URL}/api/ticket/summary`);
  }
}