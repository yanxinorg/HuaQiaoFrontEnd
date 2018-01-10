import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {HospitalService} from '../../service/hosptial.service';
import {Message} from '../../service/message';

@Component({
    selector: 'app-verification-code',
    templateUrl: './verification-code.component.html',
    styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit, OnDestroy {
    @Input() hasSent = false;
    @Input() btnText = '发送';
    @Input() phone = '';
    @Output() sentCompleted = new EventEmitter<Message>();
    private timerId = 0;
    private countDownSeconds = 60;
    private sendMessageSubscription: Subscription;

    constructor(private hospitalService: HospitalService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.clearTimer();
        if (typeof this.sendMessageSubscription !== 'undefined') {
            this.sendMessageSubscription.unsubscribe();
        }
    }

    sendCode(): void {
        if (this.check(this.phone)) {
            this.hasSent = true;
            this.sendMessageSubscription = this.hospitalService
                .sendVerificationCode(this.phone)
                .subscribe(result => {
                    if (result.Code === 'OK') {
                        this.countDown();
                    }
                    this.sentCompleted.emit(result);
                });
        } else {
            this.sentCompleted.emit(new Message(
                'Failed', '请输入正确的手机号码', '', ''
            ));
        }
    }

    private clearTimer() {
        clearInterval(this.timerId);
    }

    private countDown() {
        this.clearTimer();
        this.timerId = window.setInterval(() => {
            this.countDownSeconds--;
            if (this.countDownSeconds <= 0) {
                this.clearTimer();
                this.countDownSeconds = 60;
                this.hasSent = false;
                this.btnText = '重新发送';
            } else {
                this.btnText = `${ this.countDownSeconds } 秒`;
            }
        }, 1000);
    }

    private check(phone: string): boolean {
        const reg = /^1[0-9]{10}$/;
        return reg.test(phone);
    }
}
