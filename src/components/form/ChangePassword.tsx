import { JSX, SVGProps, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb'; // Import the closed eye icon

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {};

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="justify-center ml-20">Change Password</CardTitle>
        <CardDescription>
          Enter your current password and a new password to update your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <Label htmlFor="oldPassword">Old Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                {...register('oldPassword')}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-1 flex items-center"
                onClick={() => setShowOldPassword(!showOldPassword)}
                type="button"
              >
                {showOldPassword ? (
                  <TbEyeOff className="h-4 w-4" />
                ) : (
                  <TbEye className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.oldPassword && (
              <div className="mt-1 text-xs text-red-500">
                {String(errors.oldPassword.message)}
              </div>
            )}
          </div>

          <div className="relative">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-1 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
                type="button"
              >
                {showNewPassword ? (
                  <TbEyeOff className="h-4 w-4" />
                ) : (
                  <TbEye className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.newPassword && (
              <div className="mt-1 text-xs text-red-500">
                {String(errors.newPassword.message)}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
