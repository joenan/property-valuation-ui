import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})
export class CommentsComponent {
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
  constructor(private router: Router) {}

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
}
