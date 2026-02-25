import { useState } from 'react';
import { Question } from '@/types/product';

interface ProductQnAProps {
    questions: Question[];
}

export default function ProductQnA({ questions }: ProductQnAProps) {
    const [questionsState, setQuestionsState] = useState(questions);
    const [showForm, setShowForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredQuestions = questionsState.filter(q =>
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answers.some(a => a.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handlePostQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        const question: Question = {
            id: Date.now(),
            productId: questions[0]?.productId || 0, // Fallback if list empty
            user: "You",
            text: newQuestion,
            date: new Date(),
            answers: []
        };

        setQuestionsState([question, ...questionsState]);
        setNewQuestion('');
        setShowForm(false);
        alert('Question posted successfully!');
    };

    return (
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Customer questions & answers</h2>

            {/* Search Bar */}
            <div className="relative max-w-xl mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring-blue-500 sm:text-sm transition-colors"
                    placeholder="Have a question? Search for answers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text)', borderColor: 'var(--card-border)' }}
                />
            </div>

            {/* Post Question Form */}
            {showForm ? (
                <form onSubmit={handlePostQuestion} className="mb-8 p-4 border rounded-lg" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                    <label className="block font-medium mb-2" style={{ color: 'var(--text)' }}>Your Question</label>
                    <textarea
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md mb-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your question here..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        required
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--card-border)' }}
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                        >
                            Post Question
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 border rounded-md hover:opacity-80 transition-opacity"
                            style={{ color: 'var(--text)', borderColor: 'var(--card-border)', backgroundColor: 'transparent' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : null}

            {/* Questions List */}
            <div className="space-y-6">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(q => (
                        <div key={q.id}>
                            <div className="flex gap-2 mb-2">
                                <span className="font-bold min-w-[80px]" style={{ color: 'var(--text)' }}>Question:</span>
                                <span className="font-medium hover:text-blue-600 cursor-pointer" style={{ color: 'var(--text)' }}>{q.text}</span>
                            </div>

                            {q.answers.map(answer => (
                                <div key={answer.id} className="flex gap-2">
                                    <span className="font-bold min-w-[80px]" style={{ color: 'var(--text)' }}>Answer:</span>
                                    <div>
                                        <span style={{ color: 'var(--text)' }}>{answer.text}</span>
                                        <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                            By {answer.user} on {answer.date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>
                        {searchQuery ? "No questions match your search." : "No questions yet. Be the first to ask!"}
                    </p>
                )}
            </div>

            {!showForm && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-sm font-medium hover:underline text-blue-600"
                    >
                        Don&apos;t see the answer you&apos;re looking for? Post your question
                    </button>
                </div>
            )}
        </div>
    );
}
