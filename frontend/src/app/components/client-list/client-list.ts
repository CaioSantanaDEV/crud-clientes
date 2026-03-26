import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client';
import { Client } from '../../models/client';
import { CustomError } from '../../models/custom-error';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: Client[] = [];
  searchId: number | null = null;
  foundClient: Client | null = null;
  isEditing = false;
  clientToEdit: Client | null = null;
  isDarkMode = true;

  isCreating = false;
  newClient: Client = { name: '', cpf: '', income: 0 };

  constructor(private service: ClientService, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.loadAll();
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.document.body.setAttribute('data-theme', theme);
  }

  loadAll(): void {
    this.service.findAll().subscribe({
      next: (data: any) => {
        this.clients = data.content || data;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    if (this.searchId) {
      this.service.findById(this.searchId).subscribe({
        next: (client) => {
          this.foundClient = client;
          this.cdr.detectChanges();
          console.log('Cliente encontrado:', client);
        },
        error: (err) => {
          const errorResponse: CustomError = err.error;
          alert(`Busca falhou: ${errorResponse.error || 'ID não encontrado'}`);
          this.foundClient = null;
          this.cdr.detectChanges();
        }
      });
    }
  }

  clearSearch(): void {
    this.foundClient = null;
    this.searchId = null;
  }

  toggleCreate(): void {
    this.isCreating = !this.isCreating;
    this.newClient = { name: '', cpf: '', income: 0 };
    this.cdr.detectChanges();
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.foundClient = null;
          this.searchId = null;
          this.loadAll();
          alert('Cliente excluído com sucesso!');
          this.cdr.detectChanges();
        },
        error: (err) => {
          const errorResponse: CustomError = err.error;
          alert(`Não foi possível excluir: ${errorResponse.error}`);
        }
      }); 
    }
  }

  onEdit(client: Client): void {
    this.isEditing = true;
    this.clientToEdit = { ...client };
    this.cdr.detectChanges();
  }

  onSaveUpdate(): void {
    if (this.clientToEdit && this.clientToEdit.id) {
      this.service.update(this.clientToEdit.id, this.clientToEdit).subscribe({
        next: () => {
          this.isEditing = false;
          this.clientToEdit = null;
          this.foundClient = null;
          this.loadAll();
          alert('Cliente atualizado com sucesso!');
          this.cdr.detectChanges();
        },
       error: (err) => {
          const errorResponse: CustomError = err.error;
          
          if (errorResponse.status === 422) {
            let msg = 'Erros de validação:\n';
            if (errorResponse.Message && errorResponse.Message.length > 0) {
              errorResponse.Message.forEach(e => {
                msg += `- ${e.fieldName}: ${e.message}\n`;
              });
            }
            alert(msg);
          } else {
            alert(`Erro: ${errorResponse.error || 'Falha na operação'}`);
          }
        }
      });
    }
  }

  onSaveNew(): void {
    this.service.insert(this.newClient).subscribe({
      next: () => {
        this.isCreating = false;
        this.loadAll();
        alert('Cliente cadastrado com sucesso!');
        this.cdr.detectChanges();
      },
      error: (err) => {
        const errorResponse: CustomError = err.error;
        if (errorResponse.status === 422) {
          let msg = 'Erro ao cadastrar:\n';
          errorResponse.Message.forEach(e => msg += `- ${e.fieldName}: ${e.message}\n`);
          alert(msg);
        } else {
          alert(`Erro: ${errorResponse.error || 'Falha ao cadastrar'}`);
        }
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.clientToEdit = null;
  }
}