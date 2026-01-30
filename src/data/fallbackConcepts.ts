import { Concept } from '@/lib/api';

export const FALLBACK_CONCEPTS: Concept[] = [
  {
    id: 999,
    title: "The James Webb Space Telescope",
    description: "The most powerful space telescope ever built, designed to solve mysteries in our solar system, look beyond to distant worlds around other stars, and probe the mysterious structures and origins of our universe.",
    example_image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800",
    category: "Science",
    difficulty: "Intermediate",
    created_at: new Date().toISOString()
  },
  {
    id: 998,
    title: "The Silk Road",
    description: "A network of Eurasian trade routes active from the 2nd century BCE until the mid-15th century. Spanning over 6,400 kilometers, it played a central role in facilitating economic, cultural, political, and religious interactions.",
    example_image: "https://images.unsplash.com/photo-1523805081446-ed9a7bb8999a?auto=format&fit=crop&q=80&w=800",
    category: "History",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 997,
    title: "Neural Networks",
    description: "A method in artificial intelligence that teaches computers to process data in a way that is inspired by the human brain. It is a type of machine learning process, called deep learning, that uses interconnected nodes or neurons in a layered structure.",
    example_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "Computer Science",
    difficulty: "Advanced",
    created_at: new Date().toISOString()
  },
  {
    id: 996,
    title: "The Fibonacci Sequence",
    description: "A series of numbers in which each number is the sum of the two preceding ones. Often found in nature, such as the arrangement of leaves on a stem or the fruit sprouts of a pineapple.",
    example_image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
    category: "Maths",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 995,
    title: "Photosynthesis",
    description: "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments. It involves the consumption of carbon dioxide and water to produce glucose and oxygen.",
    example_image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
    category: "Biology",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 994,
    title: "The Great Wall of China",
    description: "A series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups from the Eurasian Steppe.",
    example_image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=800",
    category: "History",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 993,
    title: "Black Holes",
    description: "A region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it.",
    example_image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800",
    category: "Physics",
    difficulty: "Advanced",
    created_at: new Date().toISOString()
  }
];