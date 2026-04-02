import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Code and Heartbeat | 视觉小说游戏',
    template: '%s | Code and Heartbeat',
  },
  description: '一款关于上海交大计算机专业新生与天才室友的视觉小说游戏',
  keywords: [
    '视觉小说',
    'Galgame',
    'Code and Heartbeat',
    '编程',
    '恋爱游戏',
    '校园',
  ],
  authors: [{ name: 'Tnt_next', url: 'https://space.bilibili.com/3546659195718047' }],
  generator: 'Code and Heartbeat Team',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Code and Heartbeat | 视觉小说游戏',
    description: '一款关于上海交大计算机专业新生与天才室友的视觉小说游戏',
    url: 'https://github.com/TNTnext/Code_and_Heartbeat',
    siteName: 'Code and Heartbeat',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isDev && <Inspector />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
