import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { UsuarioEntity } from './usuario.service';
import { JogoEntity } from './jogo.services';

@Injectable({
  providedIn: 'root'
})
export class AlugarService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as alugars disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/alugars');
  }

  /**
   * Fornece a alugar com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/alugars/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/alugars/${id}`);
  }

  /**
   * Exclui a alugar com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/alugars/'+ id);
  }

  /**
   * Verifica se existe um ID na alugar passada por parametro.
   * Se existir, significa que a alugar deverá ser alterada,
   * caso contrário, significa que a alugar será incluída
   * 
   * @param alugar 
   */
  public salvar(alugar: AlugarEntity) {
    if (alugar.id) {
      return this.alterar(alugar);
    } else {
      return this.adicionar(alugar);
    }
  }

  /**
   * Adiciona uma nova alugar 
   * 
   * @param alugar 
   */
  private adicionar(alugar: AlugarEntity) {
    return this.http.post(environment.urlSaaS +'/alugars', alugar);
  }

  /**
   * Altera a alugar passada por parâmetro
   * 
   * @param alugar 
   */
  private alterar(alugar: AlugarEntity) {
    return this.http.put(environment.urlSaaS +'/alugars/'+ alugar.id, alugar);
  }
}

export class AlugarEntity {
  id: number;
  nome_jogo: string;
  email: string;
  senha: string;
  data: Date;
  usuario: UsuarioEntity;
  jogo: JogoEntity;
}