"use client";
import { Dumbbell, Bike, Footprints, Volleyball } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

// Define the User type
type User = {
  name: string;
  workouts: { type: string; minutes: number }[];
  totalWorkouts: number;
  totalTime: number;
};

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token"); 

    if (!isLoggedIn) {
      router.push("/"); 
    }
  }, [router]);
  const initialUsers: User[] = [
    {
      name: "John",
      workouts: [
        { type: "cardio", minutes: 30 },
        { type: "yoga", minutes: 40 },
      ],
      totalWorkouts: 2,
      totalTime: 70,
    },
    {
      name: "Ann",
      workouts: [{ type: "strength", minutes: 30 }],
      totalWorkouts: 1,
      totalTime: 30,
    },
    {
      name: "Monica",
      workouts: [{ type: "cycling", minutes: 45 }],
      totalWorkouts: 1,
      totalTime: 45,
    },
  ];

  // State variables
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [workoutForm, setWorkoutForm] = useState({
    userName: "",
    workoutType: "cardio",
    workoutTime: "10",
  });
  const [currentPage] = useState(1);
  const usersPerPage = 5;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      name: workoutForm.userName,
      workouts: [
        {
          type: workoutForm.workoutType,
          minutes: parseInt(workoutForm.workoutTime),
        },
      ],
      totalWorkouts: 1,
      totalTime: parseInt(workoutForm.workoutTime),
    };

    // Add the new user to the list
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setWorkoutForm({ userName: "", workoutType: "cardio", workoutTime: "10" });
    updateDisplayedUsers(updatedUsers);
  };

  // Search users by name
  const searchUser = () => {
    if (searchQuery.trim()) {
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(users);
    }
  };

  // Filter users by workout type
  const filterByWorkoutType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWorkoutType = event.target.value;
    if (selectedWorkoutType) {
      const filteredUsers = users.filter((user) =>
        user.workouts.some((workout) => workout.type === selectedWorkoutType)
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(users);
    }
  };

  const updateDisplayedUsers = (userList: User[]) => {
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    setDisplayedUsers(userList.slice(start, end));
  };

  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className=" flex gap-4 items-center text-blue-300 mx-4 py-4 overflow-y-auto mt-4 ">
        <div className=" flex items-center justify-around w-1/4 border border-blue-300 p-8  rounded-xl">
          <div className="flex gap-2">
            <Footprints className="w-6 h-6" />
            Steps
          </div>

          <div className="font-bold">1423 Steps</div>
        </div>
        <div className=" flex items-center justify-around w-1/4 border border-blue-300 p-8 rounded-xl">
          <div className="flex gap-2">
            <Volleyball className="w-6 h-6" />
            Outdoor
          </div>
          <div className="font-bold">1781 Kcal</div>
        </div>
        <div className=" flex items-center justify-around w-1/4 border border-blue-300 p-8 rounded-xl">
          <div className="flex gap-2">
            <Dumbbell className="w-6 h-6" />
            Workout
          </div>
          <div className="font-bold">623 Kcal</div>
        </div>
        <div className=" flex items-center justify-around w-1/4 border border-blue-300 p-8 rounded-xl">
          <div className="flex gap-2">
            <Bike className="w-6 h-6" />
            Cycling
          </div>
          <div className="font-bold">4.5 Km</div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center mt-4  ">
        <div className=" flex flex-row text-center text-3xl font-semibold mb-8 text-blue-300">
          <p>Welcome to FitnessTracker</p>
        </div>

        <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-black border-2 border-blue-300 overflow-y-auto max-h-full">
          <p className="text-xl mb-4 text-blue-300">Save your details below:</p>
          <form id="workoutForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="userName" className="block text-lg text-blue-300">
                Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={workoutForm.userName}
                onChange={(e) =>
                  setWorkoutForm({ ...workoutForm, userName: e.target.value })
                }
                className="w-full p-2 border border-blue-300 rounded-lg bg-black text-blue-300"
                placeholder="Enter your name"
                required
              />

              <label
                htmlFor="workoutType"
                className="block text-lg text-blue-300"
              >
                Workout Type:
              </label>
              <select
                id="workoutType"
                name="workoutType"
                value={workoutForm.workoutType}
                onChange={(e) =>
                  setWorkoutForm({
                    ...workoutForm,
                    workoutType: e.target.value,
                  })
                }
                className="w-full p-2 border border-blue-300 rounded-lg bg-black text-blue-300"
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength Training</option>
                <option value="yoga">Yoga</option>
                <option value="cycling">Cycling</option>
              </select>

              <label
                htmlFor="workoutTime"
                className="block text-lg text-blue-300"
              >
                Workout Time:
              </label>
              <select
                id="workoutTime"
                name="workoutTime"
                value={workoutForm.workoutTime}
                onChange={(e) =>
                  setWorkoutForm({
                    ...workoutForm,
                    workoutTime: e.target.value,
                  })
                }
                className="w-full p-2 border border-blue-300 rounded-lg bg-black text-blue-300"
              >
                <option value="10">10 min</option>
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="40">40 min</option>
                <option value="50">50 min</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-300"
            >
              Add Workout
            </button>
          </form>
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user by name"
              className="p-2 w-2/3 border border-blue-300 rounded-lg bg-black text-blue-300"
            />
            <button
              onClick={searchUser}
              className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="workoutFilter" className="mr-2 text-blue-300">
              Filter by Workout Type:
            </label>
            <select
              id="workoutFilter"
              onChange={filterByWorkoutType}
              className="p-2 border border-blue-300 rounded-lg bg-black text-blue-300"
            >
              <option value="">All</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength Training</option>
              <option value="yoga">Yoga</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 text-left text-blue-300">Name</th>
                  <th className="px-4 py-2 text-left text-blue-300">
                    Number of Workouts
                  </th>
                  <th className="px-4 py-2 text-left text-blue-300">
                    Total Workout Time (minutes)
                  </th>
                  <th className="px-4 py-2 text-left text-blue-300">
                    Workout Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, index) => (
                  <tr key={index} className="border-b  text-blue-300">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.totalWorkouts}</td>
                    <td className="px-4 py-2">{user.totalTime}</td>
                    <td className="px-4 py-2">
                      <ul>
                        {user.workouts.map((workout, index) => (
                          <li key={index}>
                            {workout.type} - {workout.minutes} min
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
