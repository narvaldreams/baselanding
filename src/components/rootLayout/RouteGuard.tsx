'use client';
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
  password_change_required: boolean;
  userId: string;
}

export function RouteGuard({
  children,
  password_change_required,
  userId,
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      password_change_required &&
      !pathname.includes(`/admin/change-password/${userId}`)
    ) {
      router.replace(`/admin/change-password/${userId}`);
    }
  }, [password_change_required, pathname, router, userId]);

  return <>{children}</>;
}
