import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { CommentsService } from "src/app/services/comments.service";
import { FileUploadService } from "src/app/services/fileupload.service";


interface Comment {
  date: Date;
  username: string;
  commentText: string;
  propertyValuationId: number;
}

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})


export class CommentsComponent {

  userDetails!: any
  userDetailsSubscription!: Subscription;
  imageUrl: string | ArrayBuffer | null = null;

  documents: any[] = [];

  commentForm: any = FormGroup;
  fileForm: any = FormGroup;
  comments: Comment[] = [];
  uploadedFiles: any = [];
  user: any;
  fileToBeUploaded: any | null = null;
  propertyValuationId: any;
  commentText: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private commentService: CommentsService) {

    this.user = JSON.parse(localStorage.getItem('authUser') ?? '{}');
    this.propertyValuationId = localStorage.getItem('propertyValuationId') || '';


    this.commentForm = this.fb.group({
      username: ['', Validators.required],
      commentText: ['', Validators.required],
      propertyValuationId: [0, Validators.required]
    });

    this.fileForm = this.fb.group({
      documentType: [''],
      file: ['']
    });

    this.getComments();
    this.getFileUploads();

  }

  getComments() {
    this.commentService.getCommentsByPropertyId(this.propertyValuationId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        // Handle errors
      },
      complete: () => {
        // Handle completion if needed
      },
    });
  }

  getFileUploads() {
    this.fileUploadService.getFilesByPropertyId(this.propertyValuationId).subscribe({
      next: (res) => {
        this.uploadedFiles = res;
      },
      error: (err) => {
        // Handle errors
      },
      complete: () => {
        // Handle completion if needed
      },
    });
  }

  goToNext() {
    // this.router.navigate(["dashboard/initiators-details"]);
    this.router.navigate(["/app/pvc-validation-requests"]);
  }

  goToPrevious() {
    this.router.navigate(["/app/borrowers-details"]);
  }

  onImageSelected(event: any): void {
    console.log('Image selected event:', event);
    const file = event.target.files[0];
    if (file) {
      this.fileToBeUploaded = file;
      this.loadImage();
    }
  }

  loadImage() {
    if (this.fileToBeUploaded) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.fileToBeUploaded);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.loadImage();
    }
  }

  clearImage(): void {
    this.imageUrl = null;
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      this.commentService.createComments(commentData).subscribe({
        next: (comment) => {
          console.log('Comment posted successfully:', comment);

          this.commentForm.reset();
        },
        error: (error) => {
          console.error('Error posting comment:', error);
        }
      });
    }
  }

  uploadFile(): void {
    if (!this.fileForm.valid) {
      console.error('Form is invalid.');
      return;
    }

    const documentType = this.fileForm.get('documentType')?.value;
    const userId = this.user.id || '';


    const formData: any = new FormData();

    formData.append('file', this.fileToBeUploaded, this.fileToBeUploaded.name);
    formData.append('documentType', documentType);
    formData.append('userId', userId);
    formData.append('propertyValuationId', this.propertyValuationId);

    for (const entry of formData.entries()) {
      const [key, value] = entry;
      console.log(`${key}: ${value}`);
    }

    this.spinner.show();

    this.fileUploadService.uploadFile(formData).subscribe({
      next: (response) => {
        this.getComments();
        this.getFileUploads();
        this.spinner.hide();
        this.toastr.success('File uploaded successfully!', 'Success', {
          timeOut: 2000
        });
      },
      error: (error) => {
        this.getComments();
        this.getFileUploads();
        this.spinner.hide();
        this.toastr.error(error.error.message);
      },
    });
  }

  downloadFile(file: any) {
    this.spinner.show();
    this.fileUploadService.downloadFile(file.id).subscribe({
      next: (blob) => {
        this.spinner.hide();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    });
  }

  deleteFile(file: any) {
    this.spinner.show();
    this.fileUploadService.deleteFiles(file.id).subscribe({
      next: (response) => {
        this.getFileUploads();
        this.spinner.hide();
        this.toastr.success('File was deleted successfully');
      },

      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message)
      }

    });
  }

  addComments() {
    if (this.commentText === null || this.commentText === '') {
      return;
    }

    this.spinner.show();

    let commentObject: any = {
      date: new Date(),
      username: this.user.username,
      commentText: this.commentText,
      propertyValuationId: this.propertyValuationId
    };

    this.commentService.createComments(commentObject).subscribe({

      next: () => {
        this.getComments();
        this.spinner.hide();
        this.toastr.success('comments were added successfully');
      },

      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message)
      }

    });
  }

}
