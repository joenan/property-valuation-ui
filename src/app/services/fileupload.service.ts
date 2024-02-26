import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root",
})
export class FileUploadService {


    private baseUrl: string = environment.uploadUrl;

    private http = inject(HttpClient)


    uploadFile(formData: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}file-uploads`, formData);
    }

    downloadFile(fileId: any): Observable<any> {
        return this.http.get(`${this.baseUrl}file-uploads/download/${fileId}`, {responseType: 'blob'});
    }

    getFilesByPropertyId(propertyId: number) {
        return this.http.get(`${this.baseUrl}file-uploads/property/${propertyId}`);
    }

    // Get Files by Files number
    getFilesByNumber(FilesNumber: string): Observable<any> {
        return this.http.get(`${this.baseUrl}file-uploads/${FilesNumber}`);
    }

    // Delete Files by Files number
    deleteFiles(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}file-uploads/${id}`);
    }

    // Get all files
    getAllfiles(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}file-uploads`);
    }

}
