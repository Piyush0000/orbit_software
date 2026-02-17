"use client";

import * as React from "react";
import { CalendarIcon, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function formatDate(date: Date | undefined) {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const dateRangeLabels: Record<string, string> = {
    "custom-date": "Custom date",
    "custom-range": "Custom range",
    today: "Today",
    yesterday: "Yesterday",
    "last-30-minutes": "Last 30 minutes",
    "last-12-hours": "Last 12 hours",
    "last-7-days": "Last 7 days",
    "last-30-days": "Last 30 days",
    "last-90-days": "Last 90 days",
    "last-365-days": "Last 365 days",
    "last-month": "Last month",
    "last-12-months": "Last 12 months",
    "last-year": "Last year",
    "week-to-date": "Week to date",
    "month-to-date": "Month to date",
    "quarter-to-date": "Quarter to date",
    "year-to-date": "Year to date",
    "all-time": "All time",
};

interface DateRangeSelectorProps {
    defaultValue?: string;
    onValueChange?: (value: string, startDate?: Date, endDate?: Date) => void;
}

export function DateRangeSelector({
    defaultValue = "today",
    onValueChange,
}: DateRangeSelectorProps) {
    const [dateRange, setDateRange] = React.useState(defaultValue);
    const [customDate, setCustomDate] = React.useState<Date | undefined>();
    const [customStartDate, setCustomStartDate] = React.useState<
        Date | undefined
    >();
    const [customEndDate, setCustomEndDate] = React.useState<Date | undefined>();
    const [openCustomDate, setOpenCustomDate] = React.useState(false);
    const [openCustomRange, setOpenCustomRange] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleRangeChange = (value: string) => {
        // Close custom popovers when selecting non-custom options
        if (value !== "custom-date") {
            setOpenCustomDate(false);
        }
        if (value !== "custom-range") {
            setOpenCustomRange(false);
        }

        // Don't close dropdown for custom options
        if (value !== "custom-date" && value !== "custom-range") {
            setDropdownOpen(false);
        }

        // Auto-open calendar when custom options are selected
        if (value === "custom-date") {
            setOpenCustomDate(true);
        } else if (value === "custom-range") {
            setOpenCustomRange(true);
        }

        setDateRange(value);
        if (onValueChange) {
            onValueChange(value, customStartDate, customEndDate);
        }
    };

    const getButtonText = () => {
        if (dateRange === "custom-date" && customDate) {
            return formatDate(customDate);
        }
        if (dateRange === "custom-range" && customStartDate && customEndDate) {
            return `${formatDate(customStartDate)} - ${formatDate(customEndDate)}`;
        }
        return dateRangeLabels[dateRange] || "Select date";
    };

    return (
        <DropdownMenu
            open={dropdownOpen}
            onOpenChange={(open) => {
                // If a custom calendar popover is open, prevent the dropdown from closing
                if (!open && (openCustomDate || openCustomRange)) {
                    setDropdownOpen(true);
                    return;
                }
                setDropdownOpen(open);
            }}
        >
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getButtonText()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                onInteractOutside={(e) => {
                    // Prevent dropdown from closing while a custom calendar popover is open
                    if (openCustomDate || openCustomRange) {
                        e.preventDefault();
                        return;
                    }
                }}
                onPointerDownOutside={(e) => {
                    // Prevent dropdown from closing when clicking on calendar popovers
                    if (openCustomDate || openCustomRange) {
                        e.preventDefault();
                        return;
                    }
                }}
            >
                <DropdownMenuLabel>Date range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={dateRange}
                    onValueChange={handleRangeChange}
                >
                    {/* Custom Date Option */}
                    <DropdownMenuRadioItem
                        value="custom-date"
                        onSelect={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenCustomDate(true);
                        }}
                    >
                        <Popover
                            modal={false}
                            open={openCustomDate}
                            onOpenChange={setOpenCustomDate}
                        >
                            <PopoverAnchor asChild>
                                <div className="flex w-full items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Custom date</span>
                                </div>
                            </PopoverAnchor>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                                side="right"
                                onInteractOutside={(e) => e.preventDefault()}
                                onPointerDownOutside={(e) => e.preventDefault()}
                            >
                                <Calendar
                                    mode="single"
                                    selected={customDate}
                                    onSelect={(date) => {
                                        setCustomDate(date);
                                        setOpenCustomDate(false);
                                        setDropdownOpen(false);
                                        if (onValueChange && date) {
                                            onValueChange("custom-date", date, date);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </DropdownMenuRadioItem>

                    {/* Custom Range Option */}
                    <DropdownMenuRadioItem
                        value="custom-range"
                        onSelect={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenCustomRange(true);
                        }}
                    >
                        <Popover
                            modal={false}
                            open={openCustomRange}
                            onOpenChange={setOpenCustomRange}
                        >
                            <PopoverAnchor asChild>
                                <div className="flex w-full items-center gap-2">
                                    <CalendarRange className="h-4 w-4" />
                                    <span>Custom range</span>
                                </div>
                            </PopoverAnchor>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                                side="right"
                                onInteractOutside={(e) => e.preventDefault()}
                                onPointerDownOutside={(e) => e.preventDefault()}
                            >
                                <div className="flex flex-col">
                                    <Calendar
                                        mode="range"
                                        defaultMonth={customStartDate}
                                        selected={{
                                            from: customStartDate,
                                            to: customEndDate,
                                        }}
                                        onSelect={(range) => {
                                            if (range?.from) {
                                                setCustomStartDate(range.from);
                                            }
                                            if (range?.to) {
                                                setCustomEndDate(range.to);
                                            } else {
                                                setCustomEndDate(undefined);
                                            }
                                        }}
                                        numberOfMonths={2}
                                        className="rounded-lg"
                                    />
                                    <div className="flex items-center justify-end gap-2 border-t p-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setCustomStartDate(undefined);
                                                setCustomEndDate(undefined);
                                                setOpenCustomRange(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            disabled={!customStartDate || !customEndDate}
                                            onClick={() => {
                                                if (customStartDate && customEndDate) {
                                                    setOpenCustomRange(false);
                                                    setDropdownOpen(false);
                                                    setDateRange("custom-range");
                                                    if (onValueChange) {
                                                        onValueChange(
                                                            "custom-range",
                                                            customStartDate,
                                                            customEndDate
                                                        );
                                                    }
                                                }
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </DropdownMenuRadioItem>

                    <DropdownMenuSeparator />

                    {/* Preset Date Ranges */}
                    <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="yesterday">
                        Yesterday
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-30-minutes">
                        Last 30 minutes
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-12-hours">
                        Last 12 hours
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-7-days">
                        Last 7 days
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-30-days">
                        Last 30 days
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-90-days">
                        Last 90 days
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-365-days">
                        Last 365 days
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-month">
                        Last month
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-12-months">
                        Last 12 months
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last-year">
                        Last year
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="week-to-date">
                        Week to date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="month-to-date">
                        Month to date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="quarter-to-date">
                        Quarter to date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="year-to-date">
                        Year to date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="all-time">
                        All time
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}