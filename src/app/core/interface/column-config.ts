import {TemplateRef} from '@angular/core';

export interface ColumnConfig<T = any> {
  key: keyof T;
  title: string;
  editable?: boolean;
  type?: 'text' | 'select' | 'date' | 'tag' | 'custom' | 'avatar' | 'date-time' ;
  options?: { label: string; value: any; color?: string }[];
  width?: string;
  template?: TemplateRef<any>;
  path?: string;
  render?: (item: T) => string | number | boolean | any;
  avatarSize?: number;
  dateFormat?: string;
  timeFormat?: string;//dd-MM-yyyy HH:mm:ss
}


