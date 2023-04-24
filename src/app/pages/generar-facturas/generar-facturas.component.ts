import { RegistroService } from 'src/app/services/registro.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-generar-facturas',
  templateUrl: './generar-facturas.component.html',
  styleUrls: ['./generar-facturas.component.css']
})
export class GenerarFacturasComponent {
  invoiceForm: FormGroup=this.fb.group({
    Serie: ['', Validators.required],
    NumberInvoice: ['', Validators.required],
    DateInvoice: ['', Validators.required],
    DateDue: ['', Validators.required],
    Currency: ['', Validators.required],
    TotalAmount: ['', Validators.required],
    IdPedidoErp: ['', Validators.required],
    AzureBlobStorage: ['', Validators.required]
  });;

  constructor(private fb: FormBuilder,private registroService:RegistroService) { }

  ngOnInit(): void {
    /* this.invoiceForm = this.fb.group({
      serie: ['', Validators.required],
      numberInvoice: ['', Validators.required],
      dateInvoice: ['', Validators.required],
      dateDue: ['', Validators.required],
      currency: ['', Validators.required],
      totalAmount: ['', Validators.required],
      idPedidoErp: ['', Validators.required],
      azureBlobStorage: ['', Validators.required]
    }); */
  }

  onSubmit() {
    console.log(this.invoiceForm.value);
    this.registroService.registrar(this.invoiceForm.value).subscribe((resp)=>{
      console.log('ver respuesta en generar facturas ->',resp)
    },
    (error)=>{
      console.log('error =>',error)
    })
  }
}
