import { Injectable } from '@angular/core';
import { UploadItem }    from 'angular2-http-file-upload';

@Injectable() 
export class UploadFile extends UploadItem {
    constructor(file: any) {
        super();
        this.url = 'http://localhost:7579/upload/';
        // this.url = 'http://ec2-35-164-104-24.us-west-2.compute.amazonaws.com:8888/api/v1/bna/';
        // this.headers = { HeaderName: 'Header Value', AnotherHeaderName: 'Another Header Value' };
        this.file = file;
    }
}