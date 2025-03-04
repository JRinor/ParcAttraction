import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {

  constructor(private dataService: DataService) {}

  public getAllAttraction(): Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  public getAllVisibleAttraction(): Observable<AttractionInterface[]> {
    const url = "http://127.0.0.1:5000/attraction/visible";
    const data = this.dataService.getData(url);
    return data as Observable<AttractionInterface[]>;
  }

  public postCommentaire(id: number, commentaire: string): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction/commentaire";
    const data = this.dataService.postData(url, { id, commentaire });
    return data as Observable<MessageInterface>;
  }

  public postAttraction(attraction: AttractionInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/attraction";
    const data = this.dataService.postData(url, attraction);
    return data as Observable<MessageInterface>;
  }
}