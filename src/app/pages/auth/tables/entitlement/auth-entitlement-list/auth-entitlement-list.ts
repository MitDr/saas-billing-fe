import {Component, inject, signal} from '@angular/core';
import {AuthGenericListComponent} from '../../../../../core/generic/base-auth-list-component';
import {AuthEntitlement} from '../../../../../core/interface/entity/auth/auth-entitlement';
import {AuthEntitlementRequest} from '../../../../../core/interface/request/auth/auth-entitlement-request';
import {ListData} from '../../../../../core/interface/list-data';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {
    AUTH_ENTITLEMENT_ROUTE_CONSTANT,
    ENTITLEMENT_ROUTE_CONSTANT
} from '../../../../../core/constant/entitlement/entitlement-list-constant';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {AuthEntitlementService} from '../../../../../core/service/auth/auth-entitlement-service';
import {ColumnConfig} from "../../../../../core/interface/column-config";
import {EntitlementRequest} from '../../../../../core/interface/request/entitlement-request';
import {EditableDataTable} from '../../../../../shell/components/generic/editable-data-table/editable-data-table';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputWrapperComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ENTITLEMENTSTATUSOPTION} from '../../../../admin/tables/entitlement/entitlement-list/entitlement-list';

@Component({
    selector: 'app-auth-entitlement-list',
    imports: [
        EditableDataTable,
        NzButtonComponent,
        NzInputDirective,
        NzInputWrapperComponent,
        NzOptionComponent,
        NzSelectComponent,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './auth-entitlement-list.html',
    styleUrl: './auth-entitlement-list.css',
})
export class AuthEntitlementList extends AuthGenericListComponent<AuthEntitlement, AuthEntitlementRequest> {
    entitlementPage = signal<ListData<AuthEntitlement> | null>(null);
    checked = false;
    createRoute = '/app/tables/entitlements/create'
    entitlementListRouting = AUTH_ENTITLEMENT_ROUTE_CONSTANT;
    private entitlementService = inject(AuthEntitlementService);

    getDataPage() {
        return this.entitlementPage;
    }

    getColumns(): ColumnConfig<AuthEntitlement>[] {
        return [
            {key: "id", title: 'Id', editable: false},
            {key: 'startDate', title: 'Start Date', editable: true, type: 'date-time'},
            {key: 'endDate', title: 'End Date', editable: true, type: 'date-time'},
            {key: 'status', title: 'Status', editable: true, type: 'select', options: ENTITLEMENTSTATUSOPTION},
            // {key: 'createdDate', title: 'Created Date', editable: false, type: 'text'},
            // {key: 'modifiedDate', title: 'Modified Date', editable: false, type: 'text'},
            {
                key: 'subscription',
                title: 'Subscriptions\'s Id',
                editable: false,
                type: "custom",
                path: 'subscription.id'
            },
            {key: 'feature', title: 'Feature\'s Id', editable: false, type: 'custom', path: 'feature.id'},
            {key: 'subscriber', title: 'Subscriber\'s Name', editable: false, type: 'custom', path: 'subscriber.name'},
        ]
    }

    getCreateRoute() {
        return this.createRoute;
    }

    getRoutingConstant() {
        return this.entitlementListRouting;
    }

    getService() {
        return this.entitlementService;
    }

    onSearchChange(value: string) {
        this.search.set(value);
        this.currentPage.set(1);
        this.syncUrl({page: 1});
    }

    protected loadData(page: number, size: number, search?: string, sort?: string) {
        this.loading.set(true);
        this.entitlementService.getEntitlements(page, size, search).subscribe({ // No sort for Price
            next: (response) => {
                // Sync queryParams (nếu cần, copy từ cũ)
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                        page,
                        size: this.pageSize(),
                        search: this.search() || null
                    },
                    queryParamsHandling: 'merge'
                });
                this.entitlementPage.set(response);
                this.loading.set(false);
            },
            error: () => {
                this.message.error('Cannot load entitlements');
                this.loading.set(false);
            }
        });
    }

    protected mapToUpdatePayload(entitlement: AuthEntitlement): AuthEntitlementRequest {
        return {
            startDate: entitlement.startDate,
            endDate: entitlement.endDate,
            status: entitlement.status,
            subscriptionId: entitlement.subscription.id,
            featureId: entitlement.feature.id,
        };
    }

}
