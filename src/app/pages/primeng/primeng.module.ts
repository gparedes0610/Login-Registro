import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//primeng
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TreeTableModule,
    PaginatorModule,
    DialogModule,
    RadioButtonModule,
    CardModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TableModule
  ],
  exports:[
    ButtonModule,
    TreeTableModule,
    PaginatorModule,
    DialogModule,
    RadioButtonModule,
    CardModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    TableModule
    
  ]
})
export class PrimengModule { }
