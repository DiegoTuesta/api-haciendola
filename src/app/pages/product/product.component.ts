import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LayoutComponent } from '../layout/layout.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  dataSelect: ProductModel;
  id:string
  formEdit: FormGroup;
  constructor(
    private productService:ProductsService,
    private router:Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private form:FormBuilder,
    private authService:AuthService,
  ){
    this.id = "";
    this.dataSelect = {
      id:0,
      handle: "",
      title: "",
      description: "",
      sku: "",
      Grams: "",
      stock: 0,
      price: 0, 
      priceCompare: 0,
      barcode: "",
      status: false
    }
    this.formEdit = form.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description :new FormControl('',[Validators.required, Validators.minLength(6)]),
      grams: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      priceCompare: new FormControl('', Validators.required),
      status: new FormControl(''),
    })
  }

  goBack(){
    this.router.navigateByUrl("/products")
  }

  ngOnInit(): void {
      this.id = this.route.snapshot.url[2].toString();
      this.getProduct(this.id)
  }

  getProduct(id:string){
    // this.router.navigateByUrl(`products/edit/${id}`)
    // console.log("getProduct")

    this.productService.getProduct(id)
    .subscribe({
      next:(data: ProductModel) => {
        // this.dataSelect = data as ProductModel
        // console.log(data)
        this.formEdit.patchValue({
          title: data.title,
          description: data.description,
          grams: data.Grams,
          stock: data.stock,
          price: data.price,
          priceCompare: data.priceCompare,
          status: data.status
        });
        // aa.title = data.title;
        // this.openModal(this.idModal)
      },
      error: (err) => {
        console.log("error_get_product: ",err)
        if (err.status === 401) {
          this.toastr.error("No tiene autorización para esta vista");
          this.authService.cerrarSesion()
          this.router.navigateByUrl("/");
        }
      }
    })
  }

  ngOnDestroy() {
    // Completa la suscripción aquí para evitar fugas de memoria
  }

  updateProduct(){
    let newObj: ProductModel = {
      handle: this.formEdit?.value?.title?.split(" ")?.join("-")?.toLowerCase(),
      title: this.formEdit?.value?.title?.toUpperCase(),
      description:this.formEdit?.value?.description,
      Grams:this.formEdit?.value?.grams.toString(),
      stock: this.formEdit?.value?.stock,
      price: this.formEdit?.value?.price,
      priceCompare: this.formEdit?.value?.priceCompare,
      status: this.formEdit?.value?.status,
    }
    // console.log(newObj)
    this.productService.updateProduct(newObj, this.id)
    .subscribe({
      next:(data) => {
        if (data) {
          this.toastr.success("operación éxitosa!")
        }
      },
      error: (err) => {
        console.log("error_update: ",err)
        if (err.status === 401) {
          this.toastr.error("No tiene autorización para esta vista");
          this.authService.cerrarSesion()
          this.router.navigateByUrl("/");
        }else{
          this.toastr.error(err.message);
        }
      }
    })
  }
}
