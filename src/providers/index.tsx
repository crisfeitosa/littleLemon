import {ChildrenProps} from '../@types/children';
import {AuthProvider} from './auth';

export const Providers = ({children}: ChildrenProps) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);