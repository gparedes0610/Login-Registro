import { FacturasDenegadasService } from './../../services/facturas-denegadas.service'
import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-factura-denegada',
  templateUrl: './factura-denegada.component.html',
  styleUrls: ['./factura-denegada.component.css'],
})
export class FacturaDenegadaComponent implements OnInit {
  @Input('item') item!: any
 
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  /*  serie: string
  numberInvoice: string
  dateInvoice: Date
  currency: string
  totalAmount: number
  idpedidoErp: string
  numberRuc: number */
  visible: boolean

  myForm: FormGroup = this.fb.group({
    serie: ['', [Validators.required]],
    numberInvoice: ['', [Validators.required]],
    dateInvoice: [null, [Validators.required]],
    dateDue: [null, [Validators.required]],
    currency: ['', [Validators.required]],
    totalAmount: ['', [Validators.required]],
    idpedidoErp: ['', [Validators.required]],
    AzureBlobStorage: ['', Validators.required],
    AzureBlobStorage2: ['', Validators.required],
    numberRuc: ['', Validators.required],
  })
  showDialog() {
    this.visible = true
    // console.log('ver dateInvoice',this.item.dateInvoice);
    const dateInvoiceValue = new Date(this.item.dateInvoice)
    const formattedDate = this.formatDate(dateInvoiceValue)
    //
    const dateDueValue = new Date(this.item.dateDue)
    const formattedDate2 = this.formatDate(dateDueValue)
    this.myForm.get('currency').setValue(this.item.currency)
    this.myForm.get('dateInvoice').setValue(formattedDate)
    this.myForm.get('dateDue').setValue(formattedDate2)
    this.myForm.patchValue({
      serie: this.item.serie,
      numberInvoice: this.item.numberInvoice,
      // dateInvoice: this.item.dateInvoice,
      currency: this.item.currency,
      totalAmount: this.item.totalAmount,
      idpedidoErp: this.item.idpedidoErp,
      numberRuc: this.item.numberRuc,
    })
  }
  formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }
  ngOnInit(): void {
    console.log('item =>', this.item)
  }
  selectedFile: File = null
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
    //console.log('a ver =>',  this.selectedFile)
  }
  selectedFile2: File = null
  onFileSelected2(event) {
    this.selectedFile2 = <File>event.target.files[0]
    //console.log('a ver =>',  this.selectedFile)
  }
  constructor(
    private fb: FormBuilder,
    private facturasDenegadasService: FacturasDenegadasService,
  ) {}

  saveChanges() {
    // Actualizar los campos del objeto invoice con los valores del formulario
    console.log('ver form ->',this.myForm.value.serie);

    const formData = new FormData()

    formData.append('Serie', this.myForm.value.serie)
     formData.append('NumberInvoice', this.myForm.value.numberInvoice)
    formData.append('DateInvoice', this.myForm.value.dateInvoice)
   formData.append('DateDue', this.myForm.value.dateDue)
    formData.append('Currency', this.myForm.value.currency)
    formData.append('TotalAmount', this.myForm.value.totalAmount)
   formData.append('IdPedidoErp', this.myForm.value.idpedidoErp)
    formData.append('AzureBlobStorage', this.selectedFile)
    formData.append('AzureBlobStorage2', this.selectedFile2)
    formData.append('NumberRuc', this.usuarioRuc.toString()) 
    formData.append('idInvoice', this.item.idInvoice) 

     console.log('formData =>',formData);
    this.facturasDenegadasService.actualizarFactura(formData)
    this.visible = false
  }
}
