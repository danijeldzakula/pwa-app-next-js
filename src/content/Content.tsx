import { cn } from "@/utils/pipes/classNames.pipe";

interface ContentProps {
    className?: string,
    children?: React.ReactNode
};

export function Header({ className, children }: ContentProps) {
    return <header className={cn(className)}>{children}</header>;
}

export function Nav({ className, children }: ContentProps) {
    return <nav className={cn(className)}>{children}</nav>;
}

export function Main({ className, children }: ContentProps) {
    return <main className={cn(className)}>{children}</main>;
}

export function Sidebar({ className, children }: ContentProps) {
    return <aside className={cn(className)}>{children}</aside>;
}

export function Section({ className, children }: ContentProps) {
    return <section className={cn(className)}>{children}</section>;
}

export function Article({ className, children }: ContentProps) {
    return <article className={cn(className)}>{children}</article>;
}

export function Figure({ className, children }: ContentProps) {
    return <figure className={cn(className)}>{children}</figure>;
}

export function Footer({ className, children }: ContentProps) {
    return <footer className={cn(className)}>{children}</footer>;
}

export function Grid({ className, children }: ContentProps) {
    return <div className={cn(className)}>{children}</div>;
}

export function Row({ className, children }: ContentProps) {
    return <div className={cn(className)}>{children}</div>;
}

export function Container({ className, children }: ContentProps) {
    return <div className={cn('container mx-auto px-4', className)}>{children}</div>;
}

export function Div({ className, children }: ContentProps) {
    return <div className={cn(className)}>{children}</div>;
}

