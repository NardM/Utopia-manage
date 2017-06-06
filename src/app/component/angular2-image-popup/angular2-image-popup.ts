import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'ImageModal',
  styleUrls: ['css/style.scss'],
   template: `
   
   <div class="ng-overlay" *ngIf="opened">
    <div class="ng-gallery-content" >
    <div class="uil-ring-css" *ngIf="loading"><div></div></div>         
    <a class="close-popup" (click)="closeGallery()">
        <md-icon>close</md-icon>
    </a>
     <a class="nav-left" *ngIf="modalImages.length >1" (click)="prevImage()">
         <md-icon>chevron_left</md-icon>
     </a>
     <img *ngIf="!loading" src="{{imgSrc}}" (click)="nextImage()" class="effect" />
     <a class="nav-right" *ngIf="modalImages.length >1" (click)="nextImage()">
         <md-icon>chevron_right</md-icon>
     </a>
     <span class="info-text">{{ currentImageIndex + 1 }}/{{ modalImages.length }}</span>
   </div>
   </div>
       `
})
export class ImageModal implements OnInit {
   public _element:any;
   public opened:boolean = false;
   public imgSrc:string;
   public currentImageIndex:number;
   public loading:boolean= false;
   public showRepeat:boolean= false;
  @Input('modalImages') public modalImages:any;
  @Input('imagePointer') public imagePointer:number;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
      this.loading = true;
      if(this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if(this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length-1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if(this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index) {
    if(!index) {
    this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
      this.opened = true;
     for (var i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex ) {
              this.imgSrc = this.modalImages[i].img;
              this.loading = false;
              break;
            }
       }
  }
}
