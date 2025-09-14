'use client';
import { usePathname } from "next/navigation";
import Layout from "@/components/Layout";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Don't apply layout to auth pages
  if (pathname?.startsWith('/auth')) {
    return <>{children}</>;
  }
  
  return <Layout>{children}</Layout>;
}
