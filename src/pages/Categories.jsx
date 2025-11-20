import { useState } from 'react'

const Categories = () => {
  const [viewMode, setViewMode] = useState('categories') // 'categories', 'subcategories', 'services'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState('category') // 'category', 'subcategory', 'service'
  const [formData, setFormData] = useState({ name: '', description: '', price: '', status: 'Active' })

  // Sample data structure
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Home Services',
      description: 'Services for home maintenance and repair',
      status: 'Active',
      subcategories: [
        {
          id: 1,
          name: 'Plumbing',
          description: 'Plumbing services',
          status: 'Active',
          services: [
            { id: 1, name: 'Pipe Repair', price: '$150', status: 'Active' },
            { id: 2, name: 'Leak Detection', price: '$200', status: 'Active' },
            { id: 3, name: 'Drain Cleaning', price: '$100', status: 'Active' },
          ]
        },
        {
          id: 2,
          name: 'Electrical',
          description: 'Electrical services',
          status: 'Active',
          services: [
            { id: 4, name: 'Wiring Installation', price: '$300', status: 'Active' },
            { id: 5, name: 'Outlet Repair', price: '$80', status: 'Active' },
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Cleaning Services',
      description: 'Professional cleaning services',
      status: 'Active',
      subcategories: [
        {
          id: 3,
          name: 'Home Cleaning',
          description: 'Residential cleaning',
          status: 'Active',
          services: [
            { id: 6, name: 'Deep Cleaning', price: '$250', status: 'Active' },
            { id: 7, name: 'Regular Cleaning', price: '$120', status: 'Active' },
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Construction',
      description: 'Construction and renovation services',
      status: 'Active',
      subcategories: [
        {
          id: 4,
          name: 'Renovation',
          description: 'Home renovation services',
          status: 'Active',
          services: [
            { id: 8, name: 'Kitchen Renovation', price: '$5000', status: 'Active' },
            { id: 9, name: 'Bathroom Renovation', price: '$3000', status: 'Active' },
          ]
        }
      ]
    }
  ])

  const handleAdd = () => {
    if (modalType === 'category') {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        subcategories: []
      }
      setCategories([...categories, newCategory])
    } else if (modalType === 'subcategory') {
      const updatedCategories = categories.map(cat => {
        if (cat.id === selectedCategory.id) {
          return {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              {
                id: cat.subcategories.length + 1,
                name: formData.name,
                description: formData.description,
                status: formData.status,
                services: []
              }
            ]
          }
        }
        return cat
      })
      setCategories(updatedCategories)
    } else if (modalType === 'service') {
      const updatedCategories = categories.map(cat => {
        if (cat.id === selectedCategory.id) {
          return {
            ...cat,
            subcategories: cat.subcategories.map(sub => {
              if (sub.id === selectedSubcategory.id) {
                return {
                  ...sub,
                  services: [
                    ...sub.services,
                    {
                      id: sub.services.length + 1,
                      name: formData.name,
                      price: formData.price,
                      status: formData.status
                    }
                  ]
                }
              }
              return sub
            })
          }
        }
        return cat
      })
      setCategories(updatedCategories)
    }
    setShowAddModal(false)
    setFormData({ name: '', description: '', price: '', status: 'Active' })
  }

  const openAddModal = (type) => {
    setModalType(type)
    setShowAddModal(true)
    setFormData({ name: '', description: '', price: '', status: 'Active' })
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setViewMode('subcategories')
    setSelectedSubcategory(null)
  }

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory)
    setViewMode('services')
  }

  const handleBack = () => {
    if (viewMode === 'services') {
      setViewMode('subcategories')
      setSelectedSubcategory(null)
    } else if (viewMode === 'subcategories') {
      setViewMode('categories')
      setSelectedCategory(null)
    }
  }

  const getCurrentData = () => {
    if (viewMode === 'categories') {
      return categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else if (viewMode === 'subcategories') {
      return selectedCategory?.subcategories.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    } else if (viewMode === 'services') {
      return selectedSubcategory?.services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    }
    return []
  }

  const getBreadcrumb = () => {
    if (viewMode === 'categories') return 'Categories'
    if (viewMode === 'subcategories') return `${selectedCategory?.name} > Subcategories`
    if (viewMode === 'services') return `${selectedCategory?.name} > ${selectedSubcategory?.name} > Services`
    return 'Categories'
  }

  const getAddButtonLabel = () => {
    if (viewMode === 'categories') return '+ Add Category'
    if (viewMode === 'subcategories') return '+ Add Subcategory'
    if (viewMode === 'services') return '+ Add Service'
    return '+ Add'
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-gray-600 mt-1">{getBreadcrumb()}</p>
        </div>
        <div className="flex gap-2">
          {viewMode !== 'categories' && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => openAddModal(viewMode === 'categories' ? 'category' : viewMode === 'subcategories' ? 'subcategory' : 'service')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {getAddButtonLabel()}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Categories</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{categories.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Subcategories</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Services</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {categories.reduce((sum, cat) => 
              sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.services.length, 0), 0
            )}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Active Categories</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {categories.filter(c => c.status === 'Active').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <input
          type="text"
          placeholder={`Search ${viewMode}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Categories View */}
      {viewMode === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentData().map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {category.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{category.subcategories.length} Subcategories</span>
                <span>
                  {category.subcategories.reduce((sum, sub) => sum + sub.services.length, 0)} Services
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Edit functionality
                  }}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Delete functionality
                  }}
                  className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subcategories View */}
      {viewMode === 'subcategories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentData().map((subcategory) => (
            <div
              key={subcategory.id}
              onClick={() => handleSubcategoryClick(subcategory)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{subcategory.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  subcategory.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {subcategory.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span>{subcategory.services.length} Services</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Edit functionality
                  }}
                  className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Delete functionality
                  }}
                  className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services View */}
      {viewMode === 'services' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentData().map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add {modalType === 'category' ? 'Category' : modalType === 'subcategory' ? 'Subcategory' : 'Service'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {modalType === 'service' ? 'Service' : modalType === 'subcategory' ? 'Subcategory' : 'Category'} Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${modalType} name`}
                />
              </div>
              {modalType !== 'service' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter description"
                  />
                </div>
              )}
              {modalType === 'service' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="$0.00"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories

