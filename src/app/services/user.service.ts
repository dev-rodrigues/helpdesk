import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { HELP_DESK_API_URL } from './helpdesk.api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }

  login(user : User) {
    return this.http.post(`${HELP_DESK_API_URL}/api/auth`, user);
  }

  creatOrUpdate(user : User) {
    if(user.id != null && user.id != '') {
      return this.http.put(`${HELP_DESK_API_URL}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${HELP_DESK_API_URL}/api/user`, user);
    }
  }

  findAll(page:number, count:number) {
    return this.http.get(`${HELP_DESK_API_URL}/api/user/${page}/${count}`);
  }

  findById(id: String) {
    return this.http.get(`${HELP_DESK_API_URL}/api/user/${id}`);
  }

  delete(id: String){
    return this.http.delete(`${HELP_DESK_API_URL}/api/user/${id}`);
  }
}