import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

  public uploader:FileUploader= new FileUploader({
    url:'http://localhost:4000/uploads',
    itemAlias:'photo'
  })

  constructor() { }

  ngOnInit(){

    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false
    }
    this.uploader.onCompleteItem=(item:any,status:any)=>{
      alert("File uploaded succesfully");
    }
  }

}
