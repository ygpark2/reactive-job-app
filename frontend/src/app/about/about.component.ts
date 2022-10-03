import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { ServiceBuilder } from 'ts-retrofit';

import {
  DownloadService
} from '@app/@shared/services';
import { Download } from '@app/@shared/download/download';
import { RequestInterceptor, ResponseInterceptor } from '@app/@shared/http';
import { PagedContentResponse } from '@app/@shared/models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
 
  currentIndex = -1;
  title = '';

  page = 0;
  totalCount = 0;
  pageSize = 10;

  slides = {
    name: '다운로드 테스트',
    url: '/api/v1/file/download?id=49087', // 'http://console.jts.or.kr/static/upload/2022/08/22/1da02051-95b8-407c-8e39-ce838c5cc461.pdf',
  };

  download$: Observable<Download> = new Observable();

  constructor(private downloadService: DownloadService) {

  }

  download({ name, url }: { name: string; url: string }) {
    this.download$ = this.downloadService.download(url, name);
  }

  ngOnInit() {
    // Object { data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request: XMLHttpRequest }

  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

}
