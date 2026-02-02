import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className = '', width = 150, height = 50 }: { className?: string, width?: number, height?: number }) {
  return (
    <Link
      href="/"
      className={`flex items-center ${className}`}
      aria-label="Fullance Homes homepage"
    >
      <Image
        src="/logo.svg"
        alt="Fullance Homes Logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </Link>
  );
}