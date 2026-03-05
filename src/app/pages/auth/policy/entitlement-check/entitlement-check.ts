import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {AuthSubscriber} from '../../../../core/interface/entity/auth/auth-subscriber';
import {AuthFeature} from '../../../../core/interface/entity/auth/auth-feature';
import {AuthSubscriberService} from '../../../../core/service/auth/auth-subscriber-service';
import {AuthFeatureService} from '../../../../core/service/auth/auth-feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from 'ng-zorro-antd/modal';
import {Policy} from '../../../../core/interface/entity/auth/policy';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {formatDate} from '@angular/common';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {AuthEntitlementService} from '../../../../core/service/auth/auth-entitlement-service';
import {AuthPolicy} from '../../../../core/interface/entity/auth/auth-policy';

@Component({
  selector: 'app-entitlement-check',
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzRowDirective,
    NzTagComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzCheckboxComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzModalModule,
    NzTableComponent,
    NzEmptyComponent,
    NzSpinComponent,
  ],
  templateUrl: './entitlement-check.html',
  styleUrl: './entitlement-check.css',
})
export class EntitlementCheck implements OnInit {
  availableFeatures = signal<AuthFeature[]>([])
  availableSubscriber = signal<AuthSubscriber[]>([])
  policy = signal<Policy | null>(null);
  selectedFeatures = signal<AuthFeature[]>([]);
  selectedSubscriber = signal<AuthSubscriber | null>(null)

  isFeatureModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);
  checking = signal(false);


  featureService = inject(AuthFeatureService);
  subscriberService = inject(AuthSubscriberService);
  entitlementService = inject(AuthEntitlementService);
  canCheck = computed(() => {
    return this.selectedSubscriber() !== null && this.selectedFeatures().length > 0;
  });

  tableData = computed(() => this.policy()?.entitlements ?? []);

  message = inject(NzMessageService);

  checkEntitlements() {
    if (!this.canCheck()) {
      this.message.warning('Vui lòng chọn ít nhất 1 subscriber và 1 feature');
      return;
    }

    this.checking.set(true);

    const request: AuthPolicy = {
      subscriberId: this.selectedSubscriber()!.id,
      featureIds: this.selectedFeatures().map(f => f.id)
    };

    this.entitlementService.checkPolicies(request).subscribe({
      next: (policy) => {
        this.policy.set(policy);
        this.message.success('Kiểm tra entitlement thành công');
        this.checking.set(false);
      },
      error: (err) => {
        console.error('Check policies error:', err);
        this.message.error('Kiểm tra entitlement thất bại');
        this.checking.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllFeature();
    this.loadAllSubscriber();
  }

  openFeatureModal() {
    this.isFeatureModalOpen.set(true);
  }

  isFeatureSelected(featureId: number): boolean {
    return this.selectedFeatures().some(u => u.id === featureId);
  }

  toggleFeature(feature: AuthFeature) {
    const current = this.selectedFeatures();
    if (current.some(u => u.id === feature.id)) {
      this.selectedFeatures.set(current.filter(u => u.id !== feature.id));
    } else {
      this.selectedFeatures.set([...current, feature]);
    }
  }

  removeSelectedFeature(featureId: number) {
    this.selectedFeatures.set(this.selectedFeatures().filter(u => u.id !== featureId));
  }

  openSubscriberModal() {
    this.isSubscriberModalOpen.set(true);
  }

  selectSubscriber(subscriber: AuthSubscriber) {
    this.selectedSubscriber.set(subscriber);
    this.isSubscriberModalOpen.set(false);
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
  }

  loadAllFeature() {
    this.featureService.getAllFeatures().subscribe({
      next: (response) => {
        const features = response.content || [];
        this.availableFeatures.set(features);
      },
      error: (err) => {
        console.error('Load features failed:', err);
        this.message.error('Không tải được danh sách features');
      }
    });
  }

  loadAllSubscriber() {
    this.subscriberService.getAllSubscribers().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscribers = response.content || []; // ListData<User> có content[]
        this.availableSubscriber.set(subscribers);
      },
      error: (err) => {
        console.error('Load subscriber failed:', err);
        this.message.error('Không tải được danh sách subscriber');
      }
    });
  }

  getFeatureDescription(fe: AuthFeature): string {
    return `
    ${fe.id}-${fe.name}
    Description: ${fe.description}
    Status: ${fe.status}
  `;
  }

  getSubscriberDescription(sub: AuthSubscriber): string {
    return `
    ${sub.name} • Email: ${sub.email}
  `;
  }

  formatDateString(dateStr: unknown, format: string): string {
    if (!dateStr || typeof dateStr !== 'string') return '';

    const [datePart, timePart] = dateStr.split(' ');
    if (!datePart || !timePart) return '';

    const [day, month, year] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );

    return formatDate(date, format, 'en-US');
  }
}
