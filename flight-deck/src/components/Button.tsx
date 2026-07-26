import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export default function Button(props: ButtonProps) {
  const { children, className = '', ...rest } = props;
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2';

  if ('href' in rest && rest.href) {
    const a = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const { href: _href, target: _target, rel: _rel, ...aRest } = a;
    return (
      <a
        href={_href} target={_target} rel={_rel}
        className={`${base} border cursor-pointer ${className}`}
        style={{ borderColor: 'var(--color-signal)', color: 'var(--color-signal)', background: 'transparent' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--color-signal) 12%, transparent)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        {...aRest}
      >{children}</a>
    );
  }

  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={`${base} border cursor-pointer ${className}`}
      style={{ borderColor: 'var(--color-signal)', color: 'var(--color-signal)', background: 'transparent' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'color-mix(in srgb, var(--color-signal) 12%, transparent)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
      {...b}
    >{children}</button>
  );
}
