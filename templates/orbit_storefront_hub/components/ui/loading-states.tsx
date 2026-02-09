export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-zinc-100 rounded-none ${className}`} />
    )
}

export function ProductSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
            </div>
        </div>
    )
}

export function CartItemSkeleton() {
    return (
        <div className="flex gap-6 p-8">
            <Skeleton className="w-32 h-32 shrink-0" />
            <div className="flex-1 space-y-4">
                <div className="flex justify-between">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )
}

export function NoResults({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-zinc-50 border border-dashed border-zinc-200">
            <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 max-w-xs">{description}</p>
        </div>
    )
}
