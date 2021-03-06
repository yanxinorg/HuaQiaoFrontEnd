import {Injectable} from '@angular/core';

@Injectable()
export class ContainerService {
    /**
     *  可以传递 any 类型
     */
    private myData: any;
    private userID: number;

    /**
     *  设置数据
     * @param data
     */
    public set(data): void {
        this.myData = data;
    }

    /**
     *  获取数据
     * @returns {any}
     */
    public get(): any {
        return this.myData;
    }

    /**
     *  添加数据
     * @param key
     * @param value
     */
    public append(key: string, value: any): void {
        this.myData[key] = value;
    }

    /**
     *  设置用户 ID
     * @param id
     */
    public setUserID(id: number): void {
        this.userID = id;
    }

    /**
     *  获取用户 ID
     * @returns {number}
     */
    public getUserID(): number {
        return this.userID;
    }
}
