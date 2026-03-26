import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // IMPORTANTE: Adicione o FormsModule
import { ClientService } from '../../services/client';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // ADICIONE FormsModule AQUI
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: Client[] = [];
  searchId: number | null = null; // ID que o usuário vai digitar
  foundClient: Client | null = null; // Cliente que será exibido após a busca

  constructor(private service: ClientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAll();
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
          console.log('Cliente encontrado com 1 clique:', client);
        },
        error: (err) => {
          alert('Cliente não encontrado!');
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
}