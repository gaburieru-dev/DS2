import { UsuarioComponent } from './usuario/usuario.component';
import { AlugarJogoComponent } from './alugar-jogo/alugar-jogo.component';
import { JogoComponent } from './jogo/jogo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizacoesComponent } from './atualizacoes/atualizacoes.component';
import { NoticiaComponent } from './noticia/noticia.component';

const routes: Routes = [
  {path: 'atualizacoes', component: AtualizacoesComponent},
  {path: 'noticias', component: NoticiaComponent},
  {path: 'jogos', component: JogoComponent},
  {path: 'alugar', component: AlugarJogoComponent},
  {path: 'usuarios', component: UsuarioComponent},
  {path: '**', redirectTo: 'jogos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }