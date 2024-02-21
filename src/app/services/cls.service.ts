import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClsService {
  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post("http://63.250.53.24:9091/v1/auth/signin", obj);
  }
}
