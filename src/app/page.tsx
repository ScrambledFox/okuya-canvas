import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <Image src="/fengshui.png" alt="Logo" width={200} height={200} />
        <h1 className="text-6xl font-bold">奥家 | Okuya</h1>
        <p className="text-2xl mt-4">Feng Shui Reinforcement Learning</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Link
          href={"/editor"}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
