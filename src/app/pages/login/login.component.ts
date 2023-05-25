import { RucService } from './../../services/ruc.service';
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

  loading =false;

  formularioLogin: FormGroup = this.fb.group({
    ruc: ['', [Validators.required]],
    password: ['', [Validators.required]],
    flag:['',[Validators.required]],
  })

  constructor(private fb: FormBuilder, private loginService: LoginService,private router:Router, private rucService:RucService) {
    localStorage.removeItem('token')
  }

  ngOnInit(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioRuc')
    localStorage.removeItem('usuarioData')
    this.loading=false;
  }

  login() {
    console.log('funciona?',this.formularioLogin.value);
  
    this.loading=true
    if (!this.formularioLogin.valid ) {
      this.formularioLogin.markAllAsTouched();
      this.loading =false;
      return
    }
    // console.log('form', this.formularioLogin.value)
    const usu: Login = {
      rucProveedor: this.formularioLogin.controls['ruc'].value.toString(),
      password: this.formularioLogin.controls['password'].value.toString(),
      flaglogin: this.formularioLogin.controls['flag'].value.toString(),
    }
    console.log('haber usu ->', usu)
    this.loginService.login(usu).subscribe(
      (resp) => {
        console.log('resp=>', resp)
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        })
        this.loading=false;
        localStorage.setItem('usuarioRuc',JSON.stringify(usu.rucProveedor))//chapamos el RUC
        localStorage.setItem('usuarioFlag',JSON.stringify(usu.flaglogin))//chapamos el flaglogin
        this.router.navigateByUrl('/dashboard/perfil')
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: `${err.error.Message}`,
          showConfirmButton: false,
          timer: 6500
        })
        this.loading=false;

      },
    )

    const formData:any = new FormData()
    formData.append('UserName', 'jquiroz@amg.pe')
    formData.append('Password', 'Productora.20')
    formData.append('Empresa', '20610157905')

      this.loginService.loginProductura(formData).subscribe((data)=>{
        console.log('ver data login productora =>',data);
      })
  }
}
