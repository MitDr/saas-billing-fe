import {Component, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NgClass, SlicePipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {ChatbotService} from '../../../../core/service/chatbot-service';
import {AuthQueryRequest} from '../../../../core/interface/request/auth/auth-query-request';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { source: string; page?: number }[];
  timestamp: Date;
}

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
    NzIconDirective,
    NzPopconfirmDirective,
    NgClass
  ],
  templateUrl: './document-chat.html',
  styleUrl: './document-chat.css',
})
export class DocumentChat {
  messages = signal<ChatMessage[]>([]);
  query = signal<string>('');
  chatLoading = signal<boolean>(false);
  private message = inject(NzMessageService);
  private STORAGE_KEY = 'chatbot_history';
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  private modal = inject(NzModalService)
  private chatbotService = inject(ChatbotService);

  constructor() {
    this.loadChatHistory();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  clearHistory() {
    this.modal.confirm({
      nzTitle: 'Xóa lịch sử chat?',
      nzContent: 'Toàn bộ cuộc trò chuyện sẽ bị xóa vĩnh viễn.',
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzOnOk: () => {
        this.messages.set([]);
        localStorage.removeItem(this.STORAGE_KEY);
        this.message.success('Đã xóa lịch sử chat');
      }
    });
  }

  askQuestion() {
    const q = this.query().trim();
    if (!q) {
      this.message.warning('Vui lòng nhập câu hỏi');
      return;
    }

    // Thêm tin nhắn user
    const userMsg: ChatMessage = {
      role: 'user',
      content: q,
      timestamp: new Date()
    };
    this.messages.update(msgs => [...msgs, userMsg]);
    this.saveChatHistory();

    this.chatLoading.set(true);
    this.query.set('');

    const request: AuthQueryRequest = {
      question: q
    }
    this.chatbotService.query(request).subscribe({
      next: (response) => {
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: response.answer,
          sources: response.sources,
          timestamp: new Date()
        };
        this.messages.update(msgs => [...msgs, assistantMsg]);
        this.saveChatHistory();
        this.chatLoading.set(false);
        this.scrollToBottom();
      },
    });
  }

  copyAnswer(content: string) {
    navigator.clipboard.writeText(content).then(() => {
      this.message.success('Đã sao chép câu trả lời');
    });
  }

  private scrollToBottom(): void {
    try {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch {
    }
  }

  private loadChatHistory() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const history = JSON.parse(stored) as ChatMessage[];
        const parsed = history.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        this.messages.set(parsed);
      } catch (e) {
        console.error('Lỗi load lịch sử chat:', e);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }

  private saveChatHistory() {
    let msgs = this.messages();
    if (msgs.length > 100) {
      msgs = msgs.slice(-100);
      this.messages.set(msgs);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(msgs));
  }
}
