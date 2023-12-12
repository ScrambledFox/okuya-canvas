import Image from "next/image";
import Link from "next/link";

import { TbYinYangFilled } from "react-icons/tb";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 select-none">
      <div className="flex flex-col items-center justify-center">
        {/* <Image src="/fengshui.png" alt="Logo" width={200} height={200} />
         */}
        <div className="flex flex-col gap-4 text-center justify-center">
          <div className="flex flex-col justify-center text-center">
            <span className="text-xl font-bold font-aoboshi">おくや</span>
            <h1 className="text-8xl font-bold font-aoboshi">奥家</h1>
          </div>

          <TbYinYangFilled size={416} color="white" />

          <div>
            <h1 className="text-6xl font-bold font-aoboshi">OKUYA</h1>
          </div>
        </div>

        <p className="text-2xl mt-4">
          Feng Shui-based Home Interior Design Tool
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Link
          href={"/editor"}
          className=" bg-zinc-950 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
