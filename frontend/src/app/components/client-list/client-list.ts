import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: Client[] = [];

  // Adicione o 'cdr' no construtor
  constructor(private service: ClientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (data: any) => {
        this.clients = data.content || data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Erro:', err)
    });
  }
}