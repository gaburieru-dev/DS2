import { UsuarioEntity } from './../_services/usuario.service';
import { JogoEntity } from './../_services/jogo.services';
import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlugarService, AlugarEntity } from '../_services/alugar-jogo.services';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-alugar_jogo',
  templateUrl: './alugar_jogo.component.html',
  styleUrls: ['./alugar_jogo.component.scss']
})
export class AlugarComponent implements OnInit {

  public displayedColumns: string[] = ['nome_jogo', 'quant_vend', 'resumo', 'data', 'email', 'senha', 'options'];
  public alugar_jogos: AlugarEntity[] = [];
  public usuarios: UsuarioEntity[] = [];
  public jogo: JogoEntity[] = [];

  public dataSource = new MatTableDataSource<AlugarEntity>();

  public errorMessage: string;
  public loading: boolean;

  public alugar_jogo: AlugarEntity = new AlugarEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: AlugarService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private socketClient: Socket,
              private zonaService: UsuarioService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de alugar_jogos
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.alugar_jogos = result as [];

      //Alimenta o datasource com os alugar_jogos
      this.dataSource.data = this.alugar_jogos;

      //Carrega as usuarios
      this.zonaService.listarTodos().subscribe(result => {
        this.usuarios = result as [];
      });

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createAlugar
    this.socketClient.fromEvent('createAlugar').subscribe(result => {
      this.alugar_jogos.push(result as AlugarEntity)
      this.dataSource.data = this.alugar_jogos;
    })

    //Listner do evento deleteAlugar
    this.socketClient.fromEvent('deleteAlugar').subscribe(result => {
      let alugar_jogo = result as AlugarEntity;
      let index = this.alugar_jogos.findIndex( item => item.id == alugar_jogo.id);

      this.alugar_jogos.splice(index, 1);

      this.dataSource.data = this.alugar_jogos;
    })

    //Listner do evento createAlugar
    this.socketClient.fromEvent('updateAlugar').subscribe(result => {
      let alugar_jogo = result as AlugarEntity;
      let index = this.alugar_jogos.findIndex( item => item.id == alugar_jogo.id);

      this.alugar_jogos[index] = alugar_jogo;

      this.dataSource.data = this.alugar_jogos;
    })
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.alugar_jogo).subscribe(result => {

      //Deu tudo certo, então avise o usuário...
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3500
      });

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Não foi possível salvar o registro!', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, 
      //oculta a barra de progresso...
      this.loading = false;

      //... e fecha a sidenav com o formulário
      this.sidenav.close();
    })
  }

  /**
   * Chama a janela de confirmação de exclusão, se usuário confirmar
   * chama evento de exclusão da service.
   * 
   * @param alugar_jogo 
   */
  public excluir(alugar_jogo: AlugarEntity): void {
    
    //Mostra a janela modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: new ConfirmDialogOption('Excluir Registro', 'Deseja realmente exluir o registro?', 'warn')
    });

    //Depois de fechado (clicado em cancelar ou confirmar)...
    dialogRef.afterClosed().subscribe(result => {
      
      //Se confirmou, exclui o registro
      if (result) {
        this.service.excluir(alugar_jogo.id).subscribe(result => {
          
          //Deu certo, avisa o usuário...
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3500
          });

        }, error => {
          
          //Se ocorreu algum erro neste processo, mostra mensagem para usuário
          this.showError('Não foi possível excluir o registro!', error);

        }).add(() => {
          
          //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
          this.loading = false;

        });
      }
    });
  }

  /**
   * Abre o formulário com um novo cliente para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new AlugarEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param alugar_jogo
   */
  public editar(alugar_jogo: AlugarEntity): void {
    //Como alugar_jogo é passado um objeto da tabela por referencia, 
    //se não for feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.assign({}, alugar_jogo));
  }

  /**
   * Função responsável por mostrar uma mensagem de erro padrão.
   * @param text
   * @param error 
   */
  private showError(text: string, error: any): void {
    //Mostra a snackbar com fundo customizado (vermelho)
    this.snackBar.open(text, '', {
      duration: 5000,
      panelClass: 'snakWarn'
    });

    //Adiciona a mensagem de erro no painel de erro
    this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
  }

  /**
   * Dá um open na sidnav exibindo o formulário com os dados 
   * da objeto passado por parâmetro.
   * 
   * @param alugar_jogo 
   */
  private openSidenav(alugar_jogo: AlugarEntity): void {
    this.alugar_jogo = alugar_jogo;
    this.sidenav.open();
  }

  /**
   * Função responsável por carregar um item no select, comparando
   * os dois parametros se possuem ID's identicos. 
   * 
   * @param item1 
   * @param item2 
   */
  public compareOptions(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

}