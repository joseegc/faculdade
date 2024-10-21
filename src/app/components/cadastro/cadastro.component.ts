import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  aluno: Aluno = {
    nome: '',
    ativo: true,
    dataCadastro: new Date(),
  };

  constructor(private router: Router, private servico: AlunoService) { }
  ngOnInit(): void { }
  cancelar(): void {
    this.router.navigate(['']);
  }

  formatarData(): void {
    let data = new Date(this.aluno.dataCadastro).toISOString;
  }

  cadastrar(){
    this.formatarData();
    console.log(this.aluno);
    this.servico.cadastrar(this.aluno).subscribe(
      (resposta: any) => {
        this.servico.message('Aluno cadastrado com sucesso!!!') 
      },
      (err: any) => {
        this.servico.message('Erro ao cadastrar o Aluno')
      }
    );
  }
}

