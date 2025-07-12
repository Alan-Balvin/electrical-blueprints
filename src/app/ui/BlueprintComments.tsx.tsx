'use client';

import React, { useEffect, useState, useCallback } from 'react';



type Comment = {
  message: string;
  createdAt: string;
};

export default function BlueprintComments({ blueprint }: { blueprint: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch('/api/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blueprint }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
      } else {
        console.error('Error fetching comments:', data.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [blueprint]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blueprint, message: newComment.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewComment('');
        fetchComments();
      } else {
        console.error('Error posting comment:', data.error);
      }
    } catch (err) {
      console.error('Post error:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Comments for {blueprint}</h2>

      <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="border-b pb-2">
              <p>{c.message}</p>
              <small className="text-gray-400">{new Date(c.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>

      <textarea
        placeholder="Write your comment..."
        className="w-full p-3 border rounded shadow"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button
        onClick={handleCommentSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Comment
      </button>
    </div>
  );
}
