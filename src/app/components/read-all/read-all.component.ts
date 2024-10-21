import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.scss'],
})
export class ReadAllComponent implements OnInit {
  ativo = 0;
  inativo = 0;
  list: Aluno[] = [];
  inativos: Aluno[] = [];

  constructor(private service: AlunoService, private router: Router) {}
  ngOnInit(): void {
    this.findAll();
  }
  contarAtivos(): void {
    for (let aluno of this.list) {
      if (aluno.ativo) this.ativo++;
    }
  }
  contarInativos(): void {
    for (let aluno of this.inativos) {
      if (!aluno.ativo) this.inativo++;
    }
  }
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((aluno) => {
        if (aluno.ativo) {
          this.list.push(aluno);
          this.ativo++;
        } else {
          this.inativos.push(aluno);
          this.inativo++;
        }
      });
    });
    console.log(this.list); // Verifica se a lista está sendo preenchida

  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Registro excluído com sucesso');
        this.list = this.list.filter((aluno) => aluno.ra != id);
        this.ativo=0;
        this.findAll();
      } else {
        this.service.message('Não foi possível excluir o Registro');
      }
    });
  }

  inativar(item: Aluno): void {
    item.ativo = false
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Aluno inativado com sucesso');
      this.list = this.list.filter(aluno => aluno.ra != item.ra);
      this.inativo++;
      this.ativo--;
    })
  }
  verInativos() {
    this.router.navigate(['inativos'])
  }

}
