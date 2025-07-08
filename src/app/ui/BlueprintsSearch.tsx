'use client';

import React, { useState, useEffect, useCallback } from 'react';
import blueprintNames from '@/data/blueprints.json';
import { getComments, postComment } from '@/lib/dynamoClient';

type Comment = {
  message: string;
  createdAt: string;
};

const S3_FOLDER = process.env.NEXT_PUBLIC_S3_FOLDER || '';

export default function BlueprintSearch() {
  const [search, setSearch] = useState('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const filteredBlueprints = (blueprintNames as string[]).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchComments = useCallback(async () => {
    if (!selectedBlueprint) return;
    const result = await getComments(selectedBlueprint);
    setComments(result as Comment[]);
  }, [selectedBlueprint]);

  useEffect(() => {
    if (selectedBlueprint) fetchComments();
  }, [selectedBlueprint, fetchComments]);

  const handleCommentSubmit = async () => {
    if (!selectedBlueprint || !newComment.trim()) return;
    await postComment(selectedBlueprint, newComment.trim());
    setNewComment('');
    fetchComments();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* BÚSQUEDA */}
      <input
        type="text"
        placeholder="Search plan..."
        className="w-full mb-4 p-3 border rounded shadow focus:outline-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LISTADO */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBlueprints.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedBlueprint(name)}
            className={`p-4 bg-white shadow rounded-xl hover:bg-blue-50 transition truncate ${
              selectedBlueprint === name ? 'border-2 border-blue-500' : ''
            }`}
            title={name}
          >
            {name}
          </button>
        ))}
      </div>

      {/* VISOR Y COMENTARIOS */}
      {selectedBlueprint && (
        <div className="mt-10 space-y-6">
          {/* Visor */}
          <iframe
            src={`${S3_FOLDER}/${selectedBlueprint}`}
            title={selectedBlueprint}
            className="w-full h-[600px] border rounded-xl"
          />

          {/* Comentarios */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Comments for {selectedBlueprint}</h2>

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
        </div>
      )}
    </div>
  );
}
