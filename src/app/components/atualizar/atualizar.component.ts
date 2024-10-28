import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.scss']
})

export class AtualizarComponent {
  aluno: Aluno = {
    nome: '',
    ativo: true,
    dataCadastro: new Date(),
  };

  constructor(private router: Router, private servico: AlunoService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.aluno.ra = this.route.snapshot.paramMap.get("ra")!;
    this.pesquisarRA();
  }

  pesquisarRA(): void {
    this.servico.pesquisarRA(this.aluno.ra).subscribe((resposta: any) => {
      this.aluno = resposta;
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

  formatarData(): void {
    let data = new Date(this.aluno.dataCadastro).toISOString;
  }

  atualizar() {
    this.formatarData();
    console.log(this.aluno);
    this.servico.atualizar(this.aluno).subscribe(
      (resposta: any) => {
        this.servico.message('Aluno atualizado com sucesso!!!')
        this.router.navigate(['']);
      },
      (err: any) => {
        this.servico.message('Erro ao atualizar o Aluno: ' + err)
      }
    );
  }
}

