import React, { useState } from 'react';

const CategoriesList = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Musical', image: 'https://image.freepik.com/free-vector/music-event-banner-template-with-photo_52683-13693.jpg' },
        { id: 2, name: 'Science', image: 'https://image.freepik.com/free-vector/music-event-banner-template-with-photo_52683-13693.jpg' },
        { id: 3, name: 'Arts', image: 'https://image.freepik.com/free-vector/music-event-banner-template-with-photo_52683-13693.jpg' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: '', name: '', image: '' });

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategories(categories.map(cat => (cat.id === currentCategory.id ? currentCategory : cat)));
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-6 bg-background">
            <h2 className="text-2xl font-bold mb-4 text-primary">Categories List</h2>
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead>
                    <tr className="bg-secondary text-white">
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Image</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} className="border-b border-border">
                            <td className="py-3 px-4">{category.id}</td>
                            <td className="py-3 px-4">
                                <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="py-3 px-4">{category.name}</td>
                            <td className="py-3 px-4 text-center">
                                <button onClick={() => handleEdit(category)} className="text-accent hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
</svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4 text-primary">Edit Category</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700">Category Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentCategory.name}
                                    onChange={handleChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold text-gray-700">Category Image URL:</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={currentCategory.image}
                                    onChange={handleChange}
                                    className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter image URL"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesList;
