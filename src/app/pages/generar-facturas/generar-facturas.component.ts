import { GenerarFacturasService } from './../../services/generar-facturas.service'
import { RegistroService } from 'src/app/services/registro.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-generar-facturas',
  templateUrl: './generar-facturas.component.html',
  styleUrls: ['./generar-facturas.component.css'],
})
export class GenerarFacturasComponent {
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  loading =false;
  invoiceForm: FormGroup = this.fb.group({
    Serie: ['', Validators.required],
    NumberInvoice: ['', Validators.required],
    DateInvoice: ['', Validators.required],
    DateDue: ['', Validators.required],
    Currency: ['', Validators.required],
    TotalAmount: ['', Validators.required],
    IdPedidoErp: ['', Validators.required],
    AzureBlobStorage: ['', Validators.required],
    NumberRuc: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private generarFacturasService: GenerarFacturasService,
  ) {}

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
  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    //console.log('a ver =>',  this.selectedFile)
  }


  onSubmit() {
    this.loading=true
    const formData = new FormData()

    const fullPath = this.invoiceForm.get('AzureBlobStorage').value
    const fileName = fullPath.split('\\').pop()
    formData.append('Serie', this.invoiceForm.get('Serie').value)
    formData.append(
      'NumberInvoice',
      this.invoiceForm.get('NumberInvoice').value,
    )
    formData.append('DateInvoice', this.invoiceForm.get('DateInvoice').value)
    formData.append('DateDue', this.invoiceForm.get('DateDue').value)
    formData.append('Currency', this.invoiceForm.get('Currency').value)
    formData.append('TotalAmount', this.invoiceForm.get('TotalAmount').value)
    formData.append('IdPedidoErp', this.invoiceForm.get('IdPedidoErp').value)
    formData.append('AzureBlobStorage', this.selectedFile)
    formData.append('NumberRuc', this.usuarioRuc.toString())

    console.log('ver fileName', fileName)
    console.log('a ver =>',  this.selectedFile)
    /*   const objeto = {
      name: formData.get('name'),
      email: formData.get('email'),
    }
    console.log('ver objeto =>', objeto) */
setTimeout(() => {
  this.generarFacturasService.generarFacturas(formData)
  this.invoiceForm.reset()
  this.loading=false
}, 3000);

    /*  this.HttpClient.post('https://apiproveedores-amg.azurewebsites.net/api/v1/Invoice', formData)
  .subscribe((response) => {
    console.log('Response:', response);
  }, (error) => {
    console.log('Error:', error);
  }); */
  }
}
