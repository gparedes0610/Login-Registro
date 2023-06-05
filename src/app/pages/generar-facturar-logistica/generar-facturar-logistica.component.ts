import { EliminarFacturasService } from './../../services/eliminar-facturas.service';
import { saveAs } from 'file-saver';
import { GenerarDescargasService } from './../../services/generar-descargas.service'
import { ActualizarFacturaService } from './../../services/actualizar-factura.service'
import { Component, OnInit } from '@angular/core'
import { GenerarFacturaLogisticaService } from 'src/app/services/generar-factura-logistica.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-generar-facturar-logistica',
  templateUrl: './generar-facturar-logistica.component.html',
  styleUrls: ['./generar-facturar-logistica.component.css'],
})
export class GenerarFacturarLogisticaComponent implements OnInit{


  items: [];
  totalRecords: number;
  rowsPerPage: number;

  visible: boolean;

  showDialog() {
      this.visible = true;
  }

  loading = false
  loading2 = false
  searchTerm: string = ''
  searchTerm2: string = ''
  copiaDeSearch: string = ''
  copiaDeSearch2: string = ''
  ruc: any = localStorage.getItem('usuarioRuc')
  usuarioRuc = JSON.parse(this.ruc)
  data: any = {}
  data2: any = {}
  dataPdf: any = {}
  dataXml: any = {}
  mostrar = false
  ingredient: string
  idComprobante: any

  listadoData =[]

  constructor(
    private generarFacturaLogisticaService: GenerarFacturaLogisticaService,
    private actualizarFacturaService: ActualizarFacturaService,
    private generarDescargasService: GenerarDescargasService,
    private eliminarFacturasService:EliminarFacturasService
  ) {}


  ngOnInit(): void {
    this.generarFacturaLogisticaService.consultarListado().subscribe((result:any)=>{
      this.items =result
      this.totalRecords = this.items.length;
      this.rowsPerPage = 5;
    })
  }

  search(valor1:any,valor2:any) {
    console.log('valor 1 y 2',valor1,valor2);
    this.showDialog()

    this.loading = true

   this.copiaDeSearch =valor1
    this.copiaDeSearch2 = valor2 

    this.mostrar = true

    this.generarFacturaLogisticaService
      .consultarDatosFacturas(valor1, valor2)
      .subscribe(
        (result: any) => {
          this.data2 = result
         // console.log('result =>',result);
          //this.data = result
          //console.log('documentos =>', this.data2.documentos[0])
          //console.log('documentos 2 =>', this.data2.documentos[1])
          this.dataPdf = this.data2.documentos[0]
          this.dataXml = this.data2.documentos[1]
          this.loading = false

          //this.data2 = result
          this.searchTerm = ''
          this.searchTerm2 = ''
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.error.Message}`,
            showConfirmButton: false,
            timer: 6500,
          })
          this.loading = false
          this.mostrar = false
          this.searchTerm = ''
        },
      )

    this.generarFacturaLogisticaService
      .consultarDatosPedidos(valor1, valor2)
      .subscribe(
        (result: any) => {
          this.loading = false
          this.searchTerm = ''
          this.searchTerm2 = ''
          this.data = result
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: `${err.error.Message}`,
            showConfirmButton: false,
            timer: 6500,
          })
          this.loading = false
          this.mostrar = false
          this.searchTerm2 = ''
        },
      )
  }

  enviarActualizacionDeFactura() {
    const fechaHoraString = this.data2.dateInvoice
    const fechaString = fechaHoraString.substring(0, 10) // obtener la parte de la cadena que representa la fecha
    //console.log('fechaString=>',fechaString);
    const fecha = new Date(fechaString)
    const nuevaData: any = {
      Id: this.data.id, //idpedido Id
      TipoComprobantePago: 1, //por defecto
      SerieComprobantePago: this.data2.serie, //"FT009", //de datos factura serie
      CorrelativoComprobantePago: this.data2.numberInvoice, //"934834834",// factura numberInvoice
      FechaComprobantePago: fechaString, //"2023-04-28",	//datos factura dateInvoice
      TipoOperacionId: null,
      DetraccionId: null,
      ValorDetraccion: null,
      EsVenta: 0, // por defecto
      ComprobanteDetalle: this.data.pedidodetalles, //[] // Pedido pedidodetalles
    }

    // console.log('nuevaData =>',nuevaData);
    this.loading2 = true
    this.actualizarFacturaService.actualizarFactura(nuevaData).subscribe(
      (data) => {
        // console.log('ver data =>', data)
        //this.idComprobante=data;
        this.enviarNuevoRecepcionFacturas(data)
        this.enviarDocuments(data)
        this.loading2 = false
        this.mostrar=false;
      },
      (err) => {
        console.log('ver error =>', err)
        this.loading2 = false
      },
    )
  }

  enviarNuevoRecepcionFacturas(id: any) {
    console.log('idComprobante ->', id)
    console.log('completo', id.idComprobante)
    const fechaHoraString = this.data2.dateInvoice
    const fechaString = fechaHoraString.substring(0, 10)
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    //  console.log('formattedDate =>',formattedDate); // "2023-05-07"
    const nuevaData: any = {
      Ruc: this.data2.numberRuc, //en ambos lados// numberRuc mismo en ambos lados
      RazonSocial: this.data.clienteNombre, //ambos lados//pedido clienteNombre
      FechaDeRecepcion: formattedDate, // fecha actual del sistema
      Estado: 1, //por defecto
      FechaDeRegistro: formattedDate, // fecha actual del sistema
      Origen: 'Web', //por defecto
      idComprobante: id.idComprobante, // viene de la api ActualizarFactura es un id , consultar si no lo encuentras
      Factura: `${this.data2.serie}-${this.data2.numberInvoice}`, //	datos Factura serie -numberInvoice
      FechaFactura: fechaString, // datos de factura dateInvoice
      moneda: this.data2.currency, // Datos de factura// currency
      Importe: this.data2.totalAmount, //Datos de factura totalAmount
    }


    this.actualizarFacturaService.NuevoRecepcionFacturas(nuevaData).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: `${data.mensaje}`,
          showConfirmButton: false,
          timer: 1500,
        })
      },
      (err) => {
        console.log('ver error NuevoRecepcionFacturas =>', err)
      },
    )
  }

  enviarDocuments(id: any){
   
    const nuevaDta =  {
        nameFilePdf: this.dataPdf.pathFile,
        nameFilexml: this.dataXml.pathFile,
        idorigen: id.idComprobante // viene del ip de una de las 3 apis
      }
   // console.log('ver nuevaDta =>',nuevaDta);
    this.actualizarFacturaService.documents(nuevaDta).subscribe((result)=>{
      console.log('ver result enviarDocuments=>',result);
    })
  }

  descargarXml() {

    const options = {
      responseType: 'blob' as 'json' // Especificamos el tipo de respuesta como blob
    };
      this.generarDescargasService.descargarPdfs(this.dataXml.pathFile, options)
      .subscribe((res: any) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        saveAs(blob, `${this.dataXml.pathFile}`);
      }, (error: any) => {
        console.error('Error al descargar el archivo', error);
      });
  }
  descargarPdf() {

    const options = {
      responseType: 'blob' as 'json' // Especificamos el tipo de respuesta como blob
    };
      this.generarDescargasService.descargarPdfs(this.dataPdf.pathFile, options)
      .subscribe((res: any) => {
        const blob = new Blob([res], { type: 'application/pdf' });
        saveAs(blob, `${this.dataPdf.pathFile}`);
      }, (error: any) => {
        console.error('Error al descargar el archivo', error);
      });

  }

  btnEliminarFactura(){
    const data ={
      idInvoice: this.data2.idInvoice
    }
    if (confirm("¿Esta seguro de denegar factura??")) {
      this.eliminarFacturasService.eliminarFactura(data).subscribe((resp)=>{
        console.log('ver resp =>',resp);
        alert('Factura denegada')
        this.mostrar=false;
      })
      return;
    } else {
     return;
    }
  
  }
}
