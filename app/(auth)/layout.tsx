import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-slate-50 text-black border shadow-lg p-10 rounded-md'>
      {children}
    </div>
  );
};

export default AuthLayout;
