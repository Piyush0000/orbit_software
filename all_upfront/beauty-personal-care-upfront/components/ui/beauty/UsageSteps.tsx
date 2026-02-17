import { cn } from "@/lib/utils";

interface UsageStepsProps {
    steps: string[];
    className?: string;
}

export function UsageSteps({ steps, className }: UsageStepsProps) {
    return (
        <div className={cn("space-y-4", className)}>
            <h4 className="font-serif text-lg font-medium mb-3">How to Use</h4>
            <div className="relative border-l border-muted ml-3 pl-6 space-y-6">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold border-2 border-background ring-1 ring-primary/20">
                            {index + 1}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {step}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
