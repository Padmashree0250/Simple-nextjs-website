"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { users } from "../../Data/user";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate user against mock database
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
     
      const fakeToken = btoa(
        JSON.stringify({
          email,
          exp: Date.now() + 60 * 60 * 1000, 
        })
      );

      localStorage.setItem("token", fakeToken);
      router.push("/Dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center mt-[40px] min-h-screen">
      <div className="bg-black  rounded-lg shadow-lg px-8 py-8 w-full max-w-md">
        <p className="text-4xl text-center text-blue-300 font-semibold mb-4">
          Welcome
        </p>
        <p className="text-2xl text-center text-blue-300 mb-8">
          Login to continue
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-blue-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none text-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-blue-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none text-blue-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
