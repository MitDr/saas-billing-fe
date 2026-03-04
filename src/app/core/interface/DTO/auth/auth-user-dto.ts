export interface AuthUserDto{
  id: number,
  username: string,
  email: string,
  role: 'ADMIN' | 'USER',
  createdDate: string,
  modifiedDate: string
}
