import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
// import projectData from '../projectData.json';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../service/service.service";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
interface ProjectList {
    id: Number;
    projectName: String;
    projectUrl: String;
    technology: String;
    projectDesc: String;
    checked?: boolean;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    @ViewChild('pdfTable', { static: false })
    pdfTable!: ElementRef;

    ProjectLists!: ProjectList[];
    projectData = "";
    projectValue = [];
    currentMsgToChild1: any = 'msg';
    rowIdValue: any;

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ServiceService
    ) {

    }

    ngOnInit(): void {
        this.getData();
    }
    public downloadAsPDF() {
        // const doc = new jsPDF();

        // const specialElementHandlers = {
        //   '#editor': function (element: any, renderer: any) {
        //     return true;
        //   }
        // };

        // const pdfTable = this.pdfTable.nativeElement;

        // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
        //   width: 190,
        //   'elementHandlers': specialElementHandlers
        // });
        // doc.html(pdfTable.innerHTML, {
        //   callback(rst) {
        //     rst.save('TableData.pdf');
        //   },
        //   'width': 200,
        //   x: 10,
        //   y: 10
        // });
        const DATA = this.pdfTable.nativeElement;
        const doc: jsPDF = new jsPDF('p', 'mm', 'a0');
        doc.html(DATA, {
            callback: () => {
                doc.output('dataurlnewwindow');
            }
        });

        // doc.save('tableToPdf.pdf');
    }
    public getData(): void {
        this.projectService.getData().subscribe(
            data => {
                this.ProjectLists = data;
                console.log("datataaaaaa", data);
                localStorage.setItem("projectLocalStorage", JSON.stringify(data));

            });
    }
    checkAllCheckBox(ev: any) {
        console.log("checkbox value", ev);
        this.ProjectLists.forEach(x => x.checked = ev.target.checked)
    }

    isAllCheckBoxChecked() {
        return this.ProjectLists.every(p => p.checked);
    }
    onSelect(selectedItem: any) {
        console.log("Selected item Id: ", selectedItem.id); // You get the Id of the selected item here
    }
    addProject() {
        console.log("Add Project clicked!!!");
        localStorage.setItem("rowId", "");
        this.router.navigate(['/addForm']);
    }
    editData(event: any) {
        console.log("event", event);
        var editDataValue = "showEditData";
        localStorage.setItem("rowId", event);
        console.log("this.rowIdValue", this.rowIdValue);
        this.router.navigate(['/addForm/:' + event]);
    }
    deleteData(event: any) {
        // console.log("delete event", event);
        if (confirm("Are you sure to delete ")) {
            console.log("Implement delete functionality here");
            for (let i = 0; i < this.ProjectLists.length; ++i) {
                if (this.ProjectLists[i].id === event) {
                    // this.ProjectLists.splice(i,1);
                    this.projectService.deleteData(event).subscribe(data => {
                        console.log("deletedddddd dataaaa", data);
                        this.getData();
                        // this.router.navigate(['/dashboard']);
                    })
                }
            }
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);

    }
    // deleteSelectedMultiple(){
    //   this.ProjectLists= this.ProjectLists.filter(_ => _.checked);
    //       for (var ProjectLists in this.ProjectLists) {
    //      this.projectService.deleteData(this.ProjectLists[ProjectLists].id)
    //        .subscribe(data =>{
    //         console.log("deleteSelectedMultiple", data)
    //        }   
    //        )    
    //     }
    //   }
}
