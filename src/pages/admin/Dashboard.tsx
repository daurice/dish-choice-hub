import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, LogIn, LogOut, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "New Booking",
      value: "8,461",
      icon: Bed,
      bgColor: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      title: "New Booking",
      value: "8,461",
      icon: Bed,
      bgColor: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      title: "Check In",
      value: "753",
      icon: LogIn,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Check Out",
      value: "516",
      icon: LogOut,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  const reservationData = [
    { name: "Week 1", checkIn: 1100, checkOut: 650 },
    { name: "Week 2", checkIn: 1000, checkOut: 1150 },
    { name: "Week 3", checkIn: 1900, checkOut: 400 },
    { name: "Week 4", checkIn: 1300, checkOut: 380 },
    { name: "Week 5", checkIn: 450, checkOut: 1350 },
    { name: "Week 6", checkIn: 1500, checkOut: 800 },
  ];

  const calendarDays = [
    { date: 26, isCurrentMonth: false },
    { date: 27, isCurrentMonth: false },
    { date: 28, isCurrentMonth: false },
    { date: 29, isCurrentMonth: false },
    { date: 30, isCurrentMonth: false },
    { date: 31, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
    { date: 5, isCurrentMonth: true },
    { date: 6, isCurrentMonth: true },
    { date: 7, isCurrentMonth: true },
    { date: 8, isCurrentMonth: true },
    { date: 9, isCurrentMonth: true },
    { date: 10, isCurrentMonth: true },
    { date: 11, isCurrentMonth: true },
    { date: 12, isCurrentMonth: true },
    { date: 13, isCurrentMonth: true },
    { date: 14, isCurrentMonth: true },
    { date: 15, isCurrentMonth: true },
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Calendar and Chart Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Booking Schedule */}
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Recent Booking Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between pb-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h3 className="text-lg font-semibold">November 2025</h3>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-2">
                {/* Week days header */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {weekDays.map((day) => (
                    <div key={day} className="text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      className={`
                        aspect-square rounded-lg p-2 text-sm font-medium transition-colors
                        ${day.isCurrentMonth ? "text-foreground hover:bg-muted" : "text-muted-foreground"}
                      `}
                    >
                      {day.date}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservation Stats */}
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Reservation Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-chart-2" />
                    <span className="text-muted-foreground">Check In</span>
                    <span className="font-semibold">23,451</span>
                    <span className="text-green-600 text-xs">+0.4%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-chart-1" />
                    <span className="text-muted-foreground">Check Out</span>
                    <span className="font-semibold">20,441</span>
                  </div>
                </div>

                <ChartContainer
                  config={{
                    checkIn: {
                      label: "Check In",
                      color: "hsl(var(--chart-2))",
                    },
                    checkOut: {
                      label: "Check Out",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reservationData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="checkIn" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="checkOut" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>

              <TabsContent value="weekly">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Weekly data will be displayed here
                </div>
              </TabsContent>

              <TabsContent value="daily">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Daily data will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
