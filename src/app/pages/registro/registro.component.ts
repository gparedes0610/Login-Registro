import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';
import { Registro } from 'src/app/interfaces/registro.interface';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  loading =false;
  formularioRegistrar: FormGroup = this.fb.group({
    ruc: ['', [Validators.required]],
    correo: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private registoService: RegistroService,private router:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token')
    this.loading=false;
  }
  registrar(){
    this.loading=true
    if (!this.formularioRegistrar.valid) {
      this.formularioRegistrar.markAllAsTouched()
      return
    }
        
        const registro: Registro = {
          rucProveedor: this.formularioRegistrar.controls['ruc'].value.toString(),
          username: this.formularioRegistrar.controls['correo'].value.toString(),
          password: this.formularioRegistrar.controls['password'].value.toString(),
        }
        //console.log('registrar', registro)
        this.registoService.registrar(registro).subscribe(
          (resp) => {
            //console.log('resp=>', resp)
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso !',
              showConfirmButton: false,
              timer: 1500
            })
            this.loading=false;
            this.router.navigateByUrl('/login')
          },
          (err) => {
          //  console.log('ocurrio algo mal',err)
            Swal.fire({
              icon: 'error',
              title: `${err.error.Message}`,
              showConfirmButton: false,
              timer: 6500
            })
            this.loading=false;
          },
        )
  }
}
