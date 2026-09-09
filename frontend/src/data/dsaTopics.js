export const DSA_CATEGORIES = [
  "Data Structures",
  "Algorithms & Searching",
  "Trees & Graphs",
  "Advanced Concepts"
];

export const DSA_TOPICS = [
  // Data Structures
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    category: "Data Structures",
    desc: "Ask about array operations, hashing, frequency maps, prefix sums, and common algorithmic concepts.",
    tags: ["Arrays", "HashMaps", "PrefixSums"],
    suggestions: [
      "Explain Kadane's algorithm for maximum subarray sum.",
      "How does Two Sum work with a Hash Map in O(N) time?",
      "What is the Dutch National Flag problem and its three-way partition?"
    ]
  },
  {
    id: "strings",
    title: "Strings",
    category: "Data Structures",
    desc: "Ask about string manipulation, pattern matching, palindromes, and sliding window string algorithms.",
    tags: ["Strings", "PatternMatching", "SlidingWindow"],
    suggestions: [
      "How does the KMP algorithm find substring matches in O(N + M)?",
      "Explain how to check if two strings are valid anagrams.",
      "How do you find the longest palindromic substring?"
    ]
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    category: "Data Structures",
    desc: "Ask about singly and doubly linked lists, pointer manipulation, cycle detection, and list reversals.",
    tags: ["Pointers", "CycleDetection", "Lists"],
    suggestions: [
      "How does Floyd's cycle detection algorithm work in linked lists?",
      "How do you reverse a singly linked list iteratively and recursively?",
      "How can you implement an LRU cache with a doubly linked list?"
    ]
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    category: "Data Structures",
    desc: "Ask about LIFO/FIFO mechanics, monotonic stacks, queue implementations, and expression parsing.",
    tags: ["MonotonicStack", "LIFO", "Queues"],
    suggestions: [
      "What is a monotonic stack and when should it be used?",
      "How do you solve the Next Greater Element problem using a stack?",
      "How do you implement a queue using two stacks?"
    ]
  },
  {
    id: "heaps",
    title: "Heaps",
    category: "Data Structures",
    desc: "Ask about min/max heaps, priority queue operations, top-K elements, and heap sort.",
    tags: ["PriorityQueue", "BinaryHeap", "TopK"],
    suggestions: [
      "How does a binary min-heap maintain its heap property?",
      "Why is building a binary heap (heapify) an O(N) operation?",
      "How do you find the Kth largest element using a min-heap?"
    ]
  },

  // Algorithms & Searching
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Algorithms & Searching",
    desc: "Ask about search in sorted arrays, rotated arrays, lower/upper bounds, and search-on-answer space.",
    tags: ["BinarySearch", "Logarithmic", "SortedArrays"],
    suggestions: [
      "How does binary search work on a rotated sorted array?",
      "Explain the binary search on answer space concept.",
      "How do you find lower bound and upper bound using binary search?"
    ]
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    category: "Algorithms & Searching",
    desc: "Ask about comparison sorts, divide-and-conquer, partition mechanisms, stability, and runtimes.",
    tags: ["MergeSort", "QuickSort", "Stability"],
    suggestions: [
      "What is the time complexity of merge sort and why is it O(N log N)?",
      "Compare QuickSort vs MergeSort in terms of space and stability.",
      "What is the worst-case scenario for QuickSort and how to avoid it?"
    ]
  },
  {
    id: "recursion",
    title: "Recursion & Backtracking",
    category: "Algorithms & Searching",
    desc: "Ask about recursive call trees, state pruning, backtracking search, and combinatorial generation.",
    tags: ["Backtracking", "CallStack", "Recursion"],
    suggestions: [
      "How does backtracking work in the N-Queens problem?",
      "Explain the difference between simple recursion and backtracking.",
      "How do you generate all permutations of an array using recursion?"
    ]
  },

  // Trees & Graphs
  {
    id: "trees",
    title: "Trees",
    category: "Trees & Graphs",
    desc: "Explore binary trees, BST operations, traversals, balancing, and related algorithms.",
    tags: ["BinaryTree", "BST", "Traversals"],
    suggestions: [
      "What is a Binary Search Tree and how does insertion work?",
      "Explain Inorder, Preorder, and Postorder tree traversals.",
      "How do you find the Lowest Common Ancestor (LCA) in a binary tree?"
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    category: "Trees & Graphs",
    desc: "Ask about BFS, DFS, shortest paths, spanning trees, and graph representations.",
    tags: ["BFS", "DFS", "Dijkstra", "ShortestPath"],
    suggestions: [
      "Explain the difference between BFS and DFS.",
      "How does Dijkstra's algorithm find the shortest path?",
      "How does topological sort work using Kahn's algorithm?"
    ]
  },

  // Advanced Concepts
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Advanced Concepts",
    desc: "Understand states, transitions, memoization, tabulation, and common DP patterns.",
    tags: ["Memoization", "Tabulation", "OptimalSubstructure"],
    suggestions: [
      "Explain the difference between top-down memoization and bottom-up tabulation.",
      "How do you define states and transitions in the 0/1 Knapsack problem?",
      "How does the Longest Common Subsequence (LCS) problem use 2D DP?"
    ]
  },
  {
    id: "complexity",
    title: "Time & Space Complexity",
    category: "Advanced Concepts",
    desc: "Ask about asymptotic notation, recurrence relations, Master's Theorem, and complexity trade-offs.",
    tags: ["BigO", "Recurrence", "SpaceComplexity"],
    suggestions: [
      "What is the difference between Big-O, Big-Theta, and Big-Omega?",
      "How do you apply Master's Theorem to divide-and-conquer recurrences?",
      "What is auxiliary space vs total space complexity?"
    ]
  }
];
