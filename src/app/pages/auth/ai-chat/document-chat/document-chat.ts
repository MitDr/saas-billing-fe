import {Component, effect, inject, signal} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalComponent, NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {SlicePipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-document-chat',
  imports: [
    NzCardComponent,
    NzSpinComponent,
    NzInputGroupComponent,
    FormsModule,
    NzInputDirective,
    NzDividerComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    SlicePipe,
    NzModalModule,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './document-chat.html',
  styleUrl: './document-chat.css',
})
export class DocumentChat {
  uploadedDocs = signal<any[]>([]);
  query = signal<string>('');
  answer = signal<string>('');
  sources = signal<any[]>([]);
  loading = signal<boolean>(false);
  chatLoading = signal<boolean>(false);

  // Injections
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  // private docService = inject(DocumentService);

  // askQuestion() {
  //   const q = this.query().trim();
  //   if (!q) {
  //     this.message.warning('Vui lòng nhập câu hỏi');
  //     return;
  //   }
  //
  //   this.chatLoading.set(true);
  //   this.answer.set('');
  //   this.sources.set([]);
  //
  //   // this.docService.askQuestion(q).subscribe({
  //   //   next: (res) => {
  //   //     this.answer.set(res.answer);
  //   //     this.sources.set(res.sources || []);
  //   //     this.chatLoading.set(false);
  //   //   },
  //   //   error: (err) => {
  //   //     this.message.error('Truy vấn thất bại');
  //   //     this.chatLoading.set(false);
  //   //   }
  //   // });
  // }

  askQuestion() {
    const q = this.query().trim();
    if (!q) return;

    this.chatLoading.set(true);
    this.answer.set('');
    this.sources.set([]);

    setTimeout(() => {
      this.answer.set('Đây là câu trả lời mẫu cho câu hỏi: ' + q);
      this.sources.set([
        { source: 'angular.io/docs', content: 'Angular là framework...' },
        { source: 'wikipedia.org/wiki/Angular', content: 'Angular ra mắt năm 2016...' }
      ]);
      this.chatLoading.set(false);
    }, 1500);
  }
}
