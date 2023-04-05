import { LoginService } from './../../services/login.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Login } from 'src/app/interfaces/login.interface'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup = this.fb.group({
    ruc: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private loginService: LoginService,private router:Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token')
  }

  login() {
    if (!this.formularioLogin.valid) {
      this.formularioLogin.markAllAsTouched()
      return
    }
    // console.log('form', this.formularioLogin.value)
    const usu: Login = {
      rucProveedor: this.formularioLogin.controls['ruc'].value.toString(),
      password: this.formularioLogin.controls['password'].value.toString(),
    }
    //console.log('haber usu ->', usu)
    this.loginService.login(usu).subscribe(
      (resp) => {
        //console.log('resp=>', resp)
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/dashboard/perfil')
      },
      (err) => {
      //  console.log('ocurrio algo mal',err)
        Swal.fire({
          icon: 'error',
          title: `${err.error.Message}`,
          showConfirmButton: false,
          timer: 6500
        })
      },
    )
  }
}
