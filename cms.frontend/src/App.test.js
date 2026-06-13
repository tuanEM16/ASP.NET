import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./features/products/services/productService', () => ({
  __esModule: true,
  default: {
    getAllProducts: jest.fn(() => Promise.resolve([])),
    getProductById: jest.fn(() => Promise.resolve(null))
  }
}));

jest.mock('./features/products/services/categoryProductService', () => ({
  __esModule: true,
  default: {
    getAllCategoryProducts: jest.fn(() => Promise.resolve([]))
  }
}));

jest.mock('./features/posts/services/postService', () => ({
  __esModule: true,
  default: {
    getBlogCategories: jest.fn(() => Promise.resolve([])),
    getAllPosts: jest.fn(() => Promise.resolve([])),
    getPostsByCategory: jest.fn(() => Promise.resolve([])),
    getPostById: jest.fn(() => Promise.resolve(null))
  }
}));

test('renders EmCMS Fashion home page', async () => {
  render(<App />);
  expect(screen.getAllByText(/EmCMS\.Fashion/i).length).toBeGreaterThan(0);

  await waitFor(() => {
    expect(screen.queryByText(/Đang tải/i)).not.toBeInTheDocument();
  });
});
