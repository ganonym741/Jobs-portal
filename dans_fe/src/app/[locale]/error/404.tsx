import Image from 'next/image';

import Link from 'next/link';

import Error404Img from '@assets/404.svg';

export default function Error404({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20">
        <div className="relative">
          <Image
            src={Error404Img.src}
            alt="404"
            className="mx-auto w-full max-w-xs object-cover md:max-w-xl"
          />
          <Link
            href="/"
            className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none"
            onClick={reset}
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
