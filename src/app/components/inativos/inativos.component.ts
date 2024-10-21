import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/entities/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-inativos',
  templateUrl: './inativos.component.html',
  styleUrls: ['./inativos.component.scss']
})
export class InativosComponent implements OnInit {
inativos : Aluno[] = []
inativo = 0

constructor(private service: AlunoService, private router: Router) {}
ngOnInit(): void {
  this.findAll();
}

findAll(): void {
  this.service.findAll().subscribe((resposta) => {
    resposta.forEach((aluno) => {
      if (!aluno.ativo) {
        this.inativos.push(aluno);
        this.inativo++;
      } 
    });
  });
}

verAtivos() {
  this.router.navigate([''])
}

}
