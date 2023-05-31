import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Chat, Message, Offer } from 'src/app/models/chat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE CHATS
  public chatList: Chat[] = []

  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UN CHAT
  public postChat(chat: Chat): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/chats`, chat)
  }

  // FUNCIÓN PARA HACER POST DE UN OFFER
  public postOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.CONFIG_URL}/offers`, offer)
  }

  public patchOffer(state: number, offerId: number): Observable<Message> {

    const patchData: { state: number } = { state: state };
    return this.http.patch<Message>(`${this.CONFIG_URL}/offers/${offerId}`, patchData);

  }

  public getOfferById(offerId: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.CONFIG_URL}/offers/?chatId=${offerId}`)

  }

  // FUNCIÓN PARA HACER POST DE UN MENSAJE
  public postMsg(message: Message): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/messages`, message)
  }

  // FUNCIÓN PARA OBTENER LOS MENSAJES Y ALMACENARLOS EN LA VAR PRIVADA
  public getMsg(msg: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.CONFIG_URL}/messages/?chatId=${msg}`)
  }


  public patchMsg(chatId: number, emit: number): Observable<Message> {
    const url = `${this.CONFIG_URL}/messages/?chatId=${chatId}&emit=${emit}&_sort=id&_order=desc&_limit=1`;
    const patchData: { seen: boolean } = { seen: true };

    return this.http.get<Message[]>(url).pipe(
      switchMap((response: Message[]) => {
        if (response.length > 0) {
          const message: Message = response[0];
          if (message.seen == true) {
            return []
          }
          const updatedMessage: Message = { ...message, ...patchData };

          return this.http.patch<Message>(`${this.CONFIG_URL}/messages/${message.id!}`, updatedMessage);
        } else {
          throw new Error('No messages found.');
        }
      })
    );
  }


  // FUNCIÓN PARA HACER PUT DE UN CHAT
  public putChat(chat: Chat): Observable<Category> {
    return this.http.put<Category>(`${this.CONFIG_URL}/chats/${chat.id}`, chat)
  }

  // FUNCIÓN PARA OBTENER LOS CHATS Y ALMACENARLOS EN LA VAR PRIVADA
  public getChats(): Observable<void> {
    return this.http.get<Chat[]>(`${this.CONFIG_URL}/chats`)
      .pipe(map(((chats: Chat[]) => {
        this.chatList = chats
      })))
  }
  public getChat(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.CONFIG_URL}/chats/${id}`)


  }
}
