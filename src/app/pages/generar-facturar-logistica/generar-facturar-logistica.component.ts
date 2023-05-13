import { saveAs } from 'file-saver';
import { GenerarDescargasService } from './../../services/generar-descargas.service'
import { ActualizarFacturaService } from './../../services/actualizar-factura.service'
import { Component } from '@angular/core'
import { GenerarFacturaLogisticaService } from 'src/app/services/generar-factura-logistica.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-generar-facturar-logistica',
  templateUrl: './generar-facturar-logistica.component.html',
  styleUrls: ['./generar-facturar-logistica.component.css'],
})
export class GenerarFacturarLogisticaComponent {
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
  constructor(
    private generarFacturaLogisticaService: GenerarFacturaLogisticaService,
    private actualizarFacturaService: ActualizarFacturaService,
    private generarDescargasService: GenerarDescargasService,
  ) {}

  search() {
    this.loading = true

    this.copiaDeSearch = this.searchTerm
    this.copiaDeSearch2 = this.searchTerm2
    const regex: RegExp = /^\S+$/
    if (!regex.test(this.searchTerm)) {
      alert('El término de búsqueda no debe contener espacios en blanco')
      this.searchTerm = ''
      return
    }
    if (!regex.test(this.searchTerm2)) {
      alert('El término de búsqueda no debe contener espacios en blanco')
      this.searchTerm2 = ''
      return
    }

    if (this.searchTerm == '' || this.searchTerm2 == '') {
      alert('No a ingresado nada o falta un valor')
      return
    }
    this.mostrar = true

    this.generarFacturaLogisticaService
      .consultarDatosFacturas(this.searchTerm, this.searchTerm2)
      .subscribe(
        (result: any) => {
          console.log('ver result', result)
          this.data2 = result
          //this.data = result
          console.log('documentos =>', this.data2.documentos[0])
          console.log('documentos 2 =>', this.data2.documentos[1])
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
      .consultarDatosPedidos(this.searchTerm, this.searchTerm2)
      .subscribe(
        (result: any) => {
          //  console.log('ver result', result)
          this.loading = false
          // this.data2 = result
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
    // console.log('data Factura =>',this.data2);
    //console.log('data Pedido =>',this.data);
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
        this.loading2 = false
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

    console.log('haber nuevaData en enviarNuevoRecepcionFacturas =>', nuevaData)

    this.actualizarFacturaService.NuevoRecepcionFacturas(nuevaData).subscribe(
      (data: any) => {
        console.log('ver data NuevoRecepcionFacturas=>', data)
        console.log('this.data.mensaje =>', data.mensaje)
        //this.idComprobante=data;
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

  descargarXml() {
    console.log('dataPdf =>', this.dataXml)
    console.log('vas a enviar esto =>', this.dataXml.pathFile)

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
    console.log('dataPdf =>', this.dataPdf)
    console.log('vas a enviar esto =>', this.dataPdf.pathFile)

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
}
