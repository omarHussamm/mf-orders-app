import type { Order } from '../types/index.js';

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerId: "cust-001",
    customerName: "John Smith",
    status: "delivered",
    items: [
      {
        productId: "1",
        productName: "Wireless Bluetooth Headphones",
        quantity: 1,
        price: 299.99
      },
      {
        productId: "6",
        productName: "Smart Watch Series 5", 
        quantity: 1,
        price: 249.99
      }
    ],
    total: 549.98,
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY", 
      zipCode: "10001",
      country: "USA"
    },
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-25T16:45:00Z"
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002", 
    customerId: "cust-002",
    customerName: "Sarah Johnson",
    status: "processing",
    items: [
      {
        productId: "3",
        productName: "Ergonomic Office Chair",
        quantity: 1,
        price: 399.99
      }
    ],
    total: 399.99,
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210", 
      country: "USA"
    },
    createdAt: "2024-01-22T14:15:00Z",
    updatedAt: "2024-01-23T09:30:00Z"
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerId: "cust-003", 
    customerName: "Mike Davis",
    status: "shipped",
    items: [
      {
        productId: "2",
        productName: "Gaming Mechanical Keyboard",
        quantity: 2,
        price: 159.99
      },
      {
        productId: "4",
        productName: "Stainless Steel Water Bottle",
        quantity: 3,
        price: 34.99
      }
    ],
    total: 424.95,
    shippingAddress: {
      street: "789 Pine Road",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    createdAt: "2024-01-18T11:20:00Z",
    updatedAt: "2024-01-24T13:15:00Z"
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customerId: "cust-004",
    customerName: "Emily Brown",
    status: "pending",
    items: [
      {
        productId: "5",
        productName: "Yoga Mat Premium",
        quantity: 1,
        price: 79.99
      }
    ],
    total: 79.99,
    shippingAddress: {
      street: "321 Elm Street", 
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA"
    },
    createdAt: "2024-01-25T16:30:00Z",
    updatedAt: "2024-01-25T16:30:00Z"
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    customerId: "cust-005",
    customerName: "David Wilson",
    status: "cancelled",
    items: [
      {
        productId: "7",
        productName: "Coffee Grinder Manual",
        quantity: 1,
        price: 89.99
      }
    ],
    total: 89.99,
    shippingAddress: {
      street: "654 Maple Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    createdAt: "2024-01-15T09:45:00Z",
    updatedAt: "2024-01-16T14:20:00Z"
  },
  {
    id: "6",
    orderNumber: "ORD-2024-006",
    customerId: "cust-006",
    customerName: "Lisa Anderson",
    status: "processing",
    items: [
      {
        productId: "1",
        productName: "Wireless Bluetooth Headphones",
        quantity: 2,
        price: 299.99
      }
    ],
    total: 599.98,
    shippingAddress: {
      street: "987 Cedar Lane",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    createdAt: "2024-01-26T10:15:00Z",
    updatedAt: "2024-01-26T10:15:00Z"
  }
];

export const mockCustomers = [
  { id: "cust-001", name: "John Smith", email: "john@email.com" },
  { id: "cust-002", name: "Sarah Johnson", email: "sarah@email.com" },
  { id: "cust-003", name: "Mike Davis", email: "mike@email.com" },
  { id: "cust-004", name: "Emily Brown", email: "emily@email.com" },
  { id: "cust-005", name: "David Wilson", email: "david@email.com" },
  { id: "cust-006", name: "Lisa Anderson", email: "lisa@email.com" },
];

export const mockProducts = [
  { id: "1", name: "Wireless Bluetooth Headphones", price: 299.99 },
  { id: "2", name: "Gaming Mechanical Keyboard", price: 159.99 },
  { id: "3", name: "Ergonomic Office Chair", price: 399.99 },
  { id: "4", name: "Stainless Steel Water Bottle", price: 34.99 },
  { id: "5", name: "Yoga Mat Premium", price: 79.99 },
  { id: "6", name: "Smart Watch Series 5", price: 249.99 },
  { id: "7", name: "Coffee Grinder Manual", price: 89.99 },
];
