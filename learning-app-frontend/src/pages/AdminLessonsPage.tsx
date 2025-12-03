import { useEffect, useState } from "react";
import api from "../api";

type QuestionForm = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

type Lesson = {
  _id: string;
  title: string;
  description?: string;
  level: string;
};

const emptyQuestion = (): QuestionForm => ({
  prompt: "",
  options: ["", "", "", ""],
  correctIndex: 0,
});

const AdminLessonsPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner"
  );
  const [questions, setQuestions] = useState<QuestionForm[]>([emptyQuestion()]);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await api.get("/lessons");
    setLessons(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateQuestionPrompt = (index: number, value: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index].prompt = value;
      return copy;
    });
  };

  const updateQuestionOption = (
    qIndex: number,
    optIndex: number,
    value: string
  ) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].options[optIndex] = value;
      return copy;
    });
  };

  const updateQuestionCorrectIndex = (
    qIndex: number,
    correctIndex: number
  ) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].correctIndex = correctIndex;
      return copy;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  };

  const createLesson = async () => {
    try {
      const payload = {
        title,
        description,
        level,
        questions,
      };
      await api.post("/lessons", payload);
      setTitle("");
      setDescription("");
      setLevel("beginner");
      setQuestions([emptyQuestion()]);
      await load();
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Error creating lesson");
    }
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    await api.delete(`/lessons/${id}`);
    await load();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-green-500">
            Lesson Admin Panel
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage lessons and create new quizzes for learners.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1.8fr)]">
        {/* Existing lessons */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-100">
              Existing Lessons
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Click delete to remove a lesson permanently.
            </p>
            <div className="mt-4 space-y-3">
              {lessons.length === 0 && (
                <p className="text-sm text-slate-500">
                  No lessons yet. Create your first lesson on the right.
                </p>
              )}

              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="flex items-start justify-between rounded-xl border border-slate-700 bg-slate-800/80 p-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {lesson.title}
                    </h3>
                    {lesson.description && (
                      <p className="text-xs text-slate-400">
                        {lesson.description}
                      </p>
                    )}
                    <span className="inline-flex rounded-full bg-slate-700/80 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-200">
                      Level: {lesson.level}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteLesson(lesson._id)}
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Create/edit lesson */}
        <section>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">
                Create New Lesson
              </h2>
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                Admin Tool
              </span>
            </div>

            {error && (
              <p className="mt-3 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            <div className="mt-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Lesson title
                </label>
                <input
                  className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  placeholder="Basics of English greetings"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  placeholder="Short summary of what this lesson will teach."
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Level
                </label>
                <select
                  value={level}
                  onChange={(e) =>
                    setLevel(
                      e.target.value as
                        | "beginner"
                        | "intermediate"
                        | "advanced"
                    )
                  }
                  className="mt-1 block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Questions */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Questions
                  </h3>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition hover:border-indigo-500 hover:bg-slate-900/80"
                  >
                    + Add Question
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Each lesson works as a multiple-choice quiz. Mark one option as
                  the correct answer.
                </p>

                <div className="mt-3 space-y-4">
                  {questions.map((q, qi) => (
                    <div
                      key={qi}
                      className="rounded-xl border border-slate-700 bg-slate-900/80 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Question {qi + 1}
                        </span>
                      </div>

                      <input
                        className="mt-1 mb-3 block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                        placeholder={`Enter question ${qi + 1} prompt`}
                        value={q.prompt}
                        onChange={(e) =>
                          updateQuestionPrompt(qi, e.target.value)
                        }
                      />

                      <div className="space-y-2">
                        {q.options.map((opt, oi) => (
                          <div
                            key={oi}
                            className="flex items-center gap-3 rounded-lg bg-slate-950/60 p-2"
                          >
                            <input
                              className="block w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                              placeholder={`Option ${oi + 1}`}
                              value={opt}
                              onChange={(e) =>
                                updateQuestionOption(qi, oi, e.target.value)
                              }
                            />
                            <label className="flex items-center gap-1 text-xs text-slate-300">
                              <input
                                type="radio"
                                className="h-4 w-4 border-slate-500 text-indigo-500 focus:ring-indigo-500"
                                name={`correct-${qi}`}
                                checked={q.correctIndex === oi}
                                onChange={() =>
                                  updateQuestionCorrectIndex(qi, oi)
                                }
                              />
                              Correct
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={createLesson}
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Save Lesson
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLessonsPage;
