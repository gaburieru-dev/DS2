import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEntity } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as noticias disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/noticias');
  }

  /**
   * Fornece a noticia com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/noticias/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/noticias/${id}`);
  }

  /**
   * Exclui a noticia com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/noticias/'+ id);
  }

  /**
   * Verifica se existe um ID na noticia passada por parametro.
   * Se existir, significa que a noticia deverá ser alterada,
   * caso contrário, significa que a noticia será incluída
   * 
   * @param noticia 
   */
  public salvar(noticia: NoticiaEntity) {
    if (noticia.id) {
      return this.alterar(noticia);
    } else {
      return this.adicionar(noticia);
    }
  }

  /**
   * Adiciona uma nova noticia 
   * 
   * @param noticia 
   */
  private adicionar(noticia: NoticiaEntity) {
    return this.http.post(environment.urlSaaS +'/noticias', noticia);
  }

  /**
   * Altera a noticia passada por parâmetro
   * 
   * @param noticia 
   */
  private alterar(noticia: NoticiaEntity) {
    return this.http.put(environment.urlSaaS +'/noticias/'+ noticia.id, noticia);
  }
}

export class NoticiaEntity {
  id: number;
  novidades: string;
  jogos_semana: string;
  noticias_cenario: string;
  usuario: UsuarioEntity;
}