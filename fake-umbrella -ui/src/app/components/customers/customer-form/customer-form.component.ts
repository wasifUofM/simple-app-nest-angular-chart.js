import {Component, OnInit} from '@angular/core';
import {Customer} from 'src/app/models/Customer';
import {CustomerService} from 'src/app/services/customer.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer;
  mode: string;
  loading: boolean;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data.id) {
        this.mode = 'update';
        this.loading = true;
        this.customerService.getCustomer(data.id)
          .subscribe((customers: Customer[]) => {
            this.customer = customers[0];
            this.loading = false;
          });
      } else {
        this.mode = 'add';
        this.customer = new Customer();
      }
    });
  }

  onSubmitCustomerForm(): void {
    if (this.customer.name && this.customer.telephone_num && this.customer.location) {
      this.mode === 'add' ? this.addCustomer() : this.updateCustomer();
    } else {
      alert('Please provide valid input!');
      return;
    }
  }

  addCustomer(): void {
    this.customerService.addCustomer(this.customer)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.customer._id, this.customer)
      .subscribe((customer: Customer) => {
        this.customer = customer;
        this.router.navigate(['/']);
      });
  }
}
