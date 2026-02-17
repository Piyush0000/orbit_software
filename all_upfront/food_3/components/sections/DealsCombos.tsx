import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { products } from "@/lib/data"
import Link from "next/link"

export default function DealsCombos() {
    const combos = products
        .filter(p => p.category === 'combos')
        .slice(0, 2) // Just show 2 for the home page section

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="space-y-2 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground uppercase italic">Great Deals & Combos</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl dark:text-muted-foreground mx-auto">
                        Save more with our curated selection of bundled favorites.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="overflow-hidden border-none shadow-lg bg-card flex flex-col sm:flex-row items-center">
                            <div className="relative w-full sm:w-1/2 aspect-square">
                                <Image
                                    src={combo.image[0]}
                                    alt={combo.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-8 text-left space-y-4 sm:w-1/2">
                                {combo.originalPrice && (
                                    <Badge className="bg-orange-500 text-white border-none uppercase text-[10px] tracking-widest px-3 py-1">
                                        Save ₹{combo.originalPrice - combo.price}
                                    </Badge>
                                )}
                                <h3 className="text-2xl font-bold text-foreground leading-tight uppercase">{combo.name}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{combo.shortDescription}</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-extrabold text-primary">₹{combo.price}</span>
                                    {combo.originalPrice && (
                                        <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/50">₹{combo.originalPrice}</span>
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
