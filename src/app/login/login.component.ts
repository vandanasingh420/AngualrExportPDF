import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    checkstatus: any;
    constructor(
        private formBuilder: FormBuilder,
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    products: any = [];

    logout() {
        console.log("logout function");
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }
    get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            console.log("this.loginForm.controls", this.loginForm.controls);
            return;
        }
        console.log("value", this.loginForm.value);
        this.httpClient.get("assets/login.json").subscribe(data => {
            this.products = data;
            // console.log("this.products", this.products, "map ", this.products.map((t: { username: any; password: any }) => t.username && t.password));
            // this.products.map((t: { username: any; })=>t.username)

            for (let i = 0; i <= this.products.length; i++) {
                // var element = this.products[i];c
                console.log("this.products[i]", this.products[i]);
                if (this.products[i].username == this.loginForm.value.username && this.products[i].password == this.loginForm.value.password) {
                    // this.checkstatus = true;
                    console.log("successfully login!!!!!", this.products[i].username == this.loginForm.value.username && this.products[i].password == this.loginForm.value.password);
                    this.router.navigate(['/dashboard']);
                }
                else {
                    // this.checkstatus = false;
                    alert("Username or Password is incorrect!!!!");
                    // console.log("else statement", this.products[i].username);
                    return;
                }
            }
            console.log("this.check", this.checkstatus);

            if (!this.checkstatus) { alert("Username or Password is incorrect!!!!"); }
        })
    }
}
