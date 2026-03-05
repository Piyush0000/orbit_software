import { IconTrendingDown, IconTrendingUp, IconCircleCheckFilled } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  analytics?: any;
}

export const SectionCards: React.FC<SectionCardsProps> = ({ analytics }) => {
  const stats = analytics || {
    revenue: 0,
    customers: 0,
    orders: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
    avgOrderValue: 0
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(val || 0);
  };

  const aov = stats.avgOrderValue || (stats.orders > 0 ? (stats.revenue / stats.orders) : 0);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(stats.revenue)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.revenueGrowth >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.revenueGrowth >= 0 ? "+" : ""}{stats.revenueGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Recent performance {stats.revenueGrowth >= 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Compared to previous 30 days
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.orders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.orderGrowth >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {stats.orderGrowth >= 0 ? "+" : ""}{stats.orderGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
             Volume tracking {stats.orderGrowth >= 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Daily order flow
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.customers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCircleCheckFilled className="size-3.5" />
              Real
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active audience <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground text-xs">Unique registered shoppers</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Order Value</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(aov)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Healthy
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Basket size <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground text-xs">AOV performance indicator</div>
        </CardFooter>
      </Card>
    </div>
  )
}
