import { GenerarFacturasService } from './../../services/generar-facturas.service'
import { RegistroService } from 'src/app/services/registro.service'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-generar-facturas',
  templateUrl: './generar-facturas.component.html',
  styleUrls: ['./generar-facturas.component.css'],
})
export class GenerarFacturasComponent {
  
  @Input() copiaDeSearch !: string;
  @Input() visible !: boolean;

  @Output() newItemEvent = new EventEmitter<boolean>();


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
    AzureBlobStorage2: ['', Validators.required],
    NumberRuc: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private generarFacturasService: GenerarFacturasService,
  ) {}

  ngOnInit(): void {
    console.log('ver copiaDeSearch=>',this.copiaDeSearch)
  }
  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    //console.log('a ver =>',  this.selectedFile)
  }
  selectedFile2: File = null;
  onFileSelected2(event) {
    this.selectedFile2 = <File>event.target.files[0];
    //console.log('a ver =>',  this.selectedFile)
  }


  onSubmit() {
    this.loading=true

    if (!this.invoiceForm.valid ) {
   //   this.invoiceForm.markAllAsTouched();
   console.log('this.invoiceForm =>',this.invoiceForm);
      this.loading =false;
      alert('formulario invalido')
      return
    }
    if(!this.copiaDeSearch){
      const formData = new FormData()
  
    //  const fullPath = this.invoiceForm.get('AzureBlobStorage').value
    //  const fileName = fullPath.split('\\').pop()
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
      formData.append('AzureBlobStorage2', this.selectedFile2)
      formData.append('NumberRuc', this.usuarioRuc.toString())
      setTimeout(() => {
        this.generarFacturasService.generarFacturas(formData)
        this.invoiceForm.reset()
        this.loading=false
      }, 5000);
     }else{
      const formData = new FormData()
  
      const fullPath = this.invoiceForm.get('AzureBlobStorage').value
      const fileName = fullPath.split('\\').pop()
     // const visibleFalse=false;
      formData.append('Serie', this.invoiceForm.get('Serie').value)
      formData.append(
        'NumberInvoice',
        this.invoiceForm.get('NumberInvoice').value,
      )
      formData.append('DateInvoice', this.invoiceForm.get('DateInvoice').value)
      formData.append('DateDue', this.invoiceForm.get('DateDue').value)
      formData.append('Currency', this.invoiceForm.get('Currency').value)
      formData.append('TotalAmount', this.invoiceForm.get('TotalAmount').value)
      formData.append('IdPedidoErp', this.copiaDeSearch)
      formData.append('AzureBlobStorage', this.selectedFile)
      formData.append('AzureBlobStorage2', this.selectedFile2)
      formData.append('NumberRuc', this.usuarioRuc.toString())
      this.visible=false;
      this.newItemEvent.emit(this.visible)
      setTimeout(() => {
        this.generarFacturasService.generarFacturas(formData)
        this.invoiceForm.reset()
        this.loading=false
      }, 5000);
     }

  }

  cancelar(){
    this.visible=false;
    this.newItemEvent.emit(this.visible)
  }


}
