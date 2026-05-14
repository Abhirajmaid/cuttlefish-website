import Link from 'next/link';
import { Text } from './Text';

const pages = [
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/shop' },
  { name: 'Insider Edition', href: '/blog' },
  { name: '404', href: '/404' },
];

const info = [
  { name: 'Terms', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Support', href: '#' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Brand & Copyright Column */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 p-8 md:p-12 lg:p-16">
          <Link href="/" className="font-gambetta-italic text-4xl mb-12 text-black block">
            Cuttle Fish.
          </Link>
          
          <div className="mt-auto">
            <Text variant="label" className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Cuttle Fish. All rights reserved.
            </Text>
          </div>
        </div>
        
        {/* Links Columns */}
        <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2">
          {/* Pages */}
          <div className="flex flex-col border-r border-gray-200 p-8 md:p-12 lg:p-16">
            <Text variant="label" className="text-gray-400 mb-6 text-xs uppercase tracking-widest">Pages</Text>
            <div className="flex flex-col gap-4">
              {pages.map((link) => (
                <Link key={link.name} href={link.href} className="group">
                  <Text className="text-gray-600 group-hover:text-black transition-colors font-supreme">{link.name}</Text>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Information */}
          <div className="flex flex-col p-8 md:p-12 lg:p-16">
            <Text variant="label" className="text-gray-400 mb-6 text-xs uppercase tracking-widest">Information</Text>
            <div className="flex flex-col gap-4">
              {info.map((link) => (
                <Link key={link.name} href={link.href} className="group">
                  <Text className="text-gray-600 group-hover:text-black transition-colors font-supreme">{link.name}</Text>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
