const Analytics = () => {
  const metrics = [
    { label: 'Total Revenue', value: '$125,430', change: '+12.5%', trend: 'up' },
    { label: 'Active Users', value: '2,543', change: '+8.2%', trend: 'up' },
    { label: 'Conversion Rate', value: '3.24%', change: '+2.1%', trend: 'up' },
    { label: 'Avg. Order Value', value: '$89.50', change: '-1.2%', trend: 'down' },
  ]

  const topServices = [
    { name: 'Plumbing Service', bookings: 1245, revenue: '$45,230' },
    { name: 'Electrical Repair', bookings: 892, revenue: '$32,150' },
    { name: 'Home Cleaning', bookings: 756, revenue: '$28,940' },
    { name: 'HVAC Installation', bookings: 634, revenue: '$24,560' },
    { name: 'Landscaping', bookings: 521, revenue: '$19,890' },
  ]

  const recentSales = [
    { date: '2024-01-15', amount: '$1,234', orders: 12 },
    { date: '2024-01-14', amount: '$2,456', orders: 23 },
    { date: '2024-01-13', amount: '$1,890', orders: 18 },
    { date: '2024-01-12', amount: '$3,120', orders: 28 },
    { date: '2024-01-11', amount: '$2,340', orders: 22 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Detailed insights and performance metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{metric.value}</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Revenue chart will be displayed here</p>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">User growth chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Top Services and Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Services</h2>
          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{service.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h2>
          <div className="space-y-4">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{sale.date}</p>
                  <p className="text-xs text-gray-500">{sale.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">{sale.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Page Views</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">45,231</p>
            <p className="text-sm text-green-600 mt-1">+12.5% from last week</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Bounce Rate</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">32.4%</p>
            <p className="text-sm text-red-600 mt-1">-2.1% from last week</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg. Session Duration</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">4m 32s</p>
            <p className="text-sm text-green-600 mt-1">+8.2% from last week</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

