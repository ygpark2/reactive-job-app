import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { download, Download } from '@app/@shared/download/download';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SAVER, Saver } from '@app/@shared/download/saver.provider';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  constructor(private http: HttpClient, @Inject(SAVER) private save: Saver) {}

  download(url: string, filename?: string): Observable<Download> {
    return this.http
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          // 'Access-Control-Allow-Credentials': true,
          Connection: 'keep-alive',
          'Content-Type': 'blob',
        },
        reportProgress: true,
        observe: 'events',
        responseType: 'blob',
      })
      .pipe(download((blob) => this.save(blob, filename)));
  }

  blob(url: string, filename?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob',
    });
  }
}
