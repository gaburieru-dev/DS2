import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlugarEntity } from './alugar-jogo.services';
import { UsuarioEntity } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as jogos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/jogos');
  }

  /**
   * Fornece a jogo com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/jogos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/jogos/${id}`);
  }

  /**
   * Exclui a jogo com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/jogos/'+ id);
  }

  /**
   * Verifica se existe um ID na jogo passada por parametro.
   * Se existir, significa que a jogo deverá ser alterada,
   * caso contrário, significa que a jogo será incluída
   * 
   * @param jogo 
   */
  public salvar(jogo: JogoEntity) {
    if (jogo.id) {
      return this.alterar(jogo);
    } else {
      return this.adicionar(jogo);
    }
  }

  /**
   * Adiciona uma nova jogo 
   * 
   * @param jogo 
   */
  private adicionar(jogo: JogoEntity) {
    return this.http.post(environment.urlSaaS +'/jogos', jogo);
  }

  /**
   * Altera a jogo passada por parâmetro
   * 
   * @param jogo 
   */
  private alterar(jogo: JogoEntity) {
    return this.http.put(environment.urlSaaS +'/jogos/'+ jogo.id, jogo);
  }
}

export class JogoEntity {
  id: number;
  ano_lanc: string;
  quant_vend: string;
  resumo: string;
  usuario: UsuarioEntity;
  alugar_jogo: AlugarEntity;
}