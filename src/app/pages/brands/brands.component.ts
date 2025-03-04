import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands: IBrands[] = [];

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getBranDetails(id: string): void {
    this.brandsService.getBrandsDetails(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
