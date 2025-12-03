import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

type Lesson = {
  _id: string;
  title: string;
  description?: string;
  level: string;
  questions: Question[];
};

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{
    correctCount: number;
    total: number;
    scorePercent: number;
    xpGained: number;
    totalXp: number;
  } | null>(null);

  const load = async () => {
    const res = await api.get(`/lessons/${id}`);
    const lessonData: Lesson = res.data;
    setLesson(lessonData);
    setAnswers(Array(lessonData.questions.length).fill(-1));
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const setAnswerForQuestion = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[questionIndex] = optionIndex;
      return copy;
    });
  };

  const submit = async () => {
    if (!id) return;
    const res = await api.post("/progress/submit", {
      lessonId: id,
      answers,
    });
    setResult(res.data);

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      user.xp = res.data.totalXp;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  if (!lesson) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      {/* Lesson Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-gray-300 mt-2">{lesson.description}</p>
        <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold bg-blue-600 rounded-full">
          Level: {lesson.level}
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {lesson.questions.map((q, qi) => (
          <div
            key={qi}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow"
          >
            <p className="font-semibold text-lg">
              <span className="text-blue-400">Q{qi + 1}:</span> {q.prompt}
            </p>

            <div className="mt-4 space-y-2">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="h-4 w-4 text-blue-500"
                    name={`q-${qi}`}
                    checked={answers[qi] === oi}
                    onChange={() => setAnswerForQuestion(qi, oi)}
                  />
                  <span className="text-gray-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={submit}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
      >
        Submit Quiz
      </button>

      {/* Result */}
      {result && (
        <div className="mt-10 bg-gray-900 border border-gray-700 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Your Result</h2>

          <p className="text-gray-300">
            Score:{" "}
            <span className="font-semibold text-white">
              {result.correctCount}/{result.total} ({result.scorePercent}%)
            </span>
          </p>

          <p className="text-gray-300 mt-2">
            XP gained:{" "}
            <span className="font-semibold text-green-400">{result.xpGained}</span>
          </p>

          <p className="text-gray-300 mt-2">
            Total XP:{" "}
            <span className="font-semibold text-green-400">{result.totalXp}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonPage;
