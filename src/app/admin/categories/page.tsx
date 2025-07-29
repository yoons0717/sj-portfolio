'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/lib/api/categories';
import { Category, CategoryFormData } from '@/types';
import LoadingState from '@/components/LoadingState';
import { AdminLayout } from '@/components/layouts';

const iconOptions = [
  { value: 'presentation', label: '📊 Presentation' },
  { value: 'code', label: '💻 Code' },
  { value: 'document', label: '📄 Document' },
  { value: 'paintbrush', label: '🎨 Design' },
  { value: 'search', label: '🔍 Research' },
  { value: 'users', label: '👥 Team' },
  { value: 'folder', label: '📁 Folder' },
];

const colorOptions = [
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#f59e0b',
  '#ef4444',
  '#6366f1',
  '#ec4899',
  '#14b8a6',
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    color: '#3b82f6',
    icon: 'folder',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategories();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      await createCategory(formData);

      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        color: '#3b82f6',
        icon: 'folder',
      });
      await fetchCategories();
      alert('Category created successfully!');
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!validateForm()) return;

    try {
      await updateCategory(id, formData);
      setEditingId(null);
      await fetchCategories();
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${name}"?\nThis will hide the category but keep existing projects.`,
      )
    ) {
      try {
        await deleteCategory(id);
        await fetchCategories();
        alert('Category deleted successfully!');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || '',
      color: category.color,
      icon: category.icon,
    });
    setErrors({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      icon: 'folder',
    });
    setErrors({});
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <AdminLayout
      title="Category Management"
      subtitle="Manage your project categories"
      action={
        <button
          onClick={() => setShowCreateForm(true)}
          disabled={showCreateForm}
          className="flex items-center gap-2 bg-gradient-to-r from-[#cb90cb] to-[#8b5a8b] disabled:from-gray-600 disabled:to-gray-700 text-white px-4 py-2 rounded-lg hover:from-[#d4a4d4] hover:to-[#9d6b9d] transition-all"
        >
          <Plus size={18} />
          New Category
        </button>
      }
    >
        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-[#2a1329] rounded-xl p-6 shadow-xl mb-8">
            <h2 className="text-white text-xl font-semibold mb-6">
              Create New Category
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={`w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-transparent focus:border-[#cb90cb]'
                  }`}
                  placeholder="Enter category name..."
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#cb90cb] transition-colors outline-none"
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          color,
                        }))
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color
                          ? 'border-white scale-110'
                          : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      icon: e.target.value,
                    }))
                  }
                  className="w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#cb90cb] transition-colors outline-none"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save size={18} />
                Create
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-[#2a1329] rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#472447]">
            <h2 className="text-white text-xl font-semibold">
              Categories ({categories.length})
            </h2>
          </div>

          <div className="divide-y divide-[#472447]">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                {editingId === category.id ? (
                  /* Edit Form */
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Category Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className={`w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                            errors.name
                              ? 'border-red-500'
                              : 'border-transparent focus:border-[#cb90cb]'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#cb90cb] transition-colors outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Color
                        </label>
                        <div className="flex gap-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  color,
                                }))
                              }
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                formData.color === color
                                  ? 'border-white scale-110'
                                  : 'border-gray-600'
                              }`}
                              style={{
                                backgroundColor: color,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Icon
                        </label>
                        <select
                          value={formData.icon}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              icon: e.target.value,
                            }))
                          }
                          className="w-full bg-[#472447] text-white px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#cb90cb] transition-colors outline-none"
                        >
                          {iconOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdate(category.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: category.color,
                        }}
                      />

                      <div>
                        <h3 className="text-white text-lg font-semibold">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-400 text-sm mt-1">
                            {category.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Icon: {category.icon}</span>
                          <span
                            className={
                              category.is_active
                                ? 'text-green-400'
                                : 'text-red-400'
                            }
                          >
                            {category.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        disabled={editingId !== null}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        disabled={editingId !== null}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </AdminLayout>
  );
}
