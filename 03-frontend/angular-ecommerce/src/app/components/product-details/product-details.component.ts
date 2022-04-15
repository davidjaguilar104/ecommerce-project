import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get the "id" param string and convert string to a number using the "+" symbol
    // had to use the parseInt() because it is not working without setting strictNullChecks to false in tsconfig.json
    const idNumber: any = this.route.snapshot.paramMap.get('id');
    
    const theProductId = parseInt(idNumber);

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
