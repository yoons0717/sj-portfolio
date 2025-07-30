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
import { Button, Input, Select, ColorPicker } from '@/components/ui';

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
          className="gaming-button flex items-center gap-2 disabled:opacity-50"
        >
          <Plus size={18} />
          NEW CATEGORY
        </button>
      }
    >
        {/* Create Form */}
        {showCreateForm && (
          <div className="gaming-card mb-8">
            <h2 className="gaming-title text-xl mb-6">
              CREATE NEW CATEGORY
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Category Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                error={errors.name}
                placeholder="Enter category name..."
              />

              <Input
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description..."
              />

              <ColorPicker
                label="Color"
                value={formData.color}
                onChange={(color) =>
                  setFormData((prev) => ({
                    ...prev,
                    color,
                  }))
                }
                colors={colorOptions}
              />

              <Select
                label="Icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    icon: e.target.value,
                  }))
                }
                options={iconOptions}
                placeholder="Select an icon..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={cancelEdit}
                className="bg-surface-elevated text-accent border-2 border-accent px-6 py-3 font-bold tracking-wider hover:bg-accent hover:text-surface transition-all duration-300 flex items-center gap-2"
              >
                <X size={18} />
                CANCEL
              </button>
              <button
                onClick={handleCreate}
                className="gaming-button flex items-center gap-2"
              >
                <Save size={18} />
                CREATE
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="gaming-card overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-accent">
            <h2 className="gaming-title text-xl">
              CATEGORIES ({categories.length})
            </h2>
          </div>

          <div className="divide-y divide-input">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                {editingId === category.id ? (
                  /* Edit Form */
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <Input
                        label="Category Name *"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        error={errors.name}
                      />

                      <Input
                        label="Description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />

                      <ColorPicker
                        label="Color"
                        value={formData.color}
                        onChange={(color) =>
                          setFormData((prev) => ({
                            ...prev,
                            color,
                          }))
                        }
                        colors={colorOptions}
                      />

                      <Select
                        label="Icon"
                        value={formData.icon}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            icon: e.target.value,
                          }))
                        }
                        options={iconOptions}
                        placeholder="Select an icon..."
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        onClick={cancelEdit}
                        variant="secondary"
                        icon={<X size={18} />}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleUpdate(category.id)}
                        variant="success"
                        icon={<Save size={18} />}
                      >
                        Save Changes
                      </Button>
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
                      <Button
                        onClick={() => startEdit(category)}
                        disabled={editingId !== null}
                        variant="secondary"
                        size="sm"
                        icon={<Edit size={16} />}
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => handleDelete(category.id, category.name)}
                        disabled={editingId !== null}
                        variant="danger"
                        size="sm"
                        icon={<Trash2 size={16} />}
                      >
                        Delete
                      </Button>
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
