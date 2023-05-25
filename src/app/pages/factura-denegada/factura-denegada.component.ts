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
  serie: string
  numberInvoice: string
  dateInvoice: string
  currency: string
  totalAmount: number
  visible: boolean

  myForm: FormGroup = this.fb.group({
    serie: ['', [Validators.required]],
    numberInvoice: ['', [Validators.required]],
    dateInvoice: ['', [Validators.required]],
  })

  showDialog() {
    this.visible = true
  }
  ngOnInit(): void {
    this.myForm.patchValue({
      serie: this.item.serie,
      numberInvoice: this.item.numberInvoice,
      dateInvoice: this.item.dateInvoice,
    })
  }

  constructor(private aRoute: ActivatedRoute, private fb: FormBuilder) {
    /*     this.id =  Number(this.aRoute.snapshot.paramMap.get('id') )//tiene que coincidir con lo q pusiste en el routemodule
    console.log('this.id =>',this.id); */
  }

  saveChanges() {
    // Actualizar los campos del objeto invoice con los valores del formulario
    this.item.serie = this.serie
    this.item.numberInvoice = this.numberInvoice
    this.item.dateInvoice = this.dateInvoice
    this.item.currency = this.currency
    this.item.totalAmount = this.totalAmount

    // Aquí puedes agregar la lógica adicional para guardar los cambios en la base de datos u otras operaciones necesarias

    // Cerrar el modal
    // Puedes usar alguna librería o componente para manejar los modales, como NgbModal o MatDialog
  }
}
