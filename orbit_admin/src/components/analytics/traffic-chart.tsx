"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartDataPoint } from "@/types/analytics"

interface TrafficChartProps {
    data: ChartDataPoint[]
}

export function TrafficChart({ data }: TrafficChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Daily active users and visitors</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return `${date.getMonth() + 1}/${date.getDate()}`;
                            }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                            labelStyle={{ color: "#64748b" }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar
                            dataKey="traffic"
                            fill="#2563eb"
                            radius={[4, 4, 0, 0]}
                            name="Traffic"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
