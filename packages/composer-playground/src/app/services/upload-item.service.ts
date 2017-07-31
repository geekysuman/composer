import { Injectable } from '@angular/core';
import { UploadItem }    from 'angular2-http-file-upload';

@Injectable() 
export class UploadFile extends UploadItem {
    // private bna_file;
    constructor(file: any) {
        super();
        this.url = PUBLISH_URL;
        // this.headers = { HeaderName: 'Header Value', AnotherHeaderName: 'Another Header Value' };
        this.file = file;
    }
}