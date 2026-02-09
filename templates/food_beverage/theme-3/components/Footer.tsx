import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = [
    {
        title: "About Us",
        links: [
            { name: "Our Story", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "Contact", href: "/contact" },
            { name: "Shipping & Returns", href: "/shipping" },
            { name: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="bg-muted border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
                    <div className="col-span-2 lg:col-span-2 space-y-6">
                        <span className="text-2xl font-bold tracking-tight text-primary uppercase">Provision & Co.</span>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm font-medium">
                            Your premium destination for high-quality snacks, beverages, and ready-to-eat meals.
                            Delivering taste and health to your doorstep with every order.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2 rounded-full bg-card border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h4 className="text-sm font-extrabold text-foreground uppercase tracking-widest">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-muted-foreground text-sm transition-colors hover:text-primary">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                        © {new Date().getFullYear()} Provision & Co. All rights reserved.
                    </p>
                    <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                        Crafted with precision for fine dining experiences.
                    </p>
                </div>
            </div>
        </footer>
    )
}
