import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { localesDetail } from '@/config';

type PopFlagProps = {
  currentLocale?: string;
  onSelectFlag?: (nextLocale: string) => void;
  className?: string;
};

const PopFlag = ({
  currentLocale,
  className = '',
  onSelectFlag,
}: PopFlagProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="rounded-full object-cover"
          src={`/flags/${currentLocale}.png`}
          alt="flag"
          width={32}
          height={32}
        />
      </PopoverTrigger>
      <PopoverContent className={'rounded-[10px] w-fit'}>
        <ul className="grid grid-cols-1 gap-4 !px-2 text-dark dark:text-white-dark dark:text-white-light/90">
          {localesDetail.map((item: { label: string; value: string }) => {
            return (
              <button
                key={item.value}
                type="button"
                className={cn(`flex w-full items-center ${className}`)}
                onClick={() => onSelectFlag && onSelectFlag(item.value)}
              >
                <Image
                  src={`/flags/${item.value}.png`}
                  alt={'flag'}
                  width={32}
                  height={32}
                  className={'rounded-full object-cover'}
                />
                <p className={'ml-3'}>{item.label}</p>
              </button>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default PopFlag;
export type { PopFlagProps };
