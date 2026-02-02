import {TemplateRef} from '@angular/core';

export interface ColumnConfig<T = any> {
  key: keyof T;
  title: string;
  editable?: boolean;
  type?: 'text' | 'select' | 'date' | 'tag' | 'custom';
  options?: { label: string; value: any; color?: string }[];
  width?: string;
  template?: TemplateRef<any>;
}


