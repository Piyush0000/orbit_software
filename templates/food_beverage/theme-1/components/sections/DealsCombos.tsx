"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStorefront } from "@/context/StorefrontContext"
import Link from "next/link"

export default function DealsCombos() {
    const { products } = useStorefront()

    // Filter for combos - looking for 'combo' in category or tags
    const combos = products
        .filter(p => 
            p.category.toLowerCase().includes('combo') || 
            p.tags?.some(tag => tag.toLowerCase().includes('combo'))
        )
        .slice(0, 2)

    if (combos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-zinc-50">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="space-y-2 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase italic">Great Deals & Combos</h2>
                    <p className="max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                        Save more with our curated selection of bundled favorites.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="overflow-hidden border-none shadow-lg bg-white flex flex-col sm:flex-row items-center">
                            <div className="relative w-full sm:w-1/2 aspect-square">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={combo.image || (combo.images && combo.images[0]) || '/placeholder.png'}
                                    alt={combo.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <CardContent className="p-8 text-left space-y-4 sm:w-1/2">
                                {combo.discount && (
                                    <Badge className="bg-orange-500 text-white border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        Save {combo.discount}%
                                    </Badge>
                                )}
                                <h3 className="text-2xl font-bold text-zinc-900 leading-tight uppercase">{combo.name}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{combo.shortDescription}</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-extrabold text-primary">{combo.price}</span>
                                    {combo.originalPrice && (
                                        <span className="text-lg text-zinc-400 line-through decoration-zinc-400/50">{combo.originalPrice}</span>
                                    )}
                                </div>
                                <Link href={`/products/${combo.id}`}>
                                    <Button className="w-full sm:w-auto px-8 font-bold uppercase tracking-widest">View Combo</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12">
                    <Link href="/combos">
                        <Button variant="outline" className="px-8 font-bold uppercase tracking-widest border-2">
                            View All Combos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
