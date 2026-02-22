import {Component, effect, inject, signal} from '@angular/core';
import {Image} from '../../../../../core/interface/entity/image';
import {ImageService} from '../../../../../core/service/image-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {ImageCard} from '../../../../../shell/components/card/image/image-card/image-card';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-image-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    RouterLink,
    ImageCard,
    NzSpinComponent
  ],
  templateUrl: './image-detail.html',
  styleUrl: './image-detail.css',
})
export class ImageDetail {
  loading = signal(false);
  image = signal<Image | null>(null);
  imageService = inject(ImageService)
  router = inject(Router)
  message = inject(NzMessageService);
  route = inject(ActivatedRoute)

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadImage(+id)
      }
    });
  }

  loadImage(id: number) {
    this.loading.set(true);
    this.imageService.getImage(id).subscribe({
      next: (response) => {
        this.image.set(response);
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onDelete(id: number) {
    this.loading.set(true);
    this.imageService.deleteImage(id).subscribe({
      next: (response) => {
        this.message.success('User deleted successfully');
        this.router.navigate(['/admin/tables/images'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
