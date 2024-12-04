import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MdRestaurantMenu, MdStar, MdLocalFlorist, MdPeople, MdTrendingUp } from "react-icons/md"
import { FaUtensils } from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


const data = [
  { name: 'Jan static data', recipes: 40 },
  { name: 'Feb static data', recipes: 30 },
  { name: 'Mar static data', recipes: 60 },
  { name: 'Apr static data', recipes: 40 },
  { name: 'May static data', recipes: 70 },
  { name: 'Jun static data', recipes: 55 },
]


const DashboardContent = () => {
    return (
        <div className="p-8 w-full">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
                <MdRestaurantMenu className="h-4 w-4 text-[#7aaccc]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Premium Subscribers</CardTitle>
                <MdStar className="h-4 w-4 text-[#7aaccc]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <MdLocalFlorist className="h-4 w-4 text-[#7aaccc]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <MdPeople className="h-4 w-4 text-[#7aaccc]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recipe Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="recipes" fill="#7aaccc" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 h-4 w-4 text-[#7aaccc]" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Main Dishes</p>
                      <p className="text-sm text-muted-foreground">324 recipes</p>
                    </div>
                    <MdTrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 h-4 w-4 text-[#7aaccc]" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Desserts</p>
                      <p className="text-sm text-muted-foreground">256 recipes</p>
                    </div>
                    <MdTrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center">
                    <FaUtensils className="mr-2 h-4 w-4 text-[#7aaccc]" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Appetizers</p>
                      <p className="text-sm text-muted-foreground">198 recipes</p>
                    </div>
                    <MdTrendingUp className="ml-2 h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
}

export default DashboardContent