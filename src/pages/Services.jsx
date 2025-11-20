import { useState } from 'react'

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const services = [
    { id: 1, name: 'Plumbing Service', category: 'Plumbing', price: '$299.99', bookings: 45, status: 'Active', image: '🔧' },
    { id: 2, name: 'Electrical Repair', category: 'Electrical', price: '$149.99', bookings: 120, status: 'Active', image: '⚡' },
    { id: 3, name: 'Home Cleaning', category: 'Cleaning', price: '$89.99', bookings: 0, status: 'Unavailable', image: '🧹' },
    { id: 4, name: 'HVAC Installation', category: 'HVAC', price: '$599.99', bookings: 15, status: 'Active', image: '❄️' },
    { id: 5, name: 'Landscaping', category: 'Landscaping', price: '$179.99', bookings: 67, status: 'Active', image: '🌳' },
    { id: 6, name: 'Carpentry', category: 'Construction', price: '$249.99', bookings: 234, status: 'Active', image: '🪚' },
  ]

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage your service catalog</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Add New Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Services</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{services.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active Services</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {services.filter(s => s.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Unavailable</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {services.filter(s => s.status === 'Unavailable').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {services.reduce((sum, s) => sum + s.bookings, 0)}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Cleaning</option>
            <option>HVAC</option>
            <option>Landscaping</option>
            <option>Construction</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Unavailable</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
              {service.image}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  service.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{service.category}</p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-xl font-bold text-gray-800">{service.price}</p>
                  <p className="text-sm text-gray-500">Bookings: {service.bookings}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

