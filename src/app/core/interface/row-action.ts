export interface RowAction<T> {
  label: string;
  action: (row: T) => void;
  danger?: boolean;
}
