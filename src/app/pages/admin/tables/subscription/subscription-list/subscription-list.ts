import {Component, signal} from '@angular/core';
import {ListData} from '../../../../../core/interface/list-data';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Subscription} from '../../../../../core/interface/entity/Subscription';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../../core/constant/subscription/subscription-list-constant';
import {ColumnConfig} from '../../../../../core/interface/column-config';

@Component({
  selector: 'app-subscription-list',
  imports: [],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList {
//   currentPage = signal(1);   // 1-based (khớp API)
//   pageSize = signal(5);
//   featurePage = signal<ListData<Subscription> | null>(null);
//   loading = signal(false);
//
//   checked = false;
//   createRoute = '/admin/tables/subscriptions/create'
//   subscriptionListRouting = SUBSCRIPTION_ROUTE_CONSTANT;
//
//   protected readonly SUBSCRIPTION_COLUMNS: ColumnConfig<Subscription>[] = [
//     {key: 'id', title: 'Id', editable: false},
//     {key: 'status', title: 'Status', editable: true, type:'select', options: SUBSCRIPTONSTATUSOPTIONS},
//     {key: 'defaultPaymentMethod',title: 'Default Payment Method', editable: true},
//     {key: 'quantity', title: 'Quantity', editable: true},
//     {key: 'startDate', title: 'Start Date', editable: true},
//     {key: 'endDate', title: 'End Date', editable: true},
//     {key: 'cancelDate', title: 'Cancel date', editable: true},
//     {key: 'cancelAtPeriodEnd', title: 'Cancel At End', type:'select', options: SUBSCRIPTIONCANCELATENDOPTION, editable: true},
//     {key: 'dueDate', title: 'Due Date', editable: true},
//     {key: 'trial', title: 'Trial', editable: true, type: 'select', options: TRIALOPTION}
//   ]
}
//
// export const SUBSCRIPTONSTATUSOPTIONS  = [
//   {label: 'Active', value: 'ACTIVE', color: 'green'},
//   {label: 'Inactive', value: 'INACTIVE', color: 'red'},
//   {label: 'Active', value: 'ACTIVE', color: 'green'},
//   {label: 'Inactive', value: 'INACTIVE', color: 'red'},
//   {label: 'Inactive', value: 'INACTIVE', color: 'red'}
// ]
// export const SUBSCRIPTIONCANCELATENDOPTION  = [
//   {label: 'Active', value: 'ACTIVE', color: 'green'},
//   {label: 'Inactive', value: 'INACTIVE', color: 'red'},
// ]
// export const TRIALOPTION  = [
//   {label: 'Active', value: 'ACTIVE', color: 'green'},
//   {label: 'Inactive', value: 'INACTIVE', color: 'red'},
// ]
