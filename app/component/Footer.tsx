'use client'
import { useRouter, usePathname } from "next/navigation";
import { TbTransactionBitcoin } from "react-icons/tb";
import { HiStatusOnline } from "react-icons/hi";
export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex w-full justify-between text-white px-8 bottom-10 absolute max-w-[500px] left-[50%] -translate-x-[50%]">
      <div className={`flex flex-col w-20  cursor-pointer items-center shadow-lg justify-center py-2 rounded-xl ${pathname === '/' ? 'bg-white bg-opacity-40 border-white' : 'bg-white bg-opacity-10 '}`} onClick={() => router.push('/')}>
        <TbTransactionBitcoin className="w-8 h-8 max-sm:w-6 max-sm:h-6" />
        <div className="text-md font-[400] mt-1 max-sm:mt-0 max-sm:text-[14px]">Exchange</div>
      </div>
      <div className={`flex flex-col w-20  cursor-pointer items-center shadow-lg justify-center py-2 px-5 rounded-xl ${pathname === '/status' ? 'bg-white bg-opacity-40 border-white' : 'bg-white bg-opacity-10 '}`} onClick={() => router.push('/status')}>
        <HiStatusOnline className="w-8 h-8 max-sm:w-6 max-sm:h-6" />
        <div className="text-md font-[600] mt-1 max-sm:mt-0 max-sm:text-[14px]">Status</div>
      </div>
      <div className={`flex flex-col w-20  cursor-pointer items-center shadow-lg justify-center py-2 px-5 rounded-xl ${pathname === '/airdrop' ? 'bg-white bg-opacity-40 border-white' : 'bg-white bg-opacity-10 '}`} onClick={() => router.push('/airdrop')}>
        <img src="/airdrop.svg" alt="airdrop" className="w-8 h-8 max-sm:w-6 max-sm:h-6" />
        <div className="text-md font-[600] mt-1 max-sm:mt-0 max-sm:text-[14px]">Airdrop</div>
      </div>
    </div>
  )
}
