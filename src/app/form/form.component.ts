import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
// import projectData from '../projectData.json';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import{ ServiceService } from "../service/service.service";

interface ProjectList {
  id: Number;
  projectName: String;
  projectUrl: String;
  technology: String;
  projectDesc: String;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit  {
  // ProjectLists: ProjectList[] = projectData.projectData;
  public id!: Number;
  public projectName!: String;
  public projectUrl!: String;
  public technology!: String;
  public projectDesc!: String;
  projectForm!: FormGroup;
  public projectData : any;
  showEditValue : any;
  rowIdValue : any;
  projectDataValue : any;
  projectValue = [];
  @Input() msgFromParent1!: any[];

  // public projectForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });
  loading = false;
  submitted = false;
  getProjectData: any ;

  constructor(
    private httpClient: HttpClient, 
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private projectService:ServiceService
    
    ){
    // console.log(this.ProjectLists);

    }

    ngAfterViewInit() {}

  ngOnInit(): void {
    // this.showEditValue = localStorage.getItem("booleanValue");
    this.rowIdValue = localStorage.getItem("rowId");
    this.projectDataValue = localStorage.getItem("projectLocalStorage");
    // console.log("this.projectDataValue", this.projectDataValue);
    // console.log("this.rowIdValue", this.rowIdValue);
    this.getProjectData = localStorage.getItem("projectLocalStorage");
    console.log("getProjectData", JSON.parse(this.getProjectData));
    // localStorage.setItem("booleanValue", editDataValue);
    let element = JSON.parse(this.getProjectData);
    for (let i = 0; i < element.length; i++) {
      if(element[i].id == this.rowIdValue){
        console.log("ifffffffffffffff", element[i].id);
        this.projectName = element[i].projectName;
        this.projectUrl = element[i].projectUrl;
        this.technology = element[i].technology;
        this.projectDesc = element[i].projectDesc;
        console.log("this.projectName", this.projectName);
        // return;
      }else{
        console.log("elseeeeeeeee", element[i].id);
      }
      
    }
    // console.log("this.showEditValue", this.showEditValue);
    
    

    // this.projectValue = this.projectService.getProjectData();
    // console.log("this.projectValue", this.projectValue);
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectUrl: ['', Validators.required],
      technology: ['', Validators.required],
      projectDesc: ['', Validators.required]
  });
  console.log("msgFromParent1", this.msgFromParent1);
  }

  get f() { return this.projectForm.controls; }

  addProjectData() {
    this.rowIdValue = localStorage.getItem("rowId");
    console.log("this.rowIdValue", this.rowIdValue);
    if(this.rowIdValue == ""){
      this.submitted = true;
      console.log("msgFromParent1", this.msgFromParent1);
  
      if (this.projectForm.invalid) {
      console.log("this.projectForm.controls", this.projectForm.controls);
          return;
      }
      console.log("form Submitted!!!!", this.projectForm.value);
      // this.ProjectLists.push(this.projectForm.value);
      // console.log("this.ProjectLists data!!!!", this.ProjectLists);
      this.postData(this.projectData);
  
    }else{
      console.log("update Condition elseeeee");
      this.updateProjectData(this.rowIdValue);
    }
}
    updateProjectData(param:any){
    this.rowIdValue = localStorage.getItem("rowId");
      console.log("update button",  param);
      this.submitted = true;
      if (this.projectForm.invalid) {
      console.log("this.projectForm.controls", this.projectForm.controls);
          return;
      }
      // param = !param;
      // console.log("param !== param", param !== param);
      // console.log("!param", !param);
      // this.projectService.updateStatus(this.projectForm.value);
      let data = {
        "id":param
      }
      console.log("updatedddd dataaaa", data, this.projectForm.value);

      this.projectService.updateData(param, this.projectForm.value ).subscribe(data => {
        console.log("updatedddd dataaaa", data);
        
        this.router.navigate(['/dashboard']);
      })
      // this.router.navigate(['/dashboard']);
    }
    
    public postData(projectData: any): void {
    projectData = this.projectForm.value;
    console.log("post projectData", projectData);
      // var data = 1;
    this.projectService.postData(projectData)
      .subscribe(data => {
        console.log("post dataaaaaaaaaa", data);
      });
      this.projectService.getData().subscribe(
        data => {
        });
      this.router.navigate(['/dashboard']);

  }
}

