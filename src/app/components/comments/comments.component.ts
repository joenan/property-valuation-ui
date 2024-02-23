import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/security/auth.service";
import { CommentsService } from "src/app/services/comments.service";
import { LoginResponse } from "src/app/utils/LoginResponse";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})
export class CommentsComponent {

  userDetails!: any
  userDetailsSubscription!: Subscription;
  imageUrl: string | ArrayBuffer | null = null;
  documents: any[] = [
    {
      docType: "Type 1",
      filename: "File1.pdf",
      size: "2MB",
      uploadedBy: "User1",
      uploadedOn: "2024-02-17",
    },
    {
      docType: "Type 2",
      filename: "File2.docx",
      size: "1.5MB",
      uploadedBy: "User2",
      uploadedOn: "2024-02-18",
    },
    // Add more documents as needed
  ];
 
    commentForm: any=FormGroup;
    fileForm: any=FormGroup;

    constructor( private router: Router,private formBuilder:FormBuilder, private authService: AuthService, private fb: FormBuilder, private commentService: CommentsService) {
      this.commentForm = this.fb.group({
        username: ['', Validators.required],
        commentText: ['', Validators.required],
        propertyValuationId: [0, Validators.required] // Set default value or retrieve it from somewhere
      });

      this.fileForm = this.fb.group({
        documentType: [''], // Add default value or validators if needed
        file: ['']
      });
      this.userDetailsSubscription = this.authService.getUserDetails().subscribe(userDetails => {
        this.userDetails = userDetails;
       
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
    const file = event.target.files[0];
    if (file) {
      this.loadImage(file);
    }
  }

  loadImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0]; // Using optional chaining to handle null case
    if (file) {
      this.loadImage(file);
    }
  }

  clearImage(): void {
    this.imageUrl = null;
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      this.commentService.createComment(commentData).subscribe({
        next: (comment) => {
          console.log('Comment posted successfully:', comment);
          // Optionally, you can reset the form after successful submission
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
    const userId = this.userDetails?.id || '';
    const propertyValuationId = '1234'; // Replace with actual property valuation ID
  
    const fileInput = this.fileForm.get('file');
    console.log(fileInput,'log this');
    
    if (!(fileInput?.value instanceof FileList)) {
      console.error('File input is missing.');
      return;
    }
  
    const file = fileInput.value[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('documentType', documentType);
    formData.append('userId', userId);
    formData.append('propertyValuationId', propertyValuationId);
  
    this.commentService.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
      },
      error: (error) => {
        console.error('Error uploading file:', error);
      },
    });
  }
  
  
}
