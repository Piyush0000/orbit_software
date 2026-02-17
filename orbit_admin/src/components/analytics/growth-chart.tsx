"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartDataPoint } from "@/types/analytics"

interface GrowthChartProps {
    data: ChartDataPoint[]
}

export function GrowthChart({ data }: GrowthChartProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Revenue and Orders over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
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
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                            labelStyle={{ color: "#64748b" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#adfa1d"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            name="Revenue"
                        />
                        <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#2563eb"
                            strokeWidth={2}
                            name="Orders"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
