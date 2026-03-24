import {Component, inject, OnInit, signal} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzUploadComponent, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {DatePipe} from '@angular/common';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {ChatbotService} from '../../../../core/service/chatbot-service';

export interface FileItem {
  file_id: string;
  file_name: string;
  upload_time: string; // ISO string
  chunks: number;
}

@Component({
  selector: 'app-ai-doc',
  imports: [
    NzCardComponent,
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
    NzSpinComponent,
    NzTableComponent,
    NzTagComponent,
    DatePipe,
    NzPopconfirmDirective,
    NzEmptyComponent,
    NzModalModule
  ],
  templateUrl: './ai-doc.html',
  styleUrl: './ai-doc.css',
})
export class AiDoc implements OnInit {
  files = signal<FileItem[]>([]);
  loading = signal<boolean>(false);
  uploadLoading = signal<boolean>(false);
  chatbotService = inject(ChatbotService);

  private http = inject(HttpClient);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    this.loading.set(true);
    this.chatbotService.getFiles().subscribe({
      next: (data) => {
        this.files.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.message.error('Cannot get files');
        this.loading.set(false);
      }
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    // Validate file (optional)
    if (!file.type?.startsWith('application/pdf') &&
      !file.type?.includes('text/') &&
      !file.name.endsWith('.docx') &&
      !file.name.endsWith('.md')) {
      this.message.error('PDF, TXT, DOCX, MD only');
      return false;
    }
    return true;
  };

  handleUpload(info: { file: any; fileList: any[] }): void {
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} uploaded`);
      this.loadFiles(); // refresh list
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} upload failed`);
    }
  }

  customUploadRequest = (item: any) => {
    this.uploadLoading.set(true);
    const formData = new FormData();
    formData.append('files', item.file);

    return this.chatbotService.uploadFile(formData).subscribe({
      next: (response => {
        this.uploadLoading.set(false);
        this.message.success('Upload successfully');
        this.loadFiles();
      }),
      error: (err) => {
        this.uploadLoading.set(false);
        this.uploadLoading.set(false);
        this.message.error('Upload failed');
      }
    });

    // return this.http.post<string>('/api/admin/upload', formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).subscribe({
    //   next: (event) => {
    //     if (event.type === 4) { // HttpResponse
    //       this.uploadLoading.set(false);
    //       this.message.success('Upload thành công');
    //       this.loadFiles();
    //     }
    //   },
    //   error: (err) => {
    //     this.uploadLoading.set(false);
    //     this.message.error('Upload thất bại');
    //   }
    // });
  };

  deleteFile(fileId: string, fileName: string) {
    this.modal.confirm({
      nzTitle: 'Delete file?',
      nzContent: `Are you sure ?`,
      nzOkText: 'Delete',
      nzOkDanger: true,
      nzOnOk: () => {
        this.chatbotService.deleteFiles(fileId).subscribe({
          next: (msg) => {
            this.message.success(msg || 'Delete successfully');
            this.files.update(list => list.filter(f => f.file_id !== fileId));
          },
          error: (err) => {
            this.message.error('Delete failed');
          }
        });
      }
    });
  }
}
