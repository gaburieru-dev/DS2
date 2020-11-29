import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioEntity } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AtualizacoesService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as atualizacoess disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/atualizacoess');
  }

  /**
   * Fornece a atualizacoes com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/atualizacoess/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/atualizacoess/${id}`);
  }

  /**
   * Exclui a atualizacoes com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/atualizacoess/'+ id);
  }

  /**
   * Verifica se existe um ID na atualizacoes passada por parametro.
   * Se existir, significa que a atualizacoes deverá ser alterada,
   * caso contrário, significa que a atualizacoes será incluída
   * 
   * @param atualizacoes 
   */
  public salvar(atualizacoes: AtualizacoesEntity) {
    if (atualizacoes.id) {
      return this.alterar(atualizacoes);
    } else {
      return this.adicionar(atualizacoes);
    }
  }

  /**
   * Adiciona uma nova atualizacoes 
   * 
   * @param atualizacoes 
   */
  private adicionar(atualizacoes: AtualizacoesEntity) {
    return this.http.post(environment.urlSaaS +'/atualizacoess', atualizacoes);
  }

  /**
   * Altera a atualizacoes passada por parâmetro
   * 
   * @param atualizacoes 
   */
  private alterar(atualizacoes: AtualizacoesEntity) {
    return this.http.put(environment.urlSaaS +'/atualizacoess/'+ atualizacoes.id, atualizacoes);
  }
}

export class AtualizacoesEntity {
  id: number;
  versao_jogo: string;
  conteudo: string;
  usuario: UsuarioEntity;
}