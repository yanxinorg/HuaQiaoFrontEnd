import {Component, OnInit} from '@angular/core';
import {HospitalService} from '../../service/hospital.service';
import {Patient} from '../../service/hospital.structure';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {PatientAddModalComponent} from '../../modal/patient-add-modal/patient-add-modal.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './my-patients.component.html',
    styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
    patients: Patient[];

    constructor(private route: ActivatedRoute,
                private modalService: NgbModal,
                private hospitalService: HospitalService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { relativePatientsResolver: any }) => {
                this.patients = JSON.parse(data.relativePatientsResolver.patients);
            });
    }

    /**
     * 新增就诊人
     */
    addPatient(): void {
        const addPatientModalRef = this.modalService.open(PatientAddModalComponent);
        addPatientModalRef.componentInstance.title = '新增就诊人';
        addPatientModalRef.componentInstance.message = '';
        addPatientModalRef.componentInstance.submitNewPatient.subscribe(
            (response) => {
                this.hospitalService.addNewPatient(response).subscribe(
                    (result) => {
                        console.log(result);
                        if (-400 === result.code) {
                            addPatientModalRef.componentInstance.message = '用户不存在，请重新登录！';
                        } else {
                            response.pid = result.msg.insertId;
                            this.patients.push(response);
                            addPatientModalRef.componentInstance.activeModal.close('Add patient success.');
                        }
                    });
            });

        addPatientModalRef.result.then(
            /**
             * close
             * @param reason
             */
            (reason) => {
                console.log(reason);
            },
            /**
             * dismiss
             * @param reason
             */
            (reason) => {
                console.log(reason);
            });
    }

    /**
     * 删除就诊人
     * @param pid
     */
    remove(pid: number) {
        const confirmModalRef = this.modalService.open(ConfirmModalComponent);
        confirmModalRef.componentInstance.title = '确认对话框';
        confirmModalRef.componentInstance.content = '请您再次确认，是否删除?';
        confirmModalRef.result.then(
            /**
             * close
             * @param reason
             */
            (reason) => {
                switch (reason) {
                    case 'Yes':
                        this.hospitalService
                            .deletePatient(pid)
                            .subscribe(response => {
                                if (response.code === 0) {
                                    let index = 0, length = this.patients.length;
                                    while (index < length) {
                                        if (this.patients[index].pid === pid) {
                                            break;
                                        }
                                        index++;
                                    }
                                    this.patients.splice(index, 1);
                                }
                            });
                        break;
                    default:
                        break;
                }
            },
            /**
             * dismiss
             */
            () => {
            });
    }
}
