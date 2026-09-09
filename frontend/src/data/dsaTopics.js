export const DSA_CATEGORIES = [
  "Core Data Structures",
  "Algorithms & Searching",
  "Trees & Graphs",
  "Advanced & Optimization"
];

export const DSA_TOPICS = [
  // Core Data Structures
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    category: "Core Data Structures",
    desc: "Two Sum, Kadane's algorithm, Dutch National Flag, and hash table amortized O(1) lookups.",
    tags: ["Hash Map", "Prefix Sum", "Frequency Count"],
    suggestions: [
      "Kadane's Algorithm for Maximum Subarray Sum with intuition and code",
      "Two Sum problem in O(N) time using Hashing",
      "Dutch National Flag algorithm (Sort 0s, 1s, and 2s)"
    ]
  },
  {
    id: "strings-pattern-matching",
    title: "Strings & Pattern Matching",
    category: "Core Data Structures",
    desc: "Anagrams, palindromes, sliding window frequency matches, and KMP pattern search.",
    tags: ["KMP Algorithm", "Sliding Window", "Rolling Hash"],
    suggestions: [
      "Check if two strings are valid Anagrams in O(N) time",
      "KMP (Knuth-Morris-Pratt) algorithm and the LPS array",
      "Longest Palindromic Substring optimal dynamic programming approach"
    ]
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    category: "Core Data Structures",
    desc: "Single/doubly linked list reversals, cycle detection, fast-slow pointers, and LRU cache.",
    tags: ["Fast-Slow Pointers", "Reversal", "LRU Cache"],
    suggestions: [
      "Reverse a Singly Linked List iteratively and recursively",
      "Floyd's Cycle Detection algorithm to detect loops in a linked list",
      "Design an LRU Cache using Doubly Linked List and Hash Map"
    ]
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    category: "Core Data Structures",
    desc: "Monotonic stacks, next greater elements, queue with stacks, and trapping rainwater.",
    tags: ["Monotonic Stack", "LIFO / FIFO", "Next Greater Element"],
    suggestions: [
      "Monotonic Stack pattern for Next Greater Element",
      "Trapping Rainwater using two pointers or monotonic stack",
      "Implement a Queue using two Stacks"
    ]
  },
  {
    id: "heaps-priority-queues",
    title: "Heaps & Priority Queues",
    category: "Core Data Structures",
    desc: "Min-heap, max-heap, top K frequent elements, running median, and O(N) heapify.",
    tags: ["Min/Max Heap", "Top-K", "Running Median"],
    suggestions: [
      "Find Kth Largest Element in an array using Min-Heap",
      "Find Median in a running data stream using two heaps",
      "Heapify algorithm and its O(N) time complexity proof"
    ]
  },
  {
    id: "tries-prefix-trees",
    title: "Tries (Prefix Trees)",
    category: "Core Data Structures",
    desc: "Prefix lookups, word dictionaries, autocomplete engines, and bitwise XOR tries.",
    tags: ["Prefix Search", "Bitwise Trie", "Autocomplete"],
    suggestions: [
      "Implement a Trie with Insert, Search, and startsWith methods",
      "Find Maximum XOR of Two Numbers in an array using Trie",
      "Autocomplete and dictionary prefix matching with Trie"
    ]
  },

  // Algorithms & Searching
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Algorithms & Searching",
    desc: "Lower/upper bounds, search in rotated sorted arrays, and search on answer space.",
    tags: ["Answer Space", "Rotated Arrays", "O(log N)"],
    suggestions: [
      "Binary Search on a Rotated Sorted Array with edge cases",
      "Binary Search on Answer Space (Book Allocation problem)",
      "Search in a 2D sorted matrix in O(log(M*N)) time"
    ]
  },
  {
    id: "two-pointers-sliding-window",
    title: "Two Pointers & Sliding Window",
    category: "Algorithms & Searching",
    desc: "Opposite ends, fast/slow runners, fixed and variable-sized sliding windows.",
    tags: ["Subarrays", "3-Sum", "Variable Window"],
    suggestions: [
      "Longest Substring Without Repeating Characters using Sliding Window",
      "Two Pointer approach for the 3-Sum problem",
      "Minimum Window Substring optimal two-pointer approach"
    ]
  },
  {
    id: "sorting-algorithms",
    title: "Sorting Algorithms",
    category: "Algorithms & Searching",
    desc: "QuickSort partition logic, MergeSort divide-and-conquer, stability, and worst cases.",
    tags: ["QuickSort", "MergeSort", "Stability"],
    suggestions: [
      "QuickSort vs MergeSort: time complexity and partition logic",
      "MergeSort recursively on linked lists vs arrays",
      "Worst-case scenario for QuickSort and randomized pivoting"
    ]
  },
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    category: "Algorithms & Searching",
    desc: "Permutations, subsets, combination sum, N-Queens, and state pruning.",
    tags: ["State Space Tree", "Pruning", "N-Queens"],
    suggestions: [
      "Backtracking solution for the N-Queens problem",
      "Combination Sum using recursion and branch pruning",
      "Sudoku Solver algorithm using recursive backtracking"
    ]
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Algorithms",
    category: "Algorithms & Searching",
    desc: "Interval scheduling, jump game, fractional knapsack, and greedy choice proofs.",
    tags: ["Intervals", "Jump Game", "Optimal Substructure"],
    suggestions: [
      "N Meetings in One Room problem and finish-time sorting",
      "Jump Game I and II greedy approach",
      "Fractional Knapsack problem and greedy choice property"
    ]
  },

  // Trees & Graphs
  {
    id: "binary-trees",
    title: "Binary Trees",
    category: "Trees & Graphs",
    desc: "DFS traversals, level-order BFS, lowest common ancestor (LCA), and tree diameter.",
    tags: ["Traversals", "LCA", "Diameter"],
    suggestions: [
      "Inorder, Preorder, Postorder, and Level-Order traversals",
      "Lowest Common Ancestor (LCA) in a Binary Tree",
      "Diameter and Maximum Depth of a Binary Tree"
    ]
  },
  {
    id: "binary-search-trees",
    title: "Binary Search Trees (BST)",
    category: "Trees & Graphs",
    desc: "BST property, search, insert, delete, BST validation, and inorder successor.",
    tags: ["Validation", "Successor", "Floor/Ceil"],
    suggestions: [
      "Validate if a Binary Tree is a valid BST",
      "Insertion and deletion operations in a Binary Search Tree",
      "Floor and Ceil values in a BST"
    ]
  },
  {
    id: "avl-trees",
    title: "AVL Trees & Balance",
    category: "Trees & Graphs",
    desc: "Self-balancing binary trees, balance factor, LL/RR/LR/RL rotations, and Red-Black trees.",
    tags: ["Rotations", "Balance Factor", "O(log N) Guarantee"],
    suggestions: [
      "The 4 AVL tree rotation cases: LL, RR, LR, and RL",
      "How AVL trees maintain strict O(log N) height balance",
      "Compare AVL trees with Red-Black trees"
    ]
  },
  {
    id: "graph-algorithms",
    title: "Graph Algorithms",
    category: "Trees & Graphs",
    desc: "BFS/DFS, cycle detection in directed/undirected graphs, Dijkstra, and Topological Sort.",
    tags: ["Dijkstra", "Topological Sort", "Cycle Detection"],
    suggestions: [
      "BFS and DFS graph traversals and cycle detection",
      "Dijkstra's algorithm for single-source shortest paths",
      "Topological Sort using Kahn's algorithm (indegrees)"
    ]
  },
  {
    id: "disjoint-set-mst",
    title: "Disjoint Set (Union-Find) & MST",
    category: "Trees & Graphs",
    desc: "Union by rank, path compression, Kruskal's MST, Prim's algorithm, and connected components.",
    tags: ["Path Compression", "Kruskal MST", "Prim MST"],
    suggestions: [
      "Disjoint Set Union (DSU) with Path Compression and Union by Rank",
      "Kruskal's algorithm to find Minimum Spanning Tree (MST)",
      "Prim's algorithm for Minimum Spanning Tree"
    ]
  },

  // Advanced & Optimization
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Advanced & Optimization",
    desc: "Memoization, tabulation, 0/1 knapsack, LCS, LIS, grid DP, and space reduction.",
    tags: ["Knapsack", "LCS / LIS", "Space Optimization"],
    suggestions: [
      "0/1 Knapsack: Recursive vs Memoization vs Tabulation",
      "Longest Common Subsequence (LCS) with 2D DP and state transition",
      "Coin Change problem: Minimum coins to make amount"
    ]
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    category: "Advanced & Optimization",
    desc: "Bitwise XOR, AND, OR, bit masks, power of 2 check, and Hamming weight.",
    tags: ["XOR Tricks", "Bitmasks", "Hamming Weight"],
    suggestions: [
      "Find the single non-repeating number using XOR",
      "Check if a number is a power of 2 using bitwise AND",
      "Count set bits (Hamming weight) efficiently"
    ]
  },
  {
    id: "complexity-analysis",
    title: "Time & Space Complexity",
    category: "Advanced & Optimization",
    desc: "Big-O, Big-Theta, Big-Omega, Master's Theorem for divide-and-conquer, and amortized bounds.",
    tags: ["Big-O", "Master's Theorem", "Amortized Analysis"],
    suggestions: [
      "Big-O, Big-Theta, and Big-Omega practical comparison",
      "Master's Theorem for divide-and-conquer recurrences",
      "Time and space trade-offs in recursive vs iterative algorithms"
    ]
  }
];
