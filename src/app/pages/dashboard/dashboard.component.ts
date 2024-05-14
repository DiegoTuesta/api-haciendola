import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { Router, RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LayoutComponent, 
    MatTableModule,
    MatIconModule,
    RouterOutlet,
    FormsModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['title', 'sku', 'stock', 'price', 'actions'];
  dataSource:ProductModel[]
  formEdit: FormGroup;
  closeResult = '';
  @Input() idModal = "content"

  ngOnInit(): void {
    this.getProducts();
    
    // this.pp();
  }
  constructor(
    private productService: ProductsService,
    private form:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ){
    this.dataSource = []
    this.formEdit = form.group({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description :new FormControl('',[Validators.required, Validators.minLength(6)]),
      grams: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      priceCompare: new FormControl('', Validators.required),
      barcode: new FormControl('', [Validators.required, Validators.minLength(13)]),
      sku : new FormControl('', [Validators.required, Validators.minLength(11)]),
    })
    
  }

  openModal(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  getProducts(){
    this.productService.getProducts()
    .subscribe({
      next:(data) => {
        this.dataSource = data as ProductModel[] || []
      },
      error: (err) => {
        console.log("error_get_products: ",err)
        if (err.status === 401) {
          this.toastr.error("No tiene autorización para esta vista");
          this.authService.cerrarSesion()
          this.router.navigateByUrl("/");
        }
      }
    })
  }

  getProduct(id:string){
    this.router.navigateByUrl(`/products/edit/${id}`)
  }


  deleteProduct(id:string){
    
    this.productService.deleteProduct(id)
    .subscribe({
      next:(data) => {
        if (data) {
          this.toastr.success("se eliminó el producto")
          this.getProducts()
        }

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
  createProduct(){
    let newObj: ProductModel = {
      handle: this.formEdit?.value?.title?.split(" ")?.join("-")?.toLowerCase(),
      title: this.formEdit?.value?.title?.toUpperCase(),
      barcode: this.formEdit?.value?.barcode?.toString(),
      sku:this.formEdit?.value?.sku?.toString(),
      description:this.formEdit?.value?.description,
      Grams:this.formEdit?.value?.grams.toString(),
      stock: this.formEdit?.value?.stock,
      price: this.formEdit?.value?.price,
      priceCompare: this.formEdit?.value?.priceCompare,
      status: true,
    }
    // console.log(newObj)
    this.productService.createProduct(newObj)
    .subscribe({
      next:(data) => {
        if (data) {
          this.toastr.success("operación éxitosa!")
          this.formEdit.reset()
          this.modalService.dismissAll()
          this.getProducts()
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


