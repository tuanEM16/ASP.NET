import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./services/productService', () => ({
  __esModule: true,
  default: {
    getAllProducts: jest.fn(() => Promise.resolve([])),
    getLatestProducts: jest.fn(() => Promise.resolve([])),
    getHotProducts: jest.fn(() => Promise.resolve([])),
    getPriceRange: jest.fn(() => Promise.resolve({ minPrice: 0, maxPrice: 0 })),
    searchProducts: jest.fn(() => Promise.resolve([])),
    filterProducts: jest.fn(() => Promise.resolve([])),
    getProductById: jest.fn(() => Promise.resolve(null))
  }
}));

jest.mock('./services/categoryProductService', () => ({
  __esModule: true,
  default: {
    getAllCategoryProducts: jest.fn(() => Promise.resolve([]))
  }
}));

jest.mock('./services/postService', () => ({
  __esModule: true,
  default: {
    getBlogCategories: jest.fn(() => Promise.resolve([])),
    getAllPosts: jest.fn(() => Promise.resolve([])),
    getPostsByCategory: jest.fn(() => Promise.resolve([])),
    getPostById: jest.fn(() => Promise.resolve(null))
  }
}));

test('renders EyeStyle Store home page', async () => {
  render(<App />);
  expect(screen.getAllByText(/EyeStyle\.Store/i).length).toBeGreaterThan(0);

  await waitFor(() => {
    expect(screen.queryByText(/Đang tải/i)).not.toBeInTheDocument();
  });
});
