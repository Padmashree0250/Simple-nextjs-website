"use client";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Dumbbell,
  LayoutDashboard,
  SquareActivity,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className=" flex items-center justify-between px-4 py-2 mt-4 mx-4 rounded-lg  border border-blue-300 text-blue-300  ">
      <div className="flex gap-4 w-1/2 items-center justify-start">
        <div className="flex gap-2  p-2 rounded-lg">
          <LayoutDashboard className="w-6 h-6" />
          Dashboard
        </div>
        <div className="flex gap-2  p-2 rounded-lg">
          <Dumbbell className="w-6 h-6" />
          Exercise
        </div>
        <div className="flex gap-2  p-2 rounded-lg">
          <SquareActivity className="w-6 h-6" />
          Fitness goals
        </div>
        <div className="flex gap-2  p-2 rounded-lg">
          <CalendarDays className="w-6 h-6" />
          Calendar
        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="bg-blue-300 text-black px-4 py-2 rounded-lg hover:bg-blue-300"
      >
        Logout
      </button>
    </div>
  );
}
