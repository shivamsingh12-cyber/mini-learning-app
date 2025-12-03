import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

type LessonWithProgress = {
  _id: string;
  title: string;
  description?: string;
  level: string;
  progress?: {
    completed: boolean;
    lastScore: number;
    attempts: number;
  } | null;
};

type LeaderUser = {
  name: string;
  email: string;
  xp: number;
};

const DashboardPage = () => {
  const [lessons, setLessons] = useState<LessonWithProgress[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderUser[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const load = async () => {
    const [lessonsRes, leaderboardRes] = await Promise.all([
      api.get("/lessons"),
      api.get("/leaderboard"),
    ]);
    setLessons(lessonsRes.data);
    setLeaderboard(leaderboardRes.data);

    const userStr = localStorage.getItem("user");
    if (userStr) setUser(JSON.parse(userStr));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Lessons Section */}
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold mb-4 text-black-500">Lessons</h3>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              onClick={() => navigate(`/lesson/${lesson._id}`)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-5 cursor-pointer hover:border-indigo-400 hover:bg-gray-700 transition"
            >
              <h4 className="text-xl font-semibold text-indigo-300">
                {lesson.title}
              </h4>

              {lesson.description && (
                <p className="text-gray-300 mt-1">{lesson.description}</p>
              )}

              <p className="text-sm text-gray-400 mt-2">
                Level: <span className="font-medium">{lesson.level}</span>
              </p>

              {/* Progress */}
              {lesson.progress ? (
                <div className="mt-3 text-gray-300 text-sm">
                  <p>
                    <span className="font-semibold">Last Score:</span>{" "}
                    {lesson.progress.lastScore}%
                  </p>
                  <p>
                    <span className="font-semibold">Attempts:</span>{" "}
                    {lesson.progress.attempts}
                  </p>
                  <p>
                    {lesson.progress.completed ? (
                      <span className="text-green-400 font-semibold">
                        ✅ Completed
                      </span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">
                        ⏳ In Progress
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-400">Not started</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="lg:col-span-1">
        <h3 className="text-2xl font-bold mb-4 text-black-500">Leaderboard</h3>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
          {leaderboard.map((u, index) => (
            <div
              key={u.email}
              className="flex justify-between p-2 bg-gray-700 rounded-lg"
            >
              <span className="text-gray-200 font-semibold">
                #{index + 1} {u.name}
              </span>
              <span className="text-indigo-300 font-bold">{u.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
