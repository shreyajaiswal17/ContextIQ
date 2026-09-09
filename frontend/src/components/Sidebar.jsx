import React, { useState } from 'react';

const DSA_TOPICS = [
  {
    title: "Arrays & Hashing",
    suggestions: [
      "Kadane's Algorithm for Maximum Subarray Sum with intuition and code",
      "Two Sum problem in O(N) time using Hashing",
      "Dutch National Flag algorithm (Sort 0s, 1s, and 2s)"
    ]
  },
  {
    title: "Binary Search",
    suggestions: [
      "Binary Search on a Rotated Sorted Array with edge cases",
      "Binary Search on Answer Space (Book Allocation problem)",
      "Search in a 2D sorted matrix"
    ]
  },
  {
    title: "Sorting Algorithms",
    suggestions: [
      "QuickSort vs MergeSort: time complexity and partition logic",
      "MergeSort recursively on linked lists vs arrays",
      "Worst-case scenario for QuickSort and how to avoid it"
    ]
  },
  {
    title: "Two Pointers & Sliding Window",
    suggestions: [
      "Longest Substring Without Repeating Characters using Sliding Window",
      "Two Pointer approach for the 3-Sum problem",
      "Minimum Window Substring optimal approach"
    ]
  },
  {
    title: "Strings & Pattern Matching",
    suggestions: [
      "Check if two strings are valid Anagrams in O(N) time",
      "KMP (Knuth-Morris-Pratt) algorithm and the LPS array",
      "Longest Palindromic Substring"
    ]
  },
  {
    title: "Linked Lists",
    suggestions: [
      "Reverse a Singly Linked List iteratively and recursively",
      "Floyd's Cycle Detection algorithm to detect loops in a linked list",
      "Design an LRU Cache using Doubly Linked List and Hash Map"
    ]
  },
  {
    title: "Stacks & Queues",
    suggestions: [
      "Monotonic Stack pattern for Next Greater Element",
      "Trapping Rainwater using two pointers or stack",
      "Implement a Queue using two Stacks"
    ]
  },
  {
    title: "Recursion & Backtracking",
    suggestions: [
      "Backtracking solution for the N-Queens problem",
      "Combination Sum using recursion",
      "Sudoku Solver algorithm using backtracking"
    ]
  },
  {
    title: "Binary Trees",
    suggestions: [
      "Inorder, Preorder, Postorder, and Level-Order traversals",
      "Lowest Common Ancestor (LCA) in a Binary Tree",
      "Diameter and Maximum Depth of a Binary Tree"
    ]
  },
  {
    title: "Binary Search Trees (BST)",
    suggestions: [
      "Validate if a Binary Tree is a valid BST",
      "Insertion and deletion operations in a Binary Search Tree",
      "Floor and Ceil values in a BST"
    ]
  },
  {
    title: "AVL Trees & Balance",
    suggestions: [
      "The 4 AVL tree rotation cases: LL, RR, LR, and RL",
      "How AVL trees maintain O(log N) height balance",
      "Compare AVL trees with Red-Black trees"
    ]
  },
  {
    title: "Heaps & Priority Queues",
    suggestions: [
      "Find Kth Largest Element in an array using Min-Heap",
      "Find Median in a running data stream using two heaps",
      "Heapify algorithm and its O(N) time complexity"
    ]
  },
  {
    title: "Greedy Algorithms",
    suggestions: [
      "N Meetings in One Room problem and finish time sorting",
      "Jump Game I and II greedy approach",
      "Fractional Knapsack problem approach"
    ]
  },
  {
    title: "Graph Algorithms",
    suggestions: [
      "BFS and DFS graph traversals and cycle detection",
      "Dijkstra's algorithm for single-source shortest paths",
      "Topological Sort using Kahn's algorithm (indegrees)"
    ]
  },
  {
    title: "Disjoint Set (Union-Find) & MST",
    suggestions: [
      "Disjoint Set Union (DSU) with Path Compression and Union by Rank",
      "Kruskal's algorithm to find Minimum Spanning Tree (MST)",
      "Prim's algorithm for Minimum Spanning Tree"
    ]
  },
  {
    title: "Dynamic Programming",
    suggestions: [
      "0/1 Knapsack: Recursive vs Memoization vs Tabulation",
      "Longest Common Subsequence (LCS) with 2D DP",
      "Coin Change problem: Minimum coins to make amount"
    ]
  },
  {
    title: "Bit Manipulation",
    suggestions: [
      "Find the single non-repeating number using XOR",
      "Check if a number is a power of 2 using bitwise AND",
      "Count set bits (Hamming weight) efficiently"
    ]
  },
  {
    title: "Tries (Prefix Trees)",
    suggestions: [
      "Implement a Trie with Insert, Search, and startsWith",
      "Find Maximum XOR of Two Numbers using Trie",
      "Autocomplete implementation using Trie"
    ]
  },
  {
    title: "Time & Space Complexity",
    suggestions: [
      "Big-O, Big-Theta, and Big-Omega practical examples",
      "Master's Theorem for divide-and-conquer recurrences",
      "Time and space trade-offs in recursive vs iterative algorithms"
    ]
  }
];

export default function Sidebar({ 
  isOpen, 
  onClose, 
  onSelectTopic, 
  messageCount 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = DSA_TOPICS.filter((t) => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 
          flex flex-col justify-between transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Topics
            </span>

            <button 
              onClick={onClose}
              className="px-2 py-0.5 text-xs text-slate-400 hover:text-white md:hidden"
            >
              Close
            </button>
          </div>

          {/* Quick Search */}
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>

          {/* Clean Topic List */}
          <div className="space-y-0.5">
            {filteredTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelectTopic(topic);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded text-slate-300 hover:text-white hover:bg-slate-800/90 transition-colors text-xs font-medium block truncate"
              >
                {topic.title}
              </button>
            ))}

            {filteredTopics.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-500">
                No topics found
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 text-xs text-slate-500 flex items-center justify-between">
          <span>ContextIQ</span>
          <span>{messageCount} message{messageCount === 1 ? '' : 's'}</span>
        </div>
      </aside>
    </>
  );
}
